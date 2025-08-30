const { Router } = require("express");
const authController = require("../controllers/authController.js");
const passport = require("../config/passport.js");
const authRouter = Router();
const Authorization = require("../middlewares/authorization.js");
authRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  authController.login,
);
authRouter.post("/register", authController.register);
authRouter.post(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  authController.logout,
);
authRouter.post("/refresh", Authorization.authoRefresh, authController.refresh);

module.exports = authRouter;
