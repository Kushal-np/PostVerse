import express from "express";
import { getFeedPostsInfinite } from "../controllers/feed.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/feed", authMiddleware, getFeedPostsInfinite);

export default router;
