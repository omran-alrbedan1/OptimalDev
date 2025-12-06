"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Define the Slider type
type Slider = {
  image: string;
  title?: string;
  description?: string;
  link_text?: string;
  link_url?: string;
};

const Slider = ({ sliders }: { sliders: Slider[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();
  const [isDragging, setIsDragging] = useState(false);

  // Use useCallback to prevent unnecessary re-renders
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % sliders.length);
  }, [sliders.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + sliders.length) % sliders.length);
  }, [sliders.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    if (!sliders || sliders.length === 0) return;

    const startAutoPlay = () => {
      intervalRef.current = setInterval(() => {
        if (!isPaused) {
          goToNext();
        }
      }, 3500);
    };

    startAutoPlay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [sliders, isPaused, goToNext]);

  const handleSlideClick = () => {
    if (sliders[currentIndex]?.link_url) {
      window.open(
        sliders[currentIndex].link_url,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // Handle drag (swipe)
  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (event: any, info: any) => {
    const offset = info.offset.x;

    // Only navigate if it was a significant drag
    if (Math.abs(offset) > 50) {
      if (offset < -50) {
        goToNext();
      } else if (offset > 50) {
        goToPrevious();
      }
    }

    // Reset dragging state after a short delay
    setTimeout(() => setIsDragging(false), 100);
  };

  // If no sliders, return null or a placeholder
  if (!sliders || sliders.length === 0) {
    return (
      <div className="relative h-full w-full bg-gray-200 flex items-center justify-center">
        <p>No slides available</p>
      </div>
    );
  }

  return (
    <div
      ref={sliderRef}
      className="relative w-full h-full cursor-pointer overflow-hidden shadow-md"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Clickable Image Area */}
      <motion.div
        className="absolute inset-0 z-10 cursor-pointer"
        onClick={handleSlideClick}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        dragElastic={0.2}
        dragMomentum={false}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full flex items-center justify-center"
          >
            <img
              src={sliders[currentIndex]?.image}
              alt={sliders[currentIndex]?.title || "Slider image"}
              className="w-fit cursor-pointer"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Dark overlay for better text readability */}
      {sliders[currentIndex]?.title && (
        <div className="absolute inset-0 bg-black/50 z-15"></div>
      )}

      {/* Content overlay - Only for text content, not for clicking */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <div className="w-full h-full flex justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-6xl px-6 text-center"
            >
              {sliders[currentIndex]?.title && (
                <motion.div
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-3xl lg:text-4xl xl:text-5xl text-white font-bold mb-6 pointer-events-none"
                  dangerouslySetInnerHTML={{
                    __html: sliders[currentIndex].title,
                  }}
                />
              )}
              {sliders[currentIndex]?.description && (
                <motion.div
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-gray-100 text-lg lg:text-xl mb-8 max-w-4xl mx-auto leading-relaxed pointer-events-none"
                  dangerouslySetInnerHTML={{
                    __html: sliders[currentIndex].description,
                  }}
                />
              )}
              {sliders[currentIndex]?.link_text && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="bg-primary-color1 text-white px-8 py-3 rounded-md hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg pointer-events-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSlideClick();
                  }}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: sliders[currentIndex].link_text,
                    }}
                  />
                </motion.button>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation arrows */}
      {sliders.length > 1 && (
        <>
          {/* Previous arrow */}
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{
              scale: 1.1,
              backgroundColor: "rgba(255, 255, 255, 0.95)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white dark:!bg-black/50 text-primary-color1 dark:text-white p-2 sm:p-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-600 backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <motion.svg
              whileHover={{ x: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="w-4 h-4 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </motion.svg>
          </motion.button>

          {/* Next arrow */}
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{
              scale: 1.1,
              backgroundColor: "rgba(255, 255, 255, 0.95)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-30 !bg-white dark:!bg-black/50 text-primary-color1 dark:text-white p-2 sm:p-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-600 backdrop-blur-sm"
            aria-label="Next slide"
          >
            <motion.svg
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="w-4 h-4 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </motion.svg>
          </motion.button>
        </>
      )}

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-30">
        {sliders.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              goToSlide(index);
            }}
            className={`h-3 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? "bg-primary-color1 w-8 shadow-lg"
                : "bg-gray-400 w-3 hover:bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
