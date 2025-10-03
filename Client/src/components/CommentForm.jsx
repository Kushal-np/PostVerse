// components/CommentForm.jsx
import React, { useState } from "react";
import { useCreateComments } from "../hooks/useComments";
import useAuthStore from "../stores/authStore";

const CommentForm = ({ postId, parent = null }) => {
  const { user } = useAuthStore();
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const { mutate, isLoading } = useCreateComments();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    
    if (!body.trim()) {
      setError("Comment cannot be empty");
      return;
    }
    
    mutate(
      { postId, parent, body },
      {
        onSuccess: () => {
          setBody("");
          setError("");
        },
        onError: (error) => {
          setError(error.message || "Failed to post comment");
        },
      }
    );
  };

  const handleChange = (e) => {
    setBody(e.target.value);
    if (error) setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="mb-3">
        <div className="flex items-start gap-3">
          {/* User Avatar Placeholder */}
          <div className="flex-shrink-0 mt-1">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold shadow-sm">
              {user?.name ? user.name.charAt(0).toUpperCase() : "G"}
            </div>
          </div>
          
          {/* Textarea Container */}
          <div className="flex-1">
            <textarea
              value={body}
              onChange={handleChange}
              placeholder={
                user 
                  ? "Share your thoughts..." 
                  : "Write a comment as guest..."
              }
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 text-slate-700 placeholder-slate-400"
              rows="3"
              required
            />
            
            {/* Error Message */}
            {error && (
              <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-3 border-t border-slate-100">
        <div className="text-sm text-slate-500">
          {body.length > 0 && (
            <span className="flex items-center gap-1">
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              {body.length} characters
            </span>
          )}
        </div>
        
        <div className="flex gap-2">
          {body.trim() && (
            <button
              type="button"
              onClick={() => {
                setBody("");
                setError("");
              }}
              className="px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
          )}
          
          <button
            type="submit"
            disabled={isLoading || !body.trim()}
            className="px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-sm hover:shadow-md flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Posting...
              </>
            ) : (
              <>
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
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                Post Comment
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;