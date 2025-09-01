const TokenServices = require("../services/tokenServices");
const UserServices = require("../services/UserServices");
const genTokens = require("../utils/genTokens");
const bycript = require("bcryptjs");

class AuthController {
  static login = async (req, res) => {
    const { user } = req;
    console.log("to no login");
    const accessToken = genTokens.genAccessToken(user);
    const refreshToken = genTokens.genRefreshToken(user);
    try {
      await TokenServices.insertToken(user.id, refreshToken);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({ username: user.username, accessToken });
    } catch (error) {
      res.status(500).json({ Error: "Database Error" });
    }
  };

  static logout = async (req, res) => {
    const { refreshToken } = req.cookies;
    await TokenServices.deleteToken(refreshToken);
    res.clearCookie("refreshToken", {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.status(204);
  };

  static register = async (req, res) => {
    const { username, password } = req.body;
    const hashPassword = await bycript.hash(password, 10);
    try {
      UserServices.createUser(username, hashPassword);
    } catch (e) {
      res.status(403).json({ Error: "Database Error" });
    }
    res.json({ Message: "User created" });
  };

  static refresh = async (req, res) => {
    const { user } = req;
    const accessToken = genTokens.genAccessToken(user);
    res.status(201).json({ accessToken });
  };
}
module.exports = AuthController;
