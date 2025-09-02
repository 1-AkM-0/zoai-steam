const { Router } = require("express");
const { maybeAuth } = require("../middlewares/maybeAuth.js");
const JokeController = require("../controllers/jokeController.js");
const passport = require("../config/passport.js");
const {
  validateProfile,
  checkRules,
} = require("../validators/validateProfile.js");
const Authorization = require("../middlewares/authorization.js");
const limiter = require("../middlewares/rateLimiter.js");
const jokeRouter = Router();

jokeRouter.post(
  "/",
  limiter,
  validateProfile,
  checkRules,
  maybeAuth,
  JokeController.postJoke,
);
jokeRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  JokeController.getJokes,
);
jokeRouter.delete(
  "/:jokeId",
  passport.authenticate("jwt", { session: false }),
  Authorization.authoJoke,
  JokeController.deleteJoke,
);

module.exports = jokeRouter;
