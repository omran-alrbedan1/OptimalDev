"use client";
import React from "react";
import { motion } from "framer-motion";

const AnimateCard = ({
  children,
  className,
  animationVertix,
  index,
}: {
  children: React.ReactNode;
  animationVertix: "x" | "y" | "left" | "right";
  className?: string;
  index: number;
}) => {
  return (
    <div>
      <motion.div
        className={className}
        initial={{
          opacity: 0,
          x:
            animationVertix == "x"
              ? "-100%"
              : animationVertix == "right"
              ? 100
              : animationVertix == "left"
              ? "-100"
              : "0",
          y: animationVertix === "y" ? 100 : 0,
        }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1.2, delay: (index < 6 ?0.4 * index: 0.2*index), once: true, type:'spring', ease:'easeOut' }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default AnimateCard;
