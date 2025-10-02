import api from ".";

export const toggleLikePost = async({postId , type}) =>{
    const res = await api.patch(`/api/likes/post/${postId}/toggle`,{type});
    return res.data.reactions;
};


export const getLikes = async(postId) =>{
    const res = await api.get(`/api/likes/post/${postId}`);
    return res.data.likes; 
}