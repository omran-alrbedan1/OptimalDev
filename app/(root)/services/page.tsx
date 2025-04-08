import axios from "axios";

import { ServiceProps } from "@/types";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import AnimateCard from "@/components/animation/AnimateCard";

const ServicesPage = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const response = await axios.get("https://main.hivetech.space/api/services", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const services = response.data.data;
  return (
    <section className="w-[99%]  pt-32 px-8 md:px-12 md:pt-40 xl:px-24 mx-auto overflow-hidden">
      <Header title="Services" />
      <div className="flex justify-evenly items-center flex-wrap mx-auto gap-10">
        {services.map((service: ServiceProps, index: number) =>{
        

        return  (
          <div
            className=" flex flex-grow basis-[400px] max-w-[400px] aspect-[10/8]  flex-col"
            key={service.id}
          >
            <AnimateCard
              index={index}
              animationVertix="y"
              className=" flex flex-col max-h-full overflow-hidden bg-white-100 dark:bg-darkMod-600  rounded-xl"
            >
              <Link href={`/services/${service.id}`} className=" w-full  ">
                <Image
                  src={ `https://main.hivetech.space/storage/${service.image}`}
                  width={400}
                  height={400}
                  alt={`Image ${service.id}`}
                  className=" w-full aspect-[10/7] object-cover rounded-b-[5px] rounded-t-xl"
                />
              </Link>
              <p className="w-full py-1 aspect-[10/2] flex items-center justify-center px-2 text-center text-lg font-semibold sm:text-xl overflow-auto">
                {service.title}
              </p>
            </AnimateCard>
          </div>
        )})}
      </div>
    </section>
  );
};

export default function page() {
  return (
    <Suspense fallback={<Loader />}>
      <ServicesPage />{" "}
    </Suspense>
  );
}
