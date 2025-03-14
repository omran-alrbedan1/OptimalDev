"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Team from "../../public/assets/portfolioHero.png";

// Define the type for a single category
interface Category {
  id: number; // Adjust based on your API response
  title: string; // Adjust based on your API response
}

const Categories = () => {
  // Explicitly type the categories state
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // Fetch categories from the API
    fetch("https://main.hivetech.space/api/category")
      .then((response) => response.json())
      .then((data) => {
        // Assuming the API returns an object with a `data` property containing the array
        setCategories(data.data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <div className="-mt-10 mx-10 sm:mx-12 lg:mx-14">
      <header className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: 150 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: false }}
          className="text-4xl sm:text-5xl font-bold text-primary-color1 mb-5 sm:mb-16"
          style={{ letterSpacing: "4px" }}
        >
          Categories
        </motion.h1>
      </header>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mx-auto">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 150 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.2,
              duration: 0.8,
            }}
            className=""
          >
            <div className="mb-6 flex flex-col items-center justify-between">
              <div className="h-32 w-36 sm:h-36 sm:w-40 2xl:h-40 2xl:w-48 mb-3 overflow-y-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Image
                  src={Team}
                  alt={`image${index}`}
                  width={100}
                  height={100}
                  className="object-cover w-full z-0 h-full"
                />
              </div>
              <h2 className="flex justify-center items-center mx-auto text-black-300">
                {category?.title}
              </h2>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Categories;