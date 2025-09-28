import express from "express";
import {
  createComment,
  deleteComment,
  toggleLikeComment,
  updateComment,
  getCommentsByPost,
} from "../controllers/comment.controller.js";
import {
  authMiddleware,
  authorizeRoles,
} from "../middlewares/auth.middleware.js";
import { getPostById } from "../controllers/post.controller.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  authorizeRoles("writer", "author", "editor", "admin"),
  createComment
);

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
