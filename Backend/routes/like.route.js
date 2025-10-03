import express from "express";
import { toggleLikePost, getLikes } from "../controllers/like.controller.js";

const router = express.Router();

router.patch("/post/:postId/toggle", toggleLikePost);
router.get("/post/:postId", getLikes);

export default router;
