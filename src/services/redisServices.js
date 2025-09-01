const client = require("../clients/redis");

class RedisServices {
  static getItem = async (key) => {
    try {
      return await client.get(key);
    } catch (error) {
      console.log("Error on redis", error);
      return null;
    }
  };

  static setItem = async (key, value, expireTime = 86400) => {
    try {
      await client.set(key, value, { EX: expireTime });
    } catch (error) {
      console.log("Error on redis", error);
    }
  };
}

module.exports = RedisServices;
