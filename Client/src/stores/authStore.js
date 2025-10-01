import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      setUser: (user, token) => {
        console.log('setUser called:', { user, token }); // Debug
        set({ user, token });
      },
      logout: () => {
        console.log('logout called'); // Debug
        set({ user: null, token: null });
      },
      updateTheme: (theme) => {
        console.log('updateTheme called:', { theme }); // Debug
        set((state) => ({
          user: state.user ? { ...state.user, theme } : null,
        }));
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        console.log('Rehydrated state:', state); // Debug
      },
    }
  )
);

export default useAuthStore;