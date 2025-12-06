import { JobFilters } from "@/interface/jobs";
import { useState, useCallback } from "react";

const INITIAL_FILTERS: JobFilters = {
  searchQuery: "",
  currentPage: 1,
  selectedIndustries: [],
  selectedJobTypes: [],
  selectedWorkModes: [],
  selectedExperienceLevels: [],
  selectedEducationLevels: [],
  selectedCountries: [],
  salaryRange: [0, 2000],
};

export const useJobFilters = () => {
  const [filters, setFilters] = useState<JobFilters>(INITIAL_FILTERS);

  const updateFilter = useCallback(
    <K extends keyof JobFilters>(key: K, value: JobFilters[K]) => {
      setFilters((prev) => ({
        ...prev,
        [key]: value,
        ...(key !== "currentPage" ? { currentPage: 1 } : {}), // Reset to page 1 on filter change
      }));
    },
    []
  );

  const resetFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
  }, []);

  const clearSearch = useCallback(() => {
    setFilters((prev) => ({
      ...prev,
      searchQuery: "",
      currentPage: 1,
    }));
  }, []);

  return {
    filters,
    updateFilter,
    resetFilters,
    clearSearch,
    setFilters,
  };
};
