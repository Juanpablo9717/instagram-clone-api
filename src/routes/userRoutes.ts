import { Router } from "express";
import {
  getUser,
  followUser,
  unfollowUser,
} from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/:id", authMiddleware, getUser);
router.post("/follow/:id", authMiddleware, followUser);
router.post("/unfollow/:id", authMiddleware, unfollowUser);

export default router;
