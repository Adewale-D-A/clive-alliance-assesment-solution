import * as express from "express";
import { Users } from "../../generated/prisma/client.ts";
declare global {
  namespace Express {
    interface Request {
      user: Users | null;
    }
  }
  interface BigInt {
    toJSON(): number | string; // Or just number if precision loss is acceptable
  }
}
