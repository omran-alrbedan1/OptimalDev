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
      className="pb-3 flex flex-1 bg-zinc-100 shadow-lg  dark:bg-darkMod-600 rounded-xl"
    >
      <Link
        href={`/services/category/${category.id}`}
        className="relative cursor-pointer w-full h-full flex flex-col gap-1 justify-center items-start"
      >

          {category.image_icon && (
            <div className="">
              <img
                src={`${category.image_icon}`}
                width={80}
                height={80}
                alt="Image icone"
                className="pl-1"
              />
            </div>
          )}{" "}
          <h3 className=" pl-5 pr-2 font-semibold  xl:text-[19px] py-1">
            {category.title}
          </h3>
 

        <p className="text-start text-gray-600 pl-5 pr-2 dark:text-gray-300 text-[15px]">
          {category.description}
        </p>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
