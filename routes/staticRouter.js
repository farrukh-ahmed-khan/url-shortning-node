const express = require("express");
const Url = require("../models/url");
const { restrictTo } = require("../middlewares/auth");
const router = express.Router();

router.get("/", restrictTo(["NORMAL"]), async (req, res) => {
  const allurls = await Url.find({ createdBy: req.user._id });
  res.render("home", { urls: allurls });
});

router.get("/signup", async (req, res) => {
  res.render("signup");
});
router.get("/login", async (req, res) => {
  res.render("login");
});
module.exports = router;
