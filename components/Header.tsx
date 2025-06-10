"use client";
import React from "react";
import { motion } from "framer-motion";

const Header = ({
  title,
  paragraph,
  className,
  classH,
}: {
  title: string;
  paragraph?: string;
  className?: string;
  classH?: string;
}) => {
  return (
    <div className={className}>
      <motion.h1
        className={`text-2xl sm:text-3xl text-center font-semibold ${classH}`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ letterSpacing: "4px" }}
      >
        {title}
      </motion.h1>

      <motion.div
        className="  mb-12 mx-5 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {paragraph && (
          <p className=" text-lg text-gray-600 dark:text-gray-300 text-center mt-4">
            {paragraph}
          </p>
        )}
        <span className="block text-center w-36 h-[3px] bg-primary-color1 mt-8" />
      </motion.div>
    </div>
  );
};

export default Header;
