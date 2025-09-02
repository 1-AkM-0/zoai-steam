const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { ExtractJwt, Strategy: JwtStrategy } = require("passport-jwt");
const bycript = require("bcryptjs");
const UserServices = require("../services/UserServices");
require("dotenv").config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_SECRET,
};

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await UserServices.findUserByUsername(username);

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = bycript.compare(password, user.password);

      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }),
);

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await UserServices.findUserById(jwt_payload.id);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      return done(error, null);
    }
  }),
);

module.exports = passport;
