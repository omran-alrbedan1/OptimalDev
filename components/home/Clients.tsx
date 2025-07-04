import Header from "@/components/Header";
import { InfiniteMovingCards } from "@/components/ui/InfiniteMovingCards";
import { icons } from "@/constants/icons";
import { getTranslations } from "next-intl/server";
import React from "react";

const Clients = async ({ clients }: { clients: Client[] }) => {
  const t = await getTranslations("ourClients");

  return (
    <div className="rounded-md flex flex-col pb-10 antialiased bg-white dark:bg-darkMod-700  dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden -mt-12">
      <Header title={t("title")} paragraph={t("paragraph")} />
      <InfiniteMovingCards items={clients} direction="right" speed="fast" />
    </div>
  );
};

export default Clients;
