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

const Page = async () => {
  return (
    <Suspense fallback={<Loader />}>
      <div className="relative duration-500">
        <Slider />
        <Services />
        <Partners />
        <Clients />
      </div>
    </Suspense>
  );
};

export default Page;
