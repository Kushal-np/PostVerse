import api from ".";

export const unifiedSearch = async (q) => {
  const res = await api.get(`/api/search/search?q=${q}`);
  return res.data;
};
