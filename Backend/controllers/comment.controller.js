import Like from "../models/Like.model.js";
import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";

export const createComment = async (req, res) => {
  try {
    const {  postId, parent, body } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    if (parent) {
      const parentComment = await Comment.findById(parent);
      if (!parentComment) {
        return res
          .status(404)
          .json({ success: false, message: "Parent comment not found" });
      }
    }

    const newComment = await Comment.create({
      post: postId,
      parent: parent || null,
      body,
      author: req.user._id,
    });

    post.commentsCount = (post.commentsCount || 0) + 1;
    await post.save();

    const populatedComment = await Comment.findById(newComment._id).populate(
      "author",
      "username role"
    );

    res.status(201).json({
      success: true,
      comment: populatedComment,
    });
  } catch (err) {
    console.error("Create Comment Error:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error creating comment" });
  }
};

export const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({
      post: postId,
      isDeleted: false,
    })
      .populate("author", "username role")
      .sort({ createdAt: 1 });
    res.status(201).json({
        success:true , 
        comments
    })
  } catch (error) {
    console.log("Get comments error", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching comments ",
    });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { body } = req.body;
    const comment = await Comment.findById(commentId);
    if (
      comment.author.toString() !== req.user._id.toString() &&
      !["admin", "editor"].includes(req.user.role)
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to edit the comment",
      });
    }
    comment.body = body || comment.body;
    await comment.save();

    res.status(200).json({
      success: true,
      comment,
    });
  } catch (error) {
    console.log("Update comment error", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};




export const toggleLikeComment = async (req, res) => {
  try {
    console.log("line no. 110")
    const REACTION_TYPES = ["like", "dislike", "love", "fire"];
    const { commentId } = req.params;
    const { type } = req.body;
    const userId = req.user._id;

    if (!REACTION_TYPES.includes(type)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid reaction type" 
      });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ success: false, message: "Comment not found" });
    }

    let reaction = await Like.findOne({ user: userId, comment: commentId });

    let message = "Reaction updated";
    if (!reaction) {
      reaction = await Like.create({ user: userId, comment: commentId, type });
    } else if (reaction.type === type) {
      await reaction.deleteOne();
      message = "Reaction removed";
    } else {
      reaction.type = type;
      await reaction.save();
    }

    const reactionCounts = await Like.aggregate([
      { $match: { comment: comment._id } },
      { $group: { _id: "$type", count: { $sum: 1 } } }
    ]);

    const reactions = REACTION_TYPES.reduce((acc, t) => { acc[t] = 0; return acc; }, {});
    reactionCounts.forEach(rc => { reactions[rc._id] = rc.count; });

    res.status(200).json({
      success: true,
      message,
      reactions
    });

  } catch (error) {
    console.error("Toggle reaction comment Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error toggling reaction"
    });
  }
};



export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.staus(404).json({
        success: false,
        message: "Comment not found",
      });
    } else {
      if (
        comment.author.toString() !== req.user._id.toString() &&
        !["admin", "editor"].includes(req.user.role)
      ) {
        return res.status(403).json({
          success: false,
          message: "Not authorized",
        });
      }
      await Comment.findByIdAndDelete(commentId);

      const post = await Post.findById(comment.post);
      if (post) {
        post.commentsCount = Math.max((post.commentsCount || 1) - 1, 0);
        await post.save();
      }
      res.status(200).json({
        success: true,
        messsage: "Comment deleted",
      });
    }
  } catch (error) {
    console.log("Delete comment error: ", error);
    res.status(500).json({
      success: false,
      message: "Server error deleting the comments",
    });
  }
};
