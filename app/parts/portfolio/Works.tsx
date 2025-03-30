"use client";
import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { ProjectProps, ProjectsArray } from "@/types";
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
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.75,
        delay: 0.5 * index,
        type: "spring",
        ease: "easeOut",
        once: true,
      }}
      className="basis-[350px] flex-grow"
    >
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="dark:bg-darkMod-100 shadow-2xl bg-white-100 p-5 pb-2 rounded-2xl  w-full aspect-[14/9]"
      >
        <Link href={`/projects/${project.id}`} className="relative w-full h-[70%] ">
          <img
            src={`https://main.hivetech.space/storage/${project.image}`}
            alt="project_image"
            className="w-full h-full object-fill rounded-[8px]"
          />
        </Link>

        <div className="h-[30%] flex justify-center items-center">
          <h3 className="font-semibold text-[20px] text-center">
            {project.title}
          </h3>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = ({ projects }: { projects: ProjectsArray }) => {
  return (
    <div className="mx-auto max-w-7xl pb-20 transition-all duration-300 px-6 sm:px-10 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          duration: 1,
          delay: 0.3,
          type: "spring",
          ease: "easeOut",
          once: true,
        }}
        className=""
      >
        <p className="sm:text-[18px] text-[14px]  uppercase tracking-wider text-gray-600 dark:text-gray-300">
          My work
        </p>
        <h2 className="font-black md:text-[40px] sm:text-[35px] xs:text-[30px] text-[25px]">
          Projects.
        </h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            duration: 0.9,
            delay: 0.9,
            type: "spring",
            ease: "easeOut",
            once: true,
          }}
          className="mt-3 text-[17px] max-w-3xl leading-[30px] tracking-wide text-gray-500 dark:text-gray-300"
        >
          Following projects showcases my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos in it. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7 gap-y-10">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} index={index} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Works;
