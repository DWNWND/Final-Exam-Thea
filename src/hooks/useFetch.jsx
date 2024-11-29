import { useState, useEffect } from "react";

const apiKey = import.meta.env.VITE_API_KEY;

export default function useFetch(url, headers) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // const headers = (action) => {
  //   if (action === "auth") {
  //     return {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //         "X-Noroff-API-Key": apiKey,
  //       },
  //     };
  //   }
  //   if (action === "post") {
  //     return {
  //       method: POST,
  //       body: JSON.stringify({ email, password }),
  //     };
  //   } else if (!action) {
  //     return null;
  //   }
  // };

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
