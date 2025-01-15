const dotenv = require('dotenv')
require('dotenv').config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const { connectToMongoDB } = require("./connection");
const { checkForAuthentication, restrictTo } = require("./middlewares/auth");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const Url = require("./models/url");
const { logReqRes } = require("./middlewares");

const app = express();
const port = process.env.PORT || 8001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);
app.use(logReqRes("log.txt"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },  
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

app.post("/upload", upload.single("profileImage"), (req, res) => {
  console.log(req.body);
  console.log(req.file);

  return res.redirect("/");
});

app.use("/url", restrictTo(["NORMAL"]), urlRoute);
app.use("/", staticRoute);
app.use("/api/user", userRoute);

app.set("view engine", "ejs");
app.set("veiws", path.resolve("./views"));

connectToMongoDB(process.env.MONGO_URL);

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
