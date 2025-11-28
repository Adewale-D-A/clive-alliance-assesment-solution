import { prisma } from "../../lib/prisma.js";
import { CreateUserT } from "../types/user.js";

export async function signUpService(data: CreateUserT) {
  const newUser = await prisma.users.create({
    data: data,
  });
  return newUser;
}

export async function findUserByEmailService(email: string) {
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });
  return user;
}
