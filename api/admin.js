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

// Calls to Supabase with the secret key: the auth admin API, and the database through PostgREST.
function serviceFetch(path, init = {}) {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const headers = { apikey: key, "Content-Type": "application/json", ...(init.headers || {}) };
  if (key.startsWith("eyJ")) headers.Authorization = `Bearer ${key}`; // legacy JWT keys also go in Authorization
  return fetch(`${base()}${path}`, { ...init, headers });
}
const adminFetch = (path, init) => serviceFetch(`/auth/v1/admin${path}`, init);

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

    if (action === "stats") {
      const DAY = 864e5, now = Date.now();
      const ev = await serviceFetch(`/rest/v1/usage_events?select=ability,user_id,created_at&created_at=gte.${new Date(now - 30 * DAY).toISOString()}&order=created_at.desc&limit=50000`);
      if (ev.status === 404) return res.status(200).json({ missing: true }); // the stats tables haven't been created yet
      if (!ev.ok) return res.status(502).json({ error: "couldn't read usage" });
      const events = await ev.json();
      const ul = await adminFetch("/users?per_page=200").then(r => (r.ok ? r.json() : { users: [] })).catch(() => ({ users: [] }));
      const emails = Object.fromEntries((ul.users || []).map(u => [u.id, u.email || ""]));
      const counts = {}, daily = {}, active = new Set();
      for (const e of events) {
        counts[e.ability] = (counts[e.ability] || 0) + 1;
        const t = new Date(e.created_at).getTime();
        if (now - t < 7 * DAY) active.add(e.user_id);
        if (now - t < 14 * DAY) { const d = e.created_at.slice(0, 10); daily[d] = (daily[d] || 0) + 1; }
      }
      const days = []; for (let i = 13; i >= 0; i--) { const d = new Date(now - i * DAY).toISOString().slice(0, 10); days.push({ day: d, count: daily[d] || 0 }); }
      const fb = await serviceFetch("/rest/v1/feedback?select=message,created_at,user_id&order=created_at.desc&limit=30");
      const feedback = fb.ok ? (await fb.json()).map(f => ({ message: f.message, at: f.created_at, email: emails[f.user_id] || "" })) : [];
      return res.status(200).json({
        users: (ul.users || []).length, active7: active.size, events30: events.length, truncated: events.length >= 50000,
        top: Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([ability, count]) => ({ ability, count })), daily: days, feedback,
      });
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
