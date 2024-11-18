import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: null,
      userName: null,
      venueManager: null,

      setUserName: (name) => set({ userName: name }),
      setAccessToken: (token) => set({ accessToken: token }),
      setVenueManager: (bool) => set({ venueManager: bool }),

      logOut: () => set({ accessToken: null, userName: null, venueManager: null }),
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
      version: 1, // Add a version number
      migrate: (persistedState, version) => {
        // Handle old state migration logic here
        if (version === 0) {
          // Clear old keys
          return {
            accessToken: null,
            userName: null,
            venueManager: null,
          };
        }
        return persistedState; // Return existing state if no migration needed
      },
    }
  )
);

export default useAuthStore;
