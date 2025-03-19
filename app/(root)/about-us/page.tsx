import React from "react";
import axios from "axios";
import { Suspense } from "react";
import Loader from "@/components/Loader";

const ContactUsPage = async () => {
  const response = await axios.get("https://main.hivetech.space/api/about-us", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const about_us = response.data.data;

  return (
    <div className="h-[160vh] xs:h-[120vh] relative">
      {/* Background Overlay */}
      <div className="absolute min-w-full min-h-full bg-primary-color2 opacity-30 z-10" />
      <img
        src="/images/about-us.webp"
        alt="building"
        className="absolute w-full h-full object-cover"
      />

      
      <div className="absolute w-full h-full z-20 pt-28 md:pt-40  pb-10 px-5 md:px-10 md:pl-32">
      <h1
            className="text-center text-2xl sm:text-3xl md:text-4xl text-white pb-7  md:pb-10 font-bold"
            style={{ letterSpacing: "4px" }}
          >
            About Us
          </h1>
          <div className="max-w-3xl">

         
        <div
            className="text-white text-lg max-sm:text-center md:text-xl mb-10 "
            dangerouslySetInnerHTML={{ __html: about_us[0].title }}
          />
           
         
          <div
            className="text-gray-200  text-[15px] lg:text-[16px] mb-6 max-sm:font-light"
            dangerouslySetInnerHTML={{ __html: about_us[0].description }}
          />
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <ContactUsPage />
    </Suspense>
  );
}
