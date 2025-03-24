"use client";

import { useState, useId } from "react";
import { FaArrowRight } from "react-icons/fa";

interface SlideData {
  id: number;
  name: string | null;
  path: string | null;
  size: number;
  type: string | null;
  sub_type: string | null;
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
  totalSlides: number;
}

const Slide = ({
  slide,
  index,
  current,
  handleSlideClick,
  totalSlides,
}: SlideProps) => {
  const { id, name, path } = slide;

  const translateXFactor = window.innerWidth < 400 ? 15 : 25;

  return (
    <li
      className="absolute w-full h-full transition-all duration-500 ease-in-out"
      style={{
        transform:
          index === current
            ? "translateX(0) scale(1.2)"
            : index < current
            ? `translateX(${-translateXFactor * (current - index)}%) scale(${
                1 - 0.1 * (current - index)
              })`
            : `translateX(${translateXFactor * (index - current)}%) scale(${
                1 - 0.1 * (index - current)
              })`,
        zIndex:
          index === current
            ? totalSlides
            : index < current
            ? index
            : totalSlides - index,
      }}
      onClick={() => handleSlideClick(index)}
    >
    <div className="relative w-full h-full bg-[#1D1F2F] rounded-[5%] overflow-hidden"
     style={{
       backgroundImage: `url(https://main.hivetech.space/storage/${path})`,
       backgroundSize: "cover", 
       backgroundPosition: "center",
       backgroundRepeat: "no-repeat",
      
     }}
>

        <div
          className={`absolute inset-0 rounded-[5%] ${
            current !== index ? "bg-black/30" : "bg-black/10"
          } transition-all duration-1000`}
        />
      </div>
    </li>
  );
};

interface CarouselControlProps {
  type: string;
  title: string;
  handleClick: () => void;
}

const CarouselControl = ({
  type,
  title,
  handleClick,
}: CarouselControlProps) => {
  return (
    <button
      className={`w-10 h-10 flex items-center mx-2 justify-center
         bg-neutral-200 dark:bg-neutral-800 border-3 border-transparent 
         rounded-full focus:border-[#6D64F7] focus:outline-none hover:-translate-y-0.5 
         active:translate-y-0.5 transition duration-200 ${
           type === "previous" ? "rotate-180" : ""
         }`}
      title={title}
      onClick={handleClick}
    >
      <FaArrowRight className="text-neutral-600 dark:text-neutral-200" />
    </button>
  );
};

interface CarouselProps {
  slides: SlideData[];
}

export function Carousel({ slides }: CarouselProps) {
  // Initialize current to the middle slide
  const [current, setCurrent] = useState(Math.floor(slides.length / 2));

  const handlePreviousClick = () => {
    const previous = current - 1;
    setCurrent(previous < 0 ? slides.length - 1 : previous);
  };

  const handleNextClick = () => {
    const next = current + 1;
    setCurrent(next === slides.length ? 0 : next);
  };

  const handleSlideClick = (index: number) => {
    if (current !== index) {
      setCurrent(index);
    }
  };

  const id = useId();

  return (
    <div
      className="relative w-[35vh] h-[35vh] sm:w-[50vh] sm:h-[40vh] lg:w-[55vh] lg:h-[45vh] mx-auto"
      aria-labelledby={`carousel-heading-${id}`}
    >
      <ul className="relative w-full h-full">
        {slides.map((slide, index) => (
          <Slide
            key={index}
            slide={slide}
            index={index}
            current={current}
            handleSlideClick={handleSlideClick}
            totalSlides={slides.length}
          />
        ))}
      </ul>

      <div className="absolute flex justify-center w-full top-[calc(120%)]">
        <CarouselControl
          type="previous"
          title="Go to previous slide"
          handleClick={handlePreviousClick}
        />

        <CarouselControl
          type="next"
          title="Go to next slide"
          handleClick={handleNextClick}
        />
      </div>
    </div>
  );
}
