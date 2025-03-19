"use client";
import React from "react";
import { motion } from "framer-motion";
import { CategoryArray } from "@/types";
import Image from "next/image";
import Link from "next/link";

const Category = ({ categories }: { categories: CategoryArray }) => {
  return (
    <div className="-mt-10 mx-10 sm:mx-12 lg:mx-14">
      <header className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: 150 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: false }}
          className="text-2xl sm:text-3xl font-semibold text-primary-color2  mb-5 sm:mb-16 flex flex-col items-center"
          style={{ letterSpacing: "4px" }}
        >
          Categories{" "}
          <span className="block text-center w-32 h-[3px] bg-primary-color1 mt-10" />
        </motion.h1>
      </header>
      <div className="grid grid-cols-2 md:flex justify-center flex-wrap mt-10 gap-[25px]  xl:gap-[30px] mb-16">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 150 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.2,
              duration: 0.8,
            }}
            className=""
          >
            <Link href={`/services/category/${category.id}`} className="relative flex flex-col items-center justify-center group">
              <div className="relative hover:scale-105 hover:shadow-[#0000007f] shadow-2xl duration-700 transition-all h-28 overflow-hidden rounded-md">
                <Image
                  src="/assets/portfolioHero.png"
                  width={200}
                  height={200}
                  alt="placeholder"
                  className="bg-cover h-full w-full"
                />

                {/* <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <p className="text-white font-semibold text-sm">{title}</p>
      </div> */}
              </div>

              <p className="mt-4 font-medium text-primary-color2 text-sm group-hover:opacity-0 transition-opacity duration-500">
                {category.title}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Category;
