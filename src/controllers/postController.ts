import { Request, Response } from "express";
import Post from "../models/Post";

// TODO fix ani type
export const createPost = async (req: Request | any, res: Response) => {
  try {
    const { imageUrl, caption } = req.body;
    const post = new Post({ user: req.user.id, imageUrl, caption });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: "Error creating post" });
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("user", "-password")
      .populate("comments")
      .populate("likes");
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Error fetching post" });
  }
};

// TODO fix ani type
export const deletePost = async (req: Request | any, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    if (post.user.toString() !== req.user.id)
      return res.status(401).json({ error: "Unauthorized" });
    // TODO fix .remove method
    // await post.remove();
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting post" });
  }
};
