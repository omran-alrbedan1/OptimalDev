"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type Service = {
  id: number;
  title: string;
  description: string;
  icon: string;
};

const ServiceCard = ({
  service,
  index,
}: {
  service: Service;
  index: number;
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 100,
        scale: 0.95,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.1,
        duration: 0.7,
        type: "spring",
        ease: "easeOut",
      }}
      className="w-full max-w-sm"
    >
      <div className="flex flex-col h-full rounded-xl bg-white dark:bg-darkMod-100 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200 dark:border-darkMod-200">
        <div className="p-6 flex flex-col items-center text-center">
          <div className="mb-4 p-3 bg-primary-color1/20 dark:bg-primary-color2/10 rounded-full">
            <Image
              src={service.icon}
              height={52}
              width={52}
              alt={service.title}
              className="w-16 h-16   object-contain"
            />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            {service.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {service.description}
          </p>
        </div>
        <Link
          href={`/`}
          className="mt-auto p-4 text-center text-primary-color1 dark:text-primary-color2 font-medium hover:underline"
        >
          Learn more
        </Link>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
