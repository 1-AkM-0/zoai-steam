const Log = require("../models/log");
const { connect } = require("../clients/mongo");
const saveLog = async (user, result, steamId, model) => {
  const log = new Log({
    steamId: steamId,
    joke: result,
    model: model,
    createdAt: new Date(),
  });
  if (user) {
    log.user = user.id;
  }

  try {
    await connect();
    await log.save();
  } catch (e) {
    console.log("error saving log:", e);
  }
  console.log("log salvo");
};
module.exports = { saveLog };
