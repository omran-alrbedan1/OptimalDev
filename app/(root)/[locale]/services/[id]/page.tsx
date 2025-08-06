"use client";
import Loader from "@/components/Loader";
import { images } from "@/constants/images";
import { useFetchWithId } from "@/hooks/useFetch";
import { fetchSubService } from "@/lib/client-action";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

const ServiceDetailsPage = () => {
  const { id } = useParams();
  const t = useTranslations("serviceDetails");

  const { data: service, isLoading } = useFetchWithId<SubService>(
    fetchSubService,
    Number(id)
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Floating geometric shapes - Reduced on mobile */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="hidden sm:block absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-xl animate-float"></div>
        <div className="hidden sm:block absolute top-40 right-20 w-24 h-24 bg-primary/10 rounded-full blur-lg animate-float-delayed"></div>
        <div className="hidden sm:block absolute bottom-40 left-1/4 w-40 h-40 bg-primary/5 rounded-full blur-2xl animate-float-slow"></div>
        <div className="hidden sm:block absolute bottom-20 right-1/3 w-28 h-28 bg-primary/8 rounded-full blur-xl animate-float"></div>
      </div>

      {/* Modern Header Section - Adjusted for mobile */}
      <div className="relative pt-16 sm:pt-24 pb-12 sm:pb-16 overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-4 sm:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-primary dark:from-white dark:via-primary-light dark:to-white">
                {service?.name}
              </span>
            </h1>

            {/* Animated underline */}
            <div className="flex justify-center">
              <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Adjusted grid for mobile */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16">
          {/* Image Section - Full width on mobile, 7 columns on desktop */}
          <div className="w-full lg:col-span-7">
            <div className="group relative">
              <div className="relative bg-white dark:bg-slate-800 p-2 sm:p-3 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl shadow-primary/10 group-hover:shadow-primary/20 transition-all duration-500">
                <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden rounded-xl sm:rounded-2xl">
                  <Image
                    src={service?.image!}
                    alt={service?.name || t("imageAlt")}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
                  />

                  {/* Image overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section - Full width on mobile, 5 columns on desktop */}
          <div className="w-full lg:col-span-5 flex flex-col justify-start mt-0 sm:mt-8">
            <div className="space-y-6 px-4 sm:space-y-8">
              {/* Header with icon - Adjusted for mobile */}
              <div className="space-y-3 sm:space-y-4 -ml-4 sm:-ml-8">
                <div className="flex gap-3 sm:gap-4 items-center">
                  <div className="relative">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-primary to-primary/80 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <div className="absolute -inset-1 sm:-inset-2 bg-primary/20 rounded-xl sm:rounded-2xl blur animate-pulse"></div>
                  </div>

                  <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                      {t("overview.title")}
                    </h2>
                    <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary to-primary/50 mt-1 sm:mt-2 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Description - Adjusted padding for mobile */}
              <div className="relative">
                <div className="absolute -left-4 sm:-left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/50 to-transparent rounded-full"></div>
                <div className="pl-5 sm:pl-8">
                  <p className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-light whitespace-pre-line">
                    {service?.description}
                  </p>
                </div>
              </div>

              {/* CTA Button - Full width on mobile */}
              <div className="pt-4 sm:pt-6">
                <Link
                  href={`/services/${id}/request-service`}
                  className="group relative inline-flex w-full items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold text-white bg-primary hover:bg-primary/90 rounded-xl sm:rounded-2xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  {/* Button shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                  <span className="relative flex items-center gap-2 sm:gap-3">
                    {t("cta.requestService")}
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsPage;
