const prisma = require("../config/prisma");

class JokeServices {
  static saveJoke = async (joke, authorId) => {
    await prisma.joke.create({
      data: { content: joke },
      where: {
        authorId,
      },
    });
  };

  static getJokes = async (authorId) => {
    const jokes = await prisma.joke.findMany({ where: { authorId } });
    return jokes;
  };
}

module.exports = JokeServices;
