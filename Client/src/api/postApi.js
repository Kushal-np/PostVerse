import api from ".";

export const createPost = async (data) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (key === "coverImage" && value instanceof File) {
      formData.append(key, value);
    } else if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });
  const res = await api.post("/api/post", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.post;
};

export const updatePost = async ({ id, data }) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (key === "coverImage" && value instanceof File) {
      formData.append(key, value);
    } else if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });
  const res = await api.put(`/api/post/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.post;
};

export const getPosts = async () => {
  const res = await api.get("/api/post");
  return res.data.posts;
};

export const getFeedPosts = async ({ cursor, limit = 10 }) => {
  const res = await api.get(`/api/home/feed?cursor=${cursor || ""}&limit=${limit}`);
  return res.data;
};

export const getPostById = async (id) => {
  const res = await api.get(`/api/post/${id}`);
  return res.data.post;
};

export const deletePost = async (id) => {
  const res = await api.delete(`/api/post/${id}`);
  return res.data;
};
