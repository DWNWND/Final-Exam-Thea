import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface NavigationStoreState {
  history: string[];
  addRoute: (route: string) => void;
  goBack: () => void;
  hasPreviousRoute: () => boolean;
  getLastPreviousRoute: () => string | null;
  setPreviousRoute: (route: string) => void;
  clearNavigationHistory: () => void;
}

export const useNavigationStore = create<NavigationStoreState>()(
  persist(
    (set, get) => ({
      history: [],

      addRoute: (route) =>
        set((state) => {
          if (state.history[state.history.length - 1] !== route) {
            return { history: [...state.history, route] };
          }
          return state;
        }),

      goBack: () =>
        set((state) => {
          const newHistory = [...state.history];
          if (newHistory.length > 1) newHistory.pop();
          return { history: newHistory };
        }),

      hasPreviousRoute: () => {
        const history = get().history;
        return history.length > 1 && history[history.length - 1] !== "/";
      },

      getLastPreviousRoute: () => {
        const history = get().history;
        return history.length > 1 ? history[history.length - 2] : null;
      },

      setPreviousRoute: (route) =>
        set((state) => {
          const newHistory = [...state.history];
          if (newHistory.length > 0) {
            newHistory.splice(newHistory.length - 1, 0, route); // Insert before the last route
          } else {
            newHistory.push(route); // Add if history is empty
          }
          return { history: newHistory };
        }),

      clearNavigationHistory: () =>
        set(() => ({
          history: [],
        })),
    }),
    {
      name: "navigation-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
