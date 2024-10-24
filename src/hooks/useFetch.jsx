import { useState, useEffect } from "react";

const apiKey = import.meta.env.VITE_API_KEY;

export default function useFetch(url) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const headers = {
    // headers: {
    //   // Authorization: `Bearer ${accessToken}`,
    //   "X-Noroff-API-Key": apiKey.data.key,
    // },
  };

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setIsError(false);
        const fetchedData = await fetch(url, headers);
        const json = await fetchedData.json();
        setData(json);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [url]);
  return { data, isLoading, isError };
}
