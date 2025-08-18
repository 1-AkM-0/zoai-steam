require("dotenv").config();
const mongoose = require("mongoose");
const url = process.env.MONGO_DB;
mongoose.set("strictQuery", false);
mongoose.connect(url);

module.exports = mongoose;
