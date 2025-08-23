const passport = require("../config/passport.js")

const maybeAuth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err || !user) {
      console.log("aiai")
      return next()
    }
    req.user = user
    next()
  })(req, res, next)
}



module.exports = { maybeAuth }
