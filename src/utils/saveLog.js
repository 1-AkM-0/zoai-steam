const Log = require("../models/log");
const { default: mongoose } = require("../clients/mongo");

const saveLog = async (user, result, steamId) => {
  console.log(user)
  const log = new Log({
    steamId: steamId,
    joke: result,
  });
  if (user) {
    log.user = user.id;
  }

  console.log(log)

  await log.save();
  console.log("log salvo");
  mongoose.connection.close();
};

module.exports = { saveLog };
