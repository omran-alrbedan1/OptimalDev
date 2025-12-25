import { Suspense } from "react";

import "@fontsource/poppins/300.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";

import Loader from "@/components/Loader";
import { Services, Partners, Slider, Clients } from "@/components/home";
import {
  fetchClients,
  fetchOrganization,
  fetchPartners,
  fetchSliders,
} from "@/lib/action";
import { cn } from "@/lib/utils";
import { zain } from "../layout";

const Page = async () => {
const [sliders, partners, clients, organization] = await Promise.all([
  fetchSliders(),
  fetchPartners(),
  fetchClients(),
  fetchOrganization(),
]);

  return (
    <Suspense fallback={<Loader />}>
      <div className="relative w-full duration-500">
        <Slider sliders={sliders} />
        {organization.home ? (
          <div
            dangerouslySetInnerHTML={{ __html: organization.home }}
            className={cn("text-[30px] container mx-auto", zain.className)}
          />
        ) : (
          <div />
        )}
        <Services />
        <Partners partners={partners} />

        <Clients clients={clients} />
      </div>
    </Suspense>
  );
};

export default Page;
