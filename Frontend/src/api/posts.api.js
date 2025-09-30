// endpoint : /api/post/ for create post
// get - /api/post/ for getPost
// get - /api/post/${id} for getting individual post 
// put - /api/post/${id} for editing individual post
// delete - /api/post/${id} for deleting the posts

import api from "./axios.js"



export const createPost = async(postData) =>{
    const formData = new FormData();
    for(let key in postData){
        if(key == "tags" || key == "categories"){
            formData.append(key , postData[key]);
        }
        else{
            formData.append(key , postData[key]);
        }
    }
    const response = await api.post("/post" , formData);
    return response.data ; 
};


export const getPosts = async() =>{
    const response = await api.get("/post");
    return response.data ; 
}

export const getPostById = async(postId) =>{
    const response = await api.get(`/post/${postId}`);
    return response.data ; 
};

export const updatePost = async(postId , postData) =>{
    const formData = new FormData();
    for(let key in postData) {
        if(key === "tags" || key === "categories"){
            formData.append(key , postData[key]);
        }
        else{
            formData.append(key , postData[key]);
        }
    }
    const response = await api.put(`/post/${postId}` , formData)
    return response.data;
}


export const deletePost = async(postId) =>{
    const response = await api.delete(`/post/${id}`);
    return response.data ; 
}