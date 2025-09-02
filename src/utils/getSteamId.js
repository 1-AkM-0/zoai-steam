const getSteamId = (profileUrl) => {
  const regex = /^https:\/\/steamcommunity\.com\/profiles\/([0-9]+)$/;
  const match = regex.exec(profileUrl);

  if (match) {
    return match[1];
  }
  return null;
};

module.exports = { getSteamId };
