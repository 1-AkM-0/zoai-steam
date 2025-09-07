require("dotenv").config();
const { gamesFormatter } = require("./gamesFormatter");
const SteamServices = require("../services/steamServices");
const { sendJoke } = require("./sendJoke");
const RedisServices = require("../services/redisServices");

const jokeOrganizer = async (steamId) => {
  const cachedRespose = await RedisServices.getItem(steamId);
  console.log("cachedRespose", cachedRespose);
  if (cachedRespose) {
    return { joke: cachedRespose, fromCache: true };
  }

  const mostPlayedGames = await SteamServices.getMostPlayedGames(steamId);
  if (!mostPlayedGames) {
    throw new Error("Não foi possivel ver os jogos do usuario");
  }

  const urls = SteamServices.getUrls(mostPlayedGames);
  const gameNames = await SteamServices.getGameNames(urls);
  const gamesFormatted = gamesFormatter(gameNames, mostPlayedGames);
  const result = await sendJoke(gamesFormatted);
  const { joke, model } = result;
  await RedisServices.setItem(steamId, joke);
  return { joke, model, fromCache: false };
};

module.exports = { jokeOrganizer };
