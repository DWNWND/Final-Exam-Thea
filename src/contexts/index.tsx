import { createContext, Dispatch, SetStateAction } from "react";

// Define types for OpenMenuContext
interface OpenMenuContextType {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

// Define types for DataContext
interface DataContextType {
  displayedListings: any[]; // Replace `any` with the correct type for listings
  setDisplayedListings: Dispatch<SetStateAction<any[]>>; // Adjust `any[]` as needed
  loading: boolean;
  error: string | null;
}

// Create contexts with initial default values
// export const OpenMenuContext = createContext<OpenMenuContextType | undefined>(undefined);
export const DataContext = createContext<DataContextType | undefined>(undefined);

// Provide a default value
export const OpenMenuContext = createContext<OpenMenuContextType>({
  isMenuOpen: false,
  setIsMenuOpen: () => {},
});

// import { createContext } from "react";

// export const OpenMenuContext = createContext();
// export const DataContext = createContext();
