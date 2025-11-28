import { Request, Response } from "express";
import {
  createUserService,
  deleteUserService,
  retrieveUserService,
  retrieveUsersService,
  updateUserService,
} from "../services/users.js";
import { encryptPassword, responseGenerator } from "../utils/auth.js";

// Create a single user
export async function createUserController(req: Request, res: Response) {
  const { email, first_name, last_name, password } = req.body;
  const encryptedPassword = await encryptPassword(password);
  try {
    const newUser = createUserService({
      email,
      first_name,
      last_name,
      password: encryptedPassword,
    });
    return res
      .status(201)
      .json(responseGenerator(false, "User successfully created", newUser));
  } catch (error) {
    return res
      .status(500)
      .json(responseGenerator(false, "Please try again later"));
  }
}

// Retrieve a single user
export async function retrieveUserController(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const user = await retrieveUserService(id);
    return res
      .status(200)
      .json(responseGenerator(true, "User successfully retrieved", user));
  } catch (error) {
    return res
      .status(500)
      .json(
        responseGenerator(
          false,
          "Failed to retieve user, please try again later"
        )
      );
  }
}

// Retrieve a single user
export async function updateUserController(req: Request, res: Response) {
  const { id } = req.params;
  const { first_name, last_name } = req.body;
  try {
    const updateUser = await updateUserService(id, { first_name, last_name });
    return res
      .status(200)
      .json(responseGenerator(true, "User successfully updated", updateUser));
  } catch (error) {
    return res
      .status(500)
      .json(
        responseGenerator(
          false,
          "Failed to update user, please try again later"
        )
      );
  }
}

// Delete a single user
export async function deleteUserController(req: Request, res: Response) {
  const { id } = req.params;
  try {
    await deleteUserService(id);
    return res
      .status(200)
      .json(responseGenerator(true, "User successfully deleted"));
  } catch (error) {
    return res
      .status(500)
      .json(
        responseGenerator(
          false,
          "Failed to delete user, please try again later"
        )
      );
  }
}

// Retrieve multiple users
export async function retriveUsersController(req: Request, res: Response) {
  try {
    const users = await retrieveUsersService();
    return res
      .status(201)
      .json(responseGenerator(true, "Users successfully retrieved", users));
  } catch (error) {
    return res
      .status(500)
      .json(
        responseGenerator(
          false,
          "Failed to retrieve users, please try again later"
        )
      );
  }
}
