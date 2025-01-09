const express = require("express");
const Url = require("../models/url");
const router = express.Router();

router.get("/", async(req, res) => {
    const allurls = await Url.find({});
    res.render("home", { urls: allurls });

});

router.get("/signup", async(req, res)=>{
    res.render("signup")
})
router.get("/login", async(req, res)=>{
    res.render("login")
})
module.exports = router;