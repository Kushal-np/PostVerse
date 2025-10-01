import React, { useState } from "react";
import useAuthStore from "../stores/authStore";
import { useCreatePost, useUpdatePost } from "../hooks/usePosts";
import { useNavigate } from "react-router-dom";
import { FiImage, FiCamera, FiMapPin, FiSmile } from "react-icons/fi";

function PostForm({ post }) {
  const { user } = useAuthStore();
  const [title, setTitle] = useState(post?.title || "");
  const [bodyMarkDown, setBodyMarkDown] = useState(post?.bodyMarkDown || "");
  const [status, setStatus] = useState(post?.status || "draft");
  const [visibility, setVisibility] = useState(post?.visibility || "public");
  const [coverImage, setCoverImage] = useState(null);

  const { mutate: createPost, isLoading: isCreating, error: createError } = useCreatePost();
  const { mutate: updatePost, isLoading: isUpdating, error: updateError } = useUpdatePost();
  const navigate = useNavigate();

  if (!user || !["writer", "editor", "admin"].includes(user?.role)) {
    return (
      <p className="text-center text-red-500 font-semibold mt-6">
        You are not authorized to create posts
      </p>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    const data = { title, slug, bodyMarkDown, status, visibility };
    if (coverImage && coverImage instanceof File) data.coverImage = coverImage;

    if (post) {
      updatePost(
        { id: post._id || post.id, data },
        {
          onSuccess: () => navigate(`/post/${post._id || post.id}`),
          onError: (error) => alert(error.message || "Failed to update post"),
        }
      );
    } else {
      createPost(data, {
        onSuccess: () => navigate("/feed"),
        onError: (error) => alert(error.message || "Failed to create post"),
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-900 text-white rounded-2xl shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {post ? "Edit Post" : "Create Post"}
      </h2>

      {/* Post Body + Avatar */}
      <div className="flex gap-4 mb-4">
        <img
          src={user?.avatar || "/default-avatar.png"}
          alt="Avatar"
          className="w-12 h-12 rounded-full object-cover"
        />
        <textarea
          value={bodyMarkDown}
          onChange={(e) => setBodyMarkDown(e.target.value)}
          placeholder="What's happening?"
          className="flex-1 p-4 bg-gray-800 rounded-xl resize-none placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
        />
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-4 text-gray-400 text-xl">
          <label className="cursor-pointer hover:text-blue-400 transition">
            <FiImage />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setCoverImage(e.target.files[0])}
            />
          </label>
          <label className="cursor-pointer hover:text-blue-400 transition">
            <FiCamera />
          </label>
          <label className="cursor-pointer hover:text-blue-400 transition">
            <FiSmile />
          </label>
          <label className="cursor-pointer hover:text-blue-400 transition">
            <FiMapPin />
          </label>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isCreating || isUpdating}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-full font-semibold transition disabled:opacity-50"
        >
          {isCreating || isUpdating ? "Posting..." : post ? "Update" : "Post"}
        </button>
      </div>

      {/* Extra Settings */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="draft">Draft</option>
          <option value="published">Publish</option>
        </select>
        <select
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
          className="p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>

      {/* Error Message */}
      {(createError || updateError) && (
        <p className="text-red-500 mt-2 text-center font-medium">
          {createError?.message || updateError?.message || "An error occurred"}
        </p>
      )}
    </div>
  );
}

export default PostForm;
