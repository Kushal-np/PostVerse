import * as postApi from "../api/posts.api.js"

import {useQuery , useMutation , useQueryClient} from "@tanstack/react-query"
//fetch all Posts 

//queries
export const usePosts = () =>{
    return useQuery = (['posts'] , postApi.getPosts , {
        staleTime : 1000 * 60 ,
    })
}

export const usePost = (postId) =>{
    return useQuery(['post' , postId] , ()=> postApi.getPostById(postId) , {
        enabled: !!postId ,
    })
}

//mutations

export const useCreatePost = () =>{
    const queryClient = useQueryClient();
    return useMutation(postApi.createPost , {
        onSuccess:() =>{
            queryClient.invalidateQueries(['posts']);
        },
    })
}

export const useUpdatePost = () =>{
    const queryClient = useQueryClient();
    return useMutation(({postId , data })=> postApi.updatePost(postId , data) , {
        onSuccess: (_ , variables) =>{
            queryClient.invalidateQueries(['posts']);
            queryClient.invalidateQueries(['post' , variables.postId]);
        },
    });
};


export const useDeletePost = () =>{
    const queryClient = useQueryClient();
    return useMutation(postApi.delete , {
        onSuccess:() =>{
            queryClient.invalidateQueries(['posts']);
        },
    });
};