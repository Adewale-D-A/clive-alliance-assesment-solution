import { Request, Response } from "express";
import { retrieveAccountService } from "../services/account.js";
import { responseGenerator } from "../utils/auth.js";

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
      .json(responseGenerator(false, "Please try again later"));
  }
}

// Retrieve a single account
export async function retrieveAccountController(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const account = await retrieveAccountService(id);
    return res
      .status(200)
      .json(responseGenerator(true, "Account successfully retrieved", account));
  } catch (error) {
    return res
      .status(500)
      .json(
        responseGenerator(
          false,
          "Failed to retieve account, please try again later"
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
          "Failed to update account, please try again later"
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
          "Failed to delete account, please try again later"
        )
      );
  }
}
