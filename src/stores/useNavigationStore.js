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

      // Selector to get the last previous route
      getLastPreviousRoute: () => {
        const history = get().history;
        return history.length > 1 ? history[history.length - 2] : null;
      },
      // Action to manually set the previous route
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
    }),
    {
      name: "navigation-store", // Storage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);
