import { useQueryClient } from "@tanstack/react-query";
import { createPost, deletePost, getFeedPosts, getPostById, getPosts, updatePost } from "../api/postApi"
import useAuthStore from "../stores/authStore";




export const usePosts = () =>{
    return useQuery({
        query:['posts'],
        queryFn : async() =>{
            const res = await getPosts();
            return res.data.posts ; 
        },
        enabled: !!useAuthStore.getState().token , 
    });
};


export const useFeedPosts = () =>{
    return useInfinityQuery({
        queryKey:['feed'],
        queryFn:async({pageParam})=>{
            const res = await getFeedPosts({cursor:pageParam});
            return res.data ; 
        },
        getNextPageParam : (lastPage) => lastPage.nextCursor , 
        initialPageParam : '' , 
        enabled: !!useAuthStore.getState().token , 
    })
}


export const usePostById =(id) =>{
    return useQuery({
        queryKey:['post' , id],
        queryFn: async() =>{
            const res = await getPostById(id);
            return res.data.post ; 
        },
        enabled: !!id && !!useAuthStore.getState().token ,
    });
};


export const useCreatePost = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:createPost , 
        onSuccess: () =>{
            queryClient.invalidateQueries(['posts']);
            queryClient.invalidateQueries(['feed'])
        },
        onError: (error)  =>({message: error.response?.data?.message || "Failed to create the post"})
    })
}


export const useUpdatePost = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:({id , data}) => updatePost(id , data) , 
        onSuccess: (_, {id})=>{
            queryClient.invalidateQueries(['posts']);
            queryClient.invalidateQueries(['feed']);
            queryClient.invalidateQueries(['post' , id]);
        },
        onError:(error) =>({
            message: error.response?.data?.message || "Failed to edit the post"
        })
    })

}


export const useDeletePost = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deletePost , 
        onSuccess:() =>{
            queryClient.invalidateQueries(['posts']);
            queryClient.invalidateQueries( ['feed']);
        },
        onError:(error)=>({
            message:error.response?.data?.message || "Failed to delete Post"
        })
    })
}