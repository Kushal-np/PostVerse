export const unifiedSearch = async(q) =>{
    const res = await api.post(`/api/search` , {q});
    return res.data ; 
};

