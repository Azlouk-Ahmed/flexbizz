const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const generateToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: "365d" })
}


const googleAuthRouter = express.Router();
const CLIENT_URL = "http://localhost:3000/login";

googleAuthRouter.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      auth: {user : req.user,token : generateToken(req.user._id)},
    });
  }
});

googleAuthRouter.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

googleAuthRouter.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});


googleAuthRouter.get("/google", passport.authenticate("google", { 
  scope: ["profile", "email"],
  prompt: "select_account"
}));




googleAuthRouter.get(
  "/google/redirect",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = googleAuthRouter;