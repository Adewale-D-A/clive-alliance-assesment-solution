import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";

export async function generateToken(data: { id: string }) {
  const token = jwt.sign(data, JWT_SECRET_KEY, {
    expiresIn: "1h",
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
  data?: any
) {
  return { is_success: isSuccess, message, data };
}
