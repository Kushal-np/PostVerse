import api from "./index.js"

export const register = async(data) =>{
    api.post('/api/user/register' , data)  
}

export const signin = async(data) =>{
   return  api.post('api/user/signin' , data)
}

export const signout = async(data) =>{
    api.post('/api/user/signout')
}

export const getMe = async() =>{
    const response = await api.get("/api/user/me");
    return response.data;
}

export const updateTheme = async(id,theme) =>{
    api.patch(`api/user/${id}/theme`)    
}