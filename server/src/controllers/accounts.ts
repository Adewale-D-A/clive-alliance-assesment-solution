import { Request, Response } from "express";
import {
  retrieveAccountService,
  validateAccountService,
} from "../services/account.js";
import { responseGenerator } from "../utils/auth.js";
import { retrieveTransactionsService } from "../services/transactions.js";

// Create an account
export async function createAccountController(req: Request, res: Response) {
  const { user_id, account_type } = req.body;
  try {
    return res
      .status(201)
      .json(responseGenerator(false, "Account successfully created", {}));
  } catch (error) {
    return res
      .status(500)
      .json(responseGenerator(false, "Invalid credentials", null, error));
  }
}

// Retrieve a single account
export async function retrieveAccountController(req: Request, res: Response) {
  const { id } = req.params;
  const thisUser = req.user;
  try {
    const account = await retrieveAccountService(id);
    const { data, count } = await retrieveTransactionsService({
      userId: thisUser?.id || "NIL",
    });

    const numOr0 = (n: any) => (isNaN(n) ? 0 : n);

    const summed_up_balance =
      data?.reduce(function (
        acc, //accumulated value
        val //current value in the array
      ) {
        const amount =
          val.amount * (val.transaction_type === "DEPOSIT" ? +1 : -1);
        return numOr0(acc) + numOr0(amount);
      }, 0) || 0;

    return res.status(200).json(
      responseGenerator(true, "Account successfully retrieved", {
        ...account,
        available_balance: summed_up_balance,
      })
    );
  } catch (error) {
    return res
      .status(500)
      .json(
        responseGenerator(
          false,
          "Failed to retieve account, please try again later",
          null,
          error
        )
      );
  }
}

// Update an account
export async function updateAccountController(req: Request, res: Response) {
  const { id } = req.params;
  const { description } = req.body;
  try {
    return res
      .status(200)
      .json(responseGenerator(true, "Account successfully updated", {}));
  } catch (error) {
    return res
      .status(500)
      .json(
        responseGenerator(
          false,
          "Failed to update account, please try again later",
          null,
          error
        )
      );
  }
}

// Delete an account
export async function deleteAccountController(req: Request, res: Response) {
  const { id } = req.params;
  try {
    // await deleteTransactionService(id);
    return res
      .status(200)
      .json(responseGenerator(true, "Account successfully deleted"));
  } catch (error) {
    return res
      .status(500)
      .json(
        responseGenerator(
          false,
          "Failed to delete account, please try again later",
          null,
          error
        )
      );
  }
}

// Update an account
export async function validateAccountController(req: Request, res: Response) {
  const { account_number, bank_code } = req.query;
  const accountNumber = Number(account_number) as number;
  const bankCode = bank_code as string;

  if (!(accountNumber && bankCode)) {
    return res
      .status(400)
      .json(responseGenerator(false, "Could not verify account", null));
  }
  try {
    const response = await validateAccountService({
      account_number: accountNumber,
      bank_code: bankCode,
    });
    return res
      .status(200)
      .json(responseGenerator(true, "Account successfully verified", response));
  } catch (error) {
    return res
      .status(500)
      .json(
        responseGenerator(
          false,
          "Failed to verify account, please try again later",
          null,
          error
        )
      );
  }
}
