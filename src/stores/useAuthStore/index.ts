import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthStoreState {
  accessToken: string | null;
  userName: string | null;
  venueManager: boolean | null;
  setUserName: (name: string) => void;
  setAccessToken: (token: string | null) => void;
  setVenueManager: (bool: boolean | null) => void;
  logOut: () => void;
}

type PersistedAuthStoreState = Partial<AuthStoreState>;

export const useAuthStore = create<AuthStoreState>()(
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
      storage: createJSONStorage(() => localStorage),
      version: 1,
      migrate: (persistedState, version): PersistedAuthStoreState => {
        const state = persistedState as PersistedAuthStoreState;

        if (version === 0) {
          return {
            accessToken: null,
            userName: null,
            venueManager: null,
          };
        }
        return state;
      },
    }
  )
);
