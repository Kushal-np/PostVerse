import express from "express";
import { toggleLikePost, getLikes } from "../controllers/like.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();


router.patch("/post/:postId/toggle", authMiddleware, toggleLikePost);


router.get("/post/:postId", getLikes);

export default router;