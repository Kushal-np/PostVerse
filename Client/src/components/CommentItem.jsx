// components/CommentItem.jsx
import React from "react";

const CommentItem = ({ comment }) => {
  // Safely access comment properties
  const authorName = comment?.author?.username || "Anonymous";
  const commentBody = comment?.body || "No content";
  const createdAt = comment?.createdAt;
  const isAnonymous = !comment?.author?.username;

  // Format date
  const formatDate = (date) => {
    if (!date) return "";
    const commentDate = new Date(date);
    const now = new Date();
    const diffInMs = now - commentDate;
    const diffInMinutes = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMs / 3600000);
    const diffInDays = Math.floor(diffInMs / 86400000);

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return commentDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: commentDate.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  return (
    <div className="group p-5 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 hover:shadow-md transition-all duration-200 mb-3">
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold shadow-sm ${
            isAnonymous 
              ? "bg-gradient-to-br from-slate-400 to-slate-500" 
              : "bg-gradient-to-br from-blue-500 to-purple-500"
          }`}>
            {authorName.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Comment Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <span className="font-semibold text-slate-900">
              {authorName}
            </span>
            
            {isAnonymous && (
              <span className="px-2 py-0.5 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">
                Guest
              </span>
            )}
            
            {createdAt && (
              <>
                <span className="text-slate-400">•</span>
                <span className="text-sm text-slate-500">
                  {formatDate(createdAt)}
                </span>
              </>
            )}
          </div>

          {/* Comment Body */}
          <p className="text-slate-700 leading-relaxed whitespace-pre-wrap break-words">
            {commentBody}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">

            

          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;