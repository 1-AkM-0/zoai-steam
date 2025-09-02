const JokeServices = require("../services/jokeServices");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class Authorization {
  static authoJoke = async (req, res, next) => {
    const { user } = req;
    const { jokeId } = req.params;
    const joke = await JokeServices.getJokeById(jokeId);

    if (!joke) return res.status(404).json({ message: "Resourse not found" });

    if (joke.authorId === user.id) return next();

    return res.status(401).json({ message: "Unauthorized" });
  };
  static authoRefresh = async (req, res, next) => {
    const { refreshToken } = req.body;
    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, usr) => {
      if (err)
        return res.status(403).json({ message: "Error on verification" });
      req.user = usr;
      next();
    });
  };
}
module.exports = Authorization;
