// routes/comment.route.js
import express from "express";
import {
  createComment,
  deleteComment,
  getCommentsByPost,
  toggleLikeComment,
  updateComment,
} from "../controllers/comment.controller.js";
import { authMiddleware, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.post("/", createComment); // No authMiddleware for anonymous comments
router.get("/:postId", getCommentsByPost);
router.patch(
  "/edit/:commentId",
  authMiddleware,
  authorizeRoles("writer", "author", "editor", "admin"),
  updateComment
);
router.patch("/:commentId/like", authMiddleware, toggleLikeComment);
router.delete(
  "/:commentId",
  authMiddleware,
  authorizeRoles("writer", "author", "editor", "admin"),
  deleteComment
);

export default router;
