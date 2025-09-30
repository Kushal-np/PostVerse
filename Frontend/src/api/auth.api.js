import api from "./axios";


export const signUp = async(userData) =>{
    const res = await api.post("/user/register" , userData) ; 
    return res.data; 
};

export const login = async(credentials) =>{
    const res = await api.post("/user/signin" , credentials);
    return res.data ; 
};

export const signOut = async()=>{
    const res = await api.post("/user/signout") ; 
    return res.data ; 
};

export const getMe = async() =>{
    const res = await api.get("/me");
    return res.data ; 
}

export const fetchAllUsers = async() =>{
    const res = await api.get("/AllUsers") ; 
    return res.data 
}