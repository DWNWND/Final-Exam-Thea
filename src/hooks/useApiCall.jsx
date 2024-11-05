import { useState, useCallback } from "react";

const apiKey = import.meta.env.VITE_API_KEY;

export default function useApiCall(token) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const headers = useCallback((hasBody = false) => {
    const headers = new Headers();

    if (token) {
      headers.append("Authorization", `Bearer ${token}`);
    }
    if (apiKey) {
      headers.append("X-Noroff-API-Key", apiKey);
    }
    if (hasBody) {
      headers.append("Content-Type", "application/json");
    }
    return headers;
  }, [token]);

  const callApiWith = useCallback(
    async (url, options = {}) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url, {
          ...options,
          headers: headers(Boolean(options.body)),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "An error occurred");
        }

        return await response.json();
      } catch (err) {
        setError(err.message || "An unexpected error occurred");
        throw err; // Re-throw the error for additional handling if needed
      } finally {
        setLoading(false);
      }
    },
    [headers]
  );

  return { callApiWith, loading, error };
}
