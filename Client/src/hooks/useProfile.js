import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfileImage } from "../api/profileApi";

export const useUpdateProfileImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfileImage,
    onSuccess: (data) => {
      // Update the query cache with the new user data
      queryClient.setQueryData(['me'], (old) => {
        if (old && old.Me) {
          return { ...old, Me: { ...old.Me, ...data.user } };
        }
        return old;
      });
      queryClient.invalidateQueries(['me']); // Trigger refetch as backup
    },
  });
};