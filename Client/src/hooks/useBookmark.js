import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBookmark, removeBookmark } from "../api/bookmarkApi";

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