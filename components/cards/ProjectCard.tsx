'use client';
import { ProjectProps, ProjectsArray } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
export default function ProjectCard({ project, index }:{project:ProjectProps; index:number}) {
  return (
    <motion.div
    key={project.id}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.2, duration: 0.9 }}
    className=''
  >
     {/* flex flex-col justify-evenly group rounded-2xl shadow-xl w-full h-[350px] sm:h-96 pb-2 */}
    <div className="rounded-2xl flex flex-col justify-between w-full h-full drop-shadow-2xl bg-gray-100  transition duration-500 hover:scale-110">
      <Link href={`/projects/${project.id}`} className="relative w-full cursor-pointer h-4/5">
     
          <div className="absolute w-full rounded-t-2xl rounded-b-lg z-20 h-full bg-primary-color2 opacity-0 hover:opacity-30" />
          
          <Image
            src={`https://main.hivetech.space/storage/${project.image}`}
            alt={project.title}
            width={400}
            height={300}
            className=" rounded-t-2xl rounded-b-[5px] object-cover h-full w-full"
          />
     
      </Link>

      <h2 className="flex justify-center items-center py-5 text-center text-primary-color2 text-[16px] sm:text-lg font-semibold">
        {project.title}
      </h2>
    </div>
  </motion.div>
  );
}