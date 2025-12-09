import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { findUserByIdentifierService } from "../services/auth.js";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";

export default async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized to access this route" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as { id: string };
    const thisAuthUser = await findUserByIdentifierService(
      undefined,
      decoded?.id
    );
    req.user = thisAuthUser;

    BigInt.prototype.toJSON = function () {
      return Number(this); // or String(this);
    };
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Not authorized to access this route",
    });
  }
}
