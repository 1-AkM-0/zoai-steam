const joke = require("../../routes/jokeRoutes");

const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.json());
app.use("/joke", joke);

jest.mock("../../utils/jokeOrganizer", () => ({
  jokeOrganizer: jest.fn().mockResolvedValue("Resposta da IA"),
}));

describe("POST /joke", function () {
  it("joke route works", async () => {
    const response = await request(app)
      .post("/joke")
      .send({ steamId: "76561197960435530" });

    expect(response.body.joke).toEqual("Resposta da IA");
    expect(response.status).toEqual(200);
  });
});
