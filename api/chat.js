// Open-ended chat via Google's free Gemini tier. The key stays on the server.
// Set GEMINI_API_KEY in Vercel (Project Settings > Environment Variables). Optional: GEMINI_MODEL.
const LANGS = { en: "English", hi: "Hindi", es: "Spanish" };

// If Supabase sign-in is configured (SUPABASE_URL and SUPABASE_ANON_KEY set in Vercel), only signed-in users may chat,
// so strangers can't spend your free Gemini quota. Without those variables chat stays open.
async function authorised(req) {
  const url = process.env.SUPABASE_URL, anon = process.env.SUPABASE_ANON_KEY;
  if (!url || !anon) return true;
  const token = String(req.headers.authorization || "").replace(/^Bearer\s+/i, "");
  if (!token) return false;
  try {
    const r = await fetch(`${url.replace(/\/$/, "")}/auth/v1/user`, { headers: { apikey: anon, Authorization: `Bearer ${token}` } });
    return r.ok;
  } catch (e) { return false; }
}

module.exports = async (req, res) => {
  const key = process.env.GEMINI_API_KEY;
  // GET tells the page whether chat is configured, so it can skip it quietly when it isn't.
  if (req.method === "GET") return res.status(200).json({ enabled: Boolean(key) });
  if (!key) return res.status(503).json({ error: "chat not configured" });
  if (!(await authorised(req))) return res.status(401).json({ error: "sign in to chat" });

  const body = req.body || {};
  const lang = LANGS[body.lang] || "English";
  const messages = (Array.isArray(body.messages) ? body.messages : [])
    .slice(-10)
    .map(m => ({
      role: m.role === "model" ? "model" : "user",
      parts: [{ text: String(m.text || "").slice(0, 600) }],
    }))
    .filter(m => m.parts[0].text);
  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return res.status(400).json({ error: "no question" });
  }

  const model = process.env.GEMINI_MODEL || "gemini-flash-latest";
  try {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{
            text:
              `You are a friendly voice robot in a web page. Your replies are read aloud, so answer in at most three short sentences of plain text: ` +
              `no markdown, no lists, no emoji. Reply in ${lang}. You cannot take physical actions, make calls, or browse the live web; ` +
              `if asked to, say so honestly in one sentence.`,
          }],
        },
        contents: messages,
        generationConfig: { maxOutputTokens: 300, temperature: 0.7 },
      }),
    });
    if (!r.ok) return res.status(502).json({ error: "model unavailable" });
    const j = await r.json();
    const text = ((j.candidates || [])[0]?.content?.parts || []).map(p => p.text || "").join("").trim();
    if (!text) return res.status(502).json({ error: "empty reply" });
    res.status(200).json({ text });
  } catch (e) {
    res.status(502).json({ error: "model unavailable" });
  }
};
