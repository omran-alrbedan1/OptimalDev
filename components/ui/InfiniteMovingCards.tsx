"use client";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}: {
  items: Client[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 container overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-8 py-12 mb-10",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items?.map((item, idx) => (
          <li
            className="group relative flex flex-col items-center justify-center w-[280px] h-[200px] md:w-[320px] md:h-[220px] cursor-pointer"
            key={item.id}
          >
            {/* Main card with glassmorphism effect */}
            <div className="relative w-full h-full bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl overflow-hidden transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-1 group-hover:shadow-2xl group-hover:shadow-[#22ace3]/20">
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#22ace3]/5 via-transparent to-[#22ace3]/10 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              {/* Border gradient animation */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#22ace3]/50 via-[#22ace3]/30 to-[#22ace3]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[1px]">
                <div className="w-full h-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl"></div>
              </div>

              {/* Content container */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full p-8">
                {/* Logo container */}
                <div className="flex-1 flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110">
                  {item?.logo ? (
                    <div className="relative">
                      <Image
                        src={`http://147.79.118.212:7099/storage/${item.logo}`}
                        width={120}
                        height={180}
                        alt={`${item.name} logo`}
                        className="object-contain max-w-[150px] max-h-[120px] filter brightness-110 contrast-110 transition-all duration-500 group-hover:brightness-125"
                      />
                      {/* Logo glow effect */}
                      <div className="absolute inset-0 bg-[#22ace3]/20 blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500 rounded-lg"></div>
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#22ace3]/20 to-[#22ace3]/40 flex items-center justify-center border border-[#22ace3]/30 transition-all duration-500 group-hover:from-[#22ace3]/30 group-hover:to-[#22ace3]/60">
                      <svg
                        className="w-10 h-10 text-[#22ace3]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Company name */}
                <div className="text-center">
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg md:text-xl leading-tight tracking-wide transition-all duration-500 group-hover:text-[#22ace3] group-hover:scale-105">
                    {item.name}
                  </h3>

                  {/* Animated underline */}
                  <div className="w-0 h-0.5 bg-gradient-to-r from-[#22ace3] to-[#22ace3]/60 mx-auto mt-2 transition-all duration-500 group-hover:w-full"></div>
                </div>
              </div>
            </div>

            {/* Floating particles effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-4 right-4 w-2 h-2 bg-[#22ace3]/40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:animate-pulse"></div>
              <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-[#22ace3]/30 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1000 delay-200 group-hover:animate-bounce"></div>
              <div className="absolute top-1/2 left-4 w-1 h-1 bg-[#22ace3]/50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-500"></div>
            </div>

            {/* Shadow effect */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-4 bg-[#22ace3]/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
          </li>
        ))}
      </ul>
    </div>
  );
};
