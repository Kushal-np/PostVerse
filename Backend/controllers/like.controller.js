import Like from "../models/Like.model.js";
import Post from "../models/post.model.js";

export const toggleLikePost = async (req, res) => {
  try {
    console.log("Toggle post reaction");
    const Reaction_Types = ["like", "dislike", "love", "fire"];
    const { postId } = req.params;
    const { type } = req.body;
    const userId = req.user._id;

    if (!Reaction_Types.includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid reaction type",
      });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    let reaction = await Like.findOne({ user: userId, post: postId });
    let message = "Reaction updated";

    if (!reaction) {
      reaction = await Like.create({ user: userId, post: postId, type });
    } else if (reaction.type === type) {
      await reaction.deleteOne();
      message = "Reaction removed";
    } else {
      reaction.type = type;
      await reaction.save();
    }

    const reactionCounts = await Like.aggregate([
      { $match: { post: post._id } },
      { $group: { _id: "$type", count: { $sum: 1 } } },
    ]);

    const reactions = Reaction_Types.reduce((acc, t) => {
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
    console.log("Toggle reaction post error");
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};



export const getLikes = async (req, res) => {
  try {
    const { postId, commentId } = req.query;

    const query = {};
    if (postId) query.post = postId;
    if (commentId) query.comment = commentId;

    const likes = await Like.find(query).populate("user", "username email role");

    res.status(200).json({
      success: true,
      likes,
      count: likes.length
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
