import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useSearchStore = create(
  persist(
    (set) => ({
      formData: {},
      setFormData: (data) => set({ formData: data }),
      clearFormData: () => set({ formData: {} }),
    }),
    {
      name: "search-form", // Storage key
      storage: createJSONStorage(() => localStorage), 
    }
  )
);
