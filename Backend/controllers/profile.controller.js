import User from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

export const updateProfileImage = async (req, res) => {
  try {
    const userId = req.user._id;
    const { type } = req.body; // "profile" or "cover"

    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    const uploadFromBuffer = (buffer) =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "users" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });

    const result = await uploadFromBuffer(req.file.buffer);

    const updateField =
      type === "cover"
        ? { coverPicture: result.secure_url }
        : { profilePicture: result.secure_url };

    const updatedUser = await User.findByIdAndUpdate(userId, { $set: updateField }, { new: true })
      .select("username email profilePicture coverPicture");

    res.status(200).json({
      success: true,
      message: `${type} picture updated`,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update profile image error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
