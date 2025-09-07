const { default: axios } = require("axios");
const { steamApi } = require("../clients/steamApi");

require("dotenv").config();

class SteamServices {
  static getPlayerNickname = async (steamId) => {
    try {
      const response = await steamApi.get(
        `/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_API_KEY}&steamids=${steamId}`,
      );
      const player = response.data.response.players[0].personaname;

      return player;
    } catch (error) {
      console.log("getPlayerNickname: ", error);
      throw new Error("Erro ao pesquisar nickname");
    }
  };

  static getMostPlayedGames = async (steamId) => {
    try {
      const response = await steamApi.get(
        `/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${steamId}&format=json`,
      );

      if (Object.keys(response.data.response).length === 0) {
        return;
      }
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
          a.playtime < b.playtime ? 1 : a.playtime > b.playtime ? -1 : 0,
        )
        .slice(0, 5);

      return mostPlayed;
    } catch (error) {
      if (error.response?.status === 400) {
        console.log("getMostPlayedGames: ", error);
        throw new Error("Perfil inválido");
      }
      throw error;
    }
  };

  static getUrls = (games) => {
    const urls = [];
    games.forEach((game) => {
      urls.push(
        `https://store.steampowered.com/api/appdetails?appids=${game.appid}`,
      );
    });
    return urls;
  };

  static getGameNames = async (urls) => {
    try {
      let gameNames = [];

      const fetchUrl = (url) => axios.get(url);
      const getNames = (response) =>
        response.data[`${Object.keys(response.data).toString()}`].data.name;

      const promiseArray = urls.map(fetchUrl);
      gameNames = (await Promise.all(promiseArray)).map(getNames);
      return gameNames;
    } catch (error) {
      console.log("getGameNames:", error);
      throw new Error("Erro pesquisando nome dos jogos");
    }
  };
}

module.exports = SteamServices;
