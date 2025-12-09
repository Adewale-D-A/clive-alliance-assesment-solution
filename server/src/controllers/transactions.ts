import { Request, Response } from "express";
import {
  createTransactionService,
  deleteTransactionService,
  retrieveTransactionService,
  retrieveTransactionsService,
  updateTransactionService,
} from "../services/transactions.js";
import { responseGenerator } from "../utils/auth.js";
import { validateAccountService } from "../services/account.js";

// Create a single transactions
export async function createTransactionController(req: Request, res: Response) {
  const {
    amount,
    recipient_bank_code,
    description,
    recipient_account,
    transaction_type,
  } = req.body;
  const authUser = req.user;
  try {
    const validateAccount = await validateAccountService({
      account_number: Number(recipient_account),
      bank_code: recipient_bank_code,
    });
    if (!validateAccount) {
      return res
        .status(500)
        .json(
          responseGenerator(false, "Error validating account number", null)
        );
    }
    const newTransaction = await createTransactionService({
      transaction_type,
      amount: Number(amount),
      description,
      recipient_account_number: Number(recipient_account),
      recipient_bank_code,
      recipient_account_name: validateAccount.account_name,
      user_id: authUser?.id,
      created_by: authUser?.id,
    });
    return res.status(201).json(
      responseGenerator(false, "Transaction successfully created", {
        ...newTransaction,
      })
    );
  } catch (error) {
    return res
      .status(500)
      .json(
        responseGenerator(false, "Could not create transaction", null, error)
      );
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
          "Failed to retieve Transaction, please try again later",
          null,
          error
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
          "Failed to update Transaction, please try again later",
          null,
          error
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
          "Failed to delete Transaction, please try again later",
          null,
          error
        )
      );
  }
}

// Retrieve multiple transactions
export async function retriveTransactionsController(
  req: Request,
  res: Response
) {
  const { page, limit, search, sort, start_date, end_date } = req.query;
  const thisUser = req.user;
  const pagination =
    page && limit ? { page: Number(page), limit: Number(limit) } : undefined;
  const searchParam = search as string | undefined;
  const sortData = Number(sort);

  const startDate = new Date(start_date as string) as Date;
  const endDate = new Date(end_date as string) as Date;

  const filter =
    startDate && endDate && start_date && end_date
      ? { start_date: startDate, end_date: endDate }
      : undefined;
  try {
    const { data, count } = await retrieveTransactionsService({
      userId: thisUser?.id || "NIL",
      pagination,
      search: searchParam ?? "",
      sort: Boolean(sortData),
      filter,
    });
    return res.status(200).json(
      responseGenerator(true, "Successfully retrieved transactions", {
        data,
        count,
      })
    );
  } catch (error) {
    return res
      .status(500)
      .json(
        responseGenerator(
          false,
          "Failed to retrieve Transactions, please try again later",
          null,
          error
        )
      );
  }
}
