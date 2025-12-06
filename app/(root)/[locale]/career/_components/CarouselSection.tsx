// app/careers/_components/CarouselSection.tsx
"use client";
import LatestJobsCarousel from "@/components/parts/LatestJobsCarousel ";
import { useJobSearch } from "@/hooks/useJobSearch";
import { motion } from "framer-motion";

export default function CarouselSection() {
  const { featuredJobs } = useJobSearch();

  return (
    <motion.section
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <LatestJobsCarousel jobs={featuredJobs} />
    </motion.section>
  );
}
