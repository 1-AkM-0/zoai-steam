const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bycript = require("bcryptjs");
const UserServices = require("../services/UserServices");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await UserServices.findUserByUsername(username);
      console.log(user);

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
  })
);

module.exports = passport;
