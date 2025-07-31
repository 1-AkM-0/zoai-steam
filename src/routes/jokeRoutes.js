const { Router } = require("express");
const jokeController = require("../controllers/jokeController.js");
const jokeRouter = Router();

jokeRouter.post("/", jokeController.postJoke);

module.exports = jokeRouter;
