import Hero from "@/app/parts/Hero";
import React from "react";


import '@fontsource/poppins/300.css'; // Light weight (300)
import '@fontsource/poppins/500.css'; // Medium weight (500)
import '@fontsource/poppins/600.css'; // Semi-bold weight (600)
// import Image from "next/image";
// import { motion } from "framer-motion"; // Import Framer Motion
import Projects from "@/app/parts/Projects";
import Services from "@/app/parts/Services";
import Testimonial from "@/app/parts/Testimonial";
import Categories from "@/app/parts/Categories";
import Clients from "@/app/parts/Clients";





// interface SiteDetail {
//   id: number;
//   title: string;
//   content: string;
//   type: string;
//   content_image: string | null;
//   section_type: {
//     id: number;
//     type: string;
//     created_at: string | null;
//     updated_at: string | null;
//   };
// }

const Page = async () => {
  // Define animation variants
  // const container = {
  //   hidden: { opacity: 1, scale: 0 },
  //   visible: {
  //     opacity: 1,
  //     scale: 1,
  //     transition: {
  //       delayChildren: 0.3, // Delay before children animations start
  //       staggerChildren: 0.2, // Stagger delay between each child animation
  //     },
  //   },
  // };

  // const item = {
  //   hidden: { y: 20, opacity: 0 }, // Start hidden and slightly below
  //   visible: {
  //     y: 0, // Move to original position
  //     opacity: 1, // Fade in
  //   },
  // };

  // Hardcoded site details data
  // const site_details: SiteDetail[] = [
  //   {
  //     id: 1,
  //     title: "",
  //     content: "FFB400",
  //     type: "primary",
  //     content_image: null,
  //     section_type: {
  //       id: 9,
  //       type: "color",
  //       created_at: null,
  //       updated_at: null,
  //     },
  //   },
  //   {
  //     id: 2,
  //     title: "",
  //     content: "000000",
  //     type: "background",
  //     content_image: null,
  //     section_type: {
  //       id: 9,
  //       type: "color",
  //       created_at: null,
  //       updated_at: null,
  //     },
  //   },
  //   // Add more site details as needed
  // ];


  return (
    <div>
      <Hero />
   
{/* 
      Display Site Details
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4 text-black-100">Site Details</h2>
        <ul>
          {site_details.map((detail) => (
            <li key={detail.id} className="mb-2 text-black-100">
              <strong>{detail.title}</strong>: {detail.content}
            </li>
          ))}
        </ul>
      </div> */}

      {/* Display Projects */}
 {/* <Experience/> */}

      <Projects />
     <Services />
 <Testimonial />
 <Categories />
 <Clients />
    </div>
  );
};

export default Page;
