// Admin API: list, block/unblock and delete users. Admin rights are decided here on the server, never in the browser.
//
// Vercel environment variables:
//   SUPABASE_URL, SUPABASE_ANON_KEY   (same public values as config.js; used to check who is calling)
//   ADMIN_EMAILS                      comma-separated sign-in emails that are admins
//   SUPABASE_SERVICE_ROLE_KEY         the SECRET key (Supabase > Project Settings > API Keys). Server only, never in config.js.
const base = () => (process.env.SUPABASE_URL || "").replace(/\/$/, "");
const adminEmails = () => (process.env.ADMIN_EMAILS || "").toLowerCase().split(",").map(s => s.trim()).filter(Boolean);

// Who is calling? Ask Supabase to validate their sign-in token.
async function caller(req) {
  const token = String(req.headers.authorization || "").replace(/^Bearer\s+/i, "");
  if (!token || !base() || !process.env.SUPABASE_ANON_KEY) return null;
  try {
    const r = await fetch(`${base()}/auth/v1/user`, { headers: { apikey: process.env.SUPABASE_ANON_KEY, Authorization: `Bearer ${token}` } });
    return r.ok ? await r.json() : null;
  } catch (e) { return null; }
}
const isAdmin = user => Boolean(user && user.email && adminEmails().includes(user.email.toLowerCase()));

// Calls to Supabase's admin API with the secret key.
function adminFetch(path, init = {}) {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const headers = { apikey: key, "Content-Type": "application/json", ...(init.headers || {}) };
  if (key.startsWith("eyJ")) headers.Authorization = `Bearer ${key}`; // legacy JWT keys also go in Authorization
  return fetch(`${base()}/auth/v1/admin${path}`, { ...init, headers });
}

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  const body = req.method === "POST" ? req.body || {} : {};
  const action = req.method === "POST" ? body.action : req.query.action;

  const user = await caller(req);
  if (!user) return res.status(401).json({ error: "sign in first" });
  if (action === "me") return res.status(200).json({ admin: isAdmin(user) });
  if (!isAdmin(user)) return res.status(403).json({ error: "admins only" });
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) return res.status(503).json({ error: "SUPABASE_SERVICE_ROLE_KEY is not set in Vercel" });

  try {
    if (action === "users") {
      const r = await adminFetch("/users?per_page=200");
      if (!r.ok) return res.status(502).json({ error: "couldn't list users" });
      const j = await r.json();
      const users = (j.users || []).map(u => ({
        id: u.id, email: u.email || "", name: (u.user_metadata && (u.user_metadata.full_name || u.user_metadata.name)) || "",
        providers: (u.app_metadata && u.app_metadata.providers) || [], created: u.created_at, lastSignIn: u.last_sign_in_at,
        blocked: Boolean(u.banned_until && new Date(u.banned_until) > new Date()), admin: isAdmin(u), you: u.id === user.id,
      }));
      return res.status(200).json({ users });
    }

    if (["block", "unblock", "delete"].includes(action)) {
      const id = String(body.id || "");
      if (!/^[0-9a-f-]{36}$/i.test(id)) return res.status(400).json({ error: "bad id" });
      if (id === user.id) return res.status(400).json({ error: "you can't do that to your own account" });
      // Never let an admin act on another admin from the panel.
      const t = await adminFetch(`/users/${id}`);
      if (!t.ok) return res.status(404).json({ error: "no such user" });
      const target = await t.json();
      if (isAdmin(target)) return res.status(400).json({ error: "that account is an admin" });

      const r = action === "delete"
        ? await adminFetch(`/users/${id}`, { method: "DELETE" })
        : await adminFetch(`/users/${id}`, { method: "PUT", body: JSON.stringify({ ban_duration: action === "block" ? "876000h" : "none" }) });
      if (!r.ok) return res.status(502).json({ error: "Supabase refused the change" });
      return res.status(200).json({ ok: true });
    }
    return res.status(400).json({ error: "unknown action" });
  } catch (e) {
    return res.status(502).json({ error: "admin request failed" });
  }
};
