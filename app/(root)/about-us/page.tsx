import React from "react";
import axios from "axios";
import { Suspense } from "react";
import Loader from "@/components/Loader";
import Animate from "@/components/animation/Animate";

const ContactUsPage = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const response = await axios.get("https://main.hivetech.space/api/about-us", {

    headers: {
      "Content-Type": "application/json",
    },
  });

  const about_us = response.data.data;

  return (
    <div className="min-h-[100vh] relative">
      {/* Background Overlay */}
      <img
        src="/images/about-us.webp"
        alt="building"
        className="absolute w-full h-full object-cover md:object-cover"
      />
      <div className="absolute min-w-full min-h-full bg-primary-color2 opacity-50 " />


      <div className="relative w-full h-full  pt-32 sm:pt-40  pb-10 px-5 md:px-10 ">
        <Animate x="0" y="200" delay={0.5} index={1} duration={1}
          className="text-center text-3xl sm:text-4xl md:text-5xl tracking-widest text-white pb-10 sm:pb-20  font-bold"
        >
          About Us
        </Animate>
        <div className="max-w-4xl sm:pl-10 xl:pl-20">

          <Animate x="-100%" y="0" delay={0.9} index={1.4} duration={1}>

            <div
              className="text-white text-lg max-sm:text-center md:text-2xl tracking-wide mb-10 "
              dangerouslySetInnerHTML={{ __html: about_us[0].title }}
            />
          </Animate >
          <Animate x="-100%" y="0" delay={1.4} index={1.4} duration={1}>

            <div
              className="text-gray-100  text-[15px] lg:text-[17px] mb-6 max-sm:font-light"
              dangerouslySetInnerHTML={{ __html: about_us[0].description }}
            />
          </Animate>
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
