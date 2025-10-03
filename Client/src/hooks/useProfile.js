import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfileImage } from "../api/profileApi";

export const useUpdateProfileImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfileImage,
    onSuccess: (data) => {
      queryClient.setQueryData(["me"], (old) => {
        if (old && old.user) {
          return { ...old, user: { ...old.user, ...data } };
        }
        return old;
      });
      queryClient.invalidateQueries(["me"]);
    },
  });
};
