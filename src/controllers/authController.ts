import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

const createToken = (user: IUser) => {
  return jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    user = new User({ username, email, password });

    await user.save();
    const token = createToken(user);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });
    const token = createToken(user);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
};
