import api from ".";

export const followUser = async(userId) =>{
    const res = await api.post(`/api/follow/${userId}`);
    return res.data.follow;
}
export const unfollowUser = async(userId) =>{
    const res = await api.delete(`/api/follow/unfollow/${userId}`);
    return res.data;
}
export const getFollowers = async(userId) =>{
    const res = await api.get(`/api/follow/followers/${userId}`);
    return res.data;
}