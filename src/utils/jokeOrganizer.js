require("dotenv").config();
const SteamServices = require("../services/steamServices");

const { ai } = require("../clients/ai");

const jokeOrganizer = async (steamId) => {
  const mostPlayed = await SteamServices.getMostPlayedGames(steamId);
  const urls = SteamServices.getUrls(mostPlayed);
  const gameNames = await SteamServices.getGameNames(urls);
  const payload = {
    model: "deepseek/deepseek-chat-v3-0324",
    messages: [
      {
        role: "user",
        content: `Tire graça com esse usuario da steam que tem esses 5 jogos mais jogados:
          Jogos: ${gameNames}, id dos jogos com tempo em minutos: ${mostPlayed}
          quero que voce responda com um bloco de texto só, e responda apenas com zoeria e mais nada`,
      },
    ],
  };

  const response = await ai.post("/chat/completions", payload);
  const result = response.data.choices[0].message.content;
  return result;
};

module.exports = { jokeOrganizer };
