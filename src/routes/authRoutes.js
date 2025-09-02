const { Router } = require("express");
const authController = require("../controllers/authController.js");
const passport = require("../config/passport.js");
const authRouter = Router();
const Authorization = require("../middlewares/authorization.js");
const { validateRegister } = require("../validators/validateRegister.js");
const { checkRules } = require("../validators/validateProfile.js");
const { validateLogin } = require("../validators/validateLogin.js");
authRouter.post(
  "/login",
  validateLogin,
  checkRules,
  passport.authenticate("local", { session: false }),
  authController.login,
);
authRouter.post(
  "/register",
  validateRegister,
  checkRules,
  authController.register,
);
authRouter.post(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  authController.logout,
);
authRouter.post("/refresh", Authorization.authoRefresh, authController.refresh);

module.exports = authRouter;
