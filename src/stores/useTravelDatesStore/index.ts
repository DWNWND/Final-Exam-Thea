import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface InitialDates {
  todayDateObj: string | Date;
  tomorrowDateObj: string | Date;
}

interface SavedDates {
  endYYYYMMDD: string;
  startYYYYMMDD: string;
  endDisplay: string;
  startDisplay: string;
  endDateObj: string | Date;
  startDateObj: string | Date;
  dateRangeArrYYYYMMDD: string[];
}

interface TravelDatesStoreState {
  savedDates: SavedDates;
  initialDates: InitialDates;
  defaultFlatpickrDates: string;

  setDefaultFlatpickrDates: (defaultFlatpickrDates: string) => void;
  setInitialDates: (initialDates: InitialDates) => void;
  setTodayDateObj: (todayDateObj: Date) => void;
  setTomorrowDateObj: (tomorrowDateObj: Date) => void;

  setSavedDates: (savedDates: SavedDates) => void;
  setStartDateObj: (startDateObj: Date) => void;
  setEndDateObj: (endDateObj: Date) => void;
  setStartYYYYMMDD: (startYYYYMMDD: string) => void;
  setEndYYYYMMDD: (endYYYYMMDD: string) => void;
  setStartDisplay: (startDisplay: string) => void;
  setEndDisplay: (endDisplay: string) => void;
  setDateRangeArrYYYYMMDD: (dateRangeArrYYYYMMDD: string[]) => void;
  clearTravelDatesStore: () => void;
}

export const useTravelDatesStore = create<TravelDatesStoreState>()(
  persist(
    (set) => ({
      defaultFlatpickrDates: "YYYY-MM-DD to YYYY-MM-DD",
      initialDates: {
        todayDateObj: "",
        tomorrowDateObj: "",
      },
      savedDates: {
        endYYYYMMDD: "",
        startYYYYMMDD: "",
        endDisplay: "",
        startDisplay: "",
        endDateObj: "",
        startDateObj: "",
        dateRangeArrYYYYMMDD: [],
      },

      setDefaultFlatpickrDates: (defaultFlatpickrDates) => set({ defaultFlatpickrDates }),
      setInitialDates: (initialDates) => set({ initialDates }),
      setTodayDateObj: (todayDateObj) =>
        set((state) => ({
          initialDates: { ...state.initialDates, todayDateObj },
        })),
      setTomorrowDateObj: (tomorrowDateObj) =>
        set((state) => ({
          initialDates: { ...state.initialDates, tomorrowDateObj },
        })),

      setSavedDates: (savedDates) => set({ savedDates }),
      setStartDateObj: (startDateObj) =>
        set((state) => ({
          savedDates: { ...state.savedDates, startDateObj },
        })),
      setEndDateObj: (endDateObj) =>
        set((state) => ({
          savedDates: { ...state.savedDates, endDateObj },
        })),
      setStartYYYYMMDD: (startYYYYMMDD) =>
        set((state) => ({
          savedDates: { ...state.savedDates, startYYYYMMDD },
        })),
      setEndYYYYMMDD: (endYYYYMMDD) =>
        set((state) => ({
          savedDates: { ...state.savedDates, endYYYYMMDD },
        })),
      setStartDisplay: (startDisplay) =>
        set((state) => ({
          savedDates: { ...state.savedDates, startDisplay },
        })),
      setEndDisplay: (endDisplay) =>
        set((state) => ({
          savedDates: { ...state.savedDates, endDisplay },
        })),
      setDateRangeArrYYYYMMDD: (dateRangeArrYYYYMMDD) =>
        set((state) => ({
          savedDates: { ...state.savedDates, dateRangeArrYYYYMMDD },
        })),
      clearTravelDatesStore: () =>
        set({
          defaultFlatpickrDates: "YYYY-MM-DD to YYYY-MM-DD",
          initialDates: {
            todayDateObj: "",
            tomorrowDateObj: "",
          },
          savedDates: {
            endYYYYMMDD: "",
            startYYYYMMDD: "",
            endDisplay: "",
            startDisplay: "",
            endDateObj: "",
            startDateObj: "",
            dateRangeArrYYYYMMDD: [],
          },
        }),
    }),
    {
      name: "travel-dates-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);