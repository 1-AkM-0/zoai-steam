const SteamServices = require("../services/steamServices");
const { jokeOrganizer } = require("../utils/jokeOrganizer");

const postJoke = async (req, res) => {
  const { steamId } = req.body;
  const player = await SteamServices.getPlayerNickname(steamId);
  console.log(player);
  if (!steamId) {
    return res.status(400).json({ message: "No steam id" });
  }
  try {
    const joke = await jokeOrganizer(steamId);
    res.json({ joke });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { postJoke };
