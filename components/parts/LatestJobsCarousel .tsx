"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Button } from "antd";
import { useRouter } from "next/navigation";

const LatestJobsCarousel = ({ jobs }: { jobs: any }) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();
  const sliderRef = useRef<HTMLDivElement>(null);

  // Auto-play with pause on hover
  useEffect(() => {
    const startAutoPlay = () => {
      intervalRef.current = setInterval(() => {
        if (!isPaused) {
          setCurrentIndex((prev) => (prev + 1) % Math.min(jobs.length, 5));
        }
      }, 3500);
    };

    startAutoPlay();
    return () => clearInterval(intervalRef.current);
  }, [jobs.length, isPaused]);

  // Handle hover events
  const handleMouseEnter = () => {
    setIsPaused(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // Handle job details click
  const handleDetailsClick = (jobId: number) => {
    router.push(`/career/${jobId}`);
  };

  // Handle apply click
  const handleApplyClick = (jobId: number, e: any) => {
    e.stopPropagation();
    router.push(`/career/${jobId}/apply`);
  };

  // Get only the latest 5 jobs
  const latestJobs = jobs.slice(0, 5);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-16 px-4 sm:px-6 lg:px-8  w-full"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Latest Job Opportunities
        </h2>

        <div
          ref={sliderRef}
          className="relative h-[400px] md:h-[450px] w-full shadow-none cursor-pointer overflow-hidden transition-all duration-1000 "
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Background image with gradient overlay */}
          <div
            style={{
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="absolute inset-0 w-full h-full  !shadow-none"
            onClick={() => handleDetailsClick(latestJobs[currentIndex]?.id)}
          />

          {/* Slider content */}
          <motion.div
            className="w-full h-full flex justify-center !bg-transparent items-center relative z-10"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.5}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="w-full p-6"
              >
                <div className="text-center">
                  <h2 className="text-3xl text-white font-bold mb-4">
                    {latestJobs[currentIndex]?.title}
                  </h2>
                  <p className="text-gray-200 mb-2 text-xl">
                    {latestJobs[currentIndex]?.company}
                  </p>
                  <div className="flex justify-center gap-4 mb-6">
                    <span className="text-gray-300">
                      {latestJobs[currentIndex]?.city},{" "}
                      {latestJobs[currentIndex]?.country}
                    </span>
                    <span className="text-gray-300">
                      {latestJobs[currentIndex]?.work_mode}
                    </span>
                    <span className="text-primary-color1 font-semibold">
                      {latestJobs[currentIndex]?.salary}
                    </span>
                  </div>
                  <p className="text-gray-100 mb-8 mx-auto max-w-2xl line-clamp-2">
                    {latestJobs[currentIndex]?.description}
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button
                      type="primary"
                      className="bg-primary-color1 h-12 px-6 font-semibold"
                      onClick={() =>
                        handleDetailsClick(latestJobs[currentIndex]?.id)
                      }
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default LatestJobsCarousel;
