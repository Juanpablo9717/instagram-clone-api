import { Request, Response } from "express";
import Message from "../models/Message";

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { receiver, text, imageUrl, audioUrl, user } = req.body;
    const message = new Message({
      sender: user.id,
      receiver,
      text,
      imageUrl,
      audioUrl,
    });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: "Error sending message" });
  }
};
