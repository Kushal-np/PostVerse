import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";

export const getFeedPostsInfinite = async (req, res) => {
  try {
    const userId = req.user?._id ? new mongoose.Types.ObjectId(req.user._id) : null;
    const { cursor, limit = 10 } = req.query;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const currentUser = await User.findById(userId).select("following");
    const followingIds = currentUser?.following || [];
    const query = {
      $or: [
        { author: { $in: followingIds } },
        { author: userId },
      ],
      status: "published",
    };
    if (cursor) {
      query.createdAt = { $lt: new Date(cursor) };
    }
    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .populate("author", "username")
      .populate("coverImage")
      .populate("tags category");
    const nextCursor = posts.length ? posts[posts.length - 1].createdAt : null;
    res.status(200).json({
      success: true,
      posts,
      nextCursor,
    });
  } catch (error) {
    console.error("getFeedPostsInfinite error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
