"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

// Define the Slider type
type Slider = {
  image: string;
  title?: string;
  description?: string;
  link_text?: string;
  link_url?: string;
};

const Slider = ({ sliders }: { sliders: Slider[] }) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!sliders || sliders.length === 0) return;

    const startAutoPlay = () => {
      intervalRef.current = setInterval(() => {
        if (!isPaused) {
          setCurrentIndex((prev) => (prev + 1) % sliders.length);
        }
      }, 3500);
    };

    startAutoPlay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [sliders, isPaused]);

  const handleSlideClick = () => {
    if (sliders[currentIndex]?.link_url) {
      router.push(sliders[currentIndex].link_url);
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
      className="relative w-full h-full cursor-pointer overflow-hidden shadow-2xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ minHeight: "400px" }}
      onClick={() => router.push(sliders[currentIndex]?.link_url || "#")}
    >
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute  inset-0 w-full h-full"
          onClick={handleSlideClick}
          style={{
            backgroundImage: `url(${sliders[currentIndex]?.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "100%",
          }}
        />
      </AnimatePresence>

      {/* Dark overlay for better text readability */}
      {sliders[currentIndex]?.title && (
        <div className="absolute inset-0 bg-black/50 z-10"></div>
      )}

      {/* Content overlay */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <motion.div
          className="w-full h-full flex justify-center items-center"
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
              className="w-full max-w-6xl px-6 text-center"
            >
              {sliders[currentIndex]?.title && (
                <motion.div
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-3xl lg:text-4xl xl:text-5xl text-white font-bold mb-6"
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
                  className="text-gray-100 text-lg lg:text-xl mb-8 max-w-4xl mx-auto leading-relaxed"
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
                  className="bg-primary-color1 text-white px-8 py-3 rounded-md hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  onClick={handleSlideClick}
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
        </motion.div>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-30">
        {sliders.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
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
