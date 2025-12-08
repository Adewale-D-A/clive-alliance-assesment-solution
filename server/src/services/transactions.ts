import { prisma } from "../../lib/prisma.js";
import { CreateTransactionT, UpdateTransactionT } from "../types/user.js";

export async function retrieveTransactionService(id: string) {
  // const transaction = await prisma.transactions.findUnique({
  //   where: {
  //     id,
  //   },
  // });
  const transaction = {
    id: "txn_001",
    amount: 1000,
    description: "Received salary deposit of $1,000",
    recipient: {
      account_number: 1234567890,
      account_name: "Azeez Olawale",
      bank: "First Bank Nigeria",
    },
    type: "deposit",
    created_at: "2025-01-15T09:00:00Z",
    updated_at: 1736922000,
    created_by: {
      id: "u001",
      username: "hr_manager",
      first_name: "Tunde",
      last_name: "Adeyemi",
      email: "tunde.adeyemi@company.com",
      phone_number: "+2348012345678",
      dob: "1980-05-12",
      gender: "male",
    },
  };
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

export async function retrieveTransactionsService() {
  // const transactions = await prisma.transactions.findMany();
  const transactions = [
    {
      id: "txn_001",
      amount: 1000,
      description: "Received salary deposit of $1,000",
      recipient: {
        account_number: 1234567890,
        account_name: "Azeez Olawale",
        bank: "First Bank Nigeria",
      },
      type: "deposit",
      created_at: "2025-01-15T09:00:00Z",
      updated_at: 1736922000,
      created_by: {
        id: "u001",
        username: "hr_manager",
        first_name: "Tunde",
        last_name: "Adeyemi",
        email: "tunde.adeyemi@company.com",
        phone_number: "+2348012345678",
        dob: "1980-05-12",
        gender: "male",
      },
    },
    {
      id: "txn_002",
      amount: 50,
      description: "Withdrew $50 from ATM",
      recipient: {
        account_number: 1234567890,
        account_name: "Azeez Olawale",
        bank: "First Bank Nigeria",
      },
      type: "withdrawal",
      created_at: "2025-01-16T14:30:00Z",
      updated_at: 1737006600,
      created_by: {
        id: "u002",
        username: "azeez01",
        first_name: "Azeez",
        last_name: "Olawale",
        email: "azeez.olawale@example.com",
        phone_number: "+2348098765432",
        dob: "1995-07-15",
        gender: "male",
      },
    },
    {
      id: "txn_003",
      amount: 200,
      description: "Transferred $200 to savings account",
      recipient: {
        account_number: 9876543210,
        account_name: "Azeez Olawale Savings",
        bank: "GTBank",
      },
      type: "transfer",
      created_at: "2025-01-17T11:15:00Z",
      updated_at: 1737093300,
      created_by: {
        id: "u002",
        username: "azeez01",
        first_name: "Azeez",
        last_name: "Olawale",
        email: "azeez.olawale@example.com",
        phone_number: "+2348098765432",
        dob: "1995-07-15",
        gender: "male",
      },
    },
  ];
  return transactions;
}

export async function createTransactionService(data: CreateTransactionT) {
  // const newUser = await prisma.transactions.create({
  //   data: data,
  // });
  const newTransaction = {
    id: "txn_001",
    amount: data.amount,
    description: data.description,
    recipient: {
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
      account_number: data.recipient_account,
      account_name: "Azeez Olawale",
    },
    type: data?.transaction_type,
    created_at: "2025-12-08T17:50:00Z",
    updated_at: 1733670600,
    created_by: {
      id: "u67890",
      username: "admin01",
      first_name: "Admin",
      last_name: "User",
      email: "admin@example.com",
      phone_number: "+2348098765432",
      dob: "1988-03-22",
      gender: "female",
    },
  };
  return newTransaction;
}
