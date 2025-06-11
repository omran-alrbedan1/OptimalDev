"use client";
import React from "react";
import { motion } from "framer-motion";
import { Partner } from "@/types";
import Link from "next/link";
import Image from "next/image";

const PartnerCard = ({
  partner,
  index,
}: {
  partner: Partner;
  index: number;
}) => {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      className="px-5 flex flex-1 h-[300px] border border-zinc-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
    >
      <Link
        href={`/`}
        className="relative cursor-pointer w-full h-full py-8 flex flex-col items-center gap-4 group"
      >
        {/* Image with elegant frame */}
        {partner.image && (
          <div className="relative w-24 h-24 group-hover:scale-110 transition-transform duration-300">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 blur-sm group-hover:blur-md transition-all duration-300"></div>
            <Image
              src={partner.image}
              width={96}
              height={96}
              alt={partner.title}
              className="rounded-full relative z-10 border-4 border-white dark:border-gray-800 object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="text-center space-y-3 px-2">
          <h3 className="font-bold text-xl text-gray-800 dark:text-white group-hover:text-primary-color1 dark:group-hover:text-blue-400 transition-colors">
            {partner.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
            {partner.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default PartnerCard;
