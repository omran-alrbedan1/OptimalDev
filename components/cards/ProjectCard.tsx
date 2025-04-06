"use client";
import { ProjectProps } from "@/types";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
const ProjectCard = ({
  project,
  index,
}: {
  project: ProjectProps;
  index: number;
}) => {
  return (
    <motion.div
      key={project.id}
      initial={{
        opacity: 0,
        // y:  150 ,
        y: 100,
        scale: "95%",
      }}
      whileInView={{ opacity: 1, y: 0, scale: "100%" }}
      transition={{ delay: index * 0.2, duration: 0.9, type: 'spring', ease: 'easeOut' }}
      className="w-full"
    >
      <div className="flex flex-col justify-between rounded-[12px]  bg-gray-100 dark:bg-darkMod-100 shadow-xl m-3 transform transition duration-500 hover:scale-110">
        <Link
          href={`/projects/${project.id}`}
          className="relative cursor-pointer aspect-[10/6]"
        >
          <div className="absolute w-full rounded-[12px] rounded-b-[5px] h-full bg-primary-color2 dark:bg-darkMod-400 opacity-0 hover:opacity-30" />
          <Image
            src={`https://main.hivetech.space/storage/${project.image}`}
            alt={`image${project.id}`}
            width={400}
            height={300}
            className="rounded-[12px] aspect-[10/6] rounded-b-[5px] object-fill bg-cover w-full h-full"
          />
        </Link>
        <div className="py-5 sm:py-7 text-center px-2">
          <h2 className=" text-lg  font-medium md:font-semibold tracking-wider md:tracking-widest">
            {project.title}
          </h2>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;

{/* <div className="rounded-xl flex flex-col justify-between w-full  drop-shadow-2xl bg-gray-100 dark:bg-darkMod-100 transition duration-500 hover:scale-110">
<Link
  href={`/projects/${project.id}`}
  className="relative cursor-pointer aspect-[10/6]  w-full"
>
  <div className="absolute w-full rounded-t-xl  z-20 h-full bg-primary-color2  rounded-b-[5px] opacity-0 hover:opacity-30" />

  <Image
    src={`https://main.hivetech.space/storage/${project.image}`}
    alt={project.title}
    width={2000}
    height={2000}
    className="aspect-[10/6] rounded-t-xl rounded-b-[5px]"
  />
</Link>

<h2 className="flex justify-center items-center py-4 text-center  text-[16px] md:text-xl md:tracking-widest font-semibold">
  {project.title}
</h2>
</div> */}