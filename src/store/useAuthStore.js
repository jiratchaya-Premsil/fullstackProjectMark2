import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      myPost: [],
      likedPosts: [],

      login: (userData) =>
        set(() => ({
          user: userData,
          myPost: [],
          likedPosts: [],
        })),


      logout: () =>
        set(() => ({
          user: null,
          myPost: [],
          likedPosts: [],
        })),

      toggleLikePost: (post) => {
        const { likedPosts } = get();

        const exists = likedPosts.find((p) => p.id === post.id);

        if (exists) {
          set({
            likedPosts: likedPosts.filter((p) => p.id !== post.id),
          });
        } else {
          set({
            likedPosts: [...likedPosts, post],
          });
        }
      },
      createPost: (postData) => {
        const { user, myPost } = get();

        const newPost = {
          id: Date.now(),
          author: user?.username,
          ...postData,
        };

        set({
          myPost: [...myPost, newPost],
        });
      },

      isPostLiked: (postId) => {
        return get().likedPosts.some((p) => p.id === postId);
      },
    }),
    {
      name: "auth-storage",
       onRehydrateStorage: () => (state) => {
      state.hasHydrated = true;
       }
    }
  )
);