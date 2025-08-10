const { Router } = require("express");
const JokeController = require("../controllers/jokeController.js");
const jokeRouter = Router();

jokeRouter.post("/", JokeController.postJoke);
jokeRouter.get("/", JokeController.getJokes);
// jokeRouter.delete("/:jokeId", jokeController.deleteJoke);

module.exports = jokeRouter;
