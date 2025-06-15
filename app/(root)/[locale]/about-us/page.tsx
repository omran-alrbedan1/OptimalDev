// @ts-nocheck
import React from "react";
import { Suspense } from "react";
import Loader from "@/components/Loader";
import Animate from "@/components/animation/Animate";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";

const AboutPage = async () => {
  const t = await getTranslations("header");
  const sections = [
    {
      title: "Who We Are",
      content: [
        "A well-versed management consulting firm located in Amman, Jordan that provides solutions and services to companies on a national and international basis. The solutions and services we provide guarantee to improve the productivity of your business with its special designed techniques to serve a wide spectrum of business categories.",
        "We work with organizations to provide smart sourcing solutions and services where outsourcing of selected business requirements can result in financial and operational efficiencies for most business organizations.",
        "In our services we adopt excellence and pursue to provide value to all of our clients, whether it's a start-up business requiring assistance regarding marketing talent; or an established company not delivering on your brand's promise. We guarantee the solution for you.",
      ],
    },
    {
      title: "Our Vision",
      content: [
        "To be the most trusted and respected consulting services firm that is best recognized for leading our clients to success – Globally.",
      ],
    },
    {
      title: "Our Mission",
      content: [
        "OPTIMAL PATH aims to achieve its vision by helping our clients make solid and essential improvements in their performance, and to build a great business that entices, enhances, and retains exceptional people by providing the highest quality professional services.",
        "We handle business issues through our strong public relations and work with top executives to help them make better decisions, convert those decisions to actions, and deliver the success they desire.",
      ],
    },
    {
      title: "Our Values",
      content: [
        "We believe that our values define who we are as a company and how we treat our clients. Therefore, we have agreed to a set of essential values, which support how we work, and how we treat our clients.",
        <ul key="values" className="list-disc pl-6 space-y-2 mt-3">
          <li>Pursuit of excellence</li>
          <li>
            Professionalism: Commitment to success and quality client-specific
            needs delivery
          </li>
          <li>
            Innovation: Continuous development, new services, and creative
            solutions
          </li>
          <li>
            Responsibility, integrity, and ethical conduct in everything we do
          </li>
        </ul>,
      ],
    },
  ];

  return (
    <main className="min-h-[100vh] overflow-y-auto relative">
      <div className="about-us-bg h-[80vh] flex items-center justify-center">
        <h1 className="custom-title relative">{t("about")}</h1>
      </div>

      <section className="container mx-auto px-4">
        <div className="">
          <div className="relative w-full sm:pt-40 pb-10 px-5 md:px-10 lg:px-20">
            {/* Content Sections */}
            <div className="max-w-[90rem] mx-auto space-y-8">
              {sections.map((section, index) => (
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
                    {section.content.map((paragraph, pIndex) => (
                      <Animate
                        key={pIndex}
                        x="0"
                        y="20px"
                        delay={0.4 + index * 0.2 + pIndex * 0.1}
                        duration={0.8}
                        once={true}
                      >
                        <div className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                          {paragraph}
                        </div>
                      </Animate>
                    ))}
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
