import { useState, useEffect, useCallback } from "react";
import {
  fetchFeaturedJobs,
  fetchJobFilters,
  fetchJobs,
} from "@/lib/client-action";

export interface FilterOptions {
  work_sectors: Array<{ id: number; name: string }>;
  contract_types: Array<{ id: number; name: string }>;
  work_modes: Array<{ id: number; name: string }>;
  experience_levels: Array<{ id: number; name: string }>;
  education_levels: Array<{ id: number; name: string }>;
  countries: Array<{ id: number; name: string }>;
}

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export const useJobSearch = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredJobs, setFeaturedJobs] = useState<any[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<number[]>([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState<number[]>([]);
  const [selectedWorkModes, setSelectedWorkModes] = useState<number[]>([]);
  const [selectedExperienceLevels, setSelectedExperienceLevels] = useState<
    number[]
  >([]);
  const [selectedEducationLevels, setSelectedEducationLevels] = useState<
    number[]
  >([]);
  const [selectedCountries, setSelectedCountries] = useState<number[]>([]);
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 2000]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(
    null
  );
  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta>({
    current_page: 1,
    last_page: 1,
    per_page: 15,
    total: 0,
  });

  // Fetch featured jobs
  useEffect(() => {
    const getFeaturedJobs = async () => {
      try {
        const featuredJobs = await fetchFeaturedJobs();
        setFeaturedJobs(featuredJobs);
      } catch (err) {
        console.error("Failed to fetch feature jobs:", err);
      }
    };
    getFeaturedJobs();
  }, []);

  // Fetch filters
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const filters = await fetchJobFilters();
        setFilterOptions(filters);
      } catch (err) {
        console.error("Failed to fetch filters:", err);
      }
    };
    fetchFilters();
  }, []);

  // Memoized fetch function
  const fetchJobsData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchJobs({
        page: currentPage,
        search: searchQuery,
        work_sectors: selectedIndustries,
        contract_types: selectedJobTypes,
        work_modes: selectedWorkModes,
        experience_levels: selectedExperienceLevels,
        education_levels: selectedEducationLevels,
        countries: selectedCountries,
        salary_min: salaryRange[0],
        salary_max: salaryRange[1],
      });
      setJobs(response.data);
      setPaginationMeta(
        response.meta || {
          current_page: currentPage,
          total: response.data.length,
          per_page: response.meta?.per_page || 15,
          last_page: Math.ceil(response.data.length / 15),
        }
      );
    } catch (err: any) {
      setError(err.message || "Failed to fetch jobs");
    } finally {
      setIsLoading(false);
    }
  }, [
    currentPage,
    searchQuery,
    selectedIndustries,
    selectedJobTypes,
    selectedWorkModes,
    selectedExperienceLevels,
    selectedEducationLevels,
    selectedCountries,
    salaryRange,
  ]);

  // Main jobs fetching effect
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchJobsData();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [fetchJobsData]);

  // Filter handlers
  const handleIndustryChange = (industryId: number) => {
    setSelectedIndustries((prev) =>
      prev.includes(industryId)
        ? prev.filter((id) => id !== industryId)
        : [...prev, industryId]
    );
    setCurrentPage(1);
  };

  const handleJobTypeChange = (typeId: number) => {
    setSelectedJobTypes((prev) =>
      prev.includes(typeId)
        ? prev.filter((id) => id !== typeId)
        : [...prev, typeId]
    );
    setCurrentPage(1);
  };

  const handleWorkModeChange = (modeId: number) => {
    setSelectedWorkModes((prev) =>
      prev.includes(modeId)
        ? prev.filter((id) => id !== modeId)
        : [...prev, modeId]
    );
    setCurrentPage(1);
  };

  const handleSalaryChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setSalaryRange(value as [number, number]);
      setCurrentPage(1);
    }
  };

  const handleExperienceLevelChange = (levelId: number) => {
    setSelectedExperienceLevels((prev) =>
      prev.includes(levelId)
        ? prev.filter((id) => id !== levelId)
        : [...prev, levelId]
    );
    setCurrentPage(1);
  };

  const handleEducationLevelChange = (levelId: number) => {
    setSelectedEducationLevels((prev) =>
      prev.includes(levelId)
        ? prev.filter((id) => id !== levelId)
        : [...prev, levelId]
    );
    setCurrentPage(1);
  };

  const handleCountryChange = (countryId: number) => {
    setSelectedCountries((prev) =>
      prev.includes(countryId)
        ? prev.filter((id) => id !== countryId)
        : [...prev, countryId]
    );
    setCurrentPage(1);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedIndustries([]);
    setSelectedJobTypes([]);
    setSelectedWorkModes([]);
    setSelectedExperienceLevels([]);
    setSelectedEducationLevels([]);
    setSelectedCountries([]);
    setSalaryRange([0, 2000]);
    setSearchQuery("");
    setCurrentPage(1);
  };

  // Clear search only
  const handleClearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  // Manual search trigger
  const handleSearchClick = () => {
    setCurrentPage(1);
  };

  return {
    // State
    currentPage,
    searchQuery,
    featuredJobs,
    selectedIndustries,
    selectedJobTypes,
    selectedWorkModes,
    selectedExperienceLevels,
    selectedEducationLevels,
    selectedCountries,
    salaryRange,
    jobs,
    isLoading,
    error,
    filterOptions,
    paginationMeta,

    // Setters
    setCurrentPage,
    setSearchQuery,
    setSalaryRange,

    // Handlers
    handleIndustryChange,
    handleJobTypeChange,
    handleWorkModeChange,
    handleSalaryChange,
    handleExperienceLevelChange,
    handleEducationLevelChange,
    handleCountryChange,
    handleResetFilters,
    handleClearSearch,
    handleSearchClick,
  };
};
