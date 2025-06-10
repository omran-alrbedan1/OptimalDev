"use client";
import { useState, useEffect } from "react";
import React from "react";
import { easeOut, motion } from "framer-motion";
import Image from "next/image";
import { images } from "@/constants/images";
const Section = () =>
  // { sections }: { sections: SectionArray }
  {
    const [windowWidth, setWindowWidth] = useState(0);
    useEffect(() => {
      setWindowWidth(window.innerWidth);

      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

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
          Welcome To
          <span className="block text-center mx-auto w-32 h-[3px] bg-gray-300 mt-4 " />
        </motion.h1>

        <motion.p
          className=" text-lg text-gray-500   text-center  flex flex-col items-center mt-12 mb-12 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Image
            src={images.logo}
            width={windowWidth > 800 ? 350 : 150}
            height={windowWidth > 800 ? 350 : 150}
            alt="Logo"
            className=" sm:mt-3 dark:hidden block"
          />
          <Image
            src={images.dark_logo}
            width={windowWidth > 800 ? 340 : 150}
            height={windowWidth > 800 ? 340 : 150}
            alt="Logo"
            className="sm:mt-3 hidden dark:block"
          />
        </motion.p>

        <div className="relative h-[70vh] md:h-[40vh] w-full overflow-hidden box-border">
          <div className="relative section-bg  flex w-full h-full flex-col lg:flex-row py-10 justify-between items-center px-5 md:px-10 gap-10">
            <motion.div
              initial={{ opacity: 0, x: 200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.5,
                duration: 1.2,
                type: "spring",
                once: true,
                ease: easeOut,
              }}
              className="w-1/3 max-lg:w-full realtive flex items-center justify-center"
            >
              <Image
                src={images.logo}
                width={windowWidth > 900 ? 270 : 160}
                height={windowWidth > 900 ? 270 : 160}
                alt="Logo"
                className=" relative"
              />
            </motion.div>
            {/* Modified scroll container */}
            <div className="w-2/3 max-lg:w-full  leading-6  h-full lg:mt-10 flex-1 min-h-0 text-[13px] md:text-[16px] text-white text-center lg:text-start px-4 overflow-y-auto thin-scrollbar items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 200 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.5,
                  duration: 1.4,
                  type: "spring",
                  once: true,
                  ease: easeOut,
                }}
                className="relative"
              >
                Optimal Path is a leading company in recruitment and career path
                development, offering innovative solutions to connect talents
                with suitable job opportunities. With extensive experience in
                the job market, we excel in deeply understanding the needs of
                both companies and employees. We specialize in skills analysis
                and competency development to ensure the best match between
                candidates and jobs, guaranteeing long-term success for all
                parties.
              </motion.div>
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
