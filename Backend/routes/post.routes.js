import express from "express";
import {
  authMiddleware,
  authorizeRoles,
} from "../middlewares/auth.middleware.js";
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from "../controllers/post.controller.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  authorizeRoles("author", "admin"),
  upload.single("coverImage"),
  createPost
);
router.get("/", getPosts);
router.get("/:id", getPostById);
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("writer", "author", "admin"),
  upload.single("coverImage"),
  updatePost
);
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("author", "admin", "writer"),
  deletePost
);

export default router;
