jest.mock("../../config/prisma.js", () => ({
  user: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  },
}));

const prisma = require("../../config/prisma.js");
const UserServices = require("../../services/UserServices.js");

describe("UserServices", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("createUser should create an user", async () => {
    prisma.user.create.mockResolvedValue({
      username: "pedro",
      password: "1234",
    });

    await UserServices.createUser("pedro", "1234");

    expect(prisma.user.create).toHaveBeenCalledWith({
      data: { username: "pedro", password: "1234" },
    });
  });

  it("findUserByUsername should return an user", async () => {
    prisma.user.findUnique.mockResolvedValue({ username: "pedro" });

    const user = await UserServices.findUserByUsername("pedro");

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { username: "pedro" },
    });
    expect(user).toEqual({ username: "pedro" });
  });

  it("findUserById should return an user", async () => {
    prisma.user.findUnique.mockResolvedValue({ id: 1, username: "pedro" });

    const user = await UserServices.findUserById(1);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });

    expect(user).toEqual({ id: 1, username: "pedro" });
  });

  it("getUser should return an user", async () => {
    prisma.user.findFirst.mockResolvedValue({ id: 1, username: "pedro" });

    const user = await UserServices.getUser(1);

    expect(prisma.user.findFirst).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(user).toEqual({ id: 1, username: "pedro" });
  });

  it("updateUser should update an user", async () => {
    prisma.user.update.mockResolvedValue({ id: 1, username: "pedro2" });

    await UserServices.updateUser(1, "pedro2");

    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { username: "pedro2" },
    });
  });
  it("deleteUser should delete an user", async () => {
    prisma.user.delete.mockResolvedValue(undefined);

    await UserServices.deleteUser(1);

    expect(prisma.user.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
