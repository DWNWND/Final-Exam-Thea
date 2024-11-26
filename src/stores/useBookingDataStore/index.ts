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
  selectedListing: Record<string, any>;
  setBookingData: (bookingData: BookingData) => void;
  setSuccessfulBookingId: (successfulBookingId: string) => void;
  setBookingEmail: (bookingEmail: string) => void;
  clearBookingDataStore: () => void;
  setSelectedListing: (listing: Record<string, any>) => void;
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
      selectedListing: {},
      setBookingData: (bookingData) => set({ bookingData }),
      setSuccessfulBookingId: (successfulBookingId) => set({ successfulBookingId }),
      setBookingEmail: (bookingEmail) => set({ bookingEmail }),
      setSelectedListing: (listing) => set({ selectedListing: listing }),
      clearBookingDataStore: () =>
        set({
          bookingData: {
            dateFrom: "",
            dateTo: "",
            guests: 0,
            venueId: "",
          },
          selectedListing: {},
          bookingEmail: "",
          successfulBookingId: "",
        }),
    }),
    {
      name: "booking-data",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
