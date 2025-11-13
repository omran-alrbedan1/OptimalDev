"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

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
  service: SubService;
  index: number;
}) {
  const pathname = usePathname();

  const isArabic = pathname.startsWith("/ar/") || pathname.includes("/ar/");

  return (
    <motion.div
      variants={cardVariants}
      className={`flex ${
        isArabic ? "flex-row" : "flex-row-reverse"
      } items-center gap-8 p-6`}
    >
      <motion.div className="w-full relative flex justify-center items-center rounded-lg overflow-hidden">
        <motion.div className="relative w-fit">
          <img
            src={
              service?.image
                ? service.image
                : "https://via.placeholder.com/400x300?text=No+Image"
            }
            alt={service?.name}
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

      <div
        className={`w-full md:w-1/2 ${isArabic ? "text-right" : "text-left"}`}
      >
        <motion.h3
          className={`text-2xl font-bold mb-4 ${
            isArabic ? "text-right" : "text-left"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: service?.name,
            }}
          />
        </motion.h3>
        <motion.p
          className={`text-gray-600 mb-6 dark:text-gray-200 ${
            isArabic ? "text-right" : "text-left"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.4 }}
        >
          <div
            className="line-clamp-6"
            dangerouslySetInnerHTML={{
              __html: service?.description,
            }}
          />
        </motion.p>
        <motion.a
          href={`/services/${service?.id}`}
          className={`inline-block px-6 py-2 bg-primary-color1 text-white rounded-lg hover:border-primary-color1 hover:text-primary-color1 hover:bg-white-100 border-2 transition ${
            isArabic ? "text-right" : "text-left"
          }`}
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="pressed"
        >
          {isArabic ? "اعرف المزيد" : "Learn More"}
        </motion.a>
      </div>
    </motion.div>
  );
}
