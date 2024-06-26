import { Router } from "express";
import { createPost, getPost, deletePost } from "../controllers/postController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware, createPost);
router.get("/:id", authMiddleware, getPost);
router.delete("/:id", authMiddleware, deletePost);

export default router;
