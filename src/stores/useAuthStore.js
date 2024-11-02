import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the Zustand store with persist middleware
const useAuthStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      accessToken: null,

      login: (userData) => set({ isLoggedIn: true, user: userData }),
      logout: () => set({ isLoggedIn: false, user: null }),
      setAccessToken: (token) => set({ accessToken: token }),
    }),
    {
      name: "auth-storage", // name of the storage key in localStorage
      getStorage: () => localStorage, // use localStorage as the storage
    }
  )
);

export default useAuthStore;
