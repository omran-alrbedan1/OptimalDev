import React from "react";
import axios from "axios";
import { Suspense } from "react";
import { FaPhone } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import Loader from "@/components/Loader";
import ContactForm from "@/components/forms/ContactForm";
import { ContactUsProps } from "@/types";
import FormForRegisteration from "@/components/forms/FormForRegisteration";

const DiscussProject =  () => {
  

  return (
    
    <div className="min-h-[100vh] overflow-y-auto relative">
      {/* Background Overlay */}
      <img
        src="/images/discuss.jpeg"
        alt="building"
        className="absolute w-full h-full object-cover "
      />
      <div className="absolute w-full h-full bg-darkMod-700 opacity-70" />

      <div className="relative w-full h-full z-10 max-md:pt-28 md:pt-32 flex justify-center items-center flex-col pb-10">
        <div className="flex flex-col items-center justify-center text-center p-6 md:mb-10">
          <h1
            className="text-3xl sm:text-3xl md:text-5xl text-white mb-6 font-bold tracking-widest"
          >
            Lets Discuss
          </h1>
          <p className="text-gray-300 text-[16px] sm:text-[17px] tracking-wider">Please fill out the form below to discuss your project and we'll get back to you in less than 24 hours.</p>

         
        </div>


   
         
          <div className="w-full max-w-6xl overflow-hidden pt-10 md:px-5">
            <FormForRegisteration containerStyle="max-xs:px-6 px-10 xl:pt-10"/>
    
        </div>
      </div>
    </div>

  );
};

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <DiscussProject />
    </Suspense>
  );
}
