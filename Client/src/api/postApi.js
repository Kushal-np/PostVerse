import api from "./index.js";

export const getPosts = async() =>{
    api.get('/api/post');
}
export const getFeedPosts = async({cursor , limit=10})=>{
    api.get(`/api/home/feed?cursor=${cursor || ''}&limit=${limit}`);
}
export const getPostById = async(id)=>{
    api.get(`/api/post/${id}`);
}
export const createPost = async(data) =>{
    api.post('/api/post' , data);
}
export const updatePost = async(id , data) =>{
    api.patch(`/api/post/${id}` , data)
}
export const deletePost = async(id) =>{
    api.delete(`/api/post/${id}`)
}