import { Dispatch, SetStateAction } from "react";

export interface DateRange {
  startDate: string | Date;
  endDate: string | Date;
}

export interface Media {
  url: string;
  alt: string;
}

interface Meta {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
}

interface Location {
  address: string;
  city: string;
  zip: string;
  country: string;
  continent: string;
  lat: number;
  lng: number;
}

interface CustomerOrOwner {
  name: string;
  email: string;
  bio: string;
  avatar: Media;
  banner: Media;
}

export interface UserSpesific {
  name: string;
  email: string;
  venueManager: boolean;
  avatar: Media;
  banner: Media;
  bio: string;
}

export interface BookingsData {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  customer: CustomerOrOwner;
}

export interface BookingSpesific {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  venue: BookingSpesificListing;
  customer: CustomerOrOwner;
}

export interface BookingSpesificListing {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  location: Location;
  meta: Meta;
  maxGuests: number;
  created: string;
  updated: string;
  media: Media[];
}

export interface ListingSpesific {
  id: string;
  name: string;
  description: string;
  media: Media[];
  price: number;
  maxGuests: number;
  rating: number;
  created: string;
  updated: string;
  meta: Meta;
  location: Location;
  owner: CustomerOrOwner;
  bookings?: BookingsData[];
}

export interface TravelSearchData {
  location: string;
  numberOfGuests: number;
  freeWifi?: boolean;
  petsAllowed?: boolean;
  freeParking?: boolean;
  freeBreakfast?: boolean;
  price100?: boolean;
  price100to200?: boolean;
  price200to300?: boolean;
  price300to400?: boolean;
  price400to500?: boolean;
  price500?: boolean;
}

export interface ButtonProps {
  clickFunc: () => void;
  innerText?: string;
  width?: "full" | "auto";
  tailw?: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  disabled?: boolean;
}

export interface DataContextType {
  displayedListings: ListingSpesific[];
  setDisplayedListings: Dispatch<SetStateAction<ListingSpesific[]>>;
  loading: boolean;
  error: string | null;
}
