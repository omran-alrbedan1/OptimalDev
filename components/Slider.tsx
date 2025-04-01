"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SliderArray } from "@/types";

const Slider = ({ sliders }: { sliders: SliderArray }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to navigate to a specific slide
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Handle drag end to update currentIndex
  const handleDragEnd = (event: any, info: any) => {
    const offset = info.offset.x;
    if (offset < -100) {
      // Dragged left: go to the next slide
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sliders.length);
    } else if (offset > 100) {
      // Dragged right: go to the previous slide
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + sliders.length) % sliders.length
      );
    }
  };

  return (
    <div
      className="relative h-screen w-full overflow-hidden transition-all duration-1000 shadow-2xl"
      // style={{
      //   backgroundImage: `url(https://main.hivetech.space/storage/${sliders[currentIndex].image})`,
      //   // backgroundSize: "contain",
      //   backgroundRepeat: "no-repeat",
      //   backgroundPosition: "center",

      // }}
    >
      <img
        src={`https://main.hivetech.space/storage/${sliders[currentIndex].image}`}
        alt="Background"
        className="absolute object-fill w-full h-full"
      />

      {/* Black overlay layer */}
      <div
        className="absolute inset-0 bg-black opacity-40"
        style={{
          zIndex: 1, // Ensure the overlay is above the image but below the content
        }}
      ></div>

      {/* Slides Container with Dragging Logic */}
      <motion.div
        className="w-full h-full flex justify-center items-center relative z-10"
        drag="x" // Enable horizontal dragging
        dragConstraints={{ left: 0, right: 0 }} // Restrict dragging within bounds
        onDragEnd={handleDragEnd} // Handle drag end event
        dragElastic={0.5} // Add elasticity for smooth dragging
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
              <h2 className="text-3xl text-white font-bold mt-6 mb-4">
                {sliders[currentIndex].title}
              </h2>
              <div
                className="text-gray-100 mb-6 xl:mx-80 max-sm:mb-10"
                dangerouslySetInnerHTML={{
                  __html: sliders[currentIndex].description,
                }}
              />
              <div className="flex justify-center gap-4 mt-10
              ">
                <motion.a
                  href={sliders[currentIndex].first_btn_url}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-[14px] sm:text-sm border-primary-color1 border text-white sm:px-8 w-44 sm:w-fit flex justify-center items-center py-3 sm:py-4  rounded-[8px] transition-colors"
                >
                  {sliders[currentIndex].first_btn_text}
                </motion.a>
                <motion.a
                  href={sliders[currentIndex].second_btn_url}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-[14px] sm:text-sm bg-primary-color1 text-white sm:px-8 w-40 sm:w-fit  flex justify-center items-center py-3 sm:py-4 hover:bg-primary-hover rounded-[8px] transition-colors"
                >
                  {sliders[currentIndex].second_btn_text}
                </motion.a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Navigation Dots */}
      <div className="absolute bottom-20 sm:bottom-32 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {sliders.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index ? "bg-primary-color1" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Slider;
