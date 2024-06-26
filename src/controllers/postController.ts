import { Request, Response } from "express";
import Post from "../models/Post";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { imageUrl, caption, user } = req.body;

    const post = new Post({ user: user.id, imageUrl, caption });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: "Error creating post" });
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id)
      .populate("user", "-password")
      .populate("comments")
      .populate("likes");
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Error getting post" });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    if (post.user.toString() !== user.id)
      return res.status(401).json({ error: "Unauthorized" });
    // TODO fix .remove method
    // await post.remove();
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting post" });
  }
};
