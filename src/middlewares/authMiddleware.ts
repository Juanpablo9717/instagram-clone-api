import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token)
    return res.status(401).json({ error: "Access denied, token missing" });
  try {
    const { user } = req.body;
    let userReq = user;

    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    userReq = { id: decoded.id };
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
