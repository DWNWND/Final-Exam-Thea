import { useState, useEffect } from "react";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function useFetch(url, headers) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // useEffect(() => {
  //   async function getData() {
  //     try {
  //       setLoading(true);
  //       setError(false);
  //       const response = await fetch(url, headers);
  //       if (!response.ok) {
  //         const errorData = await response.json();
  //         console.error("Error logged", errorData.errors[0].message);
  //         throw new Error(errorData.errors[0].message || "An error occurred");
  //       } else if (response.ok) {
  //         const json = await response.json();
  //         setData(json);
  //         return { success: true, data: response.data };
  //       }
  //     } catch (error) {
  //       console.log("error catched in the useFetch hook:", error);
  //       setError(error.message || "An unexpected error occurred");
  //       // setError(true);
  //       return { success: false, error: error.data };
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   getData();
  // }, [url]);

  const fetchFromApi = async (additionalRefs) => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(apiBaseUrl + additionalRefs);
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error logged", errorData.errors[0].message);
        throw new Error(errorData.errors[0].message || "An error occurred");
      } else if (response.ok) {
        const json = await response.json();
        console.log("json", json);
        setData(json);
        return { success: true, data: json.data };
      }
    } catch (error) {
      console.log("error catched  hook:", error);
      setError(error.message || "An unexpected error occurred");
      // setError(true);
      return { success: false, error: error };
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, setLoading, error, fetchFromApi };
}
