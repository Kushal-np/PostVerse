import {Navigate} from "react-router-dom";
import { useAuthStore } from "../../stores/AuthStore.js";

export const ProtectedRoute = ({children , role})=>{
    const {isAuthenticated , user } = useAuthStore();
    if(!isAuthenticated){
        return <Navigate to="/auth/login" /> ; 
    }   
    if(role && user.role !== role){
        return <Navigate to="/" /> ; 
    }
    return children;
}