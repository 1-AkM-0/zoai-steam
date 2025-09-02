const { body } = require("express-validator");
const validateLogin = [
  body("username").notEmpty().withMessage("Digite um username").trim().escape(),
  body("password").notEmpty().withMessage("Digite uma senha").escape(),
];

module.exports = { validateLogin };
