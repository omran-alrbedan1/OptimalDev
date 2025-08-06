"use client";
import JobCard from "@/components/cards/JobCard";
import Loader from "@/components/Loader";
import LatestJobsCarousel from "@/components/parts/LatestJobsCarousel ";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import {
  fetchFeaturedJobs,
  fetchJobFilters,
  fetchJobs,
} from "@/lib/client-action";
import { formatPostedDate } from "@/lib/utils";
import { Button, Input, Pagination, Slider } from "antd";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FiBook,
  FiBriefcase,
  FiChevronLeft,
  FiChevronRight,
  FiDollarSign,
  FiFilter,
  FiLayers,
  FiMapPin,
  FiSearch,
} from "react-icons/fi";

const JobSearchPage = () => {
  const t = useTranslations("careerPage");
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
  const [error, setError] = useState(null);
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(
    null
  );
  const [isFiltering, setIsFiltering] = useState(false);
  const [paginationMeta, setPaginationMeta] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 15,
    total: 0,
  });

  useEffect(() => {
    const getFeaturedJobs = async () => {
      try {
        const featuredJobs = await fetchFeaturedJobs();
        console.log(featuredJobs);
        //@ts-ignore
        setFeaturedJobs(featuredJobs);
      } catch (err) {
        console.error("Failed to fetch feature jobs:", err);
      }
    };
    getFeaturedJobs();
  }, []);
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const filters = await fetchJobFilters();
        console.log(filters);
        setFilterOptions(filters);
      } catch (err) {
        console.error("Failed to fetch filters:", err);
      }
    };

    fetchFilters();
  }, []);

  useEffect(() => {
    const fetchJobsData = async () => {
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
        console.log(response);
        setJobs(response.data);
        setPaginationMeta(
          response.meta || {
            current_page: currentPage,
            total: response.data.length,
            //@ts-ignore
            per_page: response?.meta?.per_page,
            last_page: Math.ceil(response.data.length / 15),
          }
        );
      } catch (err: any) {
        setError(err.message || "Failed to fetch jobs");
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchJobsData();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [currentPage, isFiltering]);

  console.log(featuredJobs);
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
    <main className="bg-gray-50 dark:bg-gray-900">
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="h-[61vh] mt-16 flex flex-col items-center justify-center relative"
      >
        <LatestJobsCarousel jobs={featuredJobs} />
      </motion.section>

      <div className="mx-auto px-4 sm:px-6 lg:px-16 -mt-16 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
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
                  bordered={false}
                  className="text-lg h-8 md:h-10 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>

              <Button
                type="primary"
                onClick={() => setIsFiltering(!isFiltering)}
                className="h-10 md:h-12 md:px-4 flex items-center dark:bg-blue-600 dark:hover:bg-blue-700"
                icon={<FiSearch className="text-lg" />}
              >
                {t("searchButton")}
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <motion.aside
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full md:w-1/4"
          >
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm h-fit sticky top-8">
              <div className="flex items-center justify-between mb-4">
                <h1 className="font-bold dark:text-white">{t("filters")}</h1>
                <button
                  onClick={() => setIsFiltering(!isFiltering)}
                  className={`
                    text-sm
                    flex items-center gap-2 
                    px-3 py-2 
                    rounded-[4px] 
                    bg-blue-50 hover:bg-blue-100 
                    dark:bg-gray-700 dark:hover:bg-gray-600
                    text-primary-color1 
                    transition-colors duration-200
                    border border-blue-200 dark:border-gray-600
                    shadow-sm
                  `}
                >
                  <FiFilter className="text-md" />
                  <span className="font-medium">{t("applyFilters")}</span>
                </button>
              </div>

              {/* Industry Filter */}
              {filterOptions?.work_sectors && (
                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2 dark:text-white">
                    <FiLayers className="text-blue-500" /> {t("industry")}
                  </h3>
                  <ul className="space-y-3">
                    {filterOptions.work_sectors.map((sector) => (
                      <li key={sector.id} className="flex items-center gap-x-2">
                        <Checkbox
                          id={`sector-${sector.id}`}
                          checked={selectedIndustries.includes(sector.id)}
                          onCheckedChange={() =>
                            handleIndustryChange(sector.id)
                          }
                        />
                        <Label
                          htmlFor={`sector-${sector.id}`}
                          className="text-gray-700 dark:text-gray-300 cursor-pointer"
                        >
                          {sector.name}
                        </Label>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Job Type Filter */}
              {filterOptions?.contract_types && (
                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2 dark:text-white">
                    <FiBriefcase className="text-blue-500" /> {t("jobType")}
                  </h3>
                  <ul className="space-y-3">
                    {filterOptions.contract_types.map((type) => (
                      <li key={type.id} className="flex items-center gap-x-2">
                        <Checkbox
                          id={`type-${type.id}`}
                          checked={selectedJobTypes.includes(type.id)}
                          onCheckedChange={() => handleJobTypeChange(type.id)}
                        />
                        <Label
                          htmlFor={`type-${type.id}`}
                          className="text-gray-700 dark:text-gray-300 cursor-pointer"
                        >
                          {type.name}
                        </Label>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Salary Range Filter */}
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2 dark:text-white">
                  <FiDollarSign className="text-green-500" /> {t("salaryRange")}
                </h3>
                <div className="px-4 mt-8">
                  <Slider
                    range
                    min={0}
                    max={2000}
                    defaultValue={[500, 1500]}
                    value={salaryRange}
                    onChange={handleSalaryChange}
                    marks={{
                      0: t("salaryMarks.0"),
                      500: t("salaryMarks.500"),
                      1000: t("salaryMarks.1000"),
                      1500: t("salaryMarks.1500"),
                      2000: t("salaryMarks.2000"),
                    }}
                    tipFormatter={
                      (value) =>
                        useLocale() === "ar"
                          ? `${value} ${t("currencySymbol")}` // Arabic format: number then symbol
                          : `${t("currencySymbol")}${value}` // English format: symbol then number
                    }
                    tooltip={{ placement: "bottom" }}
                    className="!text-primary-color1 my-4 dark:[&_.ant-slider-track]:bg-blue-500 dark:[&_.ant-slider-handle]:border-blue-500"
                    reverse={useLocale() === "ar"}
                  />
                  <div className="flex mt-4 justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>
                      {useLocale() === "ar"
                        ? `${salaryRange[0]} ${t("currencySymbol")} :${t(
                            "minSalary"
                          )}`
                        : `${t("minSalary")}: ${t("currencySymbol")}${
                            salaryRange[0]
                          }`}
                    </span>
                    <span>
                      {useLocale() === "ar"
                        ? `${salaryRange[1]} ${t("currencySymbol")} :${t(
                            "maxSalary"
                          )}`
                        : `${t("maxSalary")}: ${t("currencySymbol")}${
                            salaryRange[1]
                          }`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Work Mode Filter */}
              {filterOptions?.work_modes && (
                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2 dark:text-white">
                    <FiMapPin className="text-purple-500" /> {t("workMode")}
                  </h3>
                  <ul className="space-y-3">
                    {filterOptions.work_modes.map((mode) => (
                      <li key={mode.id} className="flex items-center gap-x-2">
                        <Checkbox
                          id={`mode-${mode.id}`}
                          checked={selectedWorkModes.includes(mode.id)}
                          onCheckedChange={() => handleWorkModeChange(mode.id)}
                        />
                        <Label
                          htmlFor={`mode-${mode.id}`}
                          className="text-gray-700 dark:text-gray-300 cursor-pointer"
                        >
                          {mode.name}
                        </Label>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Experience Level Filter */}
              {filterOptions?.experience_levels && (
                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2 dark:text-white">
                    <FiBriefcase className="text-green-500" />{" "}
                    {t("experienceLevel")}
                  </h3>
                  <ul className="space-y-3">
                    {filterOptions.experience_levels.map((level) => (
                      <li key={level.id} className="flex items-center gap-x-2">
                        <Checkbox
                          id={`exp-${level.id}`}
                          checked={selectedExperienceLevels.includes(level.id)}
                          onCheckedChange={() =>
                            handleExperienceLevelChange(level.id)
                          }
                        />
                        <Label
                          htmlFor={`exp-${level.id}`}
                          className="text-gray-700 dark:text-gray-300 cursor-pointer"
                        >
                          {level.name}
                        </Label>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Education Level Filter */}
              {filterOptions?.education_levels && (
                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2 dark:text-white">
                    <FiBook className="text-yellow-500" /> {t("educationLevel")}
                  </h3>
                  <ul className="space-y-3">
                    {filterOptions.education_levels.map((level) => (
                      <li key={level.id} className="flex items-center  gap-x-2">
                        <Checkbox
                          id={`edu-${level.id}`}
                          checked={selectedEducationLevels.includes(level.id)}
                          onCheckedChange={() =>
                            handleEducationLevelChange(level.id)
                          }
                        />
                        <Label
                          htmlFor={`edu-${level.id}`}
                          className="text-gray-700 dark:text-gray-300 cursor-pointer"
                        >
                          {level.name}
                        </Label>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {filterOptions?.countries && (
                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2 dark:text-white">
                    <FiMapPin className="text-red-500" /> {t("country")}
                  </h3>
                  <ul className="space-y-3">
                    {filterOptions.countries.map((country) => (
                      <li
                        key={country.id}
                        className="flex items-center gap-x-2"
                      >
                        <Checkbox
                          id={`country-${country.id}`}
                          checked={selectedCountries.includes(country.id)}
                          onCheckedChange={() =>
                            handleCountryChange(country.id)
                          }
                        />
                        <Label
                          htmlFor={`country-${country.id}`}
                          className="text-gray-700 dark:text-gray-300 cursor-pointer"
                        >
                          {country.name}
                        </Label>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.aside>

          <div className="w-full md:w-3/4">
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
                    onClick={() => {
                      setSearchQuery("");
                      setCurrentPage(1);
                      setIsFiltering(!isFiltering);
                    }}
                    className="px-4 py-2 bg-gray-100 rounded-[3px] hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 transition-colors duration-200"
                  >
                    {t("clearSearch")}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedIndustries([]);
                      setSelectedJobTypes([]);
                      setSelectedWorkModes([]);
                      setSelectedExperienceLevels([]);
                      setSelectedEducationLevels([]);
                      setSelectedCountries([]);
                      setSalaryRange([0, 2000]);
                      setCurrentPage(1);
                      setIsFiltering(!isFiltering);
                    }}
                    className="px-4 py-2 rounded-[4px] bg-primary-color1 hover:bg-primary-color2 text-white transition-colors duration-200"
                  >
                    {t("resetAllFilters")}
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {jobs?.map((job, index) => (
                  <motion.article
                    key={job.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className=""
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
                        salary: `${t("currencySymbol")}${job.salary_min} - ${t(
                          "currencySymbol"
                        )}${job.salary_max}`,
                        posted: formatPostedDate(job.published_at),
                        type: job.type,
                        duties_responsibilities: job.duties_responsibilities,
                        technical_skills: job.technical_skills,
                        years_experience: job.years_experience,
                        other_requirements: job.other_requirements,
                        address: job.address,
                      }}
                    />
                  </motion.article>
                ))}
              </div>
            )}
          </div>
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
                      {useLocale() === "ar" ? (
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
                      {useLocale() === "ar" ? (
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
      </div>
    </main>
  );
};

export default JobSearchPage;
