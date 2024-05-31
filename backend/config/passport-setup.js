const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/userModel");
const Activity = require("../models/AcitivityModel");

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then((user) => {
            done(null, user);
        })
        .catch((err) => done(err));
});

passport.use(
    new GoogleStrategy(
        {
            clientID: "650924336414-b5sdpdsld8fs3ankebve51q4eqo6gmrj.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "http://localhost:5000/auth/google/redirect",
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({ googleId: profile.id })
                .then(async (currentUser) => {
                    if (currentUser) {
                        console.log("User is: ", currentUser);
                        // Log login activity
                        const loginActivity = new Activity({
                            userId: currentUser._id,
                            action: "LOGIN",
                        });
                        await loginActivity.save();
                        done(null, currentUser);
                    } else {
                        new User({
                            googleId: profile.id,
                            name: profile._json.given_name,
                            familyName: profile._json.family_name,
                            email: profile._json.email,
                            img: profile._json.picture,
                        })
                            .save()
                            .then(async (newUser) => {
                                console.log("Created new user: ", newUser);
                                // Log account creation activity
                                const createdAccountActivity = new Activity({
                                    userId: newUser._id,
                                    action: "CREATED_ACCOUNT",
                                });
                                await createdAccountActivity.save();
                                done(null, newUser);
                            })
                            .catch((err) => done(err));
                    }
                })
                .catch((err) => done(err));
        }
    )
);

module.exports = passport;
