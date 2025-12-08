import { body } from "express-validator";

export const validateCreateTransaction = [
  body("transaction_type")
    .isIn(["DEPOSIT", "WITHDRAWAL", "TRANSFER"])
    .withMessage("Type must be one of: TRANSFER, DEPOSIT, WITHDRAWAL"),
  body("description")
    .notEmpty()
    .withMessage("Transaction description is required"),
  body("amount").notEmpty().withMessage("Transaction amount is required"),
  body("recipient_account")
    .notEmpty()
    .withMessage("Recipient account is required"),
];

export const validateUpdateTransaction = [
  body("description").optional().isString(),
];
