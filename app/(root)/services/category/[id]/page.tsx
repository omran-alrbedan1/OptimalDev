
import axios from "axios";
import { ServiceProps } from "@/types";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import { Suspense } from "react";
import ServiceCard from "@/components/cards/ServiceCard";

const ServicesPage = async ({id}: {id: number}) => {


  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await axios.get(`https://main.hivetech.space/api/services/category/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const services = response.data.data;

  return (
    <section className="container flex flex-col items-center pt-40 px-5 mx-auto">
      <Header
        title="All Services"
        paragragh="This is all of our Services"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-x-8 sm:gap-y-10 justify-items-center mx-auto mt-10">
        {services.map((service: ServiceProps, index: number) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>
    </section>
  );
};

export default async function Page({ params }: { params: { id: number } }) {
  const { id } = await params;
  return (
    <Suspense fallback={<Loader />}>
      <ServicesPage id={id} />
    </Suspense>
  );
}


