import { useCallback } from "react";
import { STORAGE_KEY } from "@/constants/service-request";

export const useFormStorage = (id: number, reset: any) => {
  const save = useCallback(
    (data: any) => {
      if (typeof window === "undefined") return;
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...data, sub_service_id: id, timestamp: Date.now() })
      );
    },
    [id]
  );

  const clear = useCallback(() => {
    if (typeof window !== "undefined") localStorage.removeItem(STORAGE_KEY);
  }, []);

  const load = useCallback(() => {
    if (typeof window === "undefined") return null;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return null;
      const parsed = JSON.parse(stored);
      if (parsed.sub_service_id !== id) {
        clear();
        return null;
      }
      return parsed;
    } catch {
      clear();
      return null;
    }
  }, [id, clear]);

  return { save, clear, load };
};
