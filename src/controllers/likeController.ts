import { Request, Response } from "express";
import Like from "../models/Like";
import Post from "../models/Post";

// TODO fix any type
export const likePost = async (req: Request | any, res: Response) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const like = await Like.findOne({ user: req.user.id, post: postId });
    if (like) return res.status(400).json({ error: "Post already liked" });

    const newLike = new Like({ user: req.user.id, post: postId });

    await newLike.save();
    // TODO fix new like id
    // post.likes.push(newLike._id);
    await post.save();
    res.status(201).json(newLike);
  } catch (error) {
    res.status(500).json({ error: "Error liking post" });
  }
};

// TODO fix any type
export const unlikePost = async (req: Request | any, res: Response) => {
  try {
    const { postId } = req.params;
    const like = await Like.findOne({ user: req.user.id, post: postId });
    if (!like) return res.status(404).json({ error: "Like not found" });

    // TODO fix .remove method
    // await like.remove();
    res.status(200).json({ message: "Post unliked" });
  } catch (error) {
    res.status(500).json({ error: "Error unliking post" });
  }
};
