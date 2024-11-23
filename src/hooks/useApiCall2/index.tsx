import { useState } from "react";
import { useAuthStore } from "../../stores";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: any;
}

export function useApiCall() {
  const { accessToken, setVenueManager } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to create headers dynamically
  const createHeaders = (hasBody: boolean = false): Headers => {
    const headers = new Headers();

    if (accessToken) {
      headers.append("Authorization", `Bearer ${accessToken}`);
    }
    if (apiKey) {
      headers.append("X-Noroff-API-Key", apiKey);
    }
    if (hasBody) {
      headers.append("Content-Type", "application/json");
    }

    return headers;
  };

  // Generic API call function
  const callApi = async <T = any,>(url: string, options: RequestInit = {}): Promise<ApiResponse<T>> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiBaseUrl}${url}`, {
        ...options,
        headers: createHeaders(Boolean(options.body)),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData.errors?.[0]?.message || "Unknown error");
        throw new Error(errorData.errors?.[0]?.message || "An error occurred");
      }

      const data = response.status === 204 ? null : await response.json();
      return { success: true, data: data.data };
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // // Function for authenticated fetch
  // const fetchWithAuthentication = async (endpoint: string): Promise<ApiResponse<any>> => {
  //   const response = await callApi(endpoint, { method: "GET" });
  //   if (response.success && response.data?.venueManager) {
  //     setVenueManager(response.data.venueManager);
  //   }
  //   return response;
  // };

  return {
    loading,
    setLoading,
    error,
    callApi,
    // fetchWithAuthentication,
  };
}
