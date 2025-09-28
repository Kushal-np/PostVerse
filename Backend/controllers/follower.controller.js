import Follow from "../models/follow.model.js";
import User from "../models/user.model.js";

export const followUser = async (req, res) => {
  try {
    const userToFollowId = req.params.userId;
    const currentUserId = req.user._id;

    if (userToFollowId.toString() === currentUserId.toString()) {
      return res.status(400).json({ success: false, message: "Cannot follow yourself" });
    }

    const follow = await Follow.create({
      follower: currentUserId,
      following: userToFollowId
    });

    res.status(201).json({ success: true, message: "User followed", follow });
  } catch (error) {
    console.error("Follow User Error:", error);
    res.status(500).json({ success: false, message: "Server error following user" });
  }
};

export const unfollowUser = async (req, res) => {
  try {
    const userToUnfollowId = req.params.userId;
    const currentUserId = req.user._id;

    const follow = await Follow.findOneAndDelete({
      follower: currentUserId,
      following: userToUnfollowId
    });

    if (!follow) {
      return res.status(404).json({ success: false, message: "Follow relationship not found" });
    }

    res.status(200).json({ success: true, message: "User unfollowed" });
  } catch (error) {
    console.error("Unfollow User Error:", error);
    res.status(500).json({ success: false, message: "Server error unfollowing user" });
  }
};

export const getFollowers = async (req, res) => {
  try {
    const userId = req.params.userId;

    const followers = await Follow.find({ following: userId })
      .populate("follower", "username email role");

    const following = await Follow.find({ follower: userId })
      .populate("following", "username email role");

    res.status(200).json({ success: true, followers, following });
  } catch (error) {
    console.error("Get Followers Error:", error);
    res.status(500).json({ success: false, message: "Server error fetching followers" });
  }
};
