import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment, deleteComment, getCommentsByPost, toggleLikeComment, updateComment } from "../api/commentApi";

export const useCreateComments = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : createComment , 
        onSuccess : (res , {postId}) =>{
            queryClient.invalidateQueries(['comments' , postId]);
        },
    });
};

export const useGetCommentByPostId = (postId) =>{
    return useQuery({
        queryKey : ['comments' , postId],
        queryFn: ()=>getCommentsByPost(postId),
        enabled: !!postId , 

    });
}

export const useUpateComment = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : updateComment , 
        onSuccess: (res,{commentId, postId}) =>{
            queryClient.invalidateQueries(['comments',postId]);
        },
    });
};

export const useToggleLikeComment = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: toggleLikeComment , 
        onSuccess: (res, {commentId,postId}) =>{
            queryClient.invalidateQueries(['comments',postId]);
        },
    });
};

export const useDeleteComment = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteComment , 
        onSuccess: (res,{postId})=>{
            queryClient.invalidateQueries(['comments' , postId]);
        },
    });
};