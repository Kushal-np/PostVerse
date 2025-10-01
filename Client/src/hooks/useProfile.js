import { useMutation } from "@tanstack/react-query";
import { updateProfileImage } from "../api/profileApi";

export const useUpdateProfileImage = () => {
  return useMutation({
    mutationFn: updateProfileImage,
  });
};