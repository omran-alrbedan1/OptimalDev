"use client";
import React from "react";
import { motion } from "framer-motion";

const Animation = ({
  text,
  className,
  style,
  animationVertix,
  delay,
  duration,
  children
}: {
  animationVertix?: "x" | "y"|"right";
  text?: string;
  className?: string;
  style?: object;
  delay: number;
  duration: number;
  children?:React.ReactNode
}) => {
  return (
    <div>
      <motion.div
        className={className}
        style={style}
        initial={{
          opacity: 0,
          x: animationVertix == "x" ?  "-100%" : animationVertix=='right'?'200px': 0,
          y: animationVertix === "y" ? 100 : 0,
        }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: duration, delay: delay, ease: "easeOut", type: 'spring', once: true }}
      >
        {text}
        {children}
      </motion.div>
    </div>
  );
};

export default Animation;
