// hooks/usePagination.ts
import { useState, useEffect } from "react";

export function usePagination<T>(
  fetchFn: (page: number) => Promise<PaginatedResponse<T[]>>,
  initialPage = 1
) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [data, setData] = useState<T[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({
    current_page: 1,
    from: 1,
    last_page: 1,
    links: [],
    path: "",
    per_page: 15,
    to: 1,
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (page: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchFn(page);
      setData(response.data);
      setMeta(response.meta);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= meta.last_page) {
      setCurrentPage(page);
    }
  };

  return {
    data,
    meta,
    isLoading,
    error,
    currentPage,
    goToPage,
    refetch: () => fetchData(currentPage),
  };
}
