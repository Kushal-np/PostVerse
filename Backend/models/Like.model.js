// models/Like.model.js
import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.Mixed, // Allows both ObjectId and String
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    type: {
      type: String,
      enum: ["like", "dislike", "love", "fire"],
      default: "like",
    },
  },
  { timestamps: true }
);

const Like = mongoose.model("Like", likeSchema);

export default Like; // Export the model, not the schema
