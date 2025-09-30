import {useMutation , useQueryClient} from "@tanstack/react-query";
import api from "../api/auth.api.js"


export const useCreatePost = () =>{
    const queryClient = useQueryClient();

    return useMutation(
        async(formData) =>{
            const {data} = await api.post("/post")
        }
    )
}