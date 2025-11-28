import { body } from "express-validator";

export const validateSignIn = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const validateSignUp = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
  body("first_name").notEmpty().withMessage("First name is required"),
  body("last_name").notEmpty().withMessage("Last name is required"),
];

export const validateForgotPassword = [
  body("email").isEmail().withMessage("Please provide a valid email"),
];

export const validateResetPassword = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("token").notEmpty().withMessage("Please provide a valid token"),
  body("new_password").notEmpty().withMessage("Please provide a new password"),
];

export const validateChangePassword = [
  body("old_password").notEmpty().withMessage("Please provide old password"),
  body("new_password").notEmpty().withMessage("Please provide a new password"),
];

export const validateUpdateProfile = [
  body("first_name").optional().isString(),
  body("last_name").isString().optional().isString(),
];
