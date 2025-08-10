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
      // const joke = `"Olha só esse rapazinho aí, o cara tem 2000 horas de CS e ainda tá no prata II, deve ser a lenda do rush B sem cérebro! Terraria? Claramente um refugiado do Minecraft que não aguentou o tranco dos creepers. Skyrim com 500 horas e o cabra ainda tá fazendo side quest porque tem medo de encarar o Alduin, virou entregador de quest de fazendinha? Aim Labs é o maior cafajeste, treina 300 horas pra morrer pra um mlq de 12 anos no headshot aleatório. E Fallout New Vegas? Tá esperando a DLC da mãe dele trazer o jantar no quarto enquanto o joguinho roda. Esse aí é o combo definitivo do 'quero ser bom mas só tenho skill de farmar minério e chorar no deathmatch'!" 🤣`;

      res.json({ joke });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  static getJokes = async (req, res) => {
    const { user } = req;
    try {
      const jokes = await JokeServices.getJokes(user.id);
      res.json({ jokes });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };
  static deleteJoke = async (req, res) => {
    const { jokeId } = req.params;
    res.status(204).json({ message: "joke deleted" });
  };
}

module.exports = JokeController;
