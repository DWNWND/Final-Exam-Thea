import { useState } from "react";
import useAuthStore from "../stores/useAuthStore";
import { data } from "autoprefixer";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

export default function useAuthedFetch() {
  const { accessToken } = useAuthStore();
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
      //consle.log for debugging
      console.log("errror catched in apiCall", errorData);
      const error = new Error("Error when calling API");
      error.data = errorData; // Attach the original error object
      throw error;
    }

    return await response.json();
  };

  const fetchUser = async (additionalRefs) => {
    setLoading(true);
    setError(null);
    try {
      const response = await callApiWith(apiBaseUrl + additionalRefs, {
        method: "GET",
      });
      console.log("response:", response);
      // setAccessToken(response.data.accessToken);
      // setUserName(response.data.name);
      // setVenueManager(response.data.venueManager);
      return { success: true, data: response.data };
      // Handle any other logic like saving token, redirecting, etc.
    } catch (err) {
      console.log("error catched in fetch user func", err.data);
      // setError(err.data);
      return { success: false, error: err.data };
    } finally {
      // setLoading(false);
    }
  };

  return {
    loading,
    setLoading,
    error,
    fetchUser,
  };
}