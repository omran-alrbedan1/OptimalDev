"use client";
import Image from "next/image";
import Button from "../elements/Button/button";
import { motion } from "framer-motion"; // Import Framer Motion

const Hero = () => {
  return (
    <section className="hero ">
      {/* Fade effect with Framer Motion */}
      <motion.div
        initial={{ opacity: 0, y: 50 }} // Start hidden and slightly below
        animate={{ opacity: 1, y: 0 }} // Animate to fully visible and original position
        transition={{ duration: 0.8, ease: "easeOut" }} // Animation duration and easing
        className="w-full lg:w-1/2 xl:pl-12 sm:pr-2 mt-2 sm:mt-4  p-12 "
      >
        <h1 className="text-4xl sm:text-5xl text-theme-blue font-bold leading-tight mb-2 sm:mb-7 text-black-100">
          Growing Your Business <br />
          Is Our Calling
        </h1>

        <p className=" text-xl text-gray-400 mt-3 mb-16">
          We provide developers & designers using latest technologies to help
          you scale up your business.
        </p>

        <Button
          href="/projects"
          type="link"
          className="flex w-72 h-18 text-black-100 items-center px-14 py-5 text-xl mr-10 -ml-10 sm:-ml-5  bg-primary-color1 rounded-xl hover:text-white hover:bg-black-100 transition duration-200"
        >
          See Our Work
          <svg
            className="ml-2 w-7 h-7 animate-bounce-x"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Button>
      </motion.div>

      {/* Fade effect for the image */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        className="flex pt-5 w-full justify-center items-center order-first md:w-full lg:order-last lg:w-1/2"
      >
        <Image
          src="/Hive Tech Logo.svg"
          alt="Build Website"
          width={270}
          height={300}
          className="w-52 h-56 sm:w-80 sm:h-80"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
