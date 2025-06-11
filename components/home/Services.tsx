// app/services/page.tsx
"use client";

import ServiceCard from "@/components/cards/ServiceCard";
import Header from "@/components/Header";
import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type Service = {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
};

const services: Service[] = [
  {
    id: 1,
    title: "Service 1",
    description: "Description for service 1 goes here. This is a sample text.",
    image: "/images/section.jpg",
    link: "/images/section.jpg",
  },
  {
    id: 2,
    title: "Service 2",
    description: "Description for service 2 goes here. This is a sample text.",
    image: "/images/work-space.jpg",
    link: "/services/2",
  },
  {
    id: 3,
    title: "Service 3",
    description: "Description for service 3 goes here. This is a sample text.",
    image: "/images/about-us.jpg",
    link: "/services/3",
  },
];

export default function Services() {
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();

  // Auto-rotate services with pause on hover
  useEffect(() => {
    const startAutoPlay = () => {
      intervalRef.current = setInterval(() => {
        if (!isPaused) {
          setDirection("right");
          setCurrentServiceIndex((prev) => (prev + 1) % services.length);
        }
      }, 3500);
    };

    startAutoPlay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused]);

  const goToNext = () => {
    setDirection("right");
    setCurrentServiceIndex((prev) => (prev + 1) % services.length);
    resetTimer();
  };

  const goToPrev = () => {
    setDirection("left");
    setCurrentServiceIndex(
      (prev) => (prev - 1 + services.length) % services.length
    );
    resetTimer();
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentServiceIndex ? "right" : "left");
    setCurrentServiceIndex(index);
    resetTimer();
  };

  const resetTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentServiceIndex((prev) => (prev + 1) % services.length);
    }, 3500);
  };

  return (
    <section className="flex flex-col w-full items-center mt-10 px-5 sm:px-10 md:px-16 mx-auto mb-16 md:mb-20">
      <Header
        title="Our Services"
        paragraph="Optimal Path connects the right talent with the right opportunities."
      />

      <div
        className="relative w-full max-w-7xl h-96 mt-10"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <ServiceCard
          service={services[currentServiceIndex]}
          isActive={true}
          direction={direction}
        />

        {/* Navigation arrows */}
        <button
          onClick={goToPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
          aria-label="Previous service"
        >
          <FaChevronLeft className="text-gray-700" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
          aria-label="Next service"
        >
          <FaChevronRight className="text-gray-700" />
        </button>
      </div>

      {/* Dots indicator */}
      <div className="flex gap-2 mt-6">
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentServiceIndex === index
                ? "bg-primary-color1 w-6"
                : "bg-gray-300"
            }`}
            aria-label={`Go to service ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
