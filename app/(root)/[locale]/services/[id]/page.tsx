"use client";
import Loader from "@/components/Loader";
import { useFetchWithId } from "@/hooks/useFetch";
import { fetchSubService } from "@/lib/client-action";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState, useRef } from "react";

const ServiceDetailsPage = () => {
  const { id } = useParams();
  const t = useTranslations("serviceDetails");
  const contentRef = useRef<HTMLDivElement>(null);

  const { data: service, isLoading } = useFetchWithId<SubService>(
    fetchSubService,
    Number(id)
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen overflow-hidden">
      <section className="relative h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {service?.image && (
            <Image
              src={service.image}
              alt={service.name || "Service"}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-white mt-16">
          <div className="max-w-2xl">
            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {service?.name}
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-200 mb-8 max-w-lg leading-relaxed">
              Transform your vision into reality with cutting-edge solutions
              tailored for your success.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mt-10">
              <Link
                href={`/services/${id}/request-service`}
                className="px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-primary/30 hover:shadow-primary/50 flex items-center gap-2"
              >
                {t("cta.requestService")}
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>

              <button
                onClick={() => {
                  document
                    .getElementById("content-section")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all duration-300 backdrop-blur-sm flex items-center gap-2"
              >
                Learn More
                <svg
                  className="w-5 h-5 animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of your content sections remain the same */}
      <section className="relative mx-14" ref={contentRef} id="content-section">
        <div dangerouslySetInnerHTML={{ __html: service?.description || "" }} />
      </section>

      <div className="px-4 flex justify-center pb-14 -mt-14">
        <Link
          href={`/services/${id}/request-service`}
          className="group relative inline-flex w-fit items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-primary hover:bg-primary/90 rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        >
          {/* Button shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

          <span className="relative flex items-center gap-3">
            {t("cta.requestService")}
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default ServiceDetailsPage;
