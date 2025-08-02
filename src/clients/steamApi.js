const { default: axios } = require("axios");

const steamApi = axios.create({
  baseURL: "http://api.steampowered.com",
});

module.exports = { steamApi };
