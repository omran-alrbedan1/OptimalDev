//@ts-nocheck

import React from "react";
import { Suspense } from "react";
import Loader from "@/components/Loader";
import Animate from "@/components/animation/Animate";
import { getTranslations } from "next-intl/server";
import { fetchOrganization } from "@/lib/action";

// Pre-render static parts
const sectionsData = (t: any, organization: any) => [
  {
    title: t("whoWeAre"),
    content: organization.about_us,
  },
  {
    title: t("ourVision"),
    content: organization.vision,
  },
  {
    title: t("ourMission"),
    content: organization.mission,
  },
  {
    title: t("ourValues"),
    content: organization.values,
  },
];

const AboutHeader = async ({ organization, t }: { organization: any, t: any }) => {
  return (
    <div
      className="h-[150px] md:h-[550px] flex items-center justify-center bg-no-repeat bg-center"
      style={{
        backgroundImage: `url(${organization.about_us_image})`,
        backgroundSize: "contain",
      }}
    >
      <h1 className="custom-title relative">{t("title")}</h1>
    </div>
  );
};

const AboutContent = async ({ organization, t }: { organization: any, t: any }) => {
  const sections = sectionsData(t, organization);
  
  return (
    <div className="max-w-[90rem] mx-auto space-y-8">
      {sections?.map((section, index) => (
        <div
          key={index}
          className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 sm:p-8"
        >
          <Animate
            x="0"
            y="20px"
            delay={0.2 + index * 0.2}
            duration={0.8}
          >
            <h2 className="text-primary-color1 text-xl sm:text-2xl md:text-3xl font-semibold mb-6 tracking-wide">
              {section.title}
            </h2>
          </Animate>

          <div className="space-y-4">
            <Animate
              key={index}
              x="0"
              y="20px"
              delay={0.4 + index * 0.2 * 0.1}
              duration={0.8}
            >
              <div
                className="text-gray-600 dark:text-gray-400 text-sm sm:text-base md:text-lg"
                dangerouslySetInnerHTML={{ __html: section.content }} 
              />
            </Animate>
          </div>
        </div>
      ))}
    </div>
  );
};

const AboutPage = async () => {
  const [t, organization] = await Promise.all([
    getTranslations("aboutSection"),
    fetchOrganization()
  ]);

  return (
    <main className="min-h-[100vh] overflow-y-auto relative">
      <Suspense fallback={<div className="h-[550px] bg-gray-100 animate-pulse" />}>
        <AboutHeader organization={organization} t={t} />
      </Suspense>

      <section className="container mx-auto px-4">
        <div className="relative w-full sm:pt-40 md:pt-20 pb-10 px-5 md:px-10 lg:px-20">
          <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-xl" />}>
            <AboutContent organization={organization} t={t} />
          </Suspense>
        </div>
      </section>
    </main>
  );
};

const AboutPageSkeleton = () => (
  <main className="min-h-[100vh]">
    <div className="h-[550px] bg-gray-200 animate-pulse" />
    <section className="container mx-auto px-4">
      <div className="space-y-8 pt-20">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-48 bg-gray-100 animate-pulse rounded-xl" />
        ))}
      </div>
    </section>
  </main>
);

export default function Page() {
  return (
    <Suspense fallback={<AboutPageSkeleton />}>
      <AboutPage />
    </Suspense>
  );
}