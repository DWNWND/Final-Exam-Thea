import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface BookingData {
  dateFrom: string;
  dateTo: string;
  guests: number;
  venueId: string;
}

interface BookingDataStoreState {
  bookingData: BookingData;
  successfulBookingId: string;
  bookingEmail: string;
  setBookingData: (bookingData: BookingData) => void;
  setSuccessfulBookingId: (successfulBookingId: string) => void;
  setBookingEmail: (bookingEmail: string) => void;
  clearBookingData: () => void;
}

export const useBookingDataStore = create<BookingDataStoreState>()(
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
      setBookingData: (bookingData) => set({ bookingData }),
      setSuccessfulBookingId: (successfulBookingId) => set({ successfulBookingId }),
      setBookingEmail: (bookingEmail) => set({ bookingEmail }),
      clearBookingData: () =>
        set({
          bookingData: {
            dateFrom: "",
            dateTo: "",
            guests: 0,
            venueId: "",
          },
        }),
    }),
    {
      name: "booking-data",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
