const gamesFormatter = (gameNames, mostPlayedGames) => {
  const formattedGames = mostPlayedGames.map((game, i) =>
    Object.assign({}, game, {
      name: gameNames[i],
      playtime: Math.trunc(game.playtime / 60) + "h",
    }),
  );
  return formattedGames;
};

module.exports = { gamesFormatter };
