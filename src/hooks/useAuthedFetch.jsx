import { useState } from "react";
import { useAuthStore } from "../stores";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

export default function useAuthedFetch() {
  const { accessToken, setVenueManager } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApiWith = async (url, options) => {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": apiKey,
        Authorization: `Bearer ${accessToken}`,
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log("errror catched in apiCall", errorData);
      const error = new Error("Error when calling API");
      error.data = errorData; // Attached the original error object
      throw error;
    }

    return await response.json();
  };

  const fetchWithAuthentication = async (additionalRefs) => {
    setLoading(true);
    setError(null);
    try {
      const response = await callApiWith(apiBaseUrl + additionalRefs, {
        method: "GET",
      });
      if (response.data.venueManager) {
        setVenueManager(response.data.venueManager);
      }
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.data);
      return { success: false, error: err.data };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    fetchWithAuthentication,
  };
}
