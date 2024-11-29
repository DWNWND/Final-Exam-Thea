import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useNavigationStore = create(
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

      // Selector that returns a boolean indicating if there’s a previous route
      hasPreviousRoute: () => {
        const history = get().history;
        return history.length > 1 && history[history.length - 1] !== "/";
      },
    }),
    {
      name: "navigation-store", // Storage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);
