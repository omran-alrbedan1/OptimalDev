// hooks/useJobSearch.ts - COMPLETE OPTIMIZED VERSION
import { useState, useEffect, useCallback } from "react";
import { fetchJobs } from "@/lib/client-action";

export const useJobSearch = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredJobs, setFeaturedJobs] = useState<any[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<number[]>([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState<number[]>([]);
  const [selectedWorkModes, setSelectedWorkModes] = useState<number[]>([]);
  const [selectedExperienceLevels, setSelectedExperienceLevels] = useState<number[]>([]);
  const [selectedEducationLevels, setSelectedEducationLevels] = useState<number[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<number[]>([]);
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 2000]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState({
    initial: true,
    jobs: true,
    filters: true,
  });
  const [error, setError] = useState<any>(null);
  const [filterOptions, setFilterOptions] = useState<any>(null);
  const [paginationMeta, setPaginationMeta] = useState<any>(null);

  // Load ALL initial data in parallel
  useEffect(() => {
    let mounted = true;

    const loadInitialData = async () => {
      try {
        // Fetch career data from combined endpoint
        const careerDataResponse = await fetch('/api/career-data');
        const careerData = await careerDataResponse.json();

        if (!mounted) return;

        if (careerDataResponse.ok) {
          setFeaturedJobs(careerData.featuredJobs || []);
          setFilterOptions(careerData.filterOptions || {});
          
          // Update loading states
          setIsLoading(prev => ({ ...prev, filters: false }));
        } else {
          throw new Error(careerData.error || 'Failed to fetch career data');
        }

        // Fetch first page of jobs
        const jobsResponse = await fetchJobs({
          page: 1,
          search: "",
          salary_min: 0,
          salary_max: 2000,
        });

        if (!mounted) return;

        setJobs(jobsResponse.data || []);
        setPaginationMeta(jobsResponse.meta || {
          current_page: 1,
          last_page: 1,
          per_page: 15,
          total: jobsResponse.data?.length || 0,
        });

        setIsLoading(prev => ({ ...prev, jobs: false, initial: false }));
      } catch (err: any) {
        if (!mounted) return;
        console.log("Initial data loading error:", err);
        setError(err.message || "Failed to load initial data");
        setIsLoading({ initial: false, jobs: false, filters: false });
      }
    };

    loadInitialData();

    return () => {
      mounted = false;
    };
  }, []); // Empty dependency array - runs once on mount

  // Optimized fetch function with caching
  const fetchJobsData = useCallback(async (page: number, filters: any) => {
    const cacheKey = `jobs_${page}_${JSON.stringify(filters)}`;
    const cached = sessionStorage.getItem(cacheKey);
    
    if (cached && page === currentPage) {
      const parsed = JSON.parse(cached);
      if (Date.now() - parsed.timestamp < 30000) { // 30 second cache
        setJobs(parsed.data);
        setPaginationMeta(parsed.meta);
        return;
      }
    }

    setIsLoading(prev => ({ ...prev, jobs: true }));
    
    try {
      const response = await fetchJobs({
        page,
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
      
      setJobs(response.data || []);
      setPaginationMeta(response.meta || {
        current_page: page,
        total: response.data?.length || 0,
        per_page: 15,
        last_page: Math.ceil((response.data?.length || 0) / 15),
      });

      // Cache the response
      sessionStorage.setItem(cacheKey, JSON.stringify({
        data: response.data || [],
        meta: response.meta,
        timestamp: Date.now()
      }));
    } catch (err: any) {
      setError(err.message || "Failed to fetch jobs");
    } finally {
      setIsLoading(prev => ({ ...prev, jobs: false }));
    }
  }, [searchQuery, selectedIndustries, selectedJobTypes, selectedWorkModes, 
      selectedExperienceLevels, selectedEducationLevels, selectedCountries, salaryRange]);

  // Debounced jobs fetching with immediate feedback
  useEffect(() => {
    if (isLoading.initial) return; // Don't run on initial load

    const timeoutId = setTimeout(() => {
      fetchJobsData(currentPage, {
        searchQuery,
        selectedIndustries,
        selectedJobTypes,
        selectedWorkModes,
        selectedExperienceLevels,
        selectedEducationLevels,
        selectedCountries,
        salaryRange,
      });
    }, 300);

    return () => clearTimeout(timeoutId);
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
    fetchJobsData,
    isLoading.initial,
  ]);

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
    
    // Clear search-related cache
    const keysToRemove = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key && key.startsWith('jobs_')) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => sessionStorage.removeItem(key));
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

  // Clear error
  const clearError = () => {
    setError(null);
  };

  // Force refresh jobs
  const refreshJobs = () => {
    // Clear cache and refetch
    const keysToRemove = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key && key.startsWith('jobs_')) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => sessionStorage.removeItem(key));
    
    fetchJobsData(currentPage, {
      searchQuery,
      selectedIndustries,
      selectedJobTypes,
      selectedWorkModes,
      selectedExperienceLevels,
      selectedEducationLevels,
      selectedCountries,
      salaryRange,
    });
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
    isLoading: isLoading.initial || isLoading.jobs || isLoading.filters,
    initialLoading: isLoading.initial,
    filtersLoading: isLoading.filters,
    jobsLoading: isLoading.jobs,
    error,
    filterOptions,
    paginationMeta,

    // Setters
    setCurrentPage,
    setSearchQuery,
    setSalaryRange,

    // Filter Handlers
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
    
    // Utility functions
    clearError,
    refreshJobs,
  };
};