"use client";
import Loader from "@/components/Loader";
import { useFetchWithId } from "@/hooks/useFetch";
import { fetchSubService } from "@/lib/client-action";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState, useRef, useEffect } from "react";

const ServiceDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const t = useTranslations("serviceDetails");
  const contentRef = useRef<HTMLDivElement>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  const { data: service, isLoading } = useFetchWithId<SubService>(
    fetchSubService,
    Number(id)
  );

  // Handle navigation manually for faster response
  const handleRequestServiceClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsNavigating(true);
    router.push(`/services/${id}/request-service`);
  };



  if (isLoading || isNavigating) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen overflow-hidden">
      <section className="relative h-screen flex flex-col justify-center overflow-hidden">
        {/* Image container with priority loading */}
        <div className="absolute inset-0 z-0">
          {service?.image && (
            <div className="w-full h-full relative">
              <Image
                src={service.image}
                alt={service.name || "Service"}
                fill
                className="object-cover"
                priority
                loading="eager"
                sizes="100vw"
                quality={75}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjIyIi8+PC9zdmc+"
              />
            </div>
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
              {t("subtitle")}
            </p>

            {/* CTA Buttons - Using onClick instead of Link for immediate response */}
            <div className="flex flex-wrap gap-4 mt-10">
              <button
                onClick={handleRequestServiceClick}
                disabled={isNavigating}
                className="px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-primary/30 hover:shadow-primary/50 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isNavigating ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    {t("cta.loading")}
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  document
                    .getElementById("content-section")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all duration-300 backdrop-blur-sm flex items-center gap-2"
              >
                {t("learnMore")}
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

      {/* Content Section */}
      <section className="relative mx-14" ref={contentRef} id="content-section">
        <div dangerouslySetInnerHTML={{ __html: service?.description || "" }} />
      </section>

      {/* Bottom CTA Button - Also use onClick */}
      <div className="px-4 flex justify-center pb-14 -mt-14">
        <button
          onClick={handleRequestServiceClick}
          disabled={isNavigating}
          className="group relative inline-flex w-fit items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-primary hover:bg-primary/90 rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transform hover:-translate-y-1 transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {/* Button shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

          <span className="relative flex items-center gap-3">
            {isNavigating ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {t("cta.loading")}
              </>
            ) : (
              <>
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
              </>
            )}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ServiceDetailsPage;