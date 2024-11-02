import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the Zustand store with persist middleware
// Remove the userName(and remember to fix it in the login and register forms)
const useAuthStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      accessToken: null,
      userName: null,
      user: null,

      setIsLoggedIn: () => set({ isLoggedIn: true }),
      setIsLoggedOut: () => set({ isLoggedIn: false }),
      setUserName: (name) => set({ userName: name }),
      setAccessToken: (token) => set({ accessToken: token }),
      setUser: (user) => set({ user: user }),
      logOut: () => set({ isLoggedIn: false, accessToken: null, userName: null, user: null }),
    }),
    {
      name: "auth-storage", // name of the storage key in localStorage
      getStorage: () => localStorage, // use localStorage as the storage
    }
  )
);

export default useAuthStore;
