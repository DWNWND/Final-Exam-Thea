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
      successfulBookingId: "",
      bookingEmail: "",
      // Set individual fields
      setBookingData: (bookingData) => set((state) => ({ bookingData })),
      setSuccessfulBookingId: (successfulBookingId) => set((state) => ({ successfulBookingId })),
      setBookingEmail: (bookingEmail) => set((state) => ({ bookingEmail })),
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
