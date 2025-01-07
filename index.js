const express = require("express");
const { connectToMongoDB } = require("./connection");
const urlRoute = require("./routes/url");
const Url = require("./models/url");

const app = express();
const port = 8001;

connectToMongoDB("mongodb://localhost:27017/url-shortener");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await Url.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );

    if (!entry) {
        return res.status(404).json({ error: "Short URL not found" });
    }
    res.redirect(entry.redirectUrl);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
