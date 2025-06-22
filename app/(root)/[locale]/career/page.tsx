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
import { useState } from "react";
import JobCard from "@/components/cards/JobCard";
import { icons } from "@/constants/icons";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import LatestJobsCarousel from "@/components/parts/LatestJobsCarousel ";

const recommendedJobs = [
  {
    id: 1,
    title: "Product Designer",
    company: "Metaxiout",
    industry: "Design",
    city: "New York",
    country: "USA",
    type_of_contract: "Permanent",
    work_mode: "Remote",
    post_data: "2023-06-01",
    image: icons.job,
    description:
      "Doing the right thing for investors is what we're all about at Vanguard, and that includes designing intuitive financial products.",
    salary: "$250/hr",
    posted: "Posted 12 days ago",
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "TechCorp",
    industry: "Technology",
    city: "San Francisco",
    country: "USA",
    type_of_contract: "Contract",
    work_mode: "Hybrid",
    post_data: "2023-06-05",
    image: "",
    description:
      "Build responsive web applications using React and modern JavaScript frameworks for enterprise clients.",
    salary: "$120/hr",
    posted: "Posted 8 days ago",
  },
  {
    id: 3,
    title: "Data Scientist",
    company: "AnalyticsPro",
    industry: "Data",
    city: "London",
    country: "UK",
    type_of_contract: "Permanent",
    work_mode: "On-site",
    post_data: "2023-05-28",
    image: icons.job,
    description:
      "Apply machine learning techniques to analyze large datasets and derive business insights for our clients.",
    salary: "$180/hr",
    posted: "Posted 16 days ago",
  },
  {
    id: 4,
    title: "UX Researcher",
    company: "DesignHub",
    industry: "Design",
    city: "Berlin",
    country: "Germany",
    type_of_contract: "Freelance",
    work_mode: "Remote",
    post_data: "2023-06-10",
    image: "",
    description:
      "Conduct user research studies and usability testing to inform product design decisions.",
    salary: "$150/hr",
    posted: "Posted 3 days ago",
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "CloudSystems",
    industry: "Technology",
    city: "Toronto",
    country: "Canada",
    type_of_contract: "Permanent",
    work_mode: "Hybrid",
    post_data: "2023-05-20",
    image: "",
    description:
      "Implement and maintain CI/CD pipelines and cloud infrastructure for our global client base.",
    salary: "$200/hr",
    posted: "Posted 23 days ago",
  },
  {
    id: 6,
    title: "Marketing Manager",
    company: "BrandVision",
    industry: "Marketing",
    city: "Sydney",
    country: "Australia",
    type_of_contract: "Permanent",
    work_mode: "On-site",
    post_data: "2023-06-12",
    image: "",
    description:
      "Develop and execute marketing strategies to promote our products and services worldwide.",
    salary: "$90/hr",
    posted: "Posted 1 day ago",
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
  const pageSize = 4;

  const paginatedJobs = recommendedJobs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleIndustryChange = (industry: string) => {
    setSelectedIndustries((prev) =>
      prev.includes(industry)
        ? prev.filter((item) => item !== industry)
        : [...prev, industry]
    );
  };

  const handleJobTypeChange = (type: string) => {
    setSelectedJobTypes((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type]
    );
  };

  const handleWorkModeChange = (mode: string) => {
    setSelectedWorkModes((prev) =>
      prev.includes(mode)
        ? prev.filter((item) => item !== mode)
        : [...prev, mode]
    );
  };

  return (
    <main className="bg-gray-50 dark:bg-gray-900">
      {/* Hero Section - Simplified */}
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="about-us-bg h-[60vh] mt-16 flex flex-col items-center justify-center relative"
      >
        <LatestJobsCarousel jobs={recommendedJobs} />
      </motion.section>

      {/* Main Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-16 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold text-gray-800 dark:text-white"
          >
            Recommended jobs
          </motion.h2>

          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="w-full md:w-1/2"
          >
            <div className="bg-white dark:bg-gray-800 p-1  justify-center rounded-xl shadow-md flex flex-row gap-2">
              <div className="flex-1 flex items-center">
                <FiSearch className="text-gray-400 dark:text-gray-300 text-xl  ml-2" />
                <Input
                  placeholder="Search jobs..."
                  bordered={false}
                  className="text-lg h-8 md:h-10 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
                  {["Permanent", "Contract", "Freelance", "Internship"].map(
                    (type) => (
                      <li key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={`type-${type}`}
                          checked={selectedJobTypes.includes(type)}
                          onCheckedChange={() => handleJobTypeChange(type)}
                        />
                        <Label
                          htmlFor={`type-${type}`}
                          className="text-gray-700 dark:text-gray-300 cursor-pointer"
                        >
                          {type}
                        </Label>
                      </li>
                    )
                  )}
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
                    max={300}
                    defaultValue={[50, 250]}
                    marks={{
                      0: "$0",
                      100: "$100",
                      200: "$200",
                      300: "$300+",
                    }}
                    tipFormatter={(value) => `$${value}/hr`}
                    tooltip={{ placement: "bottom" }}
                    className="!text-primary-color1 my-4 dark:[&_.ant-slider-track]:bg-blue-500 dark:[&_.ant-slider-handle]:border-blue-500"
                  />
                  <div className="flex mt-4 justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Min: $50</span>
                    <span>Max: $250</span>
                  </div>
                </div>
              </div>

              {/* Work Mode Filter */}
              <div>
                <h3 className="font-bold text-lg mt-6 mb-4 flex items-center gap-2 dark:text-white">
                  <FiMapPin className="text-purple-500" /> Work Mode
                </h3>
                <ul className="space-y-3">
                  {["Remote", "Hybrid", "On-site"].map((mode) => (
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
          <div className="w-full md:w-3/4 grid justify-start grid-cols-1 md:grid-cols-2 gap-2 gap-x-2">
            {paginatedJobs.map((job, index) => (
              <motion.article
                key={job.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              >
                <JobCard job={job} />
              </motion.article>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mt-8"
        >
          <Pagination
            current={currentPage}
            total={recommendedJobs.length}
            pageSize={pageSize}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
            className="[&_.ant-pagination-item-active]:bg-primary-color1 [&_.ant-pagination-item-active]:border-none [&_.ant-pagination-item-active]:text-white dark:[&_.ant-pagination-item]:bg-gray-700 dark:[&_.ant-pagination-item]:border-gray-600 dark:[&_.ant-pagination-item]:text-gray-300"
            itemRender={(current, type, originalElement) => {
              if (type === "prev") {
                return (
                  <Button className="mx-1 border-none flex items-center dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                    <FiChevronLeft className="mr-1" />
                    Previous
                  </Button>
                );
              }
              if (type === "next") {
                return (
                  <Button className="mx-1 border-none flex items-center dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                    Next
                    <FiChevronRight className="ml-1" />
                  </Button>
                );
              }
              if (type === "page") {
                return (
                  <Button
                    type={current === currentPage ? "primary" : "default"}
                    className={`mx-1 border-none dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 ${
                      current === currentPage
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
      </div>
    </main>
  );
};

export default JobSearchPage;
