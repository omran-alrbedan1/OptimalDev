'use client'; 

import Button from '@/app/elements/Button/button';
import { motion } from 'framer-motion';


export const DiscussProject = () =>   {
  return (
    <motion.section
      initial={{ opacity: 0, y: 400 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 2, delay: 0.6 , type: 'spring' , ease: 'easeOut' , once: true  }}
      className="flex mx-auto justify-center"
    >
      <div className="flex flex-col w-10/12 sm:w-11/12 xl:w-10/12 rounded-2xl bg-theme-purple dark:text-gray-100  sm:px-12 sm:py-20 xl:px-16 shadow-2xl discuss">
        <div className="flex flex-col sm:flex-row  sm:gap-5 mb-3 sm:mb-9 p-5 sm:p-0 sm:items-center">
          <h1 className=" text-2xl sm:text-6xl leading-tight font-semibold">
            Have an awesome project in mind?
          </h1>
          
          <Button 
            href="/discuss-project" 
            type="link" 
            className="flex  bg-yellow-300 text-blue-800 text-xl lg:text-2xl xl:text-xl tracking-wider items-center justify-center w-56 lg:w-80 lg:h-24 h-20 p-5 border-2 border-dark-theme-purple shadow-xl rounded-full mt-6 sm:mt-0 sm:ml-4 lg:ml-0 xl:ml-12 transform transition duration-600 hover:scale-105"
          >
            Lets Discuss!
          </Button>
        </div>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-light p-5 sm:p-0 text-lg sm:text-xl lg:text-2xl xl:text-xl mb-1"
        >
          Lets discuss it and make your dream software come true!
        </motion.p>
      </div>
    </motion.section>
  );
}