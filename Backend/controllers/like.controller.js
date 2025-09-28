import Like from "../models/Like.model";
import Post from "../models/post.model";

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
    let message = "Reaction Updated";

    if (!reaction) {
      reaction = await Like.create({
        user: userId,
        post: postId,
        type,
      });
    } else if (reaction.type === type) {
      await reaction.deleteOne();
      message = "Reaction removed";
    } else {
      reaction.type = type;
      await reaction.save();
    }
    const reactionCounts = await Like.aggregate([
      { $match: { post: post._id } },
      { $group: { _id: "type", count: { $sum: 1 } } },
    ]);
    const reactions = Reaction_Types.reduce((acc, t) => {
      acc[t] = 0;
      return acc;
    }, {});
    reactionCounts.forEach((rc) => {
      reaction[rc._id] = rc.count;
    });
    res.status(200).json({
      success: true,
      message,
      reactions,
    });
  } catch (error) {
    console.log("Toggle reaction post error");
    console.log(error.message);
    res.staus(501).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
