import { createContext, Dispatch, SetStateAction } from "react";
import { DataContextType } from "../types";

interface OpenMenuContextType {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const OpenMenuContext = createContext<OpenMenuContextType>({
  isMenuOpen: false,
  setIsMenuOpen: () => {},
});
