// English Wiktionary's "word of the day" (the Spanish edition has no such feed) (its feed has no CORS headers, so the browser asks us). Returns just the word;
// the page looks up the definition itself.
const unescape = s => s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&");

module.exports = async (req, res) => {
  try {
    const r = await fetch("https://en.wiktionary.org/w/api.php?action=featuredfeed&feed=wotd&feedformat=atom", { headers: { "User-Agent": "voice-bot" } });
    const xml = await r.text();
    const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(m => unescape(m[1]));
    const today = entries[entries.length - 1] || "";
    const m = today.match(/href="\/wiki\/([^"#]+)#/);
    const word = m ? decodeURIComponent(m[1]).replace(/_/g, " ") : "";
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
    res.status(word ? 200 : 502).json({ word });
  } catch (e) {
    res.status(502).json({ word: "" });
  }
};
