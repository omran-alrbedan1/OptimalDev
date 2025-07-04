"use client";
import { motion } from "framer-motion";
import { Button, Input, Pagination, Slider } from "antd";
import {
  FiSearch,
  FiBriefcase,
  FiDollarSign,
  FiMapPin,
  FiChevronLeft,
  FiChevronRight,
  FiFilter,
  FiLayers,
} from "react-icons/fi";
import { useEffect, useState } from "react";
import JobCard from "@/components/cards/JobCard";
import { icons } from "@/constants/icons";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { fetchCities, fetchCountries, fetchJobs } from "@/lib/client-action";
import Loader from "@/components/Loader";
import LatestJobsCarousel from "@/components/parts/LatestJobsCarousel ";
import { formatPostedDate } from "@/lib/utils";
import { useFetch, useFetchWithId } from "@/hooks/useFetch";

const LatestJobs = [
  {
    image: "/images/hero1.jpg",
    url: "/",
  },
  {
    image: "/images/hero2.jpg",
    url: "/",
  },
  {
    image: "/images/hero3.jpg",
    url: "/",
  },
];

const industries = [
  "Technology",
  "Design",
  "Marketing",
  "Finance",
  "Education",
  "Retail",
];

const JobSearchPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedWorkModes, setSelectedWorkModes] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 300]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paginationMeta, setPaginationMeta] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 15,
    total: 0,
  });

  useEffect(() => {
    const fetchJobsData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchJobs(currentPage);

        setJobs(response.data);
        setPaginationMeta(
          response.meta || {
            current_page: currentPage,
            total: response.data.length,
            per_page: 15,
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
  }, [
    currentPage,
    searchQuery,
    selectedIndustries,
    selectedJobTypes,
    selectedWorkModes,
    salaryRange,
  ]);

  const { data: countries } = useFetch<Country[]>(fetchCountries);
  const { data: cities } = useFetchWithId<City[]>(fetchCities, 1);

  console.log(cities);

  const handleIndustryChange = (industry: string) => {
    setSelectedIndustries((prev) =>
      prev.includes(industry)
        ? prev.filter((item) => item !== industry)
        : [...prev, industry]
    );
    setCurrentPage(1);
  };

  const handleJobTypeChange = (type: string) => {};

  const handleWorkModeChange = (mode: string) => {
    setSelectedWorkModes((prev) =>
      prev.includes(mode)
        ? prev.filter((item) => item !== mode)
        : [...prev, mode]
    );
    setCurrentPage(1);
  };

  const handleSalaryChange = (value: [number, number]) => {
    setSalaryRange(value);
    setCurrentPage(1);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">Error loading jobs</div>
      </div>
    );
  }

  return (
    <main className="bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="h-[61vh] mt-16 flex flex-col items-center justify-center relative"
      >
        <LatestJobsCarousel jobs={LatestJobs} />
      </motion.section>

      {/* Main Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-16 -mt-8 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold text-gray-800 dark:text-white"
          >
            Available Jobs
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
                  placeholder="Search jobs..."
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
                className="h-10 md:h-12 md:px-4 flex items-center dark:bg-blue-600 dark:hover:bg-blue-700"
                icon={<FiSearch className="text-lg" />}
              >
                Search
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filter Section */}
          <motion.aside
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full md:w-1/4"
          >
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm h-fit sticky top-8">
              <div className="flex items-center justify-between mb-4">
                <h1 className="font-bold dark:text-white">Filters</h1>
                <FiFilter className="text-gray-500 dark:text-gray-400" />
              </div>

              {/* Industry Filter */}
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2 dark:text-white">
                  <FiLayers className="text-blue-500" /> Industry
                </h3>
                <ul className="space-y-3">
                  {industries.map((industry) => (
                    <li key={industry} className="flex items-center space-x-2">
                      <Checkbox
                        id={`industry-${industry}`}
                        checked={selectedIndustries.includes(industry)}
                        onCheckedChange={() => handleIndustryChange(industry)}
                      />
                      <Label
                        htmlFor={`industry-${industry}`}
                        className="text-gray-700 dark:text-gray-300 cursor-pointer"
                      >
                        {industry}
                      </Label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Job Type Filter */}
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2 dark:text-white">
                  <FiBriefcase className="text-blue-500" /> Job Type
                </h3>
                <ul className="space-y-3">
                  {["normal", "featured"].map((type) => (
                    <li key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`type-${type}`}
                        checked={selectedJobTypes.includes(type)}
                        onCheckedChange={() => handleJobTypeChange(type)}
                      />
                      <Label
                        htmlFor={`type-${type}`}
                        className="text-gray-700 dark:text-gray-300 cursor-pointer capitalize"
                      >
                        {type}
                      </Label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Salary Range Filter */}
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2 dark:text-white">
                  <FiDollarSign className="text-green-500" /> Salary Range
                </h3>
                <div className="px-4 mt-8">
                  <Slider
                    range
                    min={0}
                    max={2000}
                    defaultValue={[500, 1500]}
                    value={salaryRange}
                    // @ts-ignore
                    onChange={handleSalaryChange}
                    marks={{
                      0: "$0",
                      500: "$500",
                      1000: "$1000",
                      1500: "$1500",
                      2000: "$2000+",
                    }}
                    tipFormatter={(value) => `$${value}`}
                    tooltip={{ placement: "bottom" }}
                    className="!text-primary-color1 my-4 dark:[&_.ant-slider-track]:bg-blue-500 dark:[&_.ant-slider-handle]:border-blue-500"
                  />
                  <div className="flex mt-4 justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Min: ${salaryRange[0]}</span>
                    <span>Max: ${salaryRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Work Mode Filter */}
              <div>
                <h3 className="font-bold text-lg mt-6 mb-4 flex items-center gap-2 dark:text-white">
                  <FiMapPin className="text-purple-500" /> Location
                </h3>
                <ul className="space-y-3">
                  {["Amman", "Remote", "Hybrid"].map((mode) => (
                    <li key={mode} className="flex items-center space-x-2">
                      <Checkbox
                        id={`mode-${mode}`}
                        checked={selectedWorkModes.includes(mode)}
                        onCheckedChange={() => handleWorkModeChange(mode)}
                      />
                      <Label
                        htmlFor={`mode-${mode}`}
                        className="text-gray-700 dark:text-gray-300 cursor-pointer"
                      >
                        {mode}
                      </Label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.aside>

          {/* Jobs List */}
          <div className="w-full md:w-3/4">
            {jobs?.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm text-center">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                  No jobs found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        type_of_contract: "Full-time",
                        work_mode: "On-site",
                        post_data: job.published_at,
                        image: job.company.logo || icons.job,
                        description: job.description,
                        salary: `$${job.salary_min} - $${job.salary_max}`,
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

        {/* Pagination */}
        {jobs?.length > 0 && (
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
                      <FiChevronLeft className="mr-1" />
                      Previous
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
                      Next
                      <FiChevronRight className="ml-1" />
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
