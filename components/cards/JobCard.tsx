"use client";
import { FiBriefcase, FiMapPin, FiClock } from "react-icons/fi";
import { Button } from "antd";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const JobCard = ({ job }: { job: any }) => {
  return (
    <Link href={`/career/${job.id}`}>
      <div className="bg-white dark:bg-gray-800 h-[18rem] rounded-lg md:rounded-xl shadow-sm p-4 md:p-6 hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col">
        <div className="flex items-start gap-3 md:gap-4 flex-1">
          <div className="bg-gray-100 dark:bg-gray-700 p-2 md:p-3 rounded-lg flex items-center justify-center flex-shrink-0">
            {job.image ? (
              <Image
                src={job.image}
                height={32}
                width={32}
                alt={job.title}
                className="size-6 md:size-8"
              />
            ) : (
              <FiBriefcase className="text-lg md:text-xl text-gray-600 dark:text-gray-300 size-6 md:size-8" />
            )}
          </div>

          <div className="flex-1 flex flex-col h-full">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 md:gap-2">
              <div>
                <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-800 dark:text-white line-clamp-1">
                  {job.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mt-0 md:mt-1 line-clamp-1">
                  {job.company} • {job.city}, {job.country}
                </p>
              </div>
              <span className="font-semibold text-xs md:text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 p-1 px-2 rounded-full self-start sm:self-auto mt-1 sm:mt-0">
                {job.salary}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 md:gap-2 my-2 md:my-3">
              <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs md:text-sm flex items-center gap-1">
                <FiBriefcase className="text-[10px] md:text-xs" />
                {job.type_of_contract}
              </span>
              <span
                className={`${
                  job.work_mode === "Remote"
                    ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                    : job.work_mode === "Hybrid"
                    ? "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                    : "bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                } px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs md:text-sm flex items-center gap-1`}
              >
                <FiMapPin className="text-[10px] md:text-xs" /> {job.work_mode}
              </span>
              <span className="bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs md:text-sm line-clamp-1">
                Industry: {job.industry}
              </span>
            </div>

            <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 my-2 md:my-3 line-clamp-2 md:line-clamp-3">
              {job.description}
            </p>

            <div className="mt-auto pt-2 md:pt-3 border-t border-gray-100 dark:border-gray-700">
              <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-2">
                <span className="text-sm md:font-medium md:text-md text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <FiClock className="text-[10px] md:text-lg" /> {job.posted}
                </span>
                <Button
                  type="primary"
                  size="small"
                  className="!px-3 md:!px-4 !py-2 md:!py-3.5 !text-xs md:!text-sm !font-medium !rounded-lg w-full xs:w-auto text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
