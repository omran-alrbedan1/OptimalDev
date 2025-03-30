"use client";
import { Category, CategoryArray } from "@/types";

import { motion } from "framer-motion";

import { Tilt } from "react-tilt";

const About = ({
  content,
  categories,
}: {
  content: string;
  categories: CategoryArray;
}) => {
  return (
    <section className="mx-auto max-w-7xl pb-16 transition-all duration-300">
      <div className="sm:px-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.25, delay: 0.2, type: "spring" }}
        >
          <p className="sm:text-[18px] text-[14px] dark:text-gray-300 uppercase tracking-wider text-gray-500">
            Introduction
          </p>
          <h2 className="font-bold md:text-[50px] sm:text-[40px] xs:text-[30px] text-[25px] tracking-wider">
            Overview.
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            duration: 1,
            delay: 0.5,
            type: "spring",
            ease: "easeOut",
            once: true,
          }}
          className="mt-4 text-[17px] max-w-4xl leading-[30px] tracking-wider text-gray-600 dark:text-gray-300"
        >
          {content}
        </motion.p>

        <div className="mt-20 flex flex-wrap gap-10">
          {categories.map((category: Category, index: number) => (
            <Tilt
              options={{
                max: 45,
                scale: 1,
                speed: 450,
              }}
              className="xs:w-[250px] w-full"
              key={category.id}
            >
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.75,
                  delay: 0.4 * index,
                  type: "spring",
                  ease: "easeOut",
                  once: true,
                }}
                className="w-full relative  green-pink-gradient p-[1px] rounded-[20px] overflow-hidden group"
              >
                <div className="absolute w-full h-full z-10 rounded-[20px] p-[0.5px] translate-y-[-100%] flex  group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                <img
                    src={category.image}
                    alt="web-development"
                    width={105}
                    height={105}
                    className="w-full h-full rounded-[30px]"
                  />
                  <div  className="w-full h-full absolute z-10 bg-darkMod-700/30 rounded-[20px]"/>
              
                </div>
                <div
                  className="bg-white-100  dark:bg-darkMod-200 shadow-2xl rounded-[20px]  px-8 min-h-[300px] flex justify-evenly items-center flex-col"
                >
                  <img
                    src={category.image_icon}
                    alt="web-development"
                    width={105}
                    height={105}
                    className="object-contain"
                  />

                  <h3 className=" text-[20px] font-bold text-center">
                    {category.title}
                  </h3>
                  <p className="text-center dark:text-gray-300">
                    {category.description}
                  </p>
                </div>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;