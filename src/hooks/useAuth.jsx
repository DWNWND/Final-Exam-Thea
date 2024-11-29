import { useState } from "react";
import useAuthStore from "../stores/useAuthStore";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const apiKey = import.meta.env.VITE_VITE_API_KEY;

export default function useAuth() {
  const { setAccessToken, setUserName } = useAuthStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApiWith = async (url, options) => {
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

      console.log("error catched in apiCall", errorData);
      const error = new Error("Error when calling API");
      error.data = errorData; // Attach the original error object
      throw error;
    }
    return await response.json();
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
      console.log("response from login:", response);
      return { success: true };
    } catch (err) {
      console.log("error catched in login func", err.data);
      return { success: false, error: err.data };
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
      return { success: true };
    } catch (err) {
      console.log("error catched in register func", err.data);
      return { success: false, error: err.data };
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
