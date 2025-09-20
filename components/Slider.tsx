"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { sl } from "date-fns/locale";

const Slider = ({ sliders }: { sliders: Slider[] }) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    const startAutoPlay = () => {
      intervalRef.current = setInterval(() => {
        if (!isPaused) {
          setCurrentIndex((prev) => (prev + 1) % sliders?.length);
        }
      }, 3500);
    };

    startAutoPlay();
    return () => clearInterval(intervalRef.current);
  }, [sliders?.length, isPaused]);

  const handleSlideClick = () => {
    if (sliders[currentIndex]?.link_url) {
      router.push(sliders[currentIndex]?.link_url);
    }
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // Manual navigation
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    // Reset timer when manually navigating
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliders.length);
    }, 2000);
  };

  // Handle drag (swipe)
  const handleDragEnd = (event: any, info: any) => {
    const offset = info.offset.x;
    if (offset < -100) {
      setCurrentIndex((prev) => (prev + 1) % sliders.length);
    } else if (offset > 100) {
      setCurrentIndex((prev) => (prev - 1 + sliders.length) % sliders.length);
    }
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliders.length);
    }, 4000);
  };

  console.log(sliders);

  return (
    <div
      ref={sliderRef}
      className="relative h-full w-full cursor-pointer overflow-hidden transition-all duration-1000 shadow-2xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background image with click handler */}
      <div
        style={{
          backgroundImage: `url(${sliders[currentIndex]?.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 w-full h-full"
        onClick={handleSlideClick}
      />

      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* Slider content */}
      <motion.div
        className="w-full h-full flex justify-center items-center relative z-10"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
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
              {sliders[currentIndex]?.title && (
                <div
                  className="text-3xl text-white font-bold mt-6 mb-4"
                  dangerouslySetInnerHTML={{
                    __html: sliders[currentIndex]?.title,
                  }}
                />
              )}
              {sliders[currentIndex]?.description && (
                <div
                  className="text-gray-100 mb-6 xl:mx-80 max-sm:mb-10"
                  dangerouslySetInnerHTML={{
                    __html: sliders[currentIndex]?.description,
                  }}
                />
              )}
              {sliders[currentIndex]?.link_text && (
                <button
                  className="bg-primary-color1 text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition"
                  onClick={handleSlideClick}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: sliders[currentIndex]?.link_text,
                    }}
                  />
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Navigation dots */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {sliders?.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentIndex === index ? "bg-primary-color1 w-6" : "bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
