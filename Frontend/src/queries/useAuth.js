import {useMutation} from "@tanstack/react-query"
import { fetchAllUsers, login, signOut, signUp } from "../api/auth.api.js";



export const useLogin = () => useMutation({
    mutationFn:async(credentials)=>{
        const data = await login(credentials);
        return data ; 
    }
});
export const useSignUp = () => useMutation({
    mutationFn:async(userData)=>{
        const data = await signUp(userData);
        return data ; 
    }
});
export const useSignOut = () => useMutation(signOut);
export const useAllUsers = ()=> useMutation(fetchAllUsers);