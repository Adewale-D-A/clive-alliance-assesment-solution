import express from "express";
import {
  retrieveAccountController,
  updateAccountController,
  deleteAccountController,
} from "../controllers/accounts.js";
import { validateUpdateTransaction } from "../middleware/validate-requests/transactions.js";
import requireAuth from "../middleware/require-auth.js";

const router = express.Router();

// Single account
router
  .route("/:id")
  .get(requireAuth, retrieveAccountController)
  .patch(requireAuth, validateUpdateTransaction, updateAccountController)
  .delete(requireAuth, deleteAccountController);

// All users
// router
//   .route("")
//   .post(requireAuth, validateCreateTransaction, createTransactionController)
//   .get(requireAuth, retriveTransactionsController);

export default router;
