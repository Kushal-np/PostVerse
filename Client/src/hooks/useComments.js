// hooks/useComments.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createComment,
  deleteComment,
  getCommentsByPost,
  toggleLikeComment,
  updateComment,
} from "../api/commentApi";

export const useCreateComments = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createComment,
    onSuccess: (res, { postId }) => {
      queryClient.invalidateQueries(["comments", postId]);
    },
    onError: (error) => {
      console.error("Create comment error:", error);
    }
  });
};

export const useGetCommentByPostId = (postId) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getCommentsByPost(postId),
    enabled: !!postId,
    retry: 1,
    onError: (error) => {
      console.error("Get comments error:", error);
    }
  });
};

// ... rest of the hooks remain the same
