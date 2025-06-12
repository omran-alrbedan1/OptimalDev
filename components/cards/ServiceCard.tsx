// components/ServiceCard.tsx
"use client";

import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const buttonVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
  pressed: { scale: 0.95 },
};

export default function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  return (
    <motion.div
      variants={cardVariants}
      className="flex flex-col md:flex-row items-center gap-8 p-6"
    >
      <motion.div className="w-full relative flex justify-center items-center rounded-lg overflow-hidden">
        <motion.div className="relative w-fit">
          <img
            src={service.image}
            alt={service.title}
            className="object-contain w-fit"
            style={{
              maxWidth: "100%",
              maxHeight: "400px",
              width: "auto",
              height: "auto",
            }}
          />
        </motion.div>
      </motion.div>

      <div className="w-full md:w-1/2">
        <motion.h3
          className="text-2xl font-bold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          {service.title}
        </motion.h3>
        <motion.p
          className="text-gray-600 mb-6 dark:text-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.4 }}
        >
          {service.description}
        </motion.p>
        <motion.a
          href={service.link}
          className="inline-block px-6 py-2 bg-primary-color1 text-white rounded-lg hover:border-primary-color1 hover:text-primary-color1 hover:bg-white-100 border-2 transition"
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="pressed"
        >
          Learn More
        </motion.a>
      </div>
    </motion.div>
  );
}
