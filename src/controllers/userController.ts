import { Request, Response } from "express";
import User from "../models/User";

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
};

export const followUser = async (req: Request, res: Response) => {
  try {
    const { user: userReq} = req.body;
    const { id } = req.params;

    if (userReq.id === id)
      return res.status(400).json({ error: "You cannot follow yourself" });
    
    const user = await User.findById(id);
    const currentUser = await User.findById(userReq.id);
    if (!user || !currentUser)
      return res.status(404).json({ error: "User not found" });

    if (user.followers.includes(userReq.id))
      return res.status(400).json({ error: "You already follow this user" });
    
    user.followers.push(userReq.id);
    currentUser.following.push(id as any); // TODO fix any type
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
