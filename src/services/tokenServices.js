const prisma = require("../config/prisma");

class TokenServices {
  static insertToken = async (userId, token) => {
    await prisma.token.create({ data: { token, authorId: userId } });
  };
  static deleteToken = async (token) => {
    console.log(token);
    await prisma.token.delete({ where: { token } });
  };
}

module.exports = TokenServices;
