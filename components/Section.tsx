"use client";
import { SectionArray } from "@/types";
import { useState, useEffect } from "react";
import React from "react";
import { easeOut, motion } from "framer-motion";
import Image from "next/image";
const Section = ({ sections }: { sections: SectionArray }) => {
  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    // Set initial width
    setWindowWidth(window.innerWidth);

    // Handle window resize
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <section className="w-full mx-0 flex flex-col items-center mt-20 ">
      <motion.h1
        className="text-xl sm:text-2xl text-center font-semibold"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ letterSpacing: "3px" }}
      >
        {sections[0].title}
      </motion.h1>

      <motion.p
        className=" text-lg text-gray-500 text-center mt-4 flex flex-col items-center mb-12 sm:mb-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Image
          src={"/Hive Tech.png"}
          width={windowWidth > 800 ? 250 : 150}
          height={windowWidth > 800 ? 250 : 150}
          alt="Logo"
          className=" sm:mt-3 dark:hidden block"
        />
        <Image
          src={"/logos/logo with text dark.png"}
          width={windowWidth > 800 ? 240 : 150}
          height={windowWidth > 800 ? 240 : 150}
          alt="Logo"
          className="sm:mt-3 hidden dark:block"
        />
        <span className="block text-center w-32 h-[3px] bg-primary-color1 mt-8 mx-0" />
      </motion.p>

      <div className="relative h-[90vh] sm:h-[70vh] w-full overflow-hidden box-border">
        <img
          src={`https://main.hivetech.space/assets/banners/about-banner1.jpg`}
          alt="image"
          className="w-full h-full absolute object-fill"
        />
        <div className="absolute w-full h-full bg-primary-color2 opacity-80" />
        <div className="relative  flex w-full h-full flex-col lg:flex-row py-10 justify-between items-center px-5 md:px-10 gap-10">
          <motion.div 
                     initial={{opacity: 0, x:200}}
                     whileInView={{opacity: 1, x:0}}
                     transition={{delay: 0.5, duration: 1.2, type: 'spring', once: true , ease: easeOut}}

          className="w-1/3 max-lg:w-full flex items-center justify-center">
            <Image
              src={"/logos/logo with text dark.png"}
              width={windowWidth > 900 ? 270 : 160}
              height={windowWidth > 900 ? 270 : 160}
              alt="Logo"
            />
          </motion.div>
          {/* Modified scroll container */}
          <div className="w-2/3 max-lg:w-full h-full lg:mt-10 flex-1 min-h-0 text-[13px] md:text-[16px] text-gray-300 text-center lg:text-start px-4 overflow-y-auto thin-scrollbar items-center justify-center">
              

                  <motion.div
                  initial={{opacity: 0, y:200}}
                  whileInView={{opacity: 1, y:0}}
                  transition={{delay: 1, duration: 1.4, type: 'spring', once: true , ease: easeOut}}
                  className=""
                  dangerouslySetInnerHTML={{ __html: sections[0].description }}
                  />
               
          </div>

          <style>
            {`
        .thin-scrollbar::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        .thin-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 2px;
        }
        .thin-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 2px;
        }
        .thin-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.4);
        }
        .thin-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.3) rgba(0, 0, 0, 0.1);
        }
      `}
          </style>
        </div>
      </div>
    </section>
  );
};

export default Section;
