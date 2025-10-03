// api/commentApi.js
import api from ".";

export const createComment = async ({ postId, parent, body }) => {
  const res = await api.post(`/api/comments`, { postId, parent, body });
  return res.data.comment;
};

export const getCommentsByPost = async (postId) => {
  try {
    const res = await api.get(`/api/comments/${postId}`);
    return res.data.comments || []; // Return empty array if no comments
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

export const updateComment = async ({ commentId, body }) => {
  const res = await api.patch(`/api/comments/edit/${commentId}`, { body });
  return res.data.comment;
};

export const toggleLikeComment = async ({ commentId, type }) => {
  const res = await api.patch(`/api/comments/${commentId}/like`, { type });
  return res.data.reactions;
};

export const deleteComment = async (commentId) => {
  const res = await api.delete(`/api/comments/${commentId}`);
  return res.data;
};
