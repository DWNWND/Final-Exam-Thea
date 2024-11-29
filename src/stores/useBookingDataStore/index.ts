import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ListingSpesific } from "../../types";

interface BookingDataStore {
  dateFrom: string;
  dateTo: string;
  guests: number;
  venueId: string;
}

interface BookingDataStoreState {
  bookingData: BookingDataStore;
  successfulBookingId: string;
  bookingEmail: string;
  selectedListing: ListingSpesific;
  setBookingData: (bookingData: BookingDataStore) => void;
  setSuccessfulBookingId: (successfulBookingId: string) => void;
  setBookingEmail: (bookingEmail: string) => void;
  clearBookingDataStore: () => void;
  setSelectedListing: (listing: ListingSpesific) => void;
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
      selectedListing: {
        id: "",
        name: "",
        description: "",
        media: [],
        price: 0,
        maxGuests: 0,
        rating: 0,
        created: "",
        updated: "",
        meta: {
          pets: false,
          parking: false,
          breakfast: false,
          wifi: false,
        },
        location: {
          address: "",
          city: "",
          zip: "",
          country: "",
          continent: "",
          lat: 0,
          lng: 0,
        },
        owner: {
          name: "",
          email: "",
          bio: "",
          avatar: {
            url: "",
            alt: "",
          },
          banner: {
            url: "",
            alt: "",
          },
        },
      },
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
          selectedListing: {
            id: "",
            name: "",
            description: "",
            media: [],
            price: 0,
            maxGuests: 0,
            rating: 0,
            created: "",
            updated: "",
            meta: {
              pets: false,
              parking: false,
              breakfast: false,
              wifi: false,
            },
            location: {
              address: "",
              city: "",
              zip: "",
              country: "",
              continent: "",
              lat: 0,
              lng: 0,
            },
            owner: {
              name: "",
              email: "",
              bio: "",
              avatar: {
                url: "",
                alt: "",
              },
              banner: {
                url: "",
                alt: "",
              },
            },
          },
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
