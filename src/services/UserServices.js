const prisma = require("../config/prisma");

class UserServices {
  static findUserByUsername = async (username) => {
    const user = await prisma.user.findUnique({ where: { username } });
    return user;
  };

  static findUserById = async (id) => {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  };

  static getUser = async (id) => {
    const user = await prisma.user.findFirst({ where: { id } });
    return user;
  };

  static createUser = async (username, password) => {
    await prisma.user.create({
      data: {
        username,
        password,
      },
    });
  };
  static deleteUser = async (id) => {
    await prisma.user.delete({ where: { id } });
  };
  static updateUser = async (id, username, password) => {
    await prisma.user.update({
      where: { id },
      data: {
        username,
        password,
      },
    });
  };
}

module.exports = UserServices;
