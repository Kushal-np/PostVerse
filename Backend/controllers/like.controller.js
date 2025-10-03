// controllers/like.controller.js
import Like from "../models/Like.model.js";
import Post from "../models/post.model.js";
import mongoose from "mongoose"; // Import mongoose

export const toggleLikePost = async (req, res) => {
  try {
    const REACTION_TYPES = ["like", "dislike", "love", "fire"];
    const { postId } = req.params;
    const { type } = req.body;

    if (!REACTION_TYPES.includes(type)) {
      return res.status(400).json({ success: false, message: "Invalid reaction type" });
    }

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ success: false, message: "Invalid post ID" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    const userId = req.user ? req.user._id : req.ip;

    let reaction = await Like.findOne({ user: userId, post: postId });
    let message = "Reaction updated";

    if (!reaction) {
      reaction = await Like.create({ user: userId, post: postId, type });
    } else if (reaction.type === type) {
      await Like.deleteOne({ _id: reaction._id });
      message = "Reaction removed";
    } else {
      reaction.type = type;
      await reaction.save();
    }

    const reactionCounts = await Like.aggregate([
      { $match: { post: new mongoose.Types.ObjectId(postId) } },
      { $group: { _id: "$type", count: { $sum: 1 } } },
    ]);

    const reactions = REACTION_TYPES.reduce((acc, t) => {
      acc[t] = 0;
      return acc;
    }, {});

    reactionCounts.forEach((rc) => {
      reactions[rc._id] = rc.count;
    });

    res.status(200).json({
      success: true,
      message,
      reactions,
    });
  } catch (error) {
    console.error("Toggle reaction error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getLikes = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ success: false, message: "Invalid post ID" });
    }

    const reactionCounts = await Like.aggregate([
      { $match: { post: new mongoose.Types.ObjectId(postId) } },
      { $group: { _id: "$type", count: { $sum: 1 } } },
    ]);

    const reactions = {
      like: 0,
      dislike: 0,
      love: 0,
      fire: 0,
    };

    reactionCounts.forEach((rc) => {
      reactions[rc._id] = rc.count;
    });

    res.status(200).json({
      success: true,
      likes: reactions,
    });
  } catch (error) {
    console.error("Get likes error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
