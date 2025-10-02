import React from "react";
import { useParams } from "react-router-dom";
import { usePostById } from "../hooks/usePosts";
import useAuthStore from "../stores/authStore";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { useGetLikes, useToggleLikePost } from "../hooks/useLikes";
import CommentList from "../components/CommentList";

const PostDetail = () => {
  const { id } = useParams();
  const { user } = useAuthStore();
  const { data: post, isLoading, error } = usePostById(id);
  const { data: likes, isLoading: isLoadingLikes } = useGetLikes(id);
  const { mutate: toggleLikePost, isLoading: isLiking } = useToggleLikePost();

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#0d0d0f] text-gray-300">
        <div className="text-lg animate-pulse">Loading post...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#0d0d0f]">
        <div className="text-red-500 text-xl font-medium">{error.message}</div>
      </main>
    );
  }
  const handlLike = (type) => {
    toggleLikePost({ postId: id, type });
  };

  return (
    <main className="min-h-screen bg-[#0d0d0f] text-gray-100 flex justify-center px-4 py-10">
      <section className="w-full max-w-3xl space-y-8">
        {/* Post Content */}
        <article className="rounded-xl border border-gray-800 bg-[#141416] shadow-lg p-6">
          <PostCard post={post} />
          {isLoadingLikes ? (
            "..."
          ) : (
            <button
              onClick={() => {
                handlLike("like");
              }}
              disabled={isLiking}
            >
              Like ({likes?.like || 0})
            </button>
          )}
        </article>

        {/* Edit Form (if owner) */}
        {user &&
          ["writer", "editor", "admin"].includes(user.role) &&
          post.author._id === user.id && <PostForm post={post} />}
        <CommentList postId={id} />
      </section>
    </main>
  );
};

export default PostDetail;
