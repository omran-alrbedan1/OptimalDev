import About from "@/app/parts/portfolio/About";
import Hero from "@/app/parts/portfolio/Hero";
import Works from "@/app/parts/portfolio/Works";
import Loader from "@/components/Loader";
import axios from "axios";
import React, { Suspense } from "react";

interface Props {
  params: {
    id: number;
  };
}

const PortfolioPage = async ({ id }: { id: number }) => {
  await new Promise((resolve) => setTimeout(resolve, 200));

  // Fetch project data
  const response = await axios.get(
    `https://main.hivetech.space/api/teams/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const portfolio = response.data.data;
  console.log(portfolio);

  return (
    <div className="relative z-0">
      <div className="bg-hero-patternn bg-cover bg-no-repeat bg-center">
        <Hero
          whatsapp={portfolio.whatsapp}
          email={portfolio.email}
          github={portfolio.github}
          instagram={portfolio.instagram}
          facebook={portfolio.facebook}
          phone={portfolio.phone}
          linkedin={portfolio.linkedin}
          name={portfolio.name}
          bio={portfolio.bio}
          image={portfolio.image}
          position={portfolio.position}
        />
      </div>
      <About content={portfolio.content} categories={portfolio.categories} />
      <Works projects={portfolio.projects} />
    </div>
  );
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  return (
    <Suspense fallback={<Loader />}>
      <PortfolioPage id={id} />
    </Suspense>
  );
}
