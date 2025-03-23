"use client";
import { SectionArray } from "@/types";
import { useState, useEffect } from "react";
import React from "react";
import { motion } from "framer-motion";
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
          width={windowWidth > 800 ? 300 : 150}
          height={windowWidth > 800 ? 300 : 150}
          alt="Logo"
          className=" sm:mt-3 dark:hidden block"
        />
        <Image
          src={"/logos/logo with text dark.png"}
          width={windowWidth > 800 ? 300 : 150}
          height={windowWidth > 800 ? 300 : 150}
          alt="Logo"
          className="sm:mt-3 hidden dark:block"
        />
        <span className="block text-center w-32 h-[3px] bg-primary-color1 mt-8 mx-0" />
      </motion.p>

      <div className="relative min-h-[100vh] sm:min-h-[60vh] w-full overflow-hidden box-border">
        <img
          src={`https://main.hivetech.space/assets/banners/about-banner1.jpg`}
          alt="image"
          className="bg-cover w-full h-full absolute object-cover"
        />
        <div className="absolute w-full h-full bg-primary-color2 opacity-80" />
        <div
          className="absolute flex w-full h-full flex-col lg:flex-row py-10
  justify-center items-center px-5 gap-10 top-0"
        >
          <Image
            src={"/logos/logo with text dark.png"}
            width={windowWidth > 900 ? 310 : 160}
            height={windowWidth > 900 ? 310 : 160}
            alt="Logo"
            className="max-w-[90%]"
          />
          <div
            className="text-[13px] md:text-lg text-gray-600 dark:text-gray-300 text-center md:text-start px-4 overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: sections[0].description }}
          />
        </div>
      </div>
    </section>
  );
};

export default Section;
