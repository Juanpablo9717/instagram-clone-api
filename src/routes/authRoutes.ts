import { Router } from "express";
import { register, login } from "../controllers/authController";
import { validateRegister, validateLogin } from "../utils/validators";

const router = Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);

export default router;
