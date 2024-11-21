import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface TravelSearchData {
  location: string;
  numberOfGuests: number;
  freeWifi: boolean;
  petsAllowed: boolean;
  freeParking: boolean;
  freeBreakfast: boolean;
  price100: boolean;
  price100to200: boolean;
  price200to300: boolean;
  price300to400: boolean;
  price400to500: boolean;
  price500: boolean;
}

interface SearchStoreState {
  travelSearchData: TravelSearchData;
  setLocation: (location: string) => void;
  setNumberOfGuests: (numberOfGuests: number) => void;
  setFreeWifi: (freeWifi: boolean) => void;
  setPetsAllowed: (petsAllowed: boolean) => void;
  setFreeParking: (freeParking: boolean) => void;
  setFreeBreakfast: (freeBreakfast: boolean) => void;
  setPrice100: (price100: boolean) => void;
  setPrice100to200: (price100to200: boolean) => void;
  setPrice200to300: (price200to300: boolean) => void;
  setPrice300to400: (price300to400: boolean) => void;
  setPrice400to500: (price400to500: boolean) => void;
  setPrice500: (price500: boolean) => void;
  clearTravelSearchStore: () => void;
}

export const useSearchStore = create<SearchStoreState>()(
  persist(
    (set) => ({
      travelSearchData: {
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
      setLocation: (location) =>
        set((state) => ({
          travelSearchData: { ...state.travelSearchData, location },
        })),
      setNumberOfGuests: (numberOfGuests) =>
        set((state) => ({
          travelSearchData: { ...state.travelSearchData, numberOfGuests },
        })),
      setFreeWifi: (freeWifi) =>
        set((state) => ({
          travelSearchData: { ...state.travelSearchData, freeWifi },
        })),
      setPetsAllowed: (petsAllowed) =>
        set((state) => ({
          travelSearchData: { ...state.travelSearchData, petsAllowed },
        })),
      setFreeParking: (freeParking) =>
        set((state) => ({
          travelSearchData: { ...state.travelSearchData, freeParking },
        })),
      setFreeBreakfast: (freeBreakfast) =>
        set((state) => ({
          travelSearchData: { ...state.travelSearchData, freeBreakfast },
        })),
      setPrice100: (price100) =>
        set((state) => ({
          travelSearchData: { ...state.travelSearchData, price100 },
        })),
      setPrice100to200: (price100to200) =>
        set((state) => ({
          travelSearchData: { ...state.travelSearchData, price100to200 },
        })),
      setPrice200to300: (price200to300) =>
        set((state) => ({
          travelSearchData: { ...state.travelSearchData, price200to300 },
        })),
      setPrice300to400: (price300to400) =>
        set((state) => ({
          travelSearchData: { ...state.travelSearchData, price300to400 },
        })),
      setPrice400to500: (price400to500) =>
        set((state) => ({
          travelSearchData: { ...state.travelSearchData, price400to500 },
        })),
      setPrice500: (price500) =>
        set((state) => ({
          travelSearchData: { ...state.travelSearchData, price500 },
        })),
      clearTravelSearchStore: () =>
        set({
          travelSearchData: {
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
        }),
    }),
    {
      name: "travel-search-data",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
