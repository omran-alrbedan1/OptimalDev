"use client";
import React from "react";
import { motion } from "framer-motion";
import { Category } from "@/types";
import Image from "next/image";
import { MdModelTraining } from "react-icons/md";

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
      initial={{ opacity: 0, y: 150 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.2,
        duration: 0.8,
      }}
      className="h-40 relative flex flex-1 bg-[#fafafa] rounded-xl"
    >
      {/* {category.image && (
        <img
          className="absolute h-full w-full object-fill"
          src={category.image}
          alt={`image${category.id}`}
        />
      )}
      {category.image && (
        <div className="absolute w-full h-full bg-primary-color2 opacity-10" />
      )} */}
      <div className="absolute p-5 w-full drop-shadow-2xl  h-full flex justify-evenly flex-col ">
      
          {category.image_icon && (
            // <Image
            //   className="bg-primary-color2 text-black-100"
            //   width={50}
            //   height={100}
            //   src={category.image_icon}
            //   alt={`image_icon${category.id}`}
            // />
            <MdModelTraining  className="text-3xl"/>
          )}
          <h3 className="mb-3 font-semibold text-2xl">{category.title}</h3>
          <p className="">{category.description}</p>
        </div>

    </motion.div>
  );
};

export default CategoryCard;
