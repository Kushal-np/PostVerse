import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      enum: ["like", "comment", "follow", "mention"],
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
