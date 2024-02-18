const express = require("express");
const passport = require("passport");

const { getUserFromReq } = require("../controllers/authcontroller");

const googleAuthRouter = express.Router();

googleAuthRouter.get("/login/success", getUserFromReq);
  
  googleAuthRouter.get("/login/failed", (req, res) => {
    res.status(401).json({
      success: false,
      message: "failure",
    });
  });

googleAuthRouter.get('/logout', (req, res) => {
    res.send('logging out');
});

googleAuthRouter.get('/google', passport.authenticate("google",{
    scope : ["profile"]
}));

googleAuthRouter.get("/user",(req, res)=> {
    return res.status(200).json({"mssg":"hello"})
})

googleAuthRouter.get('/google/redirect',passport.authenticate("google", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "/login/failed",
}),);

module.exports = googleAuthRouter;