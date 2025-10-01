import api from './index';

export const createPost = async (data) => {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'coverImage' && value instanceof File) {
        formData.append(key, value);
      } else if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });
    const res = await api.post('/api/post', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log('createPost raw response:', res); // Debug
    return res.data.post;
  } catch (error) {
    console.error('createPost error:', error.response?.data || error.message); // Debug
    throw error;
  }
};

export const updatePost = async ({ id, data }) => {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'coverImage' && value instanceof File) {
        formData.append(key, value);
      } else if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });
    const res = await api.put(`/api/post/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log('updatePost raw response:', res); // Debug
    return res.data.post;
  } catch (error) {
    console.error('updatePost error:', error.response?.data || error.message);
    throw error;
  }
};

export const getPosts = async () => {
  try {
    const res = await api.get('/api/post');
    console.log('getPosts raw response:', res); // Debug
    return res.data.posts;
  } catch (error) {
    console.error('getPosts error:', error.response?.data || error.message);
    throw error;
  }
};

export const getFeedPosts = async ({ cursor, limit = 10 }) => {
  try {
    const res = await api.get(`/api/home/feed?cursor=${cursor || ''}&limit=${limit}`);
    console.log('getFeedPosts raw response:', res); // Debug
    return res.data;
  } catch (error) {
    console.error('getFeedPosts error:', error.response?.data || error.message); // Debug
    throw error;
  }
};

export const getPostById = async (id) => {
  try {
    const res = await api.get(`/api/post/${id}`);
    console.log('getPostById raw response:', res); // Debug
    return res.data.post;
  } catch (error) {
    console.error('getPostById error:', error.response?.data || error.message);
    throw error;
  }
};

export const deletePost = async (id) => {
  try {
    const res = await api.delete(`/api/post/${id}`);
    console.log('deletePost raw response:', res); // Debug
    return res.data;
  } catch (error) {
    console.error('deletePost error:', error.response?.data || error.message);
    throw error;
  }
};