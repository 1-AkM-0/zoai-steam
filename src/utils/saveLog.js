const Log = require("../models/log");
const { default: mongoose, connect } = require("../clients/mongo");
const saveLog = async (user, result, steamId) => {
  console.log(user);
  const log = new Log({
    steamId: steamId,
    joke: result,
    createdAt: new Date(),
  });
  if (user) {
    log.user = user.id;
  }

  console.log(log);

  try {
    await connect();
    await log.save();
  } catch (e) {
    console.log("error saving log");
  }
  console.log("log salvo");
};
module.exports = { saveLog };
