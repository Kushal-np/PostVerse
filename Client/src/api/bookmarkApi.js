import api from ".";

export const addBookmark = async(postId) =>{
    const res = await api.post(`/api/bookmarks/${postId}`);
    return res.data.bookmarks ; 
}

export const removeBookmark = async(postId) =>{
    const res = await api.delete(`/api/bookmarks/${postId}`);
    return res.data; 
}

export const getAllBookmarks = async() =>{
    const res = await api.get(`/api/bookmarks`);
    return res.data.bookmarks;
}