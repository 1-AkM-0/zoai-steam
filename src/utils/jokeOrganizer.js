require("dotenv").config();
const { gamesFormatter } = require("./gamesFormatter");
const SteamServices = require("../services/steamServices");

const { ai } = require("../clients/ai");

const jokeOrganizer = async (steamId) => {
  const mostPlayed = await SteamServices.getMostPlayedGames(steamId);
  if (!mostPlayed) throw new Error("Games are on private mode");
  const urls = SteamServices.getUrls(mostPlayed);
  const gameNames = await SteamServices.getGameNames(urls);
  const gamesFormatted = gamesFormatter(gameNames, mostPlayed);
  const payload = {
    models: [
      "deepseek/deepseek-chat-v3-0324:free",
      "google/gemini-2.0-flash-exp:free",
      "deepseek/deepseek-r1:free",
    ],
    messages: [
      {
        role: "user",
        content: `tire graça com esse usuario da steam que tem esses 5 jogos mais jogados:
          id dos jogos, tempo em horas e nomes: ${JSON.stringify(gamesFormatted)}
          quero que voce responda com um bloco de texto só, e responda apenas com zoeria e mais nada`,
      },
    ],
  };

  const response = await ai.post("/chat/completions", payload);
  const model = response.data.model;
  const result = response.data.choices[0].message.content;
  // const result = `🤣`;

  return { joke: result, model };
};

module.exports = { jokeOrganizer };
