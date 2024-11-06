import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useBookingDataStore = create(
  persist(
    (set) => ({
      bookingData: {
        dateFrom: "",
        dateTo: "",
        guests: 0,
        venueId: "",
      },
      // Set individual fields
      setBookingData: (bookingData) => set((state) => ({ bookingData })),
      // Clear form data
      clearBookingData: () => set({ bookingData: {} }),
    }),
    {
      name: "booking-data", // Storage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useBookingDataStore;
