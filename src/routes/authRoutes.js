const { Router } = require("express");
const authController = require("../controllers/authController.js");
const authRouter = Router();

authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);
authRouter.post("/logout", authController.logout);
authRouter.post("/refresh", authController.refresh);

module.exports = authRouter;
