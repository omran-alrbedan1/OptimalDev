"use client";
import { ProjectProps, ProjectsArray } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
export default function ProjectCard({
  project,
  index,
  animationVertix,
}: {
  project: ProjectProps;
  index: number;
  animationVertix: "x"|"y"
}) {
  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, x: (animationVertix == 'x'? "-100%": '0'), y:(animationVertix === 'y'? 200: 0) }}
      whileInView={{ opacity: 1, y: 0, x:0 }}
      transition={{ delay: index>5?index * 0.1: index*0.3, duration: 1.3 , type: 'spring', once:true }}
      className="w-full"
    >
      <div className="rounded-xl flex flex-col justify-between w-full  drop-shadow-2xl bg-gray-100 dark:bg-darkMod-100 transition duration-500 hover:scale-110">
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
      </div>
    </motion.div>
  );
}
