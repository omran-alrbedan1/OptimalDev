// app/careers/_components/SearchHeader.tsx
"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Input, Button } from "antd";
import { FiSearch } from "react-icons/fi";
import { useJobSearch } from "@/hooks/useJobSearch";

export default function SearchHeader() {
  const t = useTranslations("careerPage");
  const { searchQuery, setSearchQuery, setCurrentPage, handleSearchClick } =
    useJobSearch();

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl font-bold text-gray-800 dark:text-white"
      >
        {t("availableJobs")}
      </motion.h2>

      <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="w-full md:w-1/2"
      >
        <div className="bg-white dark:bg-gray-800 p-1 justify-center rounded-xl shadow-md flex flex-row gap-2">
          <div className="flex-1 flex items-center">
            <FiSearch className="text-gray-400 dark:text-gray-300 text-xl ml-2" />
            <Input
              placeholder={t("searchPlaceholder")}
              bordered={false}
              className="text-lg h-8 md:h-10 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <Button
            type="primary"
            onClick={handleSearchClick}
            className="h-10 md:h-12 md:px-4 flex items-center dark:bg-blue-600 dark:hover:bg-blue-700"
            icon={<FiSearch className="text-lg" />}
          >
            {t("searchButton")}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
