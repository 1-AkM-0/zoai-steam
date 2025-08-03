const { default: axios } = require("axios");
const { steamApi } = require("../../clients/steamApi");
const SteamServices = require("../../services/steamServices");

const id = 1;
const urls_test = [
  "https://store.steampowered.com/api/appdetails?appids=730",
  "https://store.steampowered.com/api/appdetails?appids=105600",
  "https://store.steampowered.com/api/appdetails?appids=72850",
];

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

test("Mock mostPlayedGames", async () => {
  jest.spyOn(steamApi, "get").mockResolvedValueOnce(resultOfMostPlayedGames);

  const result = await SteamServices.getMostPlayedGames(id);

  expect(result).toEqual([
    { appid: 730, playtime: 137663 },
    { appid: 105600, playtime: 9677 },
    { appid: 72850, playtime: 6821 },
    { appid: 714010, playtime: 3609 },
    { appid: 22380, playtime: 1453 },
  ]);
});

test("Mock getPlayerNickname", async () => {
  jest.spyOn(steamApi, "get").mockResolvedValueOnce({
    data: { response: { players: [{ personaname: "Akmdd" }] } },
  });

  const nickname = await SteamServices.getPlayerNickname(id);

  expect(nickname).toBe("Akmdd");
});

test("Get urls", () => {
  const urls = SteamServices.getUrls([
    { appid: 730, playtime: 137663 },
    { appid: 105600, playtime: 9677 },
    { appid: 72850, playtime: 6821 },
  ]);

  expect(urls).toEqual([
    "https://store.steampowered.com/api/appdetails?appids=730",
    "https://store.steampowered.com/api/appdetails?appids=105600",
    "https://store.steampowered.com/api/appdetails?appids=72850",
  ]);
});

test("Mock getGameNames", async () => {
  jest.spyOn(axios, "get").mockImplementation((url) => {
    if (url.includes("730")) {
      return Promise.resolve({
        data: { 730: { data: { name: "Counter-Strike 2" } } },
      });
    } else if (url.includes("105600"))
      return Promise.resolve({
        data: { 105600: { data: { name: "Terraria" } } },
      });
    else if (url.includes("72850")) {
      return Promise.resolve({
        data: { 72850: { data: { name: "The Elder Scrolls V: Skyrim" } } },
      });
    }
  });

  const result = await SteamServices.getGameNames(urls_test);

  expect(result).toEqual([
    "Counter-Strike 2",
    "Terraria",
    "The Elder Scrolls V: Skyrim",
  ]);
});
