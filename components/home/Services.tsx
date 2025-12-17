"use client";

import { Carousel } from "antd";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import ServiceCard from "../cards/ServiceCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const CustomArrow = ({
  type,
  onClick,
}: {
  type: "prev" | "next";
  onClick?: () => void;
}) => {
  const Icon = type === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      onClick={onClick}
      className={`
  absolute z-10 top-1/2 -translate-y-1/2
  ${type === "prev" ? "-left-12" : "-right-12"}
  bg-white/80 hover:bg-white hover:text-primary-color1 hover:scale-125 hover:shadow-xl dark:bg-gray-600 text-gray-800
  p-2 rounded-full shadow-md transition-all
   items-center justify-center
  w-10 h-10
  hidden md:flex
`}
      aria-label={type === "prev" ? "Previous" : "Next"}
    >
      <Icon className="w-6 h-6" />
    </button>
  );
};

export default function Services() {
  const [services, setServices] = useState<ServicesResponse>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/services/sub-services");
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.log("Error fetching services:", error);
      }
    };
    fetchData();
  }, []);

  if (!services) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading services...</div>
      </div>
    );
  }

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col w-full items-center mt-16 p-8 px-5 sm:px-10 md:px-16 mx-auto mb-16 md:mb-20"
    >
      {/* Use 'services' instead of 'servicesResponse' */}
      <Header
        title={services?.section?.title}
        paragraph={services?.section?.description}
      />

      <motion.div
        className="w-full max-w-7xl relative"
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Carousel
          autoplay
          arrows
          prevArrow={<CustomArrow type="prev" />}
          nextArrow={<CustomArrow type="next" />}
          dots={{ className: "custom-dots" }}
          className="hover:cursor-pointer [&_.slick-dots]:bottom-[-30px] [&_.slick-dots_li_button]:bg-gray-300 [&_.slick-dots_li.slick-active_button]:bg-primary-color1"
        >
          {services?.data?.map((service, index) => (
            <div key={service.id} className="px-2">
              <ServiceCard service={service} index={index} />
            </div>
          ))}
        </Carousel>
      </motion.div>
    </motion.section>
  );
}
