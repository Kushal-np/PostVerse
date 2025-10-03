import api from ".";

export const updateProfileImage = async ({ type, image }) => {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("type", type);
  const res = await api.patch(`/api/pictures/update-image`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.user;
};
