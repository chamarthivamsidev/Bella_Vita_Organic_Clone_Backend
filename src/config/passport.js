require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const { v4: uuidv4 } = require("uuid");

const User = require("../models/user.model");

const jwt = require("jsonwebtoken");

const newToken = (user) => {
  return jwt.sign({ user: user }, process.env.JWT_SECRET_KEY);
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        "https://bellavitaorganic-cloned.herokuapp.com/auth/google/callback",
      userProfileURL: "https://**www**.googleapis.com/oauth2/v3/userinfo",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      let user = await User.findOne({ email: profile?._json?.email })
        .lean()
        .exec();

      if (!user) {
        user = await User.create({
          email: profile?._json?.email,
          password: uuidv4(),
          first_name: profile?._json?.name,
          last_name: profile?._json?.name,
          profilePic: profile?._json?.picture,
        });
      }

      const token = newToken(user);

      return done(null, { user, token }); // user: {user, token}
    }
  )
);

module.exports = passport;
