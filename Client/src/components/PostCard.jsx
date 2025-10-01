import React from "react";
import useAuthStore from "../stores/authStore";
import { useDeletePost } from "../hooks/usePosts";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  const { user } = useAuthStore();
  const { mutate, isLoading } = useDeletePost();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      mutate(post._id, {
        onSuccess: () => alert("Post deleted"),
        onError: (error) => alert(error.message),
      });
    }
  };

  return (
    <div className="bg-gray-800 text-gray-100 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 max-w-2xl mx-auto">
      
      {/* Cover Image */}
      {post.coverImage && (
        <img
          src={post.coverImage.url}
          alt="Post Cover"
          className="w-full h-60 object-cover"
        />
      )}

      {/* Content */}
      <div className="p-6 flex flex-col gap-3">
        {/* Title */}
        <h3 className="text-2xl font-semibold hover:text-white transition-colors">
          <Link to={`/post/${post._id}`}>{post.title}</Link>
        </h3>

        {/* Snippet */}
        <p className="text-gray-300 line-clamp-4">{post.bodyMarkDown}</p>

        {/* Post Info */}
        <div className="flex flex-wrap items-center text-gray-400 text-sm gap-4">
          <span>By: {post.author.username}</span>
          <span>Status: {post.status}</span>
          <span>Visibility: {post.visibility}</span>
          <span>Likes: {post.reactions?.like || 0}</span>
        </div>

        {/* Action Buttons */}
        {user &&
          ["writer", "editor", "admin"].includes(user.role) &&
          post.author._id === user.id && (
            <div className="flex gap-3 mt-4">
              <Link
                to={`/post/${post._id}/edit`}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors"
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                disabled={isLoading}
                className="px-4 py-2 bg-red-700 hover:bg-red-600 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {isLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          )}
      </div>
    </div>
  );
};

export default PostCard;
