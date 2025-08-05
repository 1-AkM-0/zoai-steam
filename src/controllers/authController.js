const UserServices = require("../services/UserServices");
const genTokens = require("../utils/genTokens");

class AuthController {
  static login = async (req, res) => {
    const { user } = req;

    const accesstoken = genTokens.genAccessToken(user);
    const refreshToken = genTokens.genRefreshToken(user);
    try {
      await TokenServices.insertToken(refreshToken);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        path: "/api",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({ username: user.username, accesstoken });
    } catch (error) {
      res.status(500).json({ Error: "Database Error" });
    }
  };

  static logout = async (req, res) => {};

  static register = async (req, res) => {};

  static refresh = async (req, res) => {};
}

module.exports = AuthController;
