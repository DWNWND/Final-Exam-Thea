import useFetch from "../../hooks/useFetch.jsx";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

const page = 1;
const limit = 10;

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const sortedByRating = `${apiBaseUrl}?sort=rating&sortOrder=desc&page=${page}&limit=${limit}`;

export default function DataProvider({ children }) {
  const { data, isLoading, isError } = useFetch(sortedByRating);
  const [venues, setVenues] = useState([]);

  // const location = useLocation();
  // const page = location.pathname;

  useEffect(() => {
    const venuesArray = data.data;
    setVenues(venuesArray);
    console.log(venuesArray);
  }, [data]);

  return <Outlet context={{ venues, setVenues, isLoading, isError }}>{children}</Outlet>;
}
