// // "use client";

// // import { cn } from "@/lib/utils";
// // import Image from "next/image";
// // import Link from "next/link";
// // import React, { useEffect, useState, useCallback, useRef } from "react";

// // export const InfiniteMovingCards = ({
// //   items,
// //   direction = "left",
// //   speed = "fast",
// //   pauseOnHover = true,
// //   className,
// // }: {
// //   items: {
// //     id: number;
// //     title: string;
// //     url: string;
// //     image: string;
// //   }[];
// //   direction?: "left" | "right";
// //   speed?: "fast" | "normal" | "slow";
// //   pauseOnHover?: boolean;
// //   className?: string;
// // }) => {
// //   const containerRef = useRef<HTMLDivElement>(null);
// //   const scrollerRef = useRef<HTMLUListElement>(null);

// //   const [start, setStart] = useState(false);

// //   const addAnimation = useCallback(() => {
// //     if (containerRef.current && scrollerRef.current) {
// //       const scrollerContent = Array.from(scrollerRef.current.children);

// //       scrollerContent.forEach((item) => {
// //         const duplicatedItem = item.cloneNode(true);
// //         if (scrollerRef.current) {
// //           scrollerRef.current.appendChild(duplicatedItem);
// //         }
// //       });

// //       getDirection();
// //       getSpeed();
// //       setStart(true);
// //     }
// //   }, [containerRef, scrollerRef, direction, speed]);

// //   useEffect(() => {
// //     addAnimation();
// //   }, [addAnimation]);

// //   const getDirection = () => {
// //     if (containerRef.current) {
// //       if (direction === "left") {
// //         containerRef.current.style.setProperty(
// //           "--animation-direction",
// //           "forwards"
// //         );
// //       } else {
// //         containerRef.current.style.setProperty(
// //           "--animation-direction",
// //           "reverse"
// //         );
// //       }
// //     }
// //   };

// //   const getSpeed = () => {
// //     if (containerRef.current) {
// //       if (speed === "fast") {
// //         containerRef.current.style.setProperty("--animation-duration", "20s");
// //       } else if (speed === "normal") {
// //         containerRef.current.style.setProperty("--animation-duration", "40s");
// //       } else {
// //         containerRef.current.style.setProperty("--animation-duration", "80s");
// //       }
// //     }
// //   };

// //   return (
// //     <div
// //       ref={containerRef}
// //       className={cn(
// //         "scroller relative z-20 max-w-[1350px] overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
// //         className
// //       )}
// //     >
// //       <ul
// //         ref={scrollerRef}
// //         className={cn(
// //           "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
// //           start && "animate-scroll",
// //           pauseOnHover && "hover:[animation-play-state:paused]"
// //         )}
// //       >
// //         {items.map((item, _) => (
// //           <Link
// //             className="sm:w-80 sm:h-80 relative rounded-2xl border-slate-700 px-8 py-6"
// //             key={item.id}
// //             href={item.url}
// //           >
// //             <div className="flex flex-col justify-between items-center">
// //               <Image
// //                 src={`https://main.hivetech.space/storage/${item.image}`}
// //                 width={300} // Fixed width
// //                 height={300} // Fixed height
// //                 alt={`image${item.id}`}
// //                 className="w-36 h-36 sm:w-48 sm:h-48 rounded-lg mb-5" // Ensure consistent size
// //               />
// //               <h1 className="text-gray-500 sm:text-2xl mt-4">{item.title}</h1>
// //             </div>
// //           </Link>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };



// "use client";

// import { cn } from "@/lib/utils";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useEffect, useState, useCallback, useRef } from "react";

// export const InfiniteMovingCards = ({
//   items,
//   direction = "left",
//   speed = "fast",
//   pauseOnHover = true,
//   className,
// }: {
//   items: {
//     id: number;
//     title: string;
//     url: string;
//     image: string;
//   }[];
//   direction?: "left" | "right";
//   speed?: "fast" | "normal" | "slow";
//   pauseOnHover?: boolean;
//   className?: string;
// }) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const scrollerRef = useRef<HTMLUListElement>(null);

//   const [start, setStart] = useState(false);
//   const [isManualScrolling, setIsManualScrolling] = useState(false);

//   const addAnimation = useCallback(() => {
//     if (containerRef.current && scrollerRef.current) {
//       const scrollerContent = Array.from(scrollerRef.current.children);

//       scrollerContent.forEach((item) => {
//         const duplicatedItem = item.cloneNode(true);
//         if (scrollerRef.current) {
//           scrollerRef.current.appendChild(duplicatedItem);
//         }
//       });

//       getDirection();
//       getSpeed();
//       setStart(true);
//     }
//   }, [containerRef, scrollerRef, direction, speed]);

//   useEffect(() => {
//     addAnimation();
//   }, [addAnimation]);

//   const getDirection = () => {
//     if (containerRef.current) {
//       if (direction === "left") {
//         containerRef.current.style.setProperty(
//           "--animation-direction",
//           "forwards"
//         );
//       } else {
//         containerRef.current.style.setProperty(
//           "--animation-direction",
//           "reverse"
//         );
//       }
//     }
//   };

//   const getSpeed = () => {
//     if (containerRef.current) {
//       if (speed === "fast") {
//         containerRef.current.style.setProperty("--animation-duration", "20s");
//       } else if (speed === "normal") {
//         containerRef.current.style.setProperty("--animation-duration", "40s");
//       } else {
//         containerRef.current.style.setProperty("--animation-duration", "80s");
//       }
//     }
//   };

//   const handleScroll = () => {
//     if (scrollerRef.current && !isManualScrolling) {
//       setIsManualScrolling(true);
//       scrollerRef.current.style.animationPlayState = "paused";
//     }
//   };

//   const handleScrollEnd = () => {
//     if (scrollerRef.current) {
//       setIsManualScrolling(false);
//       scrollerRef.current.style.animationPlayState = "running";
//     }
//   };

//   return (
//     <div
//       ref={containerRef}
//       className={cn(
//         "scroller relative z-20 max-w-[370px] sm:max-w-[800px] lg:max-w-[1000] xl:max-w-[1350px] 2xl:max-w-[1500px] overflow-x-auto [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
//         className
//       )}
//       onScroll={handleScroll}
//       onMouseEnter={
//         pauseOnHover
//           ? () => scrollerRef.current?.style.setProperty("animation-play-state", "paused")
//           : undefined
//       }
//       onMouseLeave={
//         pauseOnHover
//           ? () => scrollerRef.current?.style.setProperty("animation-play-state", "running")
//           : undefined
//       }
//       onTouchStart={handleScroll}
//       onTouchEnd={handleScrollEnd}
//     >
//       <style>
//         {`
//           .scroller::-webkit-scrollbar {
//             height: 8px;
//           }
//           .scroller::-webkit-scrollbar-track {
//             background: #f1f1f1;
//             border-radius: 4px;
//           }
//           .scroller::-webkit-scrollbar-thumb {
//             background: #7D8087;
//             border-radius: 4px;
//           }
//           .scroller::-webkit-scrollbar-thumb:hover {
//             background: #555;
//           }

//           // /* Shorter scrollbar on mobile devices */
//           // @media (max-width: 640px) {
//           //   .scroller::-webkit-scrollbar {
//           //     height: 4px; /* Shorter height for mobile */
//           //   }
//           }
//         `}
//       </style>
//       <ul
//         // ref={scrollerRef}
//         className={cn(
//           "flex min-w-full shrink-0 gap-5 py-4 w-max flex-nowrap",
//           start && "animate-scroll",
//           pauseOnHover && "hover:[animation-play-state:paused]"
//         )}
//       >
//         {items.map((item, _) => (
//           <Link
//             className="sm:w-72 sm:h-72 relative rounded-2xl border-slate-700 px-8 py-6"
//             key={item.id}
//             href={item.url}
//           >
            // <div className="flex flex-col justify-between items-center">
            //   <Image
            //     src={`https://main.hivetech.space/storage/${item.image}`}
            //     width={100} // Fixed width
            //     height={100} // Fixed height
            //     alt={`image${item.id}`}
            //     className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg mb-5 bg-cover" // Ensure consistent size
            //   />
            //   <h1 className="text-primary-color2 mt-3">{item.title}</h1>
            // </div>
//           </Link>
//         ))}
//       </ul>
//     </div>
//   );
// };






"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    id: number;
    url: string;
    title: string;
    image: string;
  }[];
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
          "forwards",
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse",
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
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item, idx) => (
          <li
            className="relative flex items-center justify-center max-w-full md:w-[300px] pt-8 rounded-2xl border border-b-0 border-zinc-200 bg-[linear-gradient(180deg,#fafafa,#f5f5f5)]  dark:border-zinc-700 dark:bg-[linear-gradient(180deg,#27272a,#18181b)]"
            key={item.id}
          >
                    <div className="flex flex-col justify-center items-center">
              <Image
                src={`https://main.hivetech.space/storage/${item.image}`}
                width={100} // Fixed width
                height={100} // Fixed height
                alt={`image${item.id}`}
                className="bg-cover" // Ensure consistent size
              />
              <h1 className="py-5">{item.title}</h1>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
