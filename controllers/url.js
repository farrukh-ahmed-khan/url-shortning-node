const shortid = require("shortid");
const Url = require("../models/url");

async function generateShortUrl(req, res) {
  const body = req.body;
  if (!body.redirectUrl) {
    return res.status(400).json({ error: "redirectUrl is required" });
  }
  const shortId = shortid();
  await Url.create({
    shortId,
    redirectUrl: req.body.redirectUrl,
    visitHistory: [],
  });

  // return res.status(201).json({ shortId });
  return res.render("home", { id: shortId });
}

async function getAnalytics(req, res) {
  const shortId = req.params.shortId;
  const entry = await Url.findOne({ shortId });
  if (!entry) {
    return res.status(404).json({ error: "Short URL not found" });
  }
  return res.json({
    visitCount: entry.visitHistory.length,
    AnalyserNode: entry.visitHistory,
  });
}

module.exports = { generateShortUrl, getAnalytics };
