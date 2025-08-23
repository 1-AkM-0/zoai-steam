const getSteamId = (profileUrl) => {
  const regex = /^https:\/\/steamcommunity\.com\/profiles\/([0-9]+)$/;
  const match = regex.exec(profileUrl);

  if (match) {
    console.log(match[1]);
    return match[1];
  }
};

module.exports = { getSteamId };
