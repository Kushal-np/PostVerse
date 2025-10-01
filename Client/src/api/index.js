import axios from "axios";
import useAuthStore from "../stores/authStore.js"

const api = axios.create({
    baseURL : "http://localhost:3000"
});

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token ; 
    if(token){
        config.headers.Authorization = `Bearer ${token}` ; 
        return config ; 
    }
    return config
});

export default api ;