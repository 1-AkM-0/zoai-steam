const joke = require("../../routes/jokeRoutes");

const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.json());
app.use("/joke", joke);

jest.mock("../../utils/jokeOrganizer", () => ({
  jokeOrganizer: jest.fn().mockResolvedValue({
    joke: "Resposta da IA",
    model: "none",
    fromCache: true,
  }),
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

jest.mock("../../services/jokeServices.js", () => ({
  getJokes: jest.fn().mockResolvedValue([{ content: "Resposta da IA" }]),
}));

jest.mock("../../utils/saveLog.js", () => ({
  saveLog: jest.fn().mockResolvedValue({}),
}));

describe("POST /joke but all mocked", function () {
  it("joke route works mocked", async () => {
    const response = await request(app).post("/joke").send({
      profileUrl: "https://steamcommunity.com/profiles/76561197960435530",
    });

    expect(response.body.joke).toEqual("Resposta da IA");
    expect(response.status).toEqual(200);
  });
});

/* describe("GET /joke mocked", function () {
  it("get joke mocked", async () => {
    const token = "my-fake-token";
    const response = await request(app)
      .get("/joke")
      .set("Authorization", `Bearer ${token}`);
    console.log(response.body);
    expect(response.body.jokes[0].content).toEqual("Resposta da IA");
  });
}); */
