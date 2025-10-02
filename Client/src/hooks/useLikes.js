import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getLikes, toggleLikePost } from "../api/likeApi";

export const useToggleLikePost = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: toggleLikePost , 
        onSuccess: (res,{postId})=>{
            queryClient.invalidateQueries(['posts']);
            queryClient.invalidateQueries(['post',postId]);

        }
    })
}

export const useGetLikes = (postId) =>{
    return useQuery({
        queryKey:['likes' , postId],
        queryFn:()=>getLikes(postId),
        enabled:!!postId , 
    });
}


