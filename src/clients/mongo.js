require("dotenv").config();
const mongoose = require("mongoose");
const url = process.env.MONGO_DB;

const connect = async () => {
  mongoose.set("strictQuery", false);
  try {
    await mongoose.connect(url);
  } catch (e) {
    console.log("error connecting mongo");
  }
};
module.exports = { connect, mongoose };
