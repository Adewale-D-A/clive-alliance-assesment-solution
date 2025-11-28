import express from "express";
// import requireAuth from "../middleware/require-auth";
import {
  validateSignIn,
  validateSignUp,
  validateForgotPassword,
  // validateResetPassword,
  // validateChangePassword,
  // validateUpdateProfile,
} from "../middleware/validate-requests/auth.js";
import {
  signInController,
  signUpController,
  forgotPasswordController,
} from "../controllers/auth.js";

const router = express.Router();

// Auth signup
router.route("/sign-up").post(validateSignUp, signUpController);

// Auth Login
router.route("/sign-in").post(validateSignIn, signInController);

// Auth Forget password
router
  .route("/forgot-password")
  .post(validateForgotPassword, forgotPasswordController);

// Auth Reset password
// router.route("/reset-password").post(validateResetPassword);

// Auth Change password
// router.route("/change-password").post(requireAuth, validateChangePassword);

// Auth Update profile
// router.route("/update-profile").patch(requireAuth, validateUpdateProfile);

// Auth Get profile
// router.route("").get(requireAuth);

export default router;
