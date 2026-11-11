// Admin panel: shows an Admin button to admins only, and lists users with Block / Delete.
// The real permission check happens on the server in api/admin.js; hiding the button is only a convenience.
(function () {
  let button = null, panel = null, isAdmin = false;
  const call = (path, init = {}) => fetch(path, {
    ...init,
    headers: { "Content-Type": "application/json", Authorization: "Bearer " + window.authToken(), ...(init.headers || {}) },
  });

  const css = document.createElement("style");
  css.textContent = `
  #adminPanel { position: fixed; inset: 0; z-index: 40; background: color-mix(in srgb, var(--bg) 92%, transparent); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; padding: 16px; }
  #adminPanel[hidden] { display: none; }
  .adm-card { width: 100%; max-width: 640px; max-height: 88vh; overflow: auto; background: var(--card); border: 1px solid var(--line); border-radius: 18px; padding: 20px; display: grid; gap: 12px; }
  .adm-head { display: flex; justify-content: space-between; align-items: center; } .adm-head h2 { margin: 0; font-size: 18px; }
  .adm-msg { margin: 0; min-height: 18px; font-size: 14px; color: var(--muted); } .adm-msg.err { color: var(--no); }
  .adm-row { display: grid; grid-template-columns: 1fr auto; gap: 8px; align-items: center; padding: 10px 12px; border: 1px solid var(--line); border-radius: 12px; }
  .adm-who { font-size: 15px; word-break: break-all; } .adm-meta { color: var(--muted); font-size: 12.5px; }
  .adm-tag { display: inline-block; margin-left: 6px; padding: 1px 8px; border-radius: 999px; font-size: 11.5px; background: color-mix(in srgb, var(--accent) 18%, transparent); }
  .adm-tag.blocked { background: color-mix(in srgb, var(--no) 22%, transparent); }
  .adm-actions { display: flex; gap: 6px; } .adm-actions button { padding: 5px 10px; border-radius: 8px; border: 1px solid var(--line); background: var(--card); color: var(--ink); font-size: 13px; }
  .adm-actions .danger { color: var(--no); }`;

  function build() {
    if (panel) return;
    document.head.append(css);
    panel = document.createElement("div");
    panel.id = "adminPanel"; panel.hidden = true;
    panel.innerHTML = `<div class="adm-card" role="dialog" aria-modal="true" aria-labelledby="admTitle">
      <div class="adm-head"><h2 id="admTitle">Admin: users</h2><button class="ghost" id="admClose" type="button">Close</button></div>
      <p class="adm-msg" id="admMsg" role="status"></p><div id="admList" style="display:grid;gap:8px"></div></div>`;
    document.body.append(panel);
    panel.querySelector("#admClose").onclick = () => (panel.hidden = true);
    panel.addEventListener("click", e => { if (e.target === panel) panel.hidden = true; });
  }
  const say = (t, err) => { const m = document.getElementById("admMsg"); m.textContent = t || ""; m.className = "adm-msg" + (err ? " err" : ""); };

  async function load() {
    say("Loading…");
    const r = await call("/api/admin?action=users");
    const j = await r.json().catch(() => ({}));
    if (!r.ok) return say(j.error || "Couldn't load users.", true);
    say(`${j.users.length} ${j.users.length === 1 ? "user" : "users"}`);
    const list = document.getElementById("admList"); list.textContent = "";
    for (const u of j.users) list.append(row(u));
  }

  function row(u) {
    const d = document.createElement("div"); d.className = "adm-row";
    const info = document.createElement("div");
    const who = document.createElement("div"); who.className = "adm-who";
    who.textContent = u.name ? `${u.name} · ${u.email}` : u.email || "(no email)";
    for (const [t, cls] of [[u.admin && "admin", ""], [u.you && "you", ""], [u.blocked && "blocked", "blocked"]]) {
      if (t) { const s = document.createElement("span"); s.className = "adm-tag " + cls; s.textContent = t; who.append(s); }
    }
    const meta = document.createElement("div"); meta.className = "adm-meta";
    const when = v => (v ? new Date(v).toLocaleString() : "never");
    meta.textContent = `${(u.providers || []).join(", ") || "email"} · joined ${when(u.created)} · last sign-in ${when(u.lastSignIn)}`;
    info.append(who, meta); d.append(info);
    if (!u.admin && !u.you) { // admins can't be changed from here
      const acts = document.createElement("div"); acts.className = "adm-actions";
      const block = document.createElement("button"); block.textContent = u.blocked ? "Unblock" : "Block";
      block.onclick = () => act(u.blocked ? "unblock" : "block", u, u.blocked ? null : `Block ${u.email}? They won't be able to sign in until you unblock them.`);
      const del = document.createElement("button"); del.className = "danger"; del.textContent = "Delete";
      del.onclick = () => act("delete", u, `Permanently delete ${u.email} and their saved notes? This can't be undone.`);
      acts.append(block, del); d.append(acts);
    }
    return d;
  }

  async function act(action, u, confirmText) {
    if (confirmText && !confirm(confirmText)) return;
    say("Working…");
    const r = await call("/api/admin", { method: "POST", body: JSON.stringify({ action, id: u.id }) });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) return say(j.error || "That didn't work.", true);
    await load();
  }

  async function refresh() {
    isAdmin = false;
    if (window.authToken && window.authToken()) {
      try { const r = await call("/api/admin?action=me"); isAdmin = r.ok && (await r.json()).admin === true; } catch { /* not an admin */ }
    }
    if (isAdmin && !button) {
      build();
      button = document.createElement("button");
      button.className = "ghost"; button.id = "adminBtn"; button.textContent = "🛡 Admin";
      button.onclick = () => { panel.hidden = false; load(); };
      (document.getElementById("logoutBtn") || document.getElementById("muteBtn")).after(button);
    }
    if (button) button.hidden = !isAdmin;
    if (!isAdmin && panel) panel.hidden = true;
  }

  window.addEventListener("auth-changed", refresh);
  refresh();
})();
