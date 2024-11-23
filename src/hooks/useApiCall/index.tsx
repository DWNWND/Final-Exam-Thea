import { useState } from "react";
import { useAuthStore } from "../../stores";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: any;
  statusCode?: number;
}

export function useApiCall() {
  const { accessToken } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [scopedLoader, setScopedLoader] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const callApi = async <T = any,>(url: string, options: RequestInit = {}): Promise<ApiResponse<T>> => {
    setError(null);

    if (!options.method) {
      setLoading(true);
    } else {
      setScopedLoader(true);
    }

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

      if (response.status === 204) {
        return { success: true };
      } else {
        const data = await response.json();
        return { success: true, data: data.data };
      }
    } catch (err: any) {
      console.log("error", err);
      console.error("API Error:", err.message || "Unknown error");
      setError(err.message || "An unexpected error occurred");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
      setScopedLoader(false);
    }
  };

  return {
    loading,
    setLoading,
    scopedLoader,
    error,
    setError,
    callApi,
  };
}
