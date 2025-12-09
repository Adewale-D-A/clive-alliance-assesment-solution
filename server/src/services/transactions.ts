import { prisma } from "../../lib/prisma.js";
import { CreateTransactionT, UpdateTransactionT } from "../types/user.js";

export async function retrieveTransactionService(id: string) {
  const transaction = await prisma.transactions.findFirst({
    where: {
      id,
    },
  });
  return transaction;
}

export async function updateTransactionService(
  id: string,
  data: UpdateTransactionT
) {
  // const updatedTransaction = await prisma.transactions.update({
  //   where: {
  //     id,
  //   },
  //   data,
  // });
  const updatedTransaction = {};
  return updatedTransaction;
}

export async function deleteTransactionService(id: string) {
  // await prisma.transactions.delete({
  //   where: {
  //     id,
  //   },
  // });
}

export async function retrieveTransactionsService({
  userId,
  pagination = { page: 1, limit: 10 },
  filter,
  search = "",
  sort,
}: {
  userId: string;
  filter?: { start_date: Date; end_date: Date };
  pagination?: { page: number; limit: number };
  search?: string;
  sort?: boolean;
}) {
  const skip = (pagination.page - 1) * pagination.limit;
  const take = pagination.limit;

  const filterOptions: any = search
    ? {
        user_id: userId,
        description: { contains: search, mode: "insensitive" },
        created_at: {
          gte: filter?.start_date,
          lte: filter?.end_date,
        },
      }
    : {
        user_id: userId,
      };
  const transactions = await prisma.transactions.findMany({
    skip,
    take,
    where: filterOptions,
    include: {
      userId: true,
    },
    orderBy: { created_at: sort ? "asc" : "desc" },
  });
  const count = await prisma.transactions.count({
    where: filterOptions,
  });
  return { data: transactions, count };
}

export async function createTransactionService(data: any) {
  const newTransaction = await prisma.transactions.create({
    data: data,
  });
  return newTransaction;
}
