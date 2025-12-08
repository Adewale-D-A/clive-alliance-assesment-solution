import { Request, Response } from "express";
import { findUserByEmailService, signUpService } from "../services/auth.js";
import {
  encryptPassword,
  generateToken,
  isPasswordValid,
  responseGenerator,
} from "../utils/auth.js";

export async function signUpController(req: Request, res: Response) {
  try {
    const { email, first_name, last_name, password } = req.body;
    const encryptedPassword = await encryptPassword(password);
    const newUser = await signUpService({
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

export async function signInController(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const authUser = await findUserByEmailService(email);
    if (!authUser) {
      return res
        .status(400)
        .json(responseGenerator(false, "Invalid credentials"));
    }

    const isValidPass = isPasswordValid(password, authUser.password);
    if (!isValidPass) {
      return res
        .status(400)
        .json(responseGenerator(false, "Invalid credentials"));
    }
    const authCredentials = {
      token: await generateToken({ id: authUser.id }),
      user: authUser,
    };
    return res
      .status(200)
      .json(responseGenerator(true, "Logged in", authCredentials));
  } catch (error) {
    return res
      .status(500)
      .json(responseGenerator(false, "Please try again later"));
  }
}

export async function forgotPasswordController(req: Request, res: Response) {
  try {
    const { email } = req.body;
    const user = await findUserByEmailService(email);
    if (!user) {
      return res.status(400).json(responseGenerator(false, "User not found"));
    }

    return res.status(200).json(responseGenerator(true, "Email sent!"));
  } catch (error) {
    return res
      .status(500)
      .json(responseGenerator(false, "Please try again later"));
  }
}
