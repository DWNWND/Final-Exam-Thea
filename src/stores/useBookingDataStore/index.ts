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
  selectedVenue: Record<string, any>;
  setBookingData: (bookingData: BookingData) => void;
  setSuccessfulBookingId: (successfulBookingId: string) => void;
  setBookingEmail: (bookingEmail: string) => void;
  clearBookingData: () => void;
  setSelectedVenue: (venue: Record<string, any>) => void;
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
      selectedVenue: {},
      setBookingData: (bookingData) => set({ bookingData }),
      setSuccessfulBookingId: (successfulBookingId) => set({ successfulBookingId }),
      setBookingEmail: (bookingEmail) => set({ bookingEmail }),
      setSelectedVenue: (venue) => set({ selectedVenue: venue }),
      clearBookingData: () =>
        set({
          bookingData: {
            dateFrom: "",
            dateTo: "",
            guests: 0,
            venueId: "",
          },
          selectedVenue: {},
        }),
    }),
    {
      name: "booking-data",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
