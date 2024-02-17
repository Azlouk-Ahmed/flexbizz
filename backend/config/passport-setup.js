const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../models/userModel")
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});
passport.use(new GoogleStrategy({
    clientID: "650924336414-b5sdpdsld8fs3ankebve51q4eqo6gmrj.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:5000/auth/google/redirect"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    User.findOne({googleId: profile.id}).then((currentUser) => {
        if(currentUser){
            // already have this user
            console.log('user is: ', currentUser);
            done(null, currentUser);
        } else {
            // if not, create user in our db
            new User({
                googleId: profile.id,
                name: profile._json.given_name,
                familyName: profile._json.family_name,
                email:profile._json.email,
                img:profile._json.picture
            }).save().then((newUser) => {
                console.log('created new user: ', newUser);
                done(null, newUser);
            });
        }
    });
  }
));