import Header from "@/components/Header";
import { InfiniteMovingCards } from "@/components/ui/InfiniteMovingCards";
import { icons } from "@/constants/icons";
import React from "react";

const Clients = async () => {
  // Mock clients data
  const clients = [
    {
      id: 1,
      url: "https://example.com/client1",
      title: "TechNova Solutions",
      image: icons.clients,
    },
    {
      id: 2,
      url: "https://example.com/client2",
      title: "Global Enterprises",
      image: icons.clients,
    },
    {
      id: 3,
      url: "https://example.com/client3",
      title: "FutureX",
      image: icons.clients,
    },
    {
      id: 4,
      url: "https://example.com/client4",
      title: "OptimaPath",
      image: icons.clients,
    },
    {
      id: 5,
      url: "https://example.com/client5",
      title: "Quantum Innovations",
      image: icons.clients,
    },
    {
      id: 6,
      url: "https://example.com/client6",
      title: "Vertex Systems",
      image: icons.clients,
    },
  ];

  return (
    <div className="rounded-md flex flex-col pb-10 antialiased bg-white dark:bg-darkMod-700 pt-10 dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <Header
        title="Our Clients"
        paragraph="Empowering businesses through trusted partnerships and innovative solutions."
      />
      <InfiniteMovingCards items={clients} direction="right" speed="fast" />
    </div>
  );
};

export default Clients;
