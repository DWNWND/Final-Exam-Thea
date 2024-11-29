import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useSearchStore = create(
  persist(
    (set) => ({
      travelSearchData: {
        travelDates: {},
        allDatesArr: [],
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
      // Set individual fields
      setTravelDates: (travelDates) => set((state) => ({ travelSearchData: { ...state.travelSearchData, travelDates } })),
      setAllDatesArr: (allDatesArr) => set((state) => ({ travelSearchData: { ...state.travelSearchData, allDatesArr } })),
      setLocation: (location) => set((state) => ({ travelSearchData: { ...state.travelSearchData, location } })),
      setNumberOfGuests: (numberOfGuests) => set((state) => ({ travelSearchData: { ...state.travelSearchData, numberOfGuests } })),
      setFreeWifi: (freeWifi) => set((state) => ({ travelSearchData: { ...state.travelSearchData, freeWifi } })),
      setPetsAllowed: (petsAllowed) => set((state) => ({ travelSearchData: { ...state.travelSearchData, petsAllowed } })),
      setFreeParking: (freeParking) => set((state) => ({ travelSearchData: { ...state.travelSearchData, freeParking } })),
      setFreeBreakfast: (freeBreakfast) => set((state) => ({ travelSearchData: { ...state.travelSearchData, freeBreakfast } })),
      setPrice100: (price100) => set((state) => ({ travelSearchData: { ...state.travelSearchData, price100 } })),
      setPrice100to200: (price100to200) => set((state) => ({ travelSearchData: { ...state.travelSearchData, price100to200 } })),
      setPrice200to300: (price200to300) => set((state) => ({ travelSearchData: { ...state.travelSearchData, price200to300 } })),
      setPrice300to400: (price300to400) => set((state) => ({ travelSearchData: { ...state.travelSearchData, price300to400 } })),
      setPrice400to500: (price400to500) => set((state) => ({ travelSearchData: { ...state.travelSearchData, price400to500 } })),
      setPrice500: (price500) => set((state) => ({ travelSearchData: { ...state.travelSearchData, price500 } })),
      // Clear form data
      clearTravelSearchStore: () => set({ travelSearchData: {} }),
    }),
    {
      name: "travel-search-data", // Storage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// export const useSearchStore = create(
//   persist(
//     (set) => ({
//       formData: {
//         allDatesInRange: [],
//         dateRange: {},
//         location: "",
//         numberOfGuests: 2,
//         freeWifi: false,
//         petsAllowed: false,
//         freeParking: false,
//         freeBreakfast: false,
//         price100: false,
//         price100to200: false,
//         price200to300: false,
//         price300to400: false,
//         price400to500: false,
//         price500: false,
//       },
//       setFormData: (data) => set({ formData: data }),
//       updateFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
//       clearFormData: () => set({ formData: {} }),
//       // New function to update only dateRange
//       setDateRange: (dateRange) =>
//         set((state) => ({
//           formData: {
//             ...state.formData,
//             dateRange,
//           },
//         })),
//       setAllDatesRange: (allDatesInRange) => set((state) => ({ formData: { ...state.formData, allDatesInRange } })),
//     }),
//     {
//       name: "search-form", // Storage key
//       storage: createJSONStorage(() => localStorage),
//     }
//   )
// );
