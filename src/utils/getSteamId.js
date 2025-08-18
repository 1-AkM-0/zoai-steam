const getSteamId = (profileUrl) => {
  const substring = "profiles";
  const index = profileUrl.indexOf(substring);

  if (index !== -1) {
    const steamId = profileUrl.slice(index + 9, profileUrl.length - 1);
    console.log(steamId);
    return steamId;
  }
};

module.exports = { getSteamId };
