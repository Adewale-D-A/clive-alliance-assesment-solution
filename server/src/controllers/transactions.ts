import { Request, Response } from "express";
import {
  createTransactionService,
  deleteTransactionService,
  retrieveTransactionService,
  retrieveTransactionsService,
  updateTransactionService,
} from "../services/transactions.js";
import { responseGenerator } from "../utils/auth.js";

// Create a single transactions
export async function createTransactionController(req: Request, res: Response) {
  const { amount, type, description, recipient_account, transaction_type } =
    req.body;
  try {
    const newTransaction = await createTransactionService({
      amount: Number(amount),
      description,
      recipient_account: Number(recipient_account),
      transaction_type,
    });
    return res
      .status(201)
      .json(
        responseGenerator(
          false,
          "Transaction successfully created",
          newTransaction
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(responseGenerator(false, "Please try again later"));
  }
}

// Retrieve a single transactions
export async function retrieveTransactionController(
  req: Request,
  res: Response
) {
  const { id } = req.params;
  try {
    const transaction = await retrieveTransactionService(id);
    return res
      .status(200)
      .json(
        responseGenerator(
          true,
          "Transaction successfully retrieved",
          transaction
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        responseGenerator(
          false,
          "Failed to retieve Transaction, please try again later"
        )
      );
  }
}

// Retrieve a single transactions
export async function updateTransactionController(req: Request, res: Response) {
  const { id } = req.params;
  const { description } = req.body;
  try {
    const updateTransaction = await updateTransactionService(id, {
      description,
    });
    return res
      .status(200)
      .json(
        responseGenerator(
          true,
          "Transaction successfully updated",
          updateTransaction
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        responseGenerator(
          false,
          "Failed to update Transaction, please try again later"
        )
      );
  }
}

// Delete a single transactions
export async function deleteTransactionController(req: Request, res: Response) {
  const { id } = req.params;
  try {
    await deleteTransactionService(id);
    return res
      .status(200)
      .json(responseGenerator(true, "Transaction successfully deleted"));
  } catch (error) {
    return res
      .status(500)
      .json(
        responseGenerator(
          false,
          "Failed to delete Transaction, please try again later"
        )
      );
  }
}

// Retrieve multiple transactions
export async function retriveTransactionsController(
  req: Request,
  res: Response
) {
  try {
    const transactions = await retrieveTransactionsService();
    return res.status(201).json(
      responseGenerator(true, "Transactions successfully retrieved", {
        results: transactions,
        count: 4,
      })
    );
  } catch (error) {
    return res
      .status(500)
      .json(
        responseGenerator(
          false,
          "Failed to retrieve Transactions, please try again later"
        )
      );
  }
}
