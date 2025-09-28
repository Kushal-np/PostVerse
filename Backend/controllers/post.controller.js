import Post from "../models/post.model.js";
import Media from "../models/Media.model.js";
import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js"

export const createPost = async (req, res) => {
  try {
    console.log("req.user:", req.user);

    const { title, slug, bodyMarkDown, status, visibility } = req.body;

    let coverImageDoc;

    if (req.file) {
      const streamUpload = (reqFile) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "blog_posts" },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          streamifier.createReadStream(reqFile.buffer).pipe(stream);
        });
      };

      const result = await streamUpload(req.file);

      coverImageDoc = await Media.create({
        url: result.secure_url,
        filename: req.file.originalname,
        mimeType: req.file.mimetype,
        uploadedBy: req.user._id,
      });
    }

    const publishedAt = status === "published" ? new Date() : null;

    const newPost = await Post.create({
      title,
      slug,
      bodyMarkDown,
      author: req.user._id,
      coverImage: coverImageDoc ? coverImageDoc._id : null,
      status: status || "draft",
      visibility: visibility || "public",
      publishedAt,
    });

    const populatedPost = await Post.findById(newPost._id)
    .populate("coverImage")
    .populate("author" , "username role");

    res.status(201).json({ success: true, post:populatedPost });
  } catch (err) {
    console.error("Create Post Error:", err);
    res.status(500).json({ success: false, message: "Server error creating post" });
  }
};

export const getPosts = async (req, res) => {
  try {
    const filter = { visibility: "public" };
    if (req.user) {
      filter.$or = [{ visibility: "public" }, { author: req.user._id }];
    }

    const posts = await Post.find(filter)
      .populate("author", "username role")
      .populate("coverImage");

    res.status(200).json({ success: true, posts });
  } catch (err) {
    console.error("Get Posts Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "username role")
      .populate("coverImage");

    if (!post) return res.status(404).json({ success: false, message: "Post not found" });

    if (post.visibility === "private" && (!req.user || req.user._id.toString() !== post.author._id.toString())) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    res.status(200).json({ success: true, post });
  } catch (err) {
    console.error("Get Post Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post)
      return res.status(404).json({ success: false, message: "Post not found" });

    // Authorization check
    if (
      post.author.toString() !== req.user._id.toString() &&
      !["admin", "editor"].includes(req.user.role)
    ) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    // Handle cover image upload if provided
    if (req.file) {
      const streamUpload = (reqFile) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "blog_posts" },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          streamifier.createReadStream(reqFile.buffer).pipe(stream);
        });
      };

      const result = await streamUpload(req.file);

      const coverImageDoc = await Media.create({
        url: result.secure_url,
        filename: req.file.originalname,
        mimeType: req.file.mimetype,
        uploadedBy: req.user._id,
      });

      req.body.coverImage = coverImageDoc._id;
    }

    // Update fields
    Object.assign(post, req.body);

    // If post is published now and wasn't before
    if (req.body.status === "published" && !post.publishedAt) {
      post.publishedAt = new Date();
    }

    await post.save();

    // Populate before sending
    const populatedPost = await Post.findById(post._id)
      .populate("coverImage")
      .populate("author", "username role");

    res.status(200).json({ success: true, post: populatedPost });
  } catch (err) {
    console.error("Update Post Error:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error updating post" });
  }
};


export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });

    if (post.author.toString() !== req.user._id.toString() && !["admin", "editor"].includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    await post.deleteOne();

    res.status(200).json({ success: true, message: "Post deleted" });
  } catch (err) {
    console.error("Delete Post Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
