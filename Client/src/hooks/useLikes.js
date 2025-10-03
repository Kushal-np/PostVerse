import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getLikes, toggleLikePost } from "../api/likeApi";
import api from "../api";


// useLikes.js

export const useToggleLikePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, type }) =>
      api.patch(`/api/likes/post/${postId}/toggle`, { type }),
    onSuccess: (res, { postId }) => {
      queryClient.invalidateQueries(["posts"]);
      queryClient.invalidateQueries(["post", postId]);
      queryClient.invalidateQueries(["likes", postId]);
    },
    onError: (error) => {
      console.error("Like error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to react");
    },
  });
};

export const useGetLikes = (postId) => {
  return useQuery({
    queryKey: ["likes", postId],
    queryFn: () => api.get(`/api/likes/post/${postId}`).then((res) => res.data.likes),
    enabled: !!postId,
  });
};
