"use client";
import { ProjectProps } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";


const Project = ({projects}:{projects:ProjectProps}) =>  {

  return (
    <section
      className="container mx-auto flex flex-col items-center mt-20 px-3 pr-5"
    >
      <motion.h1
        className="text-4xl text-primary-color1 text-center font-semibold"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{letterSpacing:"3px"}}
      >
        Our Projects
      </motion.h1>

      <motion.p
        className=" text-lg text-gray-400 text-center mt-4 mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        We are ready to scale up your business with our great work result.
      </motion.p>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8 justify-items-center sm:mx-10">
        {projects?.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.9 }}
           
            
          >
            <div className="group rounded-2xl shadow-xl w-11/12 m-3 transform transition duration-500 hover:scale-105">
              
         
            <Link href={`/project/${item.id}`} passHref>
              <div className="relative cursor-pointer">
                <Image
                  src={`https://main.hivetech.space/storage/${item.image}`}
                  alt={item.title}
                  width={400}
                  height={300}
                  className="rounded-t-2xl rounded-b-xl z-0 bg-contain h-48 sm:h-64 lg:h-72 cover-contain"
                />
              </div>
            </Link>
         
            </div>   <div className="my-5 text-center">
              <h2 className="text-gray-500 sm:text-xl font-semibold">{item.title}</h2>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Project



