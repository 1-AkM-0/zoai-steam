const JokeServices = require("../services/jokeServices");

class Authorization {
  static authoJoke = async (req, res, next) => {
    const { user } = req;
    const { jokeId } = req.params;
    const joke = await JokeServices.getJokeById(jokeId);

    if (!joke) return res.status(404).json({ message: "Resourse not found" });

    if (joke.authorId === user.id) return next();

    return res.status(401).json({ message: "Unauthorized" });
  };
}
module.exports = Authorization;
