import { prisma } from "../../lib/prisma.js";
// import { Users, Prisma } from "../../generated/prisma/client.js";
// import { CreateUserT } from "../types/user.js";

export async function createUserService(data: any) {
  const newUser = await prisma.users.create({
    data: data,
  });
  return newUser;
}

export async function findUserByIdentifierService(email?: string, id?: string) {
  const user = await prisma.users.findFirst({
    where: { OR: [id ? { id } : {}, email ? { email } : {}] },
  });
  return user;
}
