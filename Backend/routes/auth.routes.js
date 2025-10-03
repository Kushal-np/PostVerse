import express from "express";
import {
  getAllUsers,
  getMe,
  registerUser,
  signin,
  signout,
  updateTheme,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/signin", signin);
router.post("/signout", signout);
router.get("/all-users", getAllUsers);
router.get("/me", authMiddleware, getMe);
router.patch("/:id/theme", authMiddleware, updateTheme);

export default router;
