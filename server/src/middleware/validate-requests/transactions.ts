import { body } from "express-validator";

export const validateCreateTransaction = [
  body("amount").notEmpty().withMessage("Amount is required"),
  body("type").notEmpty().withMessage("Transaction type is required"),
  body("description").notEmpty().withMessage("Description is required"),
];

export const validateUpdateTransaction = [
  body("description").optional().isString(),
];
