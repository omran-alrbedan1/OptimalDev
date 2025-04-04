import Loader from "@/components/Loader";
import axios from "axios";
import React, { Suspense } from "react";
import { Carousel } from "@/components/cards/Carousel";
import Image from "next/image";
import CategoryCard from "@/components/cards/CategoryCard";
import { Category } from "@/types";
import Animation from "@/components/animation/Animation";
import { IoLanguageSharp } from "react-icons/io5";

interface Props {
  params: {
    id: number;
  };
}

const ServicePage = async ({ id }: { id: number }) => {

  await new Promise((resolve) => setTimeout(resolve, 200));

  // Fetch project data
  const response = await axios.get(
    `https://main.hivetech.space/api/services/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const service = response.data.data;
  console.log(service);

  return (
    <div className="min-h-screen py-20 pt-36 md:pt-40  sm:px-8 lg:px-10">



      <div
        key={service.id}
        className="dark:bg-darkMod-100 border border-dotted  border-primary-color1 rounded-xl p-2 md:px-10 py-5 pt-10 shadow-lg overflow-hidden  hover:shadow-2xl transition-shadow duration-300"
      >
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-wider">
            {service.title}
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            {service.sub_title}
          </p>
        </div>
        <div className="flex flex-col-reverse xl:flex-row pt-10 gap-5">
          <div className="flex flex-1 flex-col  justify-center md:px-10">
            {" "}
            <div className="flex items-center">
              <p
                className="xs:text-[17px] text-center w-full  text-gray-700 dark:text-gray-300  prose-strong:dark:text-white  md:text-[18px]  pb-10 "
                style={{ lineHeight: 2 }}
                dangerouslySetInnerHTML={{
                  __html: service.description,
                }}
              />
            </div>{" "}
            <div className="flex flex-col items-center  ">
              <div
                className="xs:text-[17px] md:text-[18px] dark:text-gray-300 prose prose-strong:dark:text-white pb-4"
                dangerouslySetInnerHTML={{ __html: service.outlines }}
              />
              <div className="flex items-center justify-center gap-4">
                <span className="text-2xl text-primary-color1">
                  <IoLanguageSharp />
                </span>
                <p className="md:text-lg text-gray-600 dark:text-gray-400">
                  Language: {service.language}
                </p>{" "}
              </div>
            </div>
          </div>{" "}
          <div className="flex h-[80%] flex-1">
            {service.image && (
              // max-xs:h-56 relative drop-shadow-2xl rounded-xl
              <div className="relative w-[90%] sm:w-[80%] xl:w-full h-full mx-auto aspect-[9/5] rounded-xl mb-3">
                <Image
                  src={`https://main.hivetech.space/storage/${service.image}`}
                  alt={service.title}
                  fill
                  className=" aspect-[9/5] rounded-xl"
                // object-contain rounded-xl h-full w-full
                />
              </div>
            )}
          </div>
        </div>
      </div>

    </div>

  );
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  return (
    <Suspense fallback={<Loader />}>
      <ServicePage id={id} />
    </Suspense>
  );
}
