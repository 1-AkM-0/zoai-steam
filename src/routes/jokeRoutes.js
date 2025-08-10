const { Router } = require("express");
const JokeController = require("../controllers/jokeController.js");
const passport = require("../config/passport.js");
const jokeRouter = Router();

jokeRouter.post("/", JokeController.postJoke);
jokeRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  JokeController.getJokes
);
jokeRouter.delete(
  "/:jokeId",
  passport.authenticate("jwt", { session: false }),
  JokeController.deleteJoke
);

module.exports = jokeRouter;
