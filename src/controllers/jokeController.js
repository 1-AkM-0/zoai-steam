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
      const jokeObj = await jokeOrganizer(steamId);
      const { joke, model, fromCache } = jokeObj;
      await saveLog(user, joke, steamId, model);

      if (!fromCache) await JokeServices.saveJoke(joke, user?.id);

      return res.json({ joke: joke });
    } catch (error) {
      console.log("postJoke:", error);

      return res.status(500).json({ error: error.message });
    }
  };

  static getJokes = async (req, res) => {
    const { user } = req;
    try {
      const jokes = await JokeServices.getJokes(user.id);
      res.json({ jokes });
    } catch (error) {
      console.log("getJokes error:", error);
      res.status(500).json({ error: "Erro ao acessar histórico do usuario" });
    }
  };
  static deleteJoke = async (req, res) => {
    const { jokeId } = req.params;
    try {
      await JokeServices.deleteJoke(jokeId);
    } catch (e) {
      console.log("deleteJoke error: ", e);
      return res.status(500).json({ error: "Erro ao deletar joke" });
    }
    res.status(204).json({ message: "joke deleted" });
  };
}
module.exports = JokeController;
