"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useRef, useEffect } from "react";

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
  const pathname = usePathname();
  const isArabic = pathname.startsWith("/ar/") || pathname.includes("/ar/");
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Safe image loading
    if (imgRef.current) {
      const img = imgRef.current;
      const handleLoad = () => {
        // Image loaded successfully
      };
      const handleError = () => {
        if (img) {
          img.src = "https://via.placeholder.com/400x300?text=No+Image";
        }
      };

      img.addEventListener("load", handleLoad);
      img.addEventListener("error", handleError);

      return () => {
        img.removeEventListener("load", handleLoad);
        img.removeEventListener("error", handleError);
      };
    }
  }, []);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className={`flex ${
        isArabic ? "flex-row" : "flex-row-reverse"
      } items-center gap-8 p-6`}
    >
      <div className="w-full relative flex justify-center items-center rounded-lg overflow-hidden">
        <div className="relative w-fit">
          <img
            ref={imgRef}
            src={
              service?.image
                ? service.image
                : "https://via.placeholder.com/400x300?text=No+Image"
            }
            alt={service?.name || "Service image"}
            className="object-contain w-fit"
            style={{
              maxWidth: "100%",
              maxHeight: "400px",
              width: "auto",
              height: "auto",
            }}
            onError={(e) => {
              e.currentTarget.src =
                "https://via.placeholder.com/400x300?text=No+Image";
            }}
          />
        </div>
      </div>

      <div
        className={`w-full md:w-1/2 ${isArabic ? "text-right" : "text-left"}`}
      >
        <motion.div
          className={`text-2xl font-bold mb-4 ${
            isArabic ? "text-right" : "text-left"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: service?.name || "",
            }}
          />
        </motion.div>

        <motion.div
          className={`text-gray-600 mb-6 dark:text-gray-200 line-clamp-6 ${
            isArabic ? "text-right" : "text-left"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.4 }}
          dangerouslySetInnerHTML={{
            __html: service?.description || "",
          }}
        />

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
