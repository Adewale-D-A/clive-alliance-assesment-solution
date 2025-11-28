import { prisma } from "../../lib/prisma.js";
import { CreateUserT, UpdateUserT } from "../types/user.js";

export async function retrieveUserService(id: string) {
  const newUser = await prisma.users.findUnique({
    where: {
      id,
    },
  });
  return newUser;
}

export async function updateUserService(id: string, data: UpdateUserT) {
  const updatedUser = await prisma.users.update({
    where: {
      id,
    },
    data,
  });
  return updatedUser;
}

export async function deleteUserService(id: string) {
  await prisma.users.delete({
    where: {
      id,
    },
  });
}

export async function retrieveUsersService() {
  const users = await prisma.users.findMany();
  return users;
}

export async function createUserService(data: CreateUserT) {
  const newUser = await prisma.users.create({
    data: data,
  });
  return newUser;
}
