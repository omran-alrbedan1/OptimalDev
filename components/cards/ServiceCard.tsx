// components/cards/ServiceCard.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const ServiceCard = ({
  service,
  isActive,
  direction,
}: {
  service: {
    id: number;
    title: string;
    description: string;
    image: string;
    link: string;
  };
  isActive: boolean;
  direction: "left" | "right";
}) => {
  return (
    <AnimatePresence custom={direction} mode="wait">
      {isActive && (
        <motion.div
          key={service.id}
          custom={direction}
          initial={{ opacity: 0, x: direction === "right" ? 100 : -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction === "right" ? -100 : 100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 flex flex-col md:flex-row items-center gap-8 p-6"
        >
          <div className="w-full relative flex justify-center items-center rounded-lg overflow-hidden ">
            <div className="relative w-fit ">
              <Image
                src={service.image}
                alt={service.title}
                width={500}
                height={300}
                className="object-contain w-fit"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "auto",
                  height: "auto",
                }}
              />
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
            <p className="text-gray-600 mb-6">{service.description}</p>
            <Link
              href={service.link}
              className="inline-block px-6 py-2 bg-primary-color1 text-white rounded-lg hover:border-primary-color1 hover:text-primary-color1 hover:bg-white-100 border-2 transition"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServiceCard;
