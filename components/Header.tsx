"use client";
import React from "react";
import { motion } from "framer-motion";

const Header = ({ title, paragragh,className }: { title: string; paragragh?: string;className?:string }) => {
  return (
    <div className={className}>
      <motion.h1
        className="text-2xl sm:text-3xl text-primary-color2 text-center font-semibold"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{letterSpacing:"3px"}}
      >
        {title}
      </motion.h1>

      <motion.p
        className=" text-lg text-gray-500 text-center mt-4 mb-12 mx-5 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {paragragh}
        <span className="block text-center w-36 h-[3px] bg-primary-color1 mt-10"/>
      </motion.p>
    </div>
  );
};

export default Header;
