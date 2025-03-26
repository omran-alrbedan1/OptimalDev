import ServiceCard from "@/components/cards/ServiceCard";
import Header from "@/components/Header";
import { ServiceProps } from "@/types";
import axios from "axios";
import Link from "next/link";

export default async function Services() {
  const response = await axios.get("https://main.hivetech.space/api/services", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const services = response.data.data.slice(0, 5);

  return (
    <section className=" flex flex-col items-center py-10 bg-gray-50 dark:bg-darkMod-300 mt-0 mb-0  px-5 sm:px-10  overflow-hidden">
      <Header
        title=" Our Services"
        paragragh=" We are ready to scale up your business with our great service."
        className="mx-auto"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7 sm:gap-x-8 sm:gap-y-10 justify-items-center mx-auto mt-10 w-full">
        {services.map((service: ServiceProps, index: number) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>
      <button
        type="button"
        className=" mt-14 sm:mt-16 w-36 h-12 md:w-40 md:h-14 rounded-[30px] text-primary-color1 
        border-primary-color1 border hover:bg-primary-color1
         hover:border-none font-semibold hover:opacity-75 hover:text-darkMod-300
         transition-all duration-500"
      >
        <Link href={"/services"}>see more &gt;&gt;</Link>
      </button>
    </section>
  );
}
