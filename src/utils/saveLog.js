const Log = require("../models/log");
const { default: mongoose, connect } = require("../clients/mongo");
const saveLog = async (user, result, steamId, model) => {
  console.log(result);
  const log = new Log({
    steamId: steamId,
    joke: result,
    model: model,
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
    console.log("error saving log:", e);
  }
  console.log("log salvo");
};
module.exports = { saveLog };
