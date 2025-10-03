import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePostById } from "../hooks/usePosts";
import { useGetLikes } from "../hooks/useLikes";
import PostCard from "../components/PostCard";
import CommentList from "../components/CommentList";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: post, isLoading, isError, error, refetch } = usePostById(id);
  const { data: likes, isLoading: isLoadingLikes } = useGetLikes(id);

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id, refetch]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError || !post) {
    console.error("Post detail error:", error);
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <ErrorMessage message={error?.message || "Post not found"} />
            <button
              onClick={() => navigate(-1)}
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors duration-200 font-medium shadow-sm"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors duration-200 font-medium group"
        >
          <svg
            className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Posts
        </button>

        {/* Post Card */}
        <div className="mb-8">
          <PostCard post={post} />
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            <h2 className="text-2xl font-bold text-slate-900">Comments</h2>
          </div>
          <CommentList postId={id} />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;