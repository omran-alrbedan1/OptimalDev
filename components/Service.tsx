"use client";
import { ServicesArray } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const Service = ({services}:{services:ServicesArray}) => {
  return (
    <section className=" flex flex-col items-center mt-20 bg-gray-50 py-10 px-3 sm:px-10 sm:mb-40">
    {/* Animated Heading */}
    <motion.h1
      className="text-4xl sm:text-5xl text-primary-color1 text-center font-extrabold"
      initial={{ opacity: 0, y:-200 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay:0.2 }}
      // viewport={{ once: true }}
    >
      Our Services
    </motion.h1>

    <motion.p
      className="sm:text-lg text-gray-400 text-center mt-4 mb-12 sm:mx-auto"
      initial={{ opacity: 0, y:100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay:0.5 }}
      // viewport={{ once: true }}
    >
      We are ready to scale up your business with our great service.
    </motion.p>

    {/* Service Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
      {services.map((item, index) => {
        // Define custom animations based on the index
        // const animations = {
        //   initial: {},
        //   whileInView: {},
        // };

        // if (index === 0) {
        //   animations.initial = { opacity: 0, x: "-100%" };
        //   animations.whileInView = { opacity: 1, x: 0 };
        // } else if (index === 1) {
        //   animations.initial = { opacity: 0, y: 200 };
        //   animations.whileInView = { opacity: 1, y: 0 };
        // } else if (index === 2) {
        //   animations.initial = { opacity: 0, x: "100%" };
        //   animations.whileInView = { opacity: 1, x: 0 };
        // }

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: (index%2===0?150:-150), scale:"90%"}}
            whileInView={{ opacity: 1, y: 0, scale:"100%" }}
            transition={{ delay: index * 0.2, duration: 0.9 }}
        
          >
            <div className="group rounded-2xl shadow-xl w-11/12 sm:max-h-[400px] m-3 transform transition duration-500 hover:scale-105">
              <Link href={`/project/${item.id}`} passHref>
                <div className="relative cursor-pointer">
                  <Image
                    src={`https://main.hivetech.space/storage/${item.image}`}
                    alt={item.title}
                    width={400}
                    height={300}
                    className="rounded-t-2xl rounded-b-[5px] z-0 bg-contain h-72 sm:h-72"
                  />
                </div>
              </Link>
            <div className="py-7 text-center mx-2">
                  <h2 className="text-gray-500 text-lg sm:text-xl font-semibold">
                    {item.title}
                  </h2>
                </div>
            </div>   
          </motion.div>
        );
      })}
    </div>
    <button type="button" className=" mt-10 w-40 h-14 rounded-[30px] text-gray-500  border-primary-color1 border hover:bg-gray-500 hover:border-none hover:text-white font-semibold">
       <Link href={'/services'}>
       see more  &gt;&gt; 
       </Link> 
    </button>
  </section>
  )
}

export default Service