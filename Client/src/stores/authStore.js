import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
      updateTheme: (theme) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                settings: state.user.settings
                  ? { ...state.user.settings, theme }
                  : { theme },
              }
            : null,
        })),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
