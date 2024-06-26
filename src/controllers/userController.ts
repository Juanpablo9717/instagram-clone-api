import { Request, Response } from "express";
import User from "../models/User";

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
};

// TODO fix any type
export const followUser = async (req: Request | any, res: Response) => {
  try {
    if (req.user.id === req.params.id)
      return res.status(400).json({ error: "You cannot follow yourself" });
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);
    if (!user || !currentUser)
      return res.status(404).json({ error: "User not found" });
    if (user.followers.includes(req.user.id))
      return res.status(400).json({ error: "You already follow this user" });
    user.followers.push(req.user.id);
    currentUser.following.push(req.params.id);
    await user.save();
    await currentUser.save();
    res.status(200).json({ message: "User followed" });
  } catch (error) {
    res.status(500).json({ error: "Error following user" });
  }
};

// TODO fix any type
export const unfollowUser = async (req: Request | any, res: Response) => {
  try {
    if (req.user.id === req.params.id)
      return res.status(400).json({ error: "You cannot unfollow yourself" });
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);
    if (!user || !currentUser)
      return res.status(404).json({ error: "User not found" });
    if (!user.followers.includes(req.user.id))
      return res.status(400).json({ error: "You do not follow this user" });

    // TODO fix pull method
    // user.followers.pull(req.user.id);
    // currentUser.following.pull(req.params.id);
    await user.save();
    await currentUser.save();
    res.status(200).json({ message: "User unfollowed" });
  } catch (error) {
    res.status(500).json({ error: "Error unfollowing user" });
  }
};
