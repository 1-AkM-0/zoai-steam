const { body, validationResult } = require("express-validator");
const { getSteamId } = require("../utils/getSteamId");
const validateProfile = [
  body("profileUrl")
    .notEmpty()
    .withMessage("No profile sent")
    .trim()
    .custom((value) => {
      const steamId = getSteamId(value);
      if (!steamId) return false;
      return true;
    }),
];

const checkRules = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validateProfile, checkRules };
