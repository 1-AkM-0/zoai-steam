const { ai } = require("../clients/ai");

const sendJoke = async (gamesFormatted) => {
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

  try {
    const response = await ai.post("/chat/completions", payload);
    const model = response.data.model;
    const joke = response.data.choices[0].message.content;
    return { joke, model };
  } catch (e) {
    console.log("Erro ao chamar IA:", e);
    throw new Error("Falha ao gerar resposta por IA");
  }
  // const result = `🤣`;
};

module.exports = { sendJoke };
