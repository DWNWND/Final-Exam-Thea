import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useSearchStore = create(
  persist(
    (set) => ({
      formData: {
        allDatesInRange: [],
        dateRange: {},
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
      // New function to update only dateRange
      setDateRange: (dateRange) =>
        set((state) => ({
          formData: {
            ...state.formData,
            dateRange,
          },
        })),
      setAllDatesRange: (allDatesInRange) => set((state) => ({ formData: { ...state.formData, allDatesInRange } })),
    }),
    {
      name: "search-form", // Storage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);
