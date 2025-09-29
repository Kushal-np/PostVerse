import express from "express"
import { getFeedPostsInfinite } from "../controllers/feed.controller.js";
const router = express.Router();

router.get("/feed" , getFeedPostsInfinite);

export default router ; 