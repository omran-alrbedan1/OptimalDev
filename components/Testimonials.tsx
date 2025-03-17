"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { TestimoniArray } from "@/types";


const Testimonials = ({testimonials}:{testimonials:TestimoniArray}) => {
  return (
    <motion.section
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="container mx-auto mt-10"
  >
    <motion.h1
      className="text-3xl text-primary-color2 text-center font-extrabold"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "linear" }}
    >
      Testimonials
    </motion.h1>

    <motion.p
      className="text-lg text-gray-500 text-center mt-4 mb-12 mx-auto flex flex-col items-center"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "linear" }}
      // viewport={{ once: true }}

    >
      What they said about us.
      Categories <span className="block text-center w-32 h-[3px] bg-primary-color1 mt-10"/>
    </motion.p>

    <Splide
      options={{
        type: "loop",
        autoplay: true,
        perPage: 1,
        pagination: false,
      }}
    >
      {testimonials.map((item) => (
        <SplideSlide key={item.id}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: item.id * 0.1 }}
            className="flex-col w-11/12 sm:w-10/12 rounded-2xl shadow-xl sm:shadow-2xl border border-light-theme-purple px-8 py-6 mx-2 sm:mx-10 mb-6 mt-6 xl:mx-auto sm:mb-12"
          >
            <div className="flex items-center mb-5">
              <Image
                src={`https://main.hivetech.space/storage/${item.image}`}
                alt={`Testimonial by ${item.id}`}
                width={80}
                height={80}
                className="w-20 h-20 rounded-full"
              />
              <div className="flex-col pl-5">
                <h2 className="text-primary-color2 font-semibold text-xl">{item.title}</h2>
                <p className="font-light text-gray-600">{item.sub_title}</p>
              </div>
            </div>
            <p className="font-light text-gray-600 pl-5 pt-3 pb-1">
              {item.content}
            </p>
          </motion.div>
        </SplideSlide>
      ))}
    </Splide>
  </motion.section>
  )
}

export default Testimonials