import { body } from "express-validator";

export const validateSignIn = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const validateSignUp = [
  body("email")
    .isString()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be valid"),
  body("gender")
    .isString()
    .withMessage("Gender is required")
    .isIn(["MALE", "FEMALE"])
    .withMessage("Gender must be either MALE or FEMALE"),
  body("account_type")
    .isString()
    .withMessage("Account type is required")
    .isIn(["CHECKING", "SAVINGS"])
    .withMessage("Gender must be either MALE or FEMALE"),
  body("first_name").isString().withMessage("First name is required"),
  body("last_name").isString().withMessage("Last name is required"),
  body("username").optional().isString(),
  body("password").isString().withMessage("Password is required"),
  body("phone_number").isString().withMessage("Phone number is required"),
  body("dob").isString().withMessage("Date of birth is required"),
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
