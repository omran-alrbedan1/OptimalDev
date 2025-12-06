"use client";
import { motion } from "framer-motion";

const PartnerCard = ({
  partner,
  index,
}: {
  partner: Partner;
  index: number;
}) => {
  const cardContent = (
    <div className="relative w-full h-full py-10 flex flex-col items-center gap-6 group">
      {/* Enhanced Image with primary color effects */}
      {partner.image && (
        <div className="relative w-36 h-36 group-hover:scale-110 transition-all duration-500">
          {/* Main image container with primary color border */}
          <div className="relative w-full h-full p-1">
            <div className="w-full h-full bg-white dark:bg-gray-800 p-2 flex items-center justify-center">
              <img
                src={partner.image ? partner.image : ""}
                alt={partner.title}
                className="object-contain group-hover:shadow-2xl transition-shadow duration-500"
                style={{
                  width: "auto",
                  height: "auto",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
              />
            </div>
          </div>

          {/* Floating particles effect with primary color */}
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-primary rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-300 delay-100"></div>
          <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-primary/80 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-300 delay-200"></div>
        </div>
      )}

      {/* Enhanced Content */}
      <div className="text-center space-y-4 px-4 flex-1 flex flex-col justify-center">
        <motion.h3
          className="font-bold text-2xl bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent group-hover:text-primary transition-all duration-500"
          whileHover={{ scale: 1.05 }}
        >
          {partner.title}
          {partner.link_url && (
            <span className="ml-2 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              ↗
            </span>
          )}
        </motion.h3>

        <div className="relative">
          <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed line-clamp-3 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
            {partner.description}
          </p>

          {/* Subtle accent line with primary color */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-16 transition-all duration-500"></div>
        </div>
      </div>

      {/* Interactive corner accent with primary color */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        type: "spring",
        stiffness: 120,
        damping: 15,
      }}
      className={`px-6 flex flex-1 h-[380px] border border-zinc-200/50 dark:border-gray-700/50 bg-gradient-to-br from-white via-gray-50/30 to-white dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-900 shadow-lg transition-all duration-500 overflow-hidden backdrop-blur-sm ${
        partner.link_url ? "cursor-pointer" : "cursor-default"
      }`}
    >
      {partner.link_url ? (
        <a
          href={partner.link_url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-full no-underline text-inherit"
        >
          {cardContent}
        </a>
      ) : (
        cardContent
      )}
    </motion.div>
  );
};

export default PartnerCard;
