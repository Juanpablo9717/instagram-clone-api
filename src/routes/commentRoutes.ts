import { Router } from "express";
import { createComment, deleteComment } from "../controllers/commentController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/:postId", authMiddleware, createComment);
router.delete("/:commentId", authMiddleware, deleteComment);

export default router;
