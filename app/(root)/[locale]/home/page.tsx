import React, { Suspense } from "react";

import "@fontsource/poppins/300.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";

import Loader from "@/components/Loader";
import {
  Section,
  Services,
  Partners,
  Slider,
  Clients,
} from "@/components/home";
import {
  fetchClients,
  fetchJobs,
  fetchPartners,
  fetchSliders,
} from "@/lib/action";

const Page = async () => {
  const sliders = await fetchSliders();
  const partners = await fetchPartners();
  const clients = await fetchClients();

  return (
    <Suspense fallback={<Loader />}>
      <div className="relative duration-500">
        <Slider sliders={sliders} />
        <Services />
        <Partners partners={partners} />
        <Clients clients={clients} />
      </div>
    </Suspense>
  );
};

export default Page;
