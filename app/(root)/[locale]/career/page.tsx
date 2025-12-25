// app/(root)/[locale]/career/page.tsx - OPTIMIZED VERSION
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Button, Input, Pagination } from "antd";
import { FiChevronLeft, FiChevronRight, FiSearch } from "react-icons/fi";
import Image from "next/image";

import JobCard from "@/components/cards/JobCard";
import JobFilters from "./_components/jobFilters";
import { useJobSearch } from "@/hooks/useJobSearch";
import { formatPostedDate } from "@/lib/utils";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import LatestJobsCarousel from "@/components/parts/LatestJobsCarousel ";

// Skeleton Components
const JobCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 animate-pulse">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded" />
      <div className="flex-1">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2" />
        <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2" />
      </div>
    </div>
    <div className="space-y-2">
      <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded" />
      <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-5/6" />
    </div>
  </div>
);

const FilterSkeleton = () => (
  <div className="space-y-4">
    {[1, 2, 3, 4].map(i => (
      <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-4 animate-pulse">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-3" />
        <div className="space-y-2">
          {[1, 2, 3].map(j => (
            <div key={j} className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 dark:bg-gray-600 rounded" />
              <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-24" />
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const JobSearchPage = () => {
  const t = useTranslations("careerPage");
  const locale = useLocale();
  const [searchInput, setSearchInput] = useState("");
  
  const {
    // State
    featuredJobs,
    jobs,
    isLoading,
    initialLoading,
    filtersLoading,
    jobsLoading,
    filterOptions,
    paginationMeta,
    error,
    searchQuery,
    
    // Handlers and setters
    setSearchQuery,
    setCurrentPage,
    handleSearchClick,
    handleClearSearch,
    handleResetFilters,
    handleIndustryChange,
    handleJobTypeChange,
    handleWorkModeChange,
    handleSalaryChange,
    handleExperienceLevelChange,
    handleEducationLevelChange,
    handleCountryChange,
    clearError,
    refreshJobs,
    
    // Filter states
    selectedIndustries,
    selectedJobTypes,
    selectedWorkModes,
    selectedExperienceLevels,
    selectedEducationLevels,
    selectedCountries,
    salaryRange,
  } = useJobSearch();

  // Handle search input with local state for immediate feedback
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = () => {
    setSearchQuery(searchInput);
    setCurrentPage(1);
  };

  // Show skeleton during initial load
  if (initialLoading) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        {/* Carousel Skeleton */}
        <div className="h-64 bg-gray-200 dark:bg-gray-800 animate-pulse" />
        
        <div className="container mx-auto px-4 py-8">
          {/* Header Skeleton */}
          <div className="mb-8">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-4" />
            <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded" />
          </div>

          {/* Content Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Skeleton */}
            <div className="lg:col-span-1">
              <FilterSkeleton />
            </div>
            
            {/* Jobs Skeleton */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <JobCardSkeleton key={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
        <Image
          src={images.serverError}
          height={150}
          width={150}
          alt="server error"
          className="mb-4"
        />
        <div className="text-red-500 text-lg mb-4">{t("errorLoadingJobs")}</div>
        <div className="flex gap-4">
          <Button
            type="default"
            onClick={clearError}
            className="px-6 py-2"
          >
            {t("dismiss")}
          </Button>
          <Button
            type="primary"
            onClick={refreshJobs}
            className="px-6 py-2"
          >
            {t("retry")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      {/* Carousel Section - Only show when data is ready */}
      {featuredJobs && featuredJobs.length > 0 && (
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 shadow-sm"
        >
          <LatestJobsCarousel jobs={featuredJobs} />
        </motion.section>
      )}

      {/* Main Content Container */}
      <div className={`mx-auto sm:px-6 lg:px-16 py-8 ${featuredJobs && featuredJobs.length > 0 ? '-mt-16' : ''}`}>
        {/* Search Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl font-bold text-gray-800 dark:text-white"
            >
              {t("availableJobs")}
            </motion.h2>

            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="w-full md:w-1/2"
            >
              <div className="bg-white dark:bg-gray-800 p-1 justify-center rounded-xl shadow-md flex flex-row gap-2">
                <div className="flex-1 flex items-center">
                  <FiSearch className="text-gray-400 dark:text-gray-300 text-xl ml-2" />
                  <Input
                    placeholder={t("searchPlaceholder")}
                    className="text-lg h-8 md:h-10 focus:outline-none border-0 outline-none focus:border-none focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                    value={searchInput}
                    onChange={handleInputChange}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit()}
                  />
                </div>

                <Button
                  type="primary"
                  onClick={handleSearchSubmit}
                  className="h-10 md:h-12 md:px-4 flex items-center dark:bg-blue-600 dark:hover:bg-blue-700"
                  icon={<FiSearch className="text-lg" />}
                  loading={jobsLoading}
                >
                  {t("searchButton")}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Filters and Jobs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="top-8 h-[calc(100vh-200px)] overflow-y-auto hide-scrollbar">
              {filtersLoading ? (
                <FilterSkeleton />
              ) : filterOptions ? (
                <JobFilters
                  filterOptions={filterOptions}
                  selectedIndustries={selectedIndustries}
                  selectedJobTypes={selectedJobTypes}
                  selectedWorkModes={selectedWorkModes}
                  selectedExperienceLevels={selectedExperienceLevels}
                  selectedEducationLevels={selectedEducationLevels}
                  selectedCountries={selectedCountries}
                  salaryRange={salaryRange}
                  onIndustryChange={handleIndustryChange}
                  onJobTypeChange={handleJobTypeChange}
                  onWorkModeChange={handleWorkModeChange}
                  onSalaryChange={handleSalaryChange}
                  onExperienceLevelChange={handleExperienceLevelChange}
                  onEducationLevelChange={handleEducationLevelChange}
                  onCountryChange={handleCountryChange}
                  onResetFilters={handleResetFilters}
                />
              ) : null}
            </div>
          </div>

          {/* Jobs List */}
          <div className="lg:col-span-3">
            <div className="min-h-[500px]">
              {jobsLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <JobCardSkeleton key={i} />
                  ))}
                </div>
              ) : !jobs || jobs.length === 0 ? (
                <div className="p-8 rounded-xl shadow-sm text-center max-w-md mx-auto">
                  <div className="flex justify-center mb-6">
                    <Image
                      src={images.noResult}
                      alt={t("noJobsFoundAlt")}
                      height={64}
                      width={64}
                      className="w-48 h-48"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    {t("noMatchingJobs")}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    {t("noResultsMessage")}
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-3">
                    <button
                      onClick={handleClearSearch}
                      className="px-4 py-2 bg-gray-100 rounded-[3px] hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 transition-colors duration-200"
                    >
                      {t("clearSearch")}
                    </button>
                    <button
                      onClick={handleResetFilters}
                      className="px-4 py-2 rounded-[4px] bg-primary-color1 hover:bg-primary-color2 text-white transition-colors duration-200"
                    >
                      {t("resetAllFilters")}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                    {jobs?.map((job, index) => (
                      <motion.article
                        key={job.id}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <JobCard
                          job={{
                            id: job.id,
                            title: job.title,
                            company: job.company,
                            work_sector: job.work_sector,
                            city: job.city,
                            country: job.country,
                            contract_types: job.contract_types,
                            work_modes: job.work_modes,
                            salary_min: job.salary_min,
                            salary_max: job.salary_max,
                            post_data: job.published_at,
                            image: job.company?.logo || icons.job,
                            description: job.description,
                            posted: formatPostedDate(job.published_at),
                            type: job.type,
                            duties_responsibilities: job.duties_responsibilities,
                            technical_skills: job.technical_skills,
                            years_experience: job.years_experience,
                            other_requirements: job.other_requirements,
                            address: job.address,
                            applied: job.applied,
                          }}
                        />
                      </motion.article>
                    ))}
                  </div>

                  {jobs?.length > 0 && paginationMeta && (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="flex justify-center mt-8"
                    >
                      <Pagination
                        current={paginationMeta.current_page}
                        total={paginationMeta.total}
                        pageSize={paginationMeta.per_page}
                        onChange={(page) => setCurrentPage(page)}
                        showSizeChanger={false}
                        className="[&_.ant-pagination-item-active]:bg-primary-color1 [&_.ant-pagination-item-active]:border-none [&_.ant-pagination-item-active]:text-white dark:[&_.ant-pagination-item]:bg-gray-700 dark:[&_.ant-pagination-item]:border-gray-600 dark:[&_.ant-pagination-item]:text-gray-300"
                        itemRender={(current, type, originalElement) => {
                          if (type === "prev") {
                            return (
                              <Button
                                className="mx-1 border-none flex items-center dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                                disabled={paginationMeta.current_page === 1}
                              >
                                {locale === "ar" ? (
                                  <FiChevronRight className="ml-1" />
                                ) : (
                                  <FiChevronLeft className="ml-1" />
                                )}
                                {t("previous")}
                              </Button>
                            );
                          }
                          if (type === "next") {
                            return (
                              <Button
                                className="mx-1 border-none flex items-center dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                                disabled={
                                  paginationMeta.current_page === paginationMeta.last_page
                                }
                              >
                                {t("next")}
                                {locale === "ar" ? (
                                  <FiChevronLeft className="ml-1" />
                                ) : (
                                  <FiChevronRight className="ml-1" />
                                )}
                              </Button>
                            );
                          }
                          if (type === "page") {
                            return (
                              <Button
                                type={
                                  current === paginationMeta.current_page
                                    ? "primary"
                                    : "default"
                                }
                                className={`mx-1 border-none dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 ${
                                  current === paginationMeta.current_page
                                    ? "!bg-primary-color1 !text-white dark:!bg-blue-600"
                                    : ""
                                }`}
                              >
                                {current}
                              </Button>
                            );
                          }
                          return originalElement;
                        }}
                      />
                    </motion.div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default JobSearchPage;