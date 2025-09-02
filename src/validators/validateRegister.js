const { body } = require("express-validator");
const UserServices = require("../services/UserServices");
const validateRegister = [
  body("username")
    .notEmpty()
    .withMessage("Digite um username")
    .trim()
    .custom(async (value) => {
      const user = await UserServices.findUserByUsername(value);
      if (user) {
        throw new Error("Username já está em uso");
      }
    })
    .escape(),
  body("password")
    .notEmpty()
    .withMessage("Digite uma senha")
    .isLength({ min: 8 })
    .withMessage("Senha deve ter no minimo 8 caracteres")
    .escape(),
];

module.exports = { validateRegister };
