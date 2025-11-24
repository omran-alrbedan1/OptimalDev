"use client";
import JobCard from "@/components/cards/JobCard";
import Loader from "@/components/Loader";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useJobSearch } from "@/hooks/useJobSearch";
import { formatPostedDate } from "@/lib/utils";
import { Button, Input, Pagination } from "antd";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight, FiSearch } from "react-icons/fi";
import JobFilters from "./_components/jobFilters";
import LatestJobsCarousel from "@/components/parts/LatestJobsCarousel ";

const JobSearchPage = () => {
  const t = useTranslations("careerPage");
  const locale = useLocale();

  const {
    // State
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
  } = useJobSearch();

  if (isLoading && !filterOptions) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Image
          src={images.serverError}
          height={100}
          width={100}
          alt="server error"
        />
        <div className="text-red-500">{t("errorLoadingJobs")}</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Carousel Section */}
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white dark:bg-gray-800 shadow-sm"
      >
        <LatestJobsCarousel jobs={featuredJobs} />
      </motion.section>

      {/* Main Content Container */}
      <div className=" mx-auto  sm:px-6 lg:px-16 py-8  -mt-16">
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
                    className="text-lg h-8 md:h-10 focus:outline-none border-0 outline-none focus:border-none focus:ring-0   dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>

                <Button
                  type="primary"
                  onClick={handleSearchClick}
                  className="h-10 md:h-12 md:px-4 flex items-center dark:bg-blue-600 dark:hover:bg-blue-700"
                  icon={<FiSearch className="text-lg" />}
                >
                  {t("searchButton")}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Filters and Jobs Grid - Independent Scroll Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 min-h-[630px]  custom-scrollbar -mr-2">
          {/* Filters Sidebar - Independent Scroll */}
          <div className="lg:col-span-1">
            <div className=" top-8 h-[calc(100vh-100px)] overflow-y-auto hide-scrollbar">
              <JobFilters
                //@ts-ignore
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
            </div>
          </div>

          {/* Jobs List - Independent Scroll */}
          <div className="lg:col-span-3 p-4 -mr-2">
            <div className="h-[calc(100vh-150px)] overflow-y-auto">
              {jobs?.length === 0 ? (
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 p-4">
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
                            company: job.company.name,
                            industry: job.work_sector.name,
                            city: job.city.name,
                            country: job.country.name,
                            type_of_contract: t("fullTime"),
                            work_mode: t("onSite"),
                            post_data: job.published_at,
                            image: job.company.logo || icons.job,
                            description: job.description,
                            salary: `${t("currencySymbol")}${
                              job.salary_min
                            } - ${t("currencySymbol")}${job.salary_max}`,
                            posted: formatPostedDate(job.published_at),
                            type: job.type,
                            duties_responsibilities:
                              job.duties_responsibilities,
                            technical_skills: job.technical_skills,
                            years_experience: job.years_experience,
                            other_requirements: job.other_requirements,
                            address: job.address,
                          }}
                        />
                      </motion.article>
                    ))}
                  </div>

                  {jobs?.length > 0 && (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="flex justify-center mt-8 overflow-x-auto hide-scrollbar"
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
                                  paginationMeta.current_page ===
                                  paginationMeta.last_page
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
