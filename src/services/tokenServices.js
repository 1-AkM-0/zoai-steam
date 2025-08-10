const prisma = require("../config/prisma");

class TokenServices {
  static insertToken = async (userId, token) => {
    await prisma.token.create({ data: { token, authorId: userId } });
  };
}

module.exports = TokenServices;
