// src/pages/FeedPage.jsx
import { usePosts, useDeletePost } from "../queries/usePost.js";

export default function FeedPage() {
  const { data: posts, isLoading, isError, error } = usePosts();
  const deleteMutation = useDeletePost();

  const handleDelete = (postId) => {
    if (confirm("Are you sure you want to delete this post?")) {
      deleteMutation.mutate(postId);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}

      {/* Main Content */}
      <main className="pt-16">
        <div className="max-w-2xl mx-auto px-4 py-8">
          {isLoading && <p className="text-center text-neutral-400">Loading posts...</p>}

          {isError && (
            <p className="text-center text-red-500">
              Error loading posts: {error?.message || "Unknown error"}
            </p>
          )}

          {!isLoading && posts?.length === 0 && (
            <p className="text-center text-neutral-400">No posts yet. Be the first to post!</p>
          )}

          <div className="space-y-6">
            {posts?.map((post) => (
              <div
                key={post._id}
                className="bg-neutral-900 border border-neutral-800 rounded-md p-4"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-neutral-800" />
                  <div>
                    <p className="text-sm font-medium">{post.user?.username || "Unknown"}</p>
                    <p className="text-xs text-neutral-500">
                      {new Date(post.createdAt).toLocaleTimeString()} • {new Date(post.createdAt).toDateString()}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-neutral-300">{post.content}</p>

                {/* Delete Button */}
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="px-2 py-1 text-xs rounded-md bg-red-700 hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
