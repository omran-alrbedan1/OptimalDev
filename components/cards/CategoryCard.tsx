"use client";
import React from "react";
import { motion } from "framer-motion";
import { Category } from "@/types";
import Image from "next/image";
import { MdModelTraining } from "react-icons/md";
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
      initial={{ opacity: 0, y: 150 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.2,
        duration: 0.8,
      }}
      className="h-44 relative flex flex-1 bg-[#fafafa] rounded-xl"
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
      <Link   href={`/services/category/${category.id}`} className="absolute cursor-pointer py-4 px-6 w-full drop-shadow-2xl  h-full flex justify-between flex-col ">
      
       
            <MdModelTraining  className="text-3xl"/>
        
          <h3 className="mb-3 font-semibold text-2xl">{category.title}</h3>
          <p className="">{category.description}</p>
        </Link>

    </motion.div>
  );
};

export default CategoryCard;
