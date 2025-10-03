// components/CommentList.jsx
import React from "react";
import { useGetCommentByPostId } from "../hooks/useComments";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

const CommentList = ({ postId }) => {
  const { data: comments, isLoading, isError, error } = useGetCommentByPostId(postId);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage message={error.message} />;

  return (
    <div className="space-y-4">
      {/* Comment Form */}
      <CommentForm postId={postId} />

      {/* Comments */}
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} />
        ))
      ) : (
        <p className="text-gray-500">No comments yet.</p>
      )}
    </div>
  );
};

export default CommentList;
