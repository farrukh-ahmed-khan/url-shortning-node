const User = require("../models/user");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({ name, email, password });
  // return res.status(201).json({message: "User created"});
  // return res.render("home", {message: "User created"});
  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render("login", {
      error: "invalid username or password",
    });
  }
  // return res.status(201).json({message: "User created"});
  return res.redirect("/");
}

module.exports = { handleUserSignup, handleUserLogin };
