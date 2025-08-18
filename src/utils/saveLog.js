const Log = require("../models/log");
const { default: mongoose } = require("../clients/mongo");

const saveLog = async (result, steamId) => {
  const log = new Log({
    steamId: steamId,
    joke: result,
  });

  await log.save();
  console.log("log salvo");
  mongoose.connection.close();
};

module.exports = { saveLog };
