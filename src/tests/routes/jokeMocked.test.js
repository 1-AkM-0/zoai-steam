const joke = require("../../routes/jokeRoutes");

const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.json());
app.use("/joke", joke);

jest.mock("../../utils/jokeOrganizer", () => ({
  jokeOrganizer: jest.fn().mockResolvedValue("Resposta da IA"),
}));

jest.mock("../../services/steamServices", () => ({
  getMostPlayedGames: jest.fn().mockResolvedValue([
    { appid: 730, playtime: 137663 },
    { appid: 105600, playtime: 9677 },
    { appid: 72850, playtime: 6821 },
  ]),
  getGameNames: jest
    .fn()
    .mockResolvedValue([
      "Counter-Strike 2",
      "Terraria",
      "The Elder Scrolls V: Skyrim",
    ]),
}));

describe("POST /joke but all mocked", function () {
  it("joke route works mocked", async () => {
    const response = await request(app)
      .post("/joke")
      .send({ steamId: "76561197960435530" });

    expect(response.body.joke).toEqual("Resposta da IA");
    expect(response.status).toEqual(200);
  });
});
