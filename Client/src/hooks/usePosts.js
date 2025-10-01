import { useMutation, useQueryClient, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { createPost, deletePost, getFeedPosts, getPostById, getPosts, updatePost } from '../api/postApi';
import useAuthStore from '../stores/authStore';

export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await getPosts();
      console.log('usePosts response:', res); // Debug
      return res;
    },
    enabled: !!useAuthStore.getState().token,
  });
};

export const useFeedPosts = () => {
  return useInfiniteQuery({
    queryKey: ['feed'],
    queryFn: async ({ pageParam }) => {
      const res = await getFeedPosts({ cursor: pageParam });
      console.log('useFeedPosts response:', res); // Debug
      if (!res) {
        throw new Error('No feed data');
      }
      return res;
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: '',
    enabled: !!useAuthStore.getState().token,
  });
};

export const usePostById = (id) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      const res = await getPostById(id);
      console.log('usePostById response:', res); // Debug
      return res;
    },
    enabled: !!id && !!useAuthStore.getState().token,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: (res) => {
      console.log('CreatePost response:', res); // Debug
      if (!res) {
        console.error('CreatePost: No response data');
        throw new Error('No response data');
      }
      console.log('CreatePost success:', res); // Debug
      queryClient.invalidateQueries(['posts']);
    },
    onError: (error) => {
      console.error('CreatePost error:', error.response?.data || error.message); // Debug
      return { message: error.response?.data?.message || 'Failed to create post' };
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePost,
    onSuccess: (res) => {
      console.log('UpdatePost response:', res); // Debug
      if (!res) {
        console.error('UpdatePost: No response data');
        throw new Error('No response data');
      }
      console.log('UpdatePost success:', res); // Debug
      queryClient.invalidateQueries(['posts']);
    },
    onError: (error) => {
      console.error('UpdatePost error:', error.response?.data || error.message); // Debug
      return { message: error.response?.data?.message || 'Failed to update post' };
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      console.log('DeletePost success'); // Debug
      queryClient.invalidateQueries(['posts']);
      queryClient.invalidateQueries(['feed']);
    },
    onError: (error) => {
      console.error('DeletePost error:', error.response?.data || error.message); // Debug
      return { message: error.response?.data?.message || 'Failed to delete post' };
    },
  });
};