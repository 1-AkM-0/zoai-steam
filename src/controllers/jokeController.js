const JokeServices = require("../services/jokeServices");
const { getSteamId } = require("../utils/getSteamId");
const { jokeOrganizer } = require("../utils/jokeOrganizer");
const { saveLog } = require("../utils/saveLog");

class JokeController {
  static postJoke = async (req, res) => {
    const { profileUrl } = req.body;
    console.log(profileUrl);
    const { user } = req;

    const steamId = getSteamId(profileUrl);

    try {
      const joke = await jokeOrganizer(steamId);
      /* const joke = "ss"; */
      await saveLog(user, joke, steamId);
      await JokeServices.saveJoke(joke, user?.id);
      return res.json({ joke });
    } catch (error) {
      console.log("to aqui", error);
      return res.status(500).json({ error: error });
    }
  };

  static getJokes = async (req, res) => {
    const { user } = req;
    try {
      const jokes = await JokeServices.getJokes(user.id);
      res.json({ jokes });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };
  static deleteJoke = async (req, res) => {
    const { jokeId } = req.params;
    res.status(204).json({ message: "joke deleted" });
  };
}
module.exports = JokeController;
