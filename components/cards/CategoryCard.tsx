"use client";
import React from "react";
import { motion } from "framer-motion";
import { Category } from "@/types";

import Link from "next/link";

const CategoryCard = ({
  category,
  index,
}: {
  category: Category;
  index: number;
}) => {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, x: "-100%" }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="h-40 sm:h-44 relative flex flex-1 bg-zinc-100 border-zinc-300 border-[1px] shadow-lg dark:shadow-gray-600 dark:border-dotted  dark:border-primary-color1 dark:bg-darkMod-600 rounded-xl"
    >
      {/* <span className="absolute left-1/2 bg-zinc-100 dark:bg-darkMod-600 rounded-full -translate-x-1/2 -translate-y-1/2 top-0 flex justify-center items-center w-16 h-16">
        <MdModelTraining className="text-6xl" />
      </span> */}
      <Link
        href={`/services/category/${category.id}`}
        className="absolute cursor-pointer py-4 px-6 w-full drop-shadow-2xl  h-full flex justify-center items-center flex-col "
      >
        <h3 className="mb-3 font-semibold text-xl text-center md:text-2xl">
          {category.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-center">
          {category.description}
        </p>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
