require("dotenv").config();
const { gamesFormatter } = require("./gamesFormatter");
const SteamServices = require("../services/steamServices");
const { sendJoke } = require("./sendJoke");
const RedisServices = require("../services/redisServices");

const jokeOrganizer = async (steamId) => {
  const cachedRespose = await RedisServices.getItem(steamId);

  if (cachedRespose) {
    return { joke: cachedRespose, fromCache: true };
  }

  const mostPlayedGames = await SteamServices.getMostPlayedGames(steamId);
  if (!mostPlayedGames) throw new Error("Games are on private mode");
  const urls = SteamServices.getUrls(mostPlayedGames);
  const gameNames = await SteamServices.getGameNames(urls);
  const gamesFormatted = gamesFormatter(gameNames, mostPlayedGames);

  const result = sendJoke(gamesFormatted);
  return { result, fromCache: false };
};

module.exports = { jokeOrganizer };
