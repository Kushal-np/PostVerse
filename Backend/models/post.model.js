import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      text: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    summary: String,
    bodyMarkDown: String,
    bodyHtml: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    collaborators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    tags: [String],
    categories: [String],
    coverImage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived", "scheduled"],
      default: "draft",
    },
    visibility: {
      type: String,
      enum: ["public", "unlisted", "private"],
      default: "public",
    },
    readTimeMins: Number,
    clapsCount: {
      type: Number,
      default: 0,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    publishedAt: Date,
    scheduledAt: Date,
    canonicalUrl: String,
    meta: {
      title: String,
      description: String,
      ogImage: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
