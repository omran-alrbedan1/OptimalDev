import ServiceCard from "@/components/cards/ServiceCard";
import Header from "@/components/Header";
import { ServiceProps } from "@/types";
import axios from "axios";
import Link from "next/link";


export default async function Services() {
  const response = await axios.get('https://main.hivetech.space/api/services', {
    headers: {
      "Content-Type": "application/json",
    }
  });
  const services =response.data.data.slice(0, 3);

  return (
    <section className=" flex flex-col items-center mt-20 bg-gray-50 py-10 px-3 sm:px-10 sm:mb-40">
  
      <Header title=" Our Services" paragragh=" We are ready to scale up your business with our great service."/>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {services.map((service: ServiceProps, index: number) => {
        

          return (
          <ServiceCard service={service} index={index} key={service.id} />
          );
        })}
      </div>
      <button
        type="button"
        className=" mt-10 sm:mt-16 w-40 h-14 rounded-[30px] text-primary-color1 
        border-primary-color1 border hover:bg-primary-color1
         hover:border-none font-semibold hover:opacity-75 hover:text-primary-color3
         transition-all duration-500"
      >
        <Link href={"/services"}>see more &gt;&gt;</Link>
      </button>
    </section>
  );
}
