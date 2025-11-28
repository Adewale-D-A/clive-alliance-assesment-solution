import { body } from "express-validator";

export const validateCreateUser = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
  body("first_name").notEmpty().withMessage("First name is required"),
  body("last_name").notEmpty().withMessage("Last name is required"),
];

export const validateUpdateUser = [
  body("first_name").optional().isString(),
  body("last_name").isString().optional().isString(),
];
