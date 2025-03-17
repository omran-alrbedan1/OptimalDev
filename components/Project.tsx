"use client";
import { ProjectsArray } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const Project = ({ projects }: { projects: ProjectsArray }) => {
  return (
    <section className="container mx-auto flex flex-col items-center mt-20 px-3 pr-5">
      <motion.h1
        className="text-2xl sm:text-3xl text-primary-color2 text-center font-semibold"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ letterSpacing: "3px" }}
      >
        Our Projects
      </motion.h1>

      <motion.p
        className=" text-lg text-gray-500 text-center mt-4 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        We are ready to scale up your business with our great work result.
        <span className="block text-center w-32 h-[3px] bg-primary-color1 mt-10"/>
      </motion.p>

      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-8 justify-items-center ml-4 sm:mx-10 mt-20">
        {projects?.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.9 }}
          >
            <div className=" flex flex-col justify-evenly group rounded-2xl shadow-xl w-full h-[350px] sm:h-96 pb-2 transform transition duration-500 hover:scale-110">
              <Link href={`/project/${item.id}`} passHref>
                <div className="relative cursor-pointer">
                  <div className="absolute w-full rounded-t-2xl rounded-b-lg z-20 h-full bg-primary-color2 opacity-0 hover:opacity-50" />
                  <Image
                    src={`https://main.hivetech.space/storage/${item.image}`}
                    alt={item.title}
                    width={400}
                    height={300}
                    className="rounded-t-2xl rounded-b-lg z-0 bg-cover h-64 sm:h-64 lg:h-72"
                  />
                </div>
              </Link>

              <h2 className="text-center text-primary-color2 text-[16px] sm:text-lg font-semibold">
                {item.title}
              </h2>
            </div>
          </motion.div>
        ))}
      </div>
      <button
        type="button"
        className=" mt-10 w-40 h-14 rounded-[30px] text-primary-color1 
        border-primary-color1 border hover:bg-primary-color1
         hover:border-none font-semibold hover:opacity-75 hover:text-primary-color3
         transition-all duration-500"
      >
        <Link href={"/projects"}>see more &gt;&gt;</Link>
      </button>
    </section>
  );
};

export default Project;
