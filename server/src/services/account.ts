import { prisma } from "../../lib/prisma.js";
import { UpdateAccountT, CreateAccountT } from "../types/user.js";

export async function retrieveAccountService(id: string) {
  // const account = await prisma.accounts.findUnique({
  //   where: {
  //     id,
  //   },
  // });
  const account = {
    user: {
      id: "u12345",
      username: "azeez01",
      first_name: "Azeez",
      last_name: "Olawale",
      email: "azeez.olawale@example.com",
      phone_number: "+2348012345678",
      dob: "1995-07-15",
      gender: "male",
    },
    account_number: "1234567899",
    account_name: "Adewale",
    currency: "USD",
    account_type: "CHECKING",
    available_balance: 800,
  };
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

export async function createAccountService(data: CreateAccountT) {
  // const newUser = await prisma.accounts.create({
  //   data: data,
  // });
  const newAccount = {};
  return newAccount;
}
