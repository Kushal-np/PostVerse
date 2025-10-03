import { useMutation, useQuery } from "@tanstack/react-query";
import {
  register,
  signin,
  signout,
  getMe,
  updateTheme,
} from "../api/authApi.js";
import useAuthStore from "../stores/authStore";

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
  });
};

export const useSignin = () => {
  const setUser = useAuthStore((state) => state.setUser);
  return useMutation({
    mutationFn: signin,
    onSuccess: (res) => {
      setUser(res.data.user, res.data.token);
    },
    onError: (error) => {
      return { message: error.response?.data?.message || "Login failed" };
    },
  });
};

export const useSignOut = () => {
  const logout = useAuthStore((state) => state.logout);
  return useMutation({
    mutationFn: signout,
    onSuccess: logout,
    onError: (error) => {
      return { message: error.response?.data?.message || "Logout failed" };
    },
  });
};

export const useGetMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });
};

export const useUpdateTheme = () => {
  const queryClient = useQueryClient();
  const updateThemeStore = useAuthStore((state) => state.updateTheme);
  return useMutation({
    mutationFn: ({ id, theme }) => updateTheme(id, theme),
    onSuccess: (res) => {
      updateThemeStore(res.data.user.settings.theme);
      queryClient.invalidateQueries(["me"]);
    },
  });
};
