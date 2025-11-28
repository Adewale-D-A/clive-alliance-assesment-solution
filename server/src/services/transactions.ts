import { prisma } from "../../lib/prisma.js";
import { CreateTransactionT, UpdateTransactionT } from "../types/user.js";

export async function retrieveTransactionService(id: string) {
  const newUser = await prisma.transactions.findUnique({
    where: {
      id,
    },
  });
  return newUser;
}

export async function updateTransactionService(
  id: string,
  data: UpdateTransactionT
) {
  const updatedUser = await prisma.transactions.update({
    where: {
      id,
    },
    data,
  });
  return updatedUser;
}

export async function deleteTransactionService(id: string) {
  await prisma.transactions.delete({
    where: {
      id,
    },
  });
}

export async function retrieveTransactionsService() {
  const users = await prisma.transactions.findMany();
  return users;
}

export async function createTransactionService(data: CreateTransactionT) {
  const newUser = await prisma.transactions.create({
    data: data,
  });
  return newUser;
}
