"use client";
import React from "react";
import { motion } from "framer-motion";
import {  Partner } from "@/types";

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
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.4,
        once: true,
        type: "spring",
        ease: "easeOut",
      }}
      className="px-5 flex flex-1 h-[220px]  border border-zinc-300 dark:border-gray-600  rounded-xl"
    >
      <Link
        href={`/`}
        className="relative cursor-pointer w-full h-full pt-16 pb-5 flex flex-col gap-2 justify-start items-start"
      >
        <span className="absolute w-32 flex justify-center rounded-3xl items-center left-1/2 -top-[45px] bg-white dark:bg-darkMod-500  transform -translate-x-1/2">
          {partner.image && (
            <div className="">
              <Image
                src={`${partner.image}`}
                width={90}
                height={90}
                alt="Image icone"
                className=" rounded-full"
              />
            </div>
          )}{" "}
        </span>

        <h3 className="  font-semibold  xl:text-[19px] py-1">
          {partner.title}
        </h3>

        <p className="text-start text-gray-600  dark:text-gray-300 text-[15px]">
          {partner.description}
        </p>
      </Link>
    </motion.div>
  );
};

export default PartnerCard;
