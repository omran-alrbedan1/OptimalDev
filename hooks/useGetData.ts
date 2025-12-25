import { useState, useEffect, useCallback, useRef } from "react";
import axios, { AxiosRequestConfig, AxiosError } from "axios";

interface UseGetDataProps {
  url: string;
  initialData?: any;
  enabled?: boolean;
}

interface UseGetDataReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const useGetData = <T = any>({
  url,
  initialData = null,
  enabled = true,
  ...axiosConfig
}: UseGetDataProps & AxiosRequestConfig): UseGetDataReturn<T> => {
  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const lastUrlRef = useRef<string>("");

  const fetchData = useCallback(async () => {
    if (!enabled || !url) return;

    // prevent double fetch if URL not changed
    if (lastUrlRef.current === url) return;
    lastUrlRef.current = url;

    setLoading(true);
    setError(null);

    try {
      const response = await axios<T>({
        url,
        method: "GET",
        ...axiosConfig,
      });

      setData(response.data);
    } catch (err) {
      const axiosError = err as AxiosError<any>;
      const backendError =
        axiosError.response?.data?.message ||
        axiosError.response?.data?.error ||
        axiosError.message ||
        "An error occurred";

      setError(backendError);
    } finally {
      setLoading(false);
    }
  }, [url, enabled]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    // allow refetch even if URL didn’t change
    lastUrlRef.current = "";
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
};

export default useGetData;
