import { prisma } from "../../lib/prisma.js";
import { UpdateAccountT, CreateAccountT } from "../types/user.js";

export async function retrieveAccountService(id: string) {
  const account = await prisma.accounts.findFirst({
    where: {
      user_id: id,
    },
  });
  return account;
}

export async function updateAccountService(id: string, data: UpdateAccountT) {
  // const updatedUser = await prisma.accounts.update({
  //   where: {
  //     id,
  //   },
  //   data,
  // });
  const updatedUser = {};
  return updatedUser;
}

export async function deleteAccountService(id: string) {
  // await prisma.accounts.delete({
  //   where: {
  //     id,
  //   },
  // });
}

export async function createAccountService(data: any) {
  const newAccount = await prisma.accounts.create({
    data: data,
  });
  // const newAccount = {};
  return newAccount;
}

export async function validateAccountService(data: {
  account_number: number;
  bank_code: string;
}) {
  const userAccount = {
    ...data,
    bank: {
      name: "Bank A",
      code: data?.bank_code,
    },
    account_name: "John Doe",
  };
  return userAccount;
}
