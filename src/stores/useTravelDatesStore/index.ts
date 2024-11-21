import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface DefaultFlatpickrDates {
  defaultFlatpickrDates: string;
}
interface InitialDates {
  todayDateObj: object | Date;
  tomorrowDateObj: object | Date;
}
interface SavedDates {
  endYYYYMMDD: string;
  startYYYYMMDD: string;
  endDisplay: string;
  startDisplay: string;
  endDateObj: object | Date;
  startDateObj: object | Date;
  dateRangeArrYYYYMMDD: string[];
}

interface TravelDatesStoreState {
  savedDates: SavedDates;
  initialDates: InitialDates;
  defaultFlatpickrDates: DefaultFlatpickrDates;

  setDefaultFlatpickrDates: (defaultFlatpickrDates: DefaultFlatpickrDates) => void;
  setInitialDates: (initialDates: InitialDates) => void;
  setTodayDateObj: (todayDateObj: InitialDates["todayDateObj"]) => void;
  setTomorrowDateObj: (tomorrowDateObj: InitialDates["tomorrowDateObj"]) => void;

  setSavedDates: (savedDates: SavedDates) => void;
  setStartDateObj: (startDateObj: SavedDates["startDateObj"]) => void;
  setEndDateObj: (endDateObj: SavedDates["endDateObj"]) => void;
  setStartYYYYMMDD: (startYYYYMMDD: SavedDates["startYYYYMMDD"]) => void;
  setEndYYYYMMDD: (endYYYYMMDD: SavedDates["endYYYYMMDD"]) => void;
  setStartDisplay: (startDisplay: SavedDates["startDisplay"]) => void;
  setEndDisplay: (endDisplay: SavedDates["endDisplay"]) => void;
  setDateRangeArrYYYYMMDD: (dateRangeArrYYYYMMDD: SavedDates["dateRangeArrYYYYMMDD"]) => void;
  clearTravelDatesStore: () => void;
}

export const useTravelDatesStore = create<TravelDatesStoreState>()(
  persist(
    (set) => ({
      defaultFlatpickrDates: {
        defaultFlatpickrDates: "YYYY-MM-DD to YYYY-MM-DD",
      },
      initialDates: {
        todayDateObj: {},
        tomorrowDateObj: {},
      },
      savedDates: {
        endYYYYMMDD: "",
        startYYYYMMDD: "",
        endDisplay: "",
        startDisplay: "",
        endDateObj: {},
        startDateObj: {},
        dateRangeArrYYYYMMDD: [],
      },

      setDefaultFlatpickrDates: (defaultFlatpickrDates) => set({ defaultFlatpickrDates: defaultFlatpickrDates }),
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
          defaultFlatpickrDates: {
            defaultFlatpickrDates: "YYYY-MM-DD to YYYY-MM-DD",
          },
          initialDates: {
            todayDateObj: {},
            tomorrowDateObj: {},
          },
          savedDates: {
            endYYYYMMDD: "",
            startYYYYMMDD: "",
            endDisplay: "",
            startDisplay: "",
            endDateObj: {},
            startDateObj: {},
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
