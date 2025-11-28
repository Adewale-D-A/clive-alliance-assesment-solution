import express from "express";
import {
  createUserController,
  deleteUserController,
  retrieveUserController,
  updateUserController,
  retriveUsersController,
} from "../controllers/users.js";
import {
  validateUpdateUser,
  validateCreateUser,
} from "../middleware/validate-requests/user.js";
import requireAuth from "../middleware/require-auth.js";

const router = express.Router();

// Single user
router
  .route("/:id")
  .get(requireAuth, retrieveUserController)
  .patch(requireAuth, validateUpdateUser, updateUserController)
  .delete(requireAuth, deleteUserController);

// All users
router
  .route("")
  .post(requireAuth, validateCreateUser, createUserController)
  .get(requireAuth, retriveUsersController);

export default router;
