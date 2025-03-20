"use client";
import { SectionArray } from "@/types";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
const Section = ({ sections }: { sections: SectionArray }) => {
  return (
    <section className="w-full mx-0 flex flex-col items-center mt-20 ">
      <motion.h1
        className="text-xl sm:text-2xl text-primary-color2 text-center font-semibold"
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
            width={100}
            height={100}
            alt="Logo"
            className="h-16 xl:h-[76px] sm:mt-3 w-56 sm:w-80 2xl:w-96"
          />
        <span className="block text-center w-32 h-[3px] bg-primary-color1 mt-8 mx-0" />
      </motion.p>

      <div className="relative h-[90vh] sm:h-[60vh] w-full">
        <img
          src={`https://main.hivetech.space/assets/banners/about-banner1.jpg`}
          alt="image"
          className="bg-cover w-full h-full absolute"
        />
        <div className="absolute w-full h-full bg-primary-color2 opacity-80" />
        <div className="flex w-full h-full flex-col lg:flex-row py-5
        justify-evenly xl:justify-center items-center 
        absolute px-5 md:px-10">
          <Image
            src={"/logos/logo with text dark.png"}
            width={100}
            height={100}
            alt="Logo"
            className="max-sm:h-16 w-56 sm:w-80 2xl:w-96"
          />
          <div
            className="text-[12px] md:text-[14px] text-white"
            dangerouslySetInnerHTML={{ __html: sections[0].description }}
          />
        </div>
      </div>
    </section>
    
  );
};

export default Section;
