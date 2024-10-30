import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useSearchStore = create(
  persist(
    (set) => ({
      formData: {
        allDatesInRange: [],
        location: "",
        numberOfGuests: 2,
        freeWifi: false,
        petsAllowed: false,
        freeParking: false,
        freeBreakfast: false,
        price100: false,
        price100to200: false,
        price200to300: false,
        price300to400: false,
        price400to500: false,
        price500: false,
      },
      setFormData: (data) => set({ formData: data }),
      updateFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
      clearFormData: () => set({ formData: {} }),
    }),
    {
      name: "search-form", // Storage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);
