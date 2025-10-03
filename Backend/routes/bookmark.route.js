import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  addBookmark,
  getAllBookmarks,
  removeBookmark,
} from "../controllers/bookmark.controller.js";

const router = express.Router();

router.post("/:postId", authMiddleware, addBookmark);
router.delete("/:postId", authMiddleware, removeBookmark);
router.get("/", authMiddleware, getAllBookmarks);

export default router;
