import React, { Suspense } from "react";

import "@fontsource/poppins/300.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";

import Clients from "@/app/parts/Clients";
import Sliders from "@/app/parts/Sliders";
import Loader from "@/components/Loader";
import { Section, Services, Partners } from "@/components/home";

const Page = async () => {
  return (
    <Suspense fallback={<Loader />}>
      <div className="relative duration-500">
        <Sliders />
        <Services />
        <Partners />
        <Clients />
      </div>
    </Suspense>
  );
};

export default Page;
