// components/PostCard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../stores/authStore";
import { useDeletePost } from "../hooks/usePosts";
import { useToggleLikePost, useGetLikes } from "../hooks/useLikes";

// Simple function to check if a string is a valid MongoDB ObjectId
const isValidObjectId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

const PostCard = ({ post }) => {
  const { user } = useAuthStore();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { mutate: deletePost, isLoading: isDeleting } = useDeletePost();
  const { mutate: toggleLike, isLoading: isLiking } = useToggleLikePost();
  const { data: likes, isLoading: isLoadingLikes } = useGetLikes(
    isValidObjectId(post._id) ? post._id : null
  );

  const handleDelete = () => {
    deletePost(post._id, {
      onSuccess: () => {
        setShowDeleteModal(false);
      },
      onError: (error) => {
        alert(error.message);
      },
    });
  };

  const handleLike = (type) => {
    if (!isValidObjectId(post._id)) {
      return;
    }
    toggleLike(
      { postId: post._id, type },
      {
        onError: (error) => {
          alert(error.response?.data?.message || "Failed to react");
        },
      }
    );
  };

  const formatDate = (date) => {
    if (!date) return "";
    const postDate = new Date(date);
    return postDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      published: "bg-green-100 text-green-700 border-green-200",
      draft: "bg-yellow-100 text-yellow-700 border-yellow-200",
      archived: "bg-gray-100 text-gray-700 border-gray-200",
    };
    return statusStyles[status] || statusStyles.draft;
  };

  const getVisibilityIcon = (visibility) => {
    if (visibility === "public") {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    }
    return (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    );
  };

  const canModifyPost = user && 
    ["writer", "editor", "admin"].includes(user.role) && 
    post.author?._id?.toString() === user.id?.toString();

  return (
    <>
      <article className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        {/* Cover Image with Overlay */}
        {post.coverImage && (
          <Link to={`/post/${post._id}`} className="block relative overflow-hidden">
            <div className="relative h-56 bg-gradient-to-br from-slate-100 to-slate-200">
              <img
                src={post.coverImage.url}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Status Badge on Image */}
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${getStatusBadge(post.status)}`}>
                  {post.status}
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Content Container */}
        <div className="p-6">
          {/* Author & Meta Info */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-sm">
                {post.author?.username?.charAt(0).toUpperCase() || "A"}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-900">
                  {post.author?.username || "Anonymous"}
                </span>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <time>{formatDate(post.createdAt)}</time>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    {getVisibilityIcon(post.visibility)}
                    <span className="capitalize">{post.visibility}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Edit/Delete Menu (for authors) */}
            {canModifyPost && (
              <div className="flex items-center gap-2">
                <Link
                  to={`/post/${post._id}/edit`}
                  className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  title="Edit post"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </Link>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                  title="Delete post"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Post Title */}
          <Link to={`/post/${post._id}`} className="block mb-3 group">
            <h2 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 leading-tight">
              {post.title}
            </h2>
          </Link>

          {/* Post Excerpt */}
          <p className="text-slate-600 leading-relaxed mb-4 line-clamp-3">
            {post.bodyMarkDown?.substring(0, 200)}...
          </p>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-4" />

          {/* Interaction Bar */}
          <div className="flex items-center justify-between">
            {/* Reaction Buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleLike("like")}
                disabled={isLiking}
                className="group/btn flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200 disabled:opacity-50"
              >
                <span className="text-xl group-hover/btn:scale-125 transition-transform duration-200">👍</span>
                <span className="text-sm font-semibold text-slate-700 group-hover/btn:text-blue-600">
                  {isLoadingLikes ? "..." : likes?.like || 0}
                </span>
              </button>

              <button
                onClick={() => handleLike("love")}
                disabled={isLiking}
                className="group/btn flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-pink-50 transition-all duration-200 disabled:opacity-50"
              >
                <span className="text-xl group-hover/btn:scale-125 transition-transform duration-200">❤️</span>
                <span className="text-sm font-semibold text-slate-700 group-hover/btn:text-pink-600">
                  {isLoadingLikes ? "..." : likes?.love || 0}
                </span>
              </button>

              <button
                onClick={() => handleLike("fire")}
                disabled={isLiking}
                className="group/btn flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-orange-50 transition-all duration-200 disabled:opacity-50"
              >
                <span className="text-xl group-hover/btn:scale-125 transition-transform duration-200">🔥</span>
                <span className="text-sm font-semibold text-slate-700 group-hover/btn:text-orange-600">
                  {isLoadingLikes ? "..." : likes?.fire || 0}
                </span>
              </button>
            </div>

            {/* Comments Link */}
            <Link
              to={`/post/${post._id}`}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-all duration-200 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-sm">
                {post.commentsCount || 0}
              </span>
            </Link>
          </div>
        </div>
      </article>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Delete Post</h3>
                <p className="text-sm text-slate-600">This action cannot be undone</p>
              </div>
            </div>

            <p className="text-slate-700 mb-6">
              Are you sure you want to delete "<span className="font-semibold">{post.title}</span>"? All comments and reactions will be permanently removed.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Deleting...
                  </>
                ) : (
                  "Delete Post"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostCard;