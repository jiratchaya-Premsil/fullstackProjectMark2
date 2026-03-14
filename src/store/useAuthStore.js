import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      myPost: [],
      likeedPost:[],

      login: (userData) =>
        set(() => ({
          user: userData,
           myPost: [],
          likeedPost:[],
        })),

      logout: () =>
        set(() => ({
          user: null,
           myPost: [],
      likeedPost:[],
        })),
    }),
    {
      name: "auth-storage", // key in localStorage
      onRehydrateStorage: () => (state) => {
      state.hasHydrated = true;
    },
    }
  )
);
