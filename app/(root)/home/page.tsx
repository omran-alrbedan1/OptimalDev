
import React, { Suspense } from "react";


import '@fontsource/poppins/300.css'; // Light weight (300)
import '@fontsource/poppins/500.css'; // Medium weight (500)
import '@fontsource/poppins/600.css'; // Semi-bold weight (600)

import Projects from "@/app/parts/Projects";
import Services from "@/app/parts/Services";
import Testimonial from "@/app/parts/Testimonial";
import Categories from "@/app/parts/Categories";
import Clients from "@/app/parts/Clients";
import Sliders from "@/app/parts/Sliders";
import Sections from "@/app/parts/Sections";
import Loader from "@/components/Loader";
import { DiscussProject } from "@/components/DiscussProject";





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
    <Suspense fallback={<Loader />}>
      <div className="relative duration-500">
        <Sliders />
        <Sections />



        <Projects />
        <Services />
        <Categories />
        <Testimonial />
        <Clients />
        <DiscussProject />
      </div></Suspense>
  );
};

export default Page;
