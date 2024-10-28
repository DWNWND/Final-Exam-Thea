import useFetch from "../../hooks/useFetch.jsx";
import { useState, useEffect } from "react";
// import { Outlet } from "react-router-dom";
import { createContext } from "react";

const page = 1;
const limit = 10;
// &page=${page}&limit=${limit}

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const sortedByRating = `${apiBaseUrl}?sort=rating&sortOrder=desc`;

export const DataContext = createContext();

export function DataProvider({ children }) {
  const { data, isLoading, isError } = useFetch(`${apiBaseUrl}?page=${page}&limit=${limit}`);
  const [venues, setVenues] = useState([]);

  // const location = useLocation();
  // const page = location.pathname;

  useEffect(() => {
    const venuesArray = data.data;
    setVenues(venuesArray);
    // console.log(venuesArray);
  }, [data]);

  return <DataContext.Provider value={{ venues, setVenues, isLoading, isError }}>{children}</DataContext.Provider>;
}
