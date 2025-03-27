"use client";

import { useState, useId } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"; // Import Dialog components

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

  const translateXFactor =  17 ;

  return (
    <li
      className="absolute w-full h-full transition-all duration-500 ease-in-out cursor-pointer"
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
      <div
        className="relative w-full h-full bg-[#1D1F2F] rounded-[5%] overflow-hidden"
        style={{
          backgroundImage: `url(https://main.hivetech.space/storage/${path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className={`absolute inset-0 rounded-[5%] ${
            current !== index ? "bg-black/50" : "bg-black/10"
          } transition-all duration-1000`}
        />
        <p className="relative w-full flex hover:flex h-full z-10  justify-center items-start tracking-[5px] pt-3 lg:pt-4 text-darkMod-600">
          Click to extand
          </p>
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
  const [current, setCurrent] = useState(Math.floor(slides.length / 2));
  const [isDialogOpen, setIsDialogOpen] = useState(false); 
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

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
    if (index === current) {
      setIsDialogOpen(true); // Open dialog only if the clicked slide is active
    }
  };

  // Handle touch start event
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
  };

  // Handle touch move event
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEndX(e.touches[0].clientX);
  };

  // Handle touch end event
  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      // Swipe left -> Next slide
      handleNextClick();
    } else if (touchEndX - touchStartX > 50) {
      // Swipe right -> Previous slide
      handlePreviousClick();
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false); // Close the dialog
  };

  const id = useId();

  return (
    <>
      <div
        className="relative w-[35vh] h-[30vh] sm:w-[50vh] sm:h-[43vh] lg:w-[55vh] lg:h-[42vh] mx-auto"
        aria-labelledby={`carousel-heading-${id}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
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

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTitle></DialogTitle>
  <DialogContent className="w-full  max-w-screen-sm lg:max-w-screen-md aspect-[16/13] lg:aspect-[16/11] bg-white dark:bg-neutral-900 rounded-[4px] shadow-lg p-4">
    <div className="w-full h-full absolute">
      <img
        src={`https://main.hivetech.space/storage/${slides[current].path}`}
        alt={slides[current].name || "Slide"}
        className="w-full h-full object-fill rounded-lg"
      />
    </div>
  </DialogContent>
</Dialog>
    </>
  );
}