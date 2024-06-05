const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/userModel");
const Activity = require("../models/AcitivityModel");
const passport = require("passport");

// Serialize the user ID to save in the session
// passport.serializeUser((user, done) => {
//     done(null, user._id);
// });

// // Deserialize the user by ID from the session
// passport.deserializeUser((id, done) => {
//     User.findById(id)
//         .then((user) => {
//             done(null, user);
//         })
//         .catch((err) => {
//             console.error("Error deserializing user:", err);
//             done(err);
//         });
// });

// Configure Google OAuth strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: "650924336414-b5sdpdsld8fs3ankebve51q4eqo6gmrj.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "http://localhost:5000/auth/google/redirect",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const currentUser = await User.findOne({ googleId: profile.id });
                if (currentUser) {
                    console.log("User is: ", currentUser);
  
                    const loginActivity = new Activity({
                        userId: currentUser._id,
                        action: "LOGIN",
                    });
                    await loginActivity.save();
                    done(null, currentUser);
                } else {
                    const newUser = await new User({
                        googleId: profile.id,
                        name: profile._json.given_name,
                        familyName: profile._json.family_name,
                        email: profile._json.email,
                        img: profile._json.picture,
                    }).save();

                    console.log("Created new user: ", newUser);
                    const createdAccountActivity = new Activity({
                        userId: newUser._id,
                        action: "CREATED_ACCOUNT",
                    });
                    await createdAccountActivity.save();
                    done(null, newUser);
                }
            } catch (err) {
                console.error("Error in Google Strategy:", err);
                done(err);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

module.exports = passport;
