"use client";
import React from "react";
import { motion } from "framer-motion";
import { Category } from "@/types";

import Link from "next/link";

import Image from "next/image";

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
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: index * 0.4, once:true, type:'spring', ease:'easeOut' }}
      className="h-40 sm:h-44 flex flex-1 bg-zinc-100 border-zinc-300 border-[1px] shadow-lg dark:shadow-gray-600 dark:border-dotted  dark:border-primary-color1 dark:bg-darkMod-600 rounded-xl"
    >
      <Link
        href={`/services/category/${category.id}`}
        className="relative cursor-pointer w-full h-full flex flex-col justify-center items-start"
      >

          {category.image_icon && (
            <div className="">
              <Image
                src={`${category.image_icon}`}
                width={60}
                height={60}
                alt="Image icone"
                className="max-h-full max-w-full"
              />
            </div>
          )}{" "}
          <h3 className=" pl-5 pr-2 font-semibold  xl:text-[19px] py-1">
            {category.title}
          </h3>
 

        <p className="mt-0 text-start text-gray-600 pl-5 pr-2 dark:text-gray-300 text-[15px]">
          {category.description}
        </p>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
