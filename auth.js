// Optional sign-in (Supabase Auth) and cloud sync of notes, to-dos, reminders and settings.
// Loaded last. With empty settings in config.js it does nothing except re-arm saved reminders.
(function () {
  const A = window.APP_CONFIG || {};
  const configured = Boolean(A.SUPABASE_URL && A.SUPABASE_ANON_KEY);
  const SUPABASE_JS = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.118.0/dist/umd/supabase.min.js";
  const SYNCED_SETTINGS = ["wake", "lang", "rate", "pitch", "speakReplies", "autoListen", "abilities"]; // not "voice": voices differ per device
  const LOCAL = { notes: "voicebot-notes", todo: "voicebot-todo", reminders: "voicebot-reminders" };

  let sb = null, user = null, session = null, applying = false, saveTimer = null, mode = "in", providers = true; // providers: any Google/GitHub button available
  const required = () => configured && A.REQUIRE_LOGIN !== false;

  // Other scripts ask these questions.
  window.authLocked = () => required() && !user;
  window.authToken = () => (session ? session.access_token : null);
  window.cloudSave = () => {
    if (!user || applying) return;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(push, 800);
  };

  const readLocal = key => { try { return JSON.parse(localStorage.getItem(key)) || []; } catch { return []; } };
  const writeLocal = (key, v) => { try { localStorage.setItem(key, JSON.stringify(v)); } catch { /* storage blocked */ } };
  const unionBy = (a, b, keyOf) => { const seen = new Set(), out = []; for (const x of [...(a || []), ...(b || [])]) { const k = keyOf(x); if (!seen.has(k)) { seen.add(k); out.push(x); } } return out; };
  const displayName = () => {
    if (!user) return "";
    const m = user.user_metadata || {};
    return m.full_name || m.name || (user.email ? user.email.split("@")[0] : "");
  };

  // ---------- Cloud sync ----------
  async function push() {
    if (!user || !sb) return;
    const settings = {}; SYNCED_SETTINGS.forEach(k => (settings[k] = cfg[k]));
    const { error } = await sb.from("user_data").upsert({
      user_id: user.id, notes: readLocal(LOCAL.notes), todo: readLocal(LOCAL.todo), reminders: readLocal(LOCAL.reminders),
      settings, updated_at: new Date().toISOString(),
    });
    if (error) note("Couldn't save to your account: " + error.message);
  }

  async function pull() {
    applying = true;
    try {
      const { data, error } = await sb.from("user_data").select("*").eq("user_id", user.id).maybeSingle();
      if (error) { note("Couldn't load your saved data: " + error.message); return; }
      if (data) { // cloud wins for settings; notes, to-dos and reminders are merged so nothing made while signed out is lost
        writeLocal(LOCAL.notes, unionBy(data.notes, readLocal(LOCAL.notes), x => x));
        writeLocal(LOCAL.todo, unionBy(data.todo, readLocal(LOCAL.todo), x => x));
        writeLocal(LOCAL.reminders, unionBy(data.reminders, readLocal(LOCAL.reminders), x => x.id));
        applySettings(data.settings || {});
      }
    } finally { applying = false; }
    await push(); // creates the row on first sign-in and stores the merged result
    if (window.rearmReminders) window.rearmReminders();
  }

  function applySettings(s) {
    const lang = cfg.lang;
    SYNCED_SETTINGS.forEach(k => { if (s[k] !== undefined) cfg[k] = s[k]; });
    save();
    $("wake").value = cfg.wake; $("lang").value = cfg.lang; $("rate").value = cfg.rate; $("pitch").value = cfg.pitch;
    $("autoListen").checked = cfg.autoListen; renderMute();
    syncAbilities(); renderAbilities(); loadVoices(); renderChips(); renderHeader();
    if (cfg.lang !== lang && listening) spawn();
  }

  function note(text) { addMsg(text, "bot no"); }

  // ---------- Sign-in screen ----------
  const css = document.createElement("style");
  css.textContent = `
  #authOverlay { position: fixed; inset: 0; z-index: 50; background: color-mix(in srgb, var(--bg) 92%, transparent); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; padding: 16px; overflow-y: auto; }
  #authOverlay[hidden] { display: none; }
  .auth-card { width: 100%; max-width: 380px; background: var(--card); border: 1px solid var(--line); border-radius: 18px; padding: 22px; display: grid; gap: 12px; }
  .auth-card h2 { margin: 0; font-size: 20px; } .auth-sub { margin: -4px 0 0; color: var(--muted); font-size: 14px; }
  .auth-card form { display: grid; gap: 10px; } .auth-card input { width: 100%; }
  .auth-primary { padding: 11px 16px; border: 0; border-radius: 10px; background: var(--accent); color: #fff; font-weight: 600; }
  .auth-alt, .auth-oauth button, .auth-skip { padding: 10px 14px; border-radius: 10px; border: 1px solid var(--line); background: var(--card); color: var(--ink); }
  .auth-alt:hover, .auth-oauth button:hover { border-color: var(--accent); }
  .auth-oauth { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .auth-links { display: flex; justify-content: space-between; gap: 8px; }
  .auth-links button, .auth-skip { background: none; border: 0; color: var(--accent); padding: 2px; font-size: 14px; }
  .auth-skip { color: var(--muted); } .auth-or { text-align: center; color: var(--muted); font-size: 13px; }
  .auth-msg { margin: 0; min-height: 20px; font-size: 14px; color: var(--muted); } .auth-msg.err { color: var(--no); } .auth-msg.ok { color: var(--yes); }
  #authBar { display: flex; justify-content: flex-end; align-items: center; gap: 10px; font-size: 14px; color: var(--muted); }
  #authBar button { border: 1px solid var(--line); background: var(--card); color: var(--ink); border-radius: 999px; padding: 5px 12px; font-size: 13px; }
  #authBar b { color: var(--ink); font-weight: 600; }`;

  const ov = document.createElement("div");
  ov.id = "authOverlay"; ov.hidden = true;
  ov.innerHTML = `
  <div class="auth-card" role="dialog" aria-modal="true" aria-labelledby="authTitle">
    <h2 id="authTitle">Sign in</h2><p class="auth-sub" id="authSub">to use Can-Do Robot and keep your notes with you.</p>
    <form id="authForm">
      <input id="authEmail" type="email" placeholder="Email" autocomplete="email" required>
      <input id="authPass" type="password" placeholder="Password" autocomplete="current-password" minlength="6">
      <button class="auth-primary" id="authSubmit">Sign in</button>
    </form>
    <div class="auth-links"><button type="button" id="authToggle">Create an account</button><button type="button" id="authForgot">Forgot password?</button></div>
    <button type="button" class="auth-alt" id="authMagic">Email me a login link</button>
    <div class="auth-or" id="authOr">or continue with</div>
    <div class="auth-oauth" id="authOauth"><button type="button" data-p="google">Google</button><button type="button" data-p="github">GitHub</button></div>
    <button type="button" class="auth-skip" id="authSkip">Continue without signing in</button>
    <p class="auth-msg" id="authMsg" role="status"></p>
  </div>`;

  const bar = document.createElement("div");
  bar.id = "authBar"; bar.hidden = true;

  const $a = id => document.getElementById(id);
  function say(text, kind) { const m = $a("authMsg"); m.textContent = text || ""; m.className = "auth-msg" + (kind ? " " + kind : ""); }

  function setMode(m) {
    mode = m;
    const up = m === "up", rec = m === "recover";
    $a("authTitle").textContent = rec ? "Choose a new password" : up ? "Create your account" : "Sign in";
    $a("authSubmit").textContent = rec ? "Save password" : up ? "Create account" : "Sign in";
    $a("authToggle").textContent = up ? "I have an account" : "Create an account";
    $a("authEmail").hidden = rec; $a("authEmail").required = !rec;
    $a("authPass").placeholder = rec ? "New password" : "Password";
    $a("authPass").autocomplete = up || rec ? "new-password" : "current-password";
    for (const id of ["authToggle", "authForgot", "authMagic", "authOr", "authOauth"]) $a(id).hidden = rec;
    if (!providers) { $a("authOr").hidden = true; $a("authOauth").hidden = true; } // nothing to offer
    $a("authSkip").hidden = required() || rec;
    say("");
  }

  function showOverlay(on) { ov.hidden = !on; if (on) setTimeout(() => $a(mode === "recover" ? "authPass" : "authEmail").focus(), 0); }

  // A Log out button next to the main controls, shown only while signed in.
  const logoutBtn = document.createElement("button");
  logoutBtn.className = "ghost"; logoutBtn.id = "logoutBtn"; logoutBtn.textContent = "↩ Log out"; logoutBtn.title = "Sign out of your account";
  logoutBtn.hidden = true; logoutBtn.onclick = () => signOut();

  function renderBar() {
    logoutBtn.hidden = !user;
    if (!configured) { bar.hidden = true; return; }
    bar.hidden = false; bar.textContent = "";
    if (user) {
      const who = document.createElement("span"); who.innerHTML = "Signed in as <b></b>"; who.querySelector("b").textContent = displayName();
      const out = document.createElement("button"); out.textContent = "Log out"; out.onclick = signOut;
      bar.append(who, out);
    } else {
      const inb = document.createElement("button"); inb.textContent = "Sign in"; inb.onclick = () => { setMode("in"); showOverlay(true); };
      bar.append(inb);
    }
  }

  // ---------- Actions ----------
  const email = () => $a("authEmail").value.trim();
  const origin = () => location.origin + location.pathname;
  async function run(fn) {
    say("Working…");
    try { await fn(); } catch (e) { say(e.message || "Something went wrong.", "err"); }
  }

  async function submit(e) {
    e.preventDefault();
    const password = $a("authPass").value;
    await run(async () => {
      if (mode === "recover") {
        const { error } = await sb.auth.updateUser({ password });
        if (error) throw error;
        say("Password updated.", "ok"); setMode("in"); showOverlay(false); return;
      }
      if (mode === "up") {
        const { data, error } = await sb.auth.signUp({ email: email(), password, options: { emailRedirectTo: origin() } });
        if (error) throw error;
        say(data.session ? "" : "Check your email to confirm your account, then sign in.", "ok");
        return;
      }
      const { error } = await sb.auth.signInWithPassword({ email: email(), password });
      if (error) throw error;
      say("");
    });
  }

  async function magicLink() {
    if (!email()) return say("Type your email first.", "err");
    await run(async () => {
      const { error } = await sb.auth.signInWithOtp({ email: email(), options: { emailRedirectTo: origin() } });
      if (error) throw error;
      say("Check your email for a login link.", "ok");
    });
  }

  async function forgot() {
    if (!email()) return say("Type your email first.", "err");
    await run(async () => {
      const { error } = await sb.auth.resetPasswordForEmail(email(), { redirectTo: origin() });
      if (error) throw error;
      say("Check your email for a password reset link.", "ok");
    });
  }

  const oauth = provider => run(async () => {
    const { error } = await sb.auth.signInWithOAuth({ provider, options: { redirectTo: origin() } });
    if (error) throw error;
  });

  async function signOut() {
    await sb.auth.signOut();
  }

  // ---------- Session handling ----------
  async function onSession(s, event) {
    const wasId = user && user.id;
    session = s; user = s ? s.user : null;
    renderBar();
    brain.user = displayName() || null;
    window.dispatchEvent(new Event("auth-changed")); // lets admin.js check whether this person is an admin
    if (event === "PASSWORD_RECOVERY") { setMode("recover"); showOverlay(true); return; }
    if (user) {
      if (mode !== "recover") showOverlay(false);
      if (user.id !== wasId) { // sign-in (not just a token refresh)
        await pull();
        if (event === "SIGNED_IN") { const m = X[cfg.lang].welcome(displayName()); addMsg(m, "bot yes"); speak(m); }
        if (typeof autoStart === "function") autoStart();
      }
    } else {
      if (wasId) { // signed out: don't leave this person's notes in the browser
        Object.values(LOCAL).forEach(k => { try { localStorage.removeItem(k); } catch { /* ignore */ } });
        if (window.rearmReminders) window.rearmReminders();
      }
      if (typeof listening !== "undefined" && listening) stopListening();
      setMode("in");
      if (required()) showOverlay(true);
    }
  }

  function loadScript(src) {
    return new Promise((ok, fail) => { const s = document.createElement("script"); s.src = src; s.onload = ok; s.onerror = fail; document.head.append(s); });
  }

  async function init() {
    document.head.append(css);
    if (window.rearmReminders) window.rearmReminders(); // reminders saved on this device, even when signed out
    if (!configured) return;
    document.body.append(ov);
    document.querySelector("main").prepend(bar);
    document.getElementById("muteBtn").after(logoutBtn);
    if (required()) showOverlay(true); // locked until we know there's a session
    $a("authForm").onsubmit = submit;
    $a("authToggle").onclick = () => setMode(mode === "up" ? "in" : "up");
    $a("authForgot").onclick = forgot;
    $a("authMagic").onclick = magicLink;
    $a("authSkip").onclick = () => showOverlay(false);
    ov.querySelectorAll("[data-p]").forEach(b => (b.onclick = () => oauth(b.dataset.p)));
    renderBar();
    try {
      if (!window.supabase) await loadScript(SUPABASE_JS);
      sb = window.supabase.createClient(A.SUPABASE_URL, A.SUPABASE_ANON_KEY);
    } catch {
      say("Couldn't load the sign-in library. Check your connection and reload.", "err");
      return;
    }
    // Only offer the sign-in providers this project has switched on (Supabase lists them publicly).
    try {
      const s = await fetch(A.SUPABASE_URL.replace(/\/$/, "") + "/auth/v1/settings", { headers: { apikey: A.SUPABASE_ANON_KEY } }).then(r => r.json());
      const ext = s.external || {};
      let n = 0;
      ov.querySelectorAll("[data-p]").forEach(b => { const on = Boolean(ext[b.dataset.p]); b.hidden = !on; if (on) n++; });
      providers = n > 0;
      setMode(mode);
    } catch { /* keep every button if the settings can't be read */ }
    // Don't await Supabase calls inside this callback (it can deadlock the client), so defer.
    sb.auth.onAuthStateChange((event, s) => setTimeout(() => onSession(s, event), 0));
    const { data } = await sb.auth.getSession();
    if (!data.session) onSession(null, "INITIAL");
  }

  init();
})();
