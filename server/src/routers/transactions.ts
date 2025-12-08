import express from "express";
import {
  createTransactionController,
  deleteTransactionController,
  retrieveTransactionController,
  updateTransactionController,
  retriveTransactionsController,
} from "../controllers/transactions.js";
import {
  validateUpdateTransaction,
  validateCreateTransaction,
} from "../middleware/validate-requests/transactions.js";
import requireAuth from "../middleware/require-auth.js";

const router = express.Router();

// Single transaction
router
  .route("/:id")
  .get(requireAuth, retrieveTransactionController)
  .patch(requireAuth, validateUpdateTransaction, updateTransactionController)
  .delete(requireAuth, deleteTransactionController);

// All Transaction
router
  .route("")
  .post(requireAuth, validateCreateTransaction, createTransactionController)
  .get(requireAuth, retriveTransactionsController);

export default router;
