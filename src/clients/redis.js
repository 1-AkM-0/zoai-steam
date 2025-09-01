const { createClient } = require("redis");
require("dotenv").config();
const client = createClient({
  url: process.env.REDIS_URL,
});

client.on("error", function (err) {
  throw err;
});

const connect = async () => {
  try {
    await client.connect();
    console.log("Redis connected");
  } catch (e) {
    console.log("Error on connection with redis", e);
  }
};
connect();

module.exports = client;
