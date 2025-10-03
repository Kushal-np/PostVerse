import Bookmark from "../models/Bookmark.model.js";
import Post from "../models/post.model.js";

export const addBookmark = async (req, res) => {
  try {
    const userId = req.user._id;
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    const existingBookmark = await Bookmark.findOne({ user: userId, post: postId });
    if (existingBookmark) {
      return res.status(400).json({
        success: false,
        message: "Already bookmarked this post",
      });
    }
    const bookmark = await Bookmark.create({ user: userId, post: postId });
    res.status(201).json({
      success: true,
      message: "Post bookmarked",
      bookmark,
    });
  } catch (error) {
    console.log("Error occurred on bookmark", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error occurred",
      error: error.message,
    });
  }
};

export const removeBookmark = async (req, res) => {
  try {
    const userId = req.user._id;
    const { postId } = req.params;
    const bookmark = await Bookmark.findOneAndDelete({ user: userId, post: postId });
    if (!bookmark) {
      return res.status(404).json({
        success: false,
        message: "Bookmark not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Bookmark removed",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllBookmarks = async (req, res) => {
  try {
    const userId = req.user._id;
    const bookmarks = await Bookmark.find({ user: userId }).populate({
      path: "post",
      populate: [
        { path: "author", select: "username role" },
        { path: "coverImage" },
      ],
    });
    res.status(200).json({
      success: true,
      bookmarks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
