"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const LatestJobsCarousel = ({ jobs }: { jobs: any }) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const startAutoPlay = () => {
      intervalRef.current = setInterval(() => {
        if (!isPaused) {
          setCurrentIndex((prev) => (prev + 1) % jobs.length);
        }
      }, 5000);
    };

    startAutoPlay();
    return () => clearInterval(intervalRef.current);
  }, [jobs.length, isPaused]);

  const handleSlideClick = () => {
    if (jobs[currentIndex].url) {
      router.push(jobs[currentIndex].url);
    }
  };

  return (
    <div
      ref={sliderRef}
      className="absolute  inset-0 h-full w-full overflow-hidden"
    >
      <div
        style={{
          backgroundImage: `url(${jobs[currentIndex].image})`,
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
