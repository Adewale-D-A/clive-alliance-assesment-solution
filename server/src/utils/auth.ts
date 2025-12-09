import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Prisma } from "../../generated/prisma/client.js";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";

export async function generateToken(data: { id: string }) {
  const token = jwt.sign(data, JWT_SECRET_KEY, {
    expiresIn: "24h",
  });
  return token;
}

export async function isPasswordValid(entered: string, existing: string) {
  return await bcrypt.compare(entered, existing);
}

export async function encryptPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

export function responseGenerator(
  isSuccess: boolean,
  message: string,
  data?: any,
  error?: any
) {
  let newMssg = message;
  if (isSuccess) return { is_success: isSuccess, message: newMssg, data };
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // This is a known Prisma error (e.g., unique constraint violation)
    // console.error('Prisma error code:', error.code);
    newMssg = error.message;

    // You can also check for specific error codes like 'P2002' for unique constraint
    if (error.code === "P2002") {
      newMssg = Array.isArray(error.meta?.target)
        ? error.meta?.target.join(",") + " already exists."
        : typeof error.meta?.target === "string"
        ? error.meta?.target
        : message;
    }
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    // This is a validation error in your Prisma Client query
    newMssg = error.message;
  } else {
    // This is a generic error
    newMssg = message || error.message;
  }
  return { is_success: isSuccess, message: newMssg, data };
}
