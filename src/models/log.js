const { mongoose } = require("../clients/mongo");

const logSchema = new mongoose.Schema({
  user: String,
  steamId: String,
  joke: String,
  createdAt: Date,
});

const Log = mongoose.model("Log", logSchema);

module.exports = Log;
