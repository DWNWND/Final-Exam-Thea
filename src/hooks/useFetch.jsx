import { useState, useEffect } from "react";

export default function useFetch(url, headers) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        setError(false);
        const fetchedData = await fetch(url, headers);
        const json = await fetchedData.json();
        setData(json);
      } catch (error) {
        console.log("error catched in the useFetch hook:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [url]);
  return { data, loading, setLoading, error };
}
