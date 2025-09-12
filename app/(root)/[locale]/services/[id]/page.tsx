"use client";
import Loader from "@/components/Loader";
import { images } from "@/constants/images";
import { useFetchWithId } from "@/hooks/useFetch";
import { fetchSubService } from "@/lib/client-action";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState, useEffect, useRef } from "react";

const ServiceDetailsPage = () => {
  const { id } = useParams();
  const t = useTranslations("serviceDetails");
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const { data: service, isLoading } = useFetchWithId<SubService>(
    fetchSubService,
    Number(id)
  );

  // Split description into meaningful sections
  const [sections, setSections] = useState<string[]>([]);

  useEffect(() => {
    if (service?.description) {
      const desc = service.description;
      // Split by paragraphs and filter empty ones
      const paragraphs = desc
        .split("</p>")
        .filter((p) => p.trim())
        .map((p) => p + "</p>");

      // Group paragraphs into sections (2-3 paragraphs each)
      const sectionGroups = [];
      for (let i = 0; i < paragraphs.length; i += 2) {
        sectionGroups.push(paragraphs.slice(i, i + 2).join(""));
      }

      setSections(sectionGroups);
    }
  }, [service]);

  // Handle scroll for progress bar
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const scrollTop = window.scrollY;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        setScrollProgress(Math.min(progress, 100));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Array of service images to use in the alternating sections
  const serviceImages = [
    images.service1,
    images.service2,
    images.service3,
    images.service4,
  ];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Improved Hero Section */}
      <section className="relative h-screen flex flex-col justify-center overflow-hidden">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 z-0">
          {service?.image && (
            <Image
              src={service.image}
              alt={service.name || "Service"}
              fill
              className="object-cover"
              priority
              onLoad={() => setIsImageLoaded(true)}
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
      <section
        className="relative -my-44"
        ref={contentRef}
        id="content-section"
      >
        {sections.map((section, index) => (
          <div
            key={index}
            className={`min-h-screen flex items-center -my-44 transition-all duration-1000 py-20 `}
          >
            <div className="max-w-7xl mx-auto px-8 lg:px-16 w-full">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Text Content */}
                <div className={`${index % 2 === 0 ? "order-1" : "order-2"}`}>
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {index + 1}
                        </span>
                      </div>
                      <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
                    </div>

                    <div
                      className=" leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: section }}
                    />
                  </div>
                </div>

                {/* Image Element - Replacing the content card */}
                <div className={`${index % 2 === 0 ? "order-2" : "order-1"}`}>
                  <div className="relative group">
                    {/* Image Container */}
                    <div className="relative h-80 lg:h-96 w-full overflow-hidden rounded-3xl">
                      <Image
                        src={serviceImages[index % serviceImages.length]}
                        alt={`Service feature ${index + 1}`}
                        height={440}
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <div className="px-4 flex justify-center py-14">
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
