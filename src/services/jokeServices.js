const prisma = require("../config/prisma");

class JokeServices {
  static saveJoke = async (joke, authorId) => {
    await prisma.joke.create({
      data: { content: joke, authorId: authorId },
    });
  };

  static getJokes = async (authorId) => {
    const jokes = await prisma.joke.findMany({ where: { authorId } });
    return jokes;
  };
  static deleteJoke = async (jokeId) => {
    await prisma.joke.delete({ where: { id: jokeId } });
  };
  static getJokeById = async (jokeId) => {
    const joke = await prisma.joke.findUnique({ where: { id: jokeId } });
    return joke;
  };
}

module.exports = JokeServices;
