"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const LatestJobsCarousel = (jobs: any) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();
  const featuredJobs = jobs.jobs;

  useEffect(() => {
    const startAutoPlay = () => {
      intervalRef.current = setInterval(() => {
        if (!isPaused) {
          setCurrentIndex((prev) => (prev + 1) % featuredJobs.length);
        }
      }, 5000);
    };

    startAutoPlay();
    return () => clearInterval(intervalRef.current);
  }, [featuredJobs.length, isPaused]);

  const handleSlideClick = () => {
    if (featuredJobs[currentIndex].url) {
      router.push(`/career/${featuredJobs[currentIndex].id}`);
    }
  };

  return (
    <div
      ref={sliderRef}
      className="absolute  inset-0 h-full w-full overflow-hidden"
    >
      <div
        style={{
          backgroundImage: `url(${featuredJobs[currentIndex]?.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 h-full cursor-pointer w-full transition-all duration-1000"
        onClick={handleSlideClick}
      />
    </div>
  );
};

export default LatestJobsCarousel;
