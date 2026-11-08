// Free news headlines: BBC RSS for top stories, Google News RSS for a topic.
// A serverless proxy is needed because these feeds don't send CORS headers.
const TOP = {
  en: "https://feeds.bbci.co.uk/news/rss.xml",
  hi: "https://feeds.bbci.co.uk/hindi/rss.xml",
  es: "https://feeds.bbci.co.uk/mundo/rss.xml",
};
const GOOGLE = {
  en: "hl=en-IN&gl=IN&ceid=IN:en",
  hi: "hl=hi&gl=IN&ceid=IN:hi",
  es: "hl=es-419&gl=MX&ceid=MX:es-419",
};

const decode = s =>
  s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();

module.exports = async (req, res) => {
  const lang = TOP[req.query.lang] ? req.query.lang : "en";
  const q = String(req.query.q || "").slice(0, 100).trim();
  const url = q
    ? `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&${GOOGLE[lang]}`
    : TOP[lang];
  try {
    const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 voice-bot" } });
    const xml = await r.text();
    const items = [...xml.matchAll(/<item>[\s\S]*?<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/g)]
      .map(m => decode(m[1]).replace(/\s+-\s+[^-]+$/, "")) // drop " - Publisher" suffix from Google News
      .slice(0, 5);
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
    res.status(200).json({ items });
  } catch (e) {
    res.status(502).json({ items: [], error: "news unavailable" });
  }
};
