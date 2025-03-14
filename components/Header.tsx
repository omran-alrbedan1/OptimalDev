"use client";
import React from "react";
import { motion } from "framer-motion";

const Header = ({ title, paragragh }: { title: string; paragragh: string }) => {
  return (
    <div>
      <motion.h1
        className="text-4xl sm:text-5xl text-primary-color1 text-center font-semibold"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{letterSpacing:"3px"}}
      >
        {title}
      </motion.h1>

      <motion.p
        className=" text-lg text-gray-400 text-center mt-4 mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {paragragh}
      </motion.p>
    </div>
  );
};

export default Header;
