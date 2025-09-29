import {useMutation} from "@tanstack/react-query"
import { fetchAllUsers, login, signOut, signUp } from "../api/auth.api.js";



export const useLogin = () => useMutation(login);
export const useSignUp = () => useMutation(signUp);
export const useSignOut = () => useMutation(signOut);
export const useAllUsers = ()=> useMutation(fetchAllUsers);