

import axios from "axios";

import {  ServiceProps } from "@/types";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import { Suspense } from "react";
import ServiceCard from "@/components/cards/ServiceCard";

const  ServicesPage = async () =>  {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const response = await axios.get("https://main.hivetech.space/api/services", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const services = response.data.data;
  return (

      <section className="w-[99%] flex flex-col items-center pt-32   md:pt-40 xl:px-24 mx-auto overflow-hidden">
        <Header title="Services"/>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7 sm:gap-x-8 sm:gap-y-10 justify-items-center mx-auto mt-10">
          {services.map((service: ServiceProps, index: number) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </section>
   
  );
}

export default function page() {
  return (
        <Suspense fallback={<Loader />}><ServicesPage /> </Suspense>
  )
}