const JokeServices = require("../services/jokeServices");
const { jokeOrganizer } = require("../utils/jokeOrganizer");

class JokeController {
  static postJoke = async (req, res) => {
    const { steamId } = req.body;
    if (!steamId) {
      return res.status(400).json({ message: "No steam id" });
    }
    try {
      const joke = await jokeOrganizer(steamId);
      await res.json({ joke });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  static getJokes = async (req, res) => {
    const { user } = req;
    const jokes = await JokeServices.getJokes(user.id);
    res.json({ jokes });
  };
}

module.exports = JokeController;
