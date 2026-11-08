// Free web answers via the DuckDuckGo Instant Answer API (no key).
// It returns short abstracts, not full search results; the client falls back to Wikipedia when empty.
module.exports = async (req, res) => {
  const q = String(req.query.q || "").slice(0, 200).trim();
  if (!q) return res.status(400).json({ answer: "" });
  try {
    const r = await fetch(
      `https://api.duckduckgo.com/?q=${encodeURIComponent(q)}&format=json&no_html=1&skip_disambig=1`,
      { headers: { "User-Agent": "voice-bot" } }
    );
    const j = await r.json();
    const related = (j.RelatedTopics || []).find(t => t.Text);
    const answer = j.AbstractText || j.Answer || j.Definition || (related && related.Text) || "";
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
    res.status(200).json({ answer, source: j.AbstractSource || "DuckDuckGo" });
  } catch (e) {
    res.status(502).json({ answer: "", error: "search unavailable" });
  }
};
