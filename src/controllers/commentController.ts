import { Request, Response } from "express";
import Comment from "../models/Comment";
import Post from "../models/Post";

// TODO fix any type
export const createComment = async (req: Request | any, res: Response) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: "Post not found" });
    const comment = new Comment({ user: req.user.id, post: postId, text });
    await comment.save();

    // TODO fix coment id
    // post.comments.push(comment._id);
    await post.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Error creating comment" });
  }
};

// TODO fix any type
export const deleteComment = async (req: Request | any, res: Response) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ error: "Comment not found" });
    if (comment.user.toString() !== req.user.id)
      return res.status(401).json({ error: "Unauthorized" });

    // TODO fix .remove method
    // await comment.remove();
    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting comment" });
  }
};
