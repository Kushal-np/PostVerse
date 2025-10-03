import React, { useState } from "react";
import { useCreatePost, useUpdatePost } from "../hooks/usePosts";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";

const PostForm = ({ post }) => {
  const { user } = useAuthStore();
  const [title, setTitle] = useState(post?.title || "");
  const [bodyMarkDown, setBodyMarkDown] = useState(post?.bodyMarkDown || "");
  const [status, setStatus] = useState(post?.status || "draft");
  const [visibility, setVisibility] = useState(post?.visibility || "public");
  const [coverImage, setCoverImage] = useState(null);
  const { mutate: createPost, isLoading: isCreating } = useCreatePost();
  const { mutate: updatePost, isLoading: isUpdating } = useUpdatePost();
  const navigate = useNavigate();

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

  if (!user || !["writer", "editor", "admin"].includes(user?.role)) {
    return (
      <p className="text-center text-red-500 font-semibold mt-6">
        You are not authorized to create posts
      </p>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {post ? "Edit Post" : "Create Post"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="body">
            Content
          </label>
          <textarea
            id="body"
            value={bodyMarkDown}
            onChange={(e) => setBodyMarkDown(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="coverImage">
            Cover Image
          </label>
          <input
            id="coverImage"
            type="file"
            onChange={(e) => setCoverImage(e.target.files[0])}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="visibility">
            Visibility
          </label>
          <select
            id="visibility"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={isCreating || isUpdating}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            {isCreating || isUpdating ? "Saving..." : post ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
