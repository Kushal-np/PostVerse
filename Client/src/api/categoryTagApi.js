import api from ".";

export const createCategory = async(data) =>{
    const res = await api.post(`/api/CategoryAndTags/categories` , data) ; 
    return res.data.category ; 
};

export const getCategories = async() =>{
    const res = await api.get(`/api/CategoryAndTags/categories`);
    return res.data.categories ; 
}

export const deleteCategory = async() =>{
    const res = await api.delete(`/api/CategoryAndTags/categories/${id}`);
    return res.data;
}

export const createTag = async(data) =>{
    const res = await api.post(`/api/CategoryAndTags/Tags` , data);
    return res.data.tag;
}

export const getTags = async()=> {
    const res = await api.get(`/api/CategoryAndTags/tags`);
    return res.data.tags;
}


export const deleteTag = async()=>{
    const res = await api.delete(`/api/CategoryAndTags/tags/${id}`);
    return res.data;
}