// A random quote from dummyjson.com, proxied because that API doesn't send CORS headers.
module.exports = async (req, res) => {
  try {
    const r = await fetch("https://dummyjson.com/quotes/random");
    const j = await r.json();
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({ quote: j.quote || "", author: j.author || "" });
  } catch (e) {
    res.status(502).json({ quote: "", author: "" });
  }
};
