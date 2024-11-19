import { useState, useEffect } from "react";

export default function useFetch(url, headers) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch(url, headers);
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error logged", errorData.errors[0].message);
          throw new Error(errorData.errors[0].message || "An error occurred");
        } else if (response.ok) {
          const json = await response.json();
          setData(json);
        }
      } catch (error) {
        console.log("error catched in the useFetch hook:", error);
        setError(error.message || "An unexpected error occurred");
        // setError(true);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [url]);

  // useEffect(() => {
  //   async function getData() {
  //     try {
  //       setLoading(true);
  //       setError(false);
  //       const fetchedData = await fetch(url, headers);
  //       const json = await fetchedData.json();
  //       setData(json);
  //     } catch (error) {
  //       console.log("error catched in the useFetch hook:", error);
  //       setError(true);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   getData();
  // }, [url]);
  return { data, loading, setLoading, error };
}

// const callApiWith = useCallback(
//   async (url, options = {}) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(url, {
//         ...options,
//         headers: headers(Boolean(options.body)),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error("Error logged", errorData.errors[0].message);
//         throw new Error(errorData.errors[0].message || "An error occurred");
//       } else if (response.ok) {
//         if (response.status === 204) {
//           return null;
//         } else {
//           return await response.json();
//         }
//       }
//     } catch (err) {
//       setError(err.message || "An unexpected error occurred");
//       throw err; // Re-throw the error for additional handling if needed
//     } finally {
//       setLoading(false);
//     }
//   },
//   [headers]
// );
