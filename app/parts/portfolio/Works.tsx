'use client';
import React from "react";
import {Tilt} from "react-tilt";
import { motion } from "framer-motion";
import { ProjectProps, ProjectsArray } from "@/types";




const ProjectCard = ({project, index}: {project: ProjectProps; index: number}) => {
  return (
    <motion.div 
        initial={{ opacity: 0 , y:100}}
        whileInView={{ opacity: 1, y:0 }}
        transition={{
        duration: 0.75,
        delay: 0.5*index,
        type: "spring",
        ease: "easeOut",
        once: true,
        }}
    >
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='dark:bg-darkMod-600 bg-zinc-200 p-5 rounded-2xl sm:w-[360px] w-full'
      >
        <div className='relative w-full h-[180px] sm:h-[200px]'>
          <img
            src={`https://main.hivetech.space/storage/${project.image}`}
            alt='project_image'
            className='w-full h-full object-fill rounded-[8px]'
          />

          <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
            {/* <div
              onClick={() => window.open(source_code_link, "_blank")}
              className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
            >
              <img
                src={github}
                alt='source code'
                className='w-1/2 h-1/2 object-contain'
              />
            </div> */}
          </div>
        </div>

        <div className='mt-5'>
          <h3 className='font-bold text-[22px] text-center'>{project.title}</h3>
          <p className='mt-2 text-secondary text-[14px]'>{project.description}</p>
        </div>

        {/* <div className='mt-4 flex flex-wrap gap-2'>
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[14px] ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div> */}
      </Tilt>
    </motion.div>
  );
};

const Works = ({projects}: {projects: ProjectsArray}) => {
  return (
    <div 
      className="mx-auto max-w-7xl pb-20 transition-all duration-300 px-6 sm:px-10 overflow-hidden"
    >
      <motion.div 
      
      initial={{ opacity: 0,x:100 }}
      whileInView={{ opacity: 1, x:0 }}
      transition={{
        duration: 1,
        delay: 0.3,
        type: "spring",
        ease: "easeOut",
        once: true,
      }}
      className=""
      >
        <p className= "sm:text-[18px] text-[14px]  uppercase tracking-wider text-gray-600 dark:text-gray-300">My work</p>
        <h2 className= "font-black md:text-[40px] sm:text-[35px] xs:text-[30px] text-[25px]">Projects.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
                duration: 1,
                delay: 0.6,
                type: "spring",
                ease: "easeOut",
                once: true,
            }}
          className='mt-3 text-[17px] max-w-3xl leading-[30px] tracking-wide text-gray-500 dark:text-gray-300'
        >
          Following projects showcases my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos in it. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>

      <div className='mt-20 flex flex-wrap gap-7'>
        {projects.map((project, index) => (
          <ProjectCard key={project.id} index={index} project={project}/>
        ))}
      </div>
    </div>
  );
};

export default Works;
