// @ts-nocheck
import React from "react";
import { Suspense } from "react";
import Loader from "@/components/Loader";
import Animate from "@/components/animation/Animate";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import { fetchOrganization } from "@/lib/action";

const AboutPage = async () => {
  const t = await getTranslations("aboutSection");
  const organization = await fetchOrganization();
  console.log(organization);
  const sections = [
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

  return (
    <main className="min-h-[100vh] overflow-y-auto relative">
      <div className="about-us-bg h-[70vh] flex items-center justify-center">
        <h1 className="custom-title relative">{t("title")}</h1>
      </div>

      <section className="container mx-auto px-4">
        <div className="">
          <div className="relative w-full sm:pt-40 md:pt-20 pb-10 px-5 md:px-10 lg:px-20">
            {/* Content Sections */}
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
                    once={true}
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
                      once={true}
                    >
                      <div
                        className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: section.content }}
                      />
                    </Animate>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <AboutPage />
    </Suspense>
  );
}
