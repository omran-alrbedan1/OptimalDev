"use client";

import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import Header from "../Header";
import Image from "next/image";
import { images } from "@/constants/images";
import { fetchJobs } from "@/lib/client-action";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";
import {
  FiBriefcase,
  FiMapPin,
  FiDollarSign,
  FiCalendar,
  FiArrowRight,
  FiEye,
} from "react-icons/fi";
import { useTranslations } from "next-intl";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  postedDate: string;
  description: string;
}

interface JobOpportunitiesProps {}

const JobOpportunities: React.FC<JobOpportunitiesProps> = ({}) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const t = useTranslations("jobOpportunities");

  useEffect(() => {
    const fetchFirstPageJobs = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchJobs({
          page: 1,
          search: "",
          work_sectors: [],
          contract_types: [],
          work_modes: [],
          experience_levels: [],
          education_levels: [],
          countries: [],
          salary_min: 0,
          salary_max: 2000,
        });

        const transformedJobs: Job[] = response.data.map((job: any) => ({
          id: job.id.toString(),
          title: job.title,
          company: job.company?.name || t("unknownCompany"),
          location: `${job.city?.name || ""}, ${
            job.country?.name || ""
          }`.trim(),
          type: job.contract_type?.name || t("fullTime"),
          salary: `$${job.salary_min || 0} - $${job.salary_max || 0}`,
          postedDate: job.published_at || new Date().toISOString(),
          description: job.description || t("noDescription"),
        }));

        setJobs(transformedJobs);
      } catch (err: any) {
        setError(err.message || t("fetchError"));
        console.error("Error fetching jobs:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFirstPageJobs();
  }, [t]);

  const handleApplyClick = (jobId: string) => {
    router.push(`/career/${jobId}`);
  };

  const handleViewMoreClick = () => {
    router.push("/career");
  };

  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (error && jobs.length === 0) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <Header title={t("title")} paragraph={t("paragraph")} />
          <div className="text-center text-red-500 dark:text-red-400">
            <p>
              {t("errorLoading")}: {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {t("retry")}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <Header title={t("title")} paragraph={t("paragraph")} />
        <div className="flex -mt-6 flex-col lg:flex-row gap-12 items-center">
          {/* Left Side - Image */}
          <div className="lg:w-2/5">
            <Image
              src={images.jobs}
              alt={t("imageAlt")}
              height={400}
              width={400}
            />
          </div>

          {/* Right Side - Carousel */}
          <div className="lg:w-3/5 w-full">
            <Carousel {...carouselSettings}>
              {jobs.map((job) => (
                <div key={job.id} className="p-4">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {job.title}
                      </h3>
                      <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm px-3 py-1 rounded-full">
                        {job.type}
                      </span>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <FiBriefcase className="w-4 h-4 mr-2 text-primary-color1" />
                        {job.company}
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <FiMapPin className="w-4 h-4 mr-2 text-primary-color1" />
                        {job.location}
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <FiDollarSign className="w-4 h-4 mr-2 text-primary-color1" />
                        {job.salary}
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 flex-grow">
                      {job.description}
                    </p>

                    <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mt-auto">
                      <div className="flex items-center">
                        <FiCalendar className="w-3 h-3 mr-1 text-primary-color1" />
                        <span>
                          {t("posted")}:{" "}
                          {new Date(job.postedDate).toLocaleDateString()}
                        </span>
                      </div>
                      <button
                        onClick={() => handleApplyClick(job.id)}
                        className="flex items-center text-primary-color1 hover:text-primary-color2 font-medium transition-colors duration-200"
                      >
                        {t("applyNow")}
                        <FiArrowRight className="ml-1 w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
        {/* View More Button */}
        <div className="flex justify-center mt-2">
          <button
            onClick={handleViewMoreClick}
            className="relative px-8 py-3 bg-gradient-to-r from-primary-color1/80 via-primary-color1/90 to-primary-color1 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:rotate-1 overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-2">
              {t("viewMore")}
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-color1/15 via-primary-color1/50 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default JobOpportunities;
