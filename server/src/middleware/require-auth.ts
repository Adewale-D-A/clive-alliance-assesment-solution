import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

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
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    // req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Not authorized to access this route",
    });
  }
}
