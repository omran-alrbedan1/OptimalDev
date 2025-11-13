"use client";
import React from "react";
import { motion } from "framer-motion";

const Animate = ({
  children,
  className,
  y,
  x,
  delay,
  duration,
  opacity,
  index,
}: {
  children: React.ReactNode;
  className?: string;
  y: string;
  x: string;
  delay: number;
  duration: number;
  opacity?: number;
  index: number;
}) => {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        x: x,
        y: y,
      }}
      whileInView={{ opacity: opacity ? opacity : 1, x: 0, y: 0 }}
      transition={{
        duration: duration,
        delay: delay * index,
        type: "spring",
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
};

export default Animate;
