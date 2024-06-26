import { Request, Response } from "express";
import Comment from "../models/Comment";
import Post from "../models/Post";

export const createComment = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { text, user } = req.body;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: "Post not found" });
    const comment = new Comment({ user: user.id, post: postId, text });
    await comment.save();

    // TODO fix coment id
    // post.comments.push(comment._id);
    await post.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Error creating comment" });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const { user } = req.body;

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ error: "Comment not found" });
    if (comment.user.toString() !== user.id)
      return res.status(401).json({ error: "Unauthorized" });

    // TODO fix .remove method
    // await comment.remove();
    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting comment" });
  }
};
