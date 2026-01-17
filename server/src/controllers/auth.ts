import { Request, Response } from "express";
import {
  findUserByIdentifierService,
  createUserService,
} from "../services/auth.js";
import {
  encryptPassword,
  generateToken,
  isPasswordValid,
  responseGenerator,
} from "../utils/auth.js";
import { createAccountService } from "../services/account.js";

export async function signUpController(req: Request, res: Response) {
  try {
    const {
      email,
      gender,
      account_type,
      first_name,
      last_name,
      password,
      phone_number,
      dob,
      username,
    } = req.body;
    const encryptedPassword = await encryptPassword(password);
    const newUser = await createUserService({
      email,
      first_name,
      last_name,
      gender,
      phone_number,
      dob,
      username,
      password: encryptedPassword,
    });

    await createAccountService({
      user_id: newUser?.id,
      account_name: first_name + " " + last_name,
      account_type,
    });
    return res
      .status(201)
      .json(responseGenerator(false, "User successfully created", newUser));
  } catch (error) {
    console.log({ error });
    return res
      .status(500)
      .json(
        responseGenerator(false, "Unable to create this user", null, error),
      );
  }
}

export async function signInController(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const authUser = await findUserByIdentifierService(email);
    if (!authUser) {
      return res
        .status(400)
        .json(responseGenerator(false, "Invalid credentials", null));
    }

    const isValidPass = await isPasswordValid(password, authUser.password);

    if (!isValidPass) {
      return res
        .status(400)
        .json(responseGenerator(false, "Invalid credentials", null));
    }
    const thisUser: Partial<typeof authUser> = authUser;
    delete thisUser.password;
    const authCredentials = {
      token: await generateToken({ id: authUser.id }),
      user: thisUser,
    };
    return res
      .status(200)
      .json(responseGenerator(true, "Logged in", authCredentials));
  } catch (error) {
    return res
      .status(500)
      .json(responseGenerator(false, "Invalid credentials", null, error));
  }
}

export async function forgotPasswordController(req: Request, res: Response) {
  try {
    const { email } = req.body;
    const user = await findUserByIdentifierService(email);
    if (!user) {
      return res.status(400).json(responseGenerator(false, "User not found"));
    }

    return res.status(200).json(responseGenerator(true, "Email sent!"));
  } catch (error) {
    return res
      .status(500)
      .json(responseGenerator(false, "Invalid credentials", null, error));
  }
}
