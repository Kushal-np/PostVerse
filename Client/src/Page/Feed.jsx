import React from "react";
import { useFeedPosts } from "../hooks/usePosts";
import useAuthStore from "../stores/authStore";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

function Feed() {
  const { user } = useAuthStore();
  const { data, fetchNextPage, hasNextPage, isLoading, error } = useFeedPosts();
  const posts = data?.pages?.flatMap((page) => page.posts || []) || [];

  const handleEdit = (post) => {
    // Navigate to edit page or open modal
  };

  const handleDelete = (post) => {
    // Delete logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 px-4 py-8">
      {/* Feed Header */}
      <h1 className="text-4xl font-bold text-center text-white mb-8">Your Feed</h1>
      {/* Post Creation Form */}
      {user && ["writer", "editor", "admin"].includes(user.role) && (
        <div className="max-w-lg mx-auto mb-10">
          <PostForm />
        </div>
      )}
      {/* Loading / Error / Empty State */}
      {isLoading && <p className="text-gray-300 text-center text-lg">Loading posts...</p>}
      {error && <p className="text-red-400 text-center text-lg">{error.message}</p>}
      {posts.length === 0 && !isLoading && !error && (
        <p className="text-gray-300 text-center text-lg">No posts available</p>
      )}
      {/* Posts */}
      <div className="flex flex-col items-center gap-6 max-w-lg mx-auto">
        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
      {/* Load More */}
      {hasNextPage && (
        <div className="text-center mt-8">
          <button
            onClick={() => fetchNextPage()}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 text-sm"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Feed;