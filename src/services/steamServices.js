const { default: axios } = require("axios");
const { steamApi } = require("../clients/steamApi");

require("dotenv").config();

class SteamServices {
  static getPlayerNickname = async (steamId) => {
    const response = await steamApi.get(
      `/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_API_KEY}&steamids=${steamId}`
    );
    const player = response.data.response.players[0].personaname;

    return player;
  };

  static getMostPlayedGames = async (steamId) => {
    const response = await steamApi.get(
      `/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${steamId}&format=json`
    );
    const games = [];
    response.data.response.games.forEach((element) => {
      games.push({
        appid: element.appid,
        playtime: element.playtime_forever,
      });
    });
    let mostPlayed = [];

    mostPlayed = [...games]
      .sort((a, b) =>
        a.playtime < b.playtime ? 1 : a.playtime > b.playtime ? -1 : 0
      )
      .slice(0, 5);

    return mostPlayed;
  };

  static getUrls = (games) => {
    const urls = [];
    games.forEach((game) => {
      urls.push(
        `https://store.steampowered.com/api/appdetails?appids=${game.appid}`
      );
    });
    return urls;
  };

  static getGameNames = async (urls) => {
    let gameNames = [];

    const fetchUrl = (url) => axios.get(url);
    const getNames = (response) =>
      response.data[`${Object.keys(response.data).toString()}`].data.name;

    const promiseArray = urls.map(fetchUrl);

    gameNames = (await Promise.all(promiseArray)).map(getNames);
    return gameNames;
  };
}

module.exports = SteamServices;
