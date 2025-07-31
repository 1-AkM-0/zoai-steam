const { default: axios } = require("axios");
const SteamServices = require("../services/steamServices");

const postJoke = async (req, res) => {
  const { steamId } = req.body;
  const player = await SteamServices.getPlayerNickname(steamId);
  const mostPlayed = await SteamServices.getMostPlayedGames(steamId);
  const urls = SteamServices.getUrls(mostPlayed);
  const gameNames = await SteamServices.getGameNames(urls);
  res.json({ mostPlayed, gameNames, player });
};

module.exports = { postJoke };
