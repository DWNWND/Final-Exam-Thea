import { useState } from "react";
import useAuthStore from "../stores/useAuthStore";
import { set } from "react-hook-form";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const apiKey = import.meta.env.VITE_VITE_API_KEY;

export default function useAuth() {
  const { setAccessToken, setUserName, setVenueManager } = useAuthStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApiWith = async (url, options) => {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          "X-Noroff-API-Key": apiKey,
          ...(options.headers || {}),
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      return await response.json();
    } catch (error) {
      throw error; // Re-throw the error for the calling function to handle
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await callApiWith(apiBaseUrl + "/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      setAccessToken(response.data.accessToken);
      setUserName(response.data.name);
      setVenueManager(response.data.venueManager);
      // Handle any other logic like saving token, redirecting, etc.
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const registerNewUser = async (userName, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await callApiWith(apiBaseUrl + "/auth/register", {
        method: "POST",
        body: JSON.stringify({ name: userName, email, password }),
      });
      setAccessToken(response.data.accessToken);
      setUserName(response.data.name);
      setVenueManager(response.data.venueManager);
      // Handle any other logic like saving token, redirecting, etc.
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    login,
    registerNewUser,
  };
}
