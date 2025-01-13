const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  // const userUid = req.cookies?.uid;
  const userUid = req.headers["Authorization"] //for api bearer token
  //   console.log("userid",userUid);
  if (!userUid) return res.redirect("/login");
  const token = userUid.split('Bearer')[1]
  const user = getUser(token);
  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const userUid = req.headers["authorization"] //for api bearer token
  const token = userUid.split('Bearer ')[1]

  // const userUid = req.cookies?.uid;
  const user = getUser(token);
  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
};
