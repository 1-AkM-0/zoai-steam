const TokenServices = require("../services/tokenServices");
const UserServices = require("../services/UserServices");
const genTokens = require("../utils/genTokens");
const bycript = require("bcryptjs");

class AuthController {
  static login = async (req, res) => {
    const { user } = req;
    const accessToken = genTokens.genAccessToken(user);
    const refreshToken = genTokens.genRefreshToken(user);
    try {
      await TokenServices.insertToken(user.id, refreshToken);
      res.json({ user: user.username, accessToken, refreshToken });
    } catch (error) {
      console.log("Login error:", error);
      res.status(500).json({ error: "Erro no banco de dados" });
    }
  };

  static logout = async (req, res) => {
    const { refreshToken } = req.body;
    await TokenServices.deleteToken(refreshToken);
    res.status(204);
  };

  static register = async (req, res) => {
    const { username, password } = req.body;
    const hashPassword = await bycript.hash(password, 10);
    try {
      UserServices.createUser(username, hashPassword);
    } catch (e) {
      console.log("Error register: ", e);
      res.status(403).json({ error: "Erro na criacao do usuario" });
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
