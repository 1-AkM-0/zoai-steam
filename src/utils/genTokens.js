const jwt = require("jsonwebtoken");
require("dotenv").config();

class genTokens {
  static genAccessToken = (user) => {
    return jwt.sign(
      {
        id: user.id,
      },
      process.env.ACCESS_SECRET,
      { expiresIn: "15s" },
    );
  };
  static genRefreshToken = (user) => {
    return jwt.sign(
      {
        id: user.id,
      },
      process.env.REFRESH_SECRET,
    );
  };
}

module.exports = genTokens;
