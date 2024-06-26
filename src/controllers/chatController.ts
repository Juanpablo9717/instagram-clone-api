import { Request, Response } from "express";
import Message from "../models/Message";

// TODO fix any type
export const sendMessage = async (req: Request | any, res: Response) => {
  try {
    const { receiver, text, imageUrl, audioUrl } = req.body;
    const message = new Message({
      sender: req.user.id,
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
