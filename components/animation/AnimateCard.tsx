"use client";
import React from "react";
import { motion } from "framer-motion";

const AnimateCard = ({
    children,
  className,
  animationVertix,
  index
}: {
    children: React.ReactNode
  animationVertix: "x" | "y";
  className?: string;
  index:number
}) => {
  return (
    <div>
      <motion.div
        className={className}
        initial={{
          opacity: 0,
          x: animationVertix == "x" ? "-100%" : "0",
          y: animationVertix === "y" ? 100 : 0,
        }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 * index, once:true }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default AnimateCard;
