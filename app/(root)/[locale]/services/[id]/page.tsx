"use client";
import Loader from "@/components/Loader";
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

  console.log(service?.image);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col items-center justify-center py-20 px-4">
      {/* Image at the top */}
      <div className=" rounded-2xl overflow-hidden  dark:border-slate-700 mb-8">
        <Image
          src={service?.image!}
          alt={service?.name || t("imageAlt")}
          width={1200}
          height={600}
          className="w-full h-auto object-contain"
          priority
        />
      </div>

      {/* Title under image */}
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6 text-center">
        {service?.name}
      </h1>

      {/* Description */}
      <div className="mx-20  text-slate-700 dark:text-slate-300 mb-10">
        <div dangerouslySetInnerHTML={{ __html: service?.description || "" }} />
      </div>

      {/* Request Button */}
      <Link
        href={`/services/${id}/request-service`}
        className="px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition"
      >
        {t("cta.requestService")}
      </Link>
    </div>
  );
};

export default ServiceDetailsPage;
