import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addBookmark, getAllBookmarks, removeBookmark } from "../api/bookmarkApi";
import useAuthStore from "../stores/authStore";

export const useAddBookmark = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:addBookmark , 
        onSuccess:()=>{
            queryClient.invalidateQueries(['bookmarks']);
        },
    });
;
}


export const useRemoveBookmark = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: removeBookmark , 
        onSuccess: () =>{
            queryClient.invalidateQueries(['bookmarks']);
        },
    });
}

export const useGetAllBookmarks = () => {
  return useQuery({
    queryKey: ['bookmarks'],
    queryFn: getAllBookmarks,
    enabled: !!useAuthStore.getState().token,
  });
};