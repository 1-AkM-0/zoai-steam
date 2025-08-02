const { default: axios } = require("axios");
const { steamApi } = require("../../clients/steamApi");
const SteamServices = require("../../services/steamServices");

const id = 1;

const resultOfMostPlayedGames = {
  data: {
    response: {
      games: [
        { appid: 730, playtime_forever: 137663 },
        { appid: 105600, playtime_forever: 9677 },
        { appid: 72850, playtime_forever: 6821 },
        { appid: 714010, playtime_forever: 3609 },
        { appid: 22380, playtime_forever: 1453 },
        { appid: 2230, playtime_forever: 1452 },
      ],
    },
  },
};

const resultOfGetPlayerNickname = {
  data: { response: { players: [{ personaname: "Akmdd" }] } },
};

test("mock mostPlayedGames", async () => {
  jest.spyOn(steamApi, "get").mockReturnValueOnce(resultOfMostPlayedGames);

  const result = await SteamServices.getMostPlayedGames(id);
  console.log(result);
  expect(result).toEqual([
    { appid: 730, playtime: 137663 },
    { appid: 105600, playtime: 9677 },
    { appid: 72850, playtime: 6821 },
    { appid: 714010, playtime: 3609 },
    { appid: 22380, playtime: 1453 },
  ]);
});

test("mock getPlayerNickname", async () => {
  jest.spyOn(steamApi, "get").mockReturnValueOnce(resultOfGetPlayerNickname);

  const nickname = await SteamServices.getPlayerNickname(id);

  console.log(nickname);
  expect(nickname).toBe("Akmdd");
});
