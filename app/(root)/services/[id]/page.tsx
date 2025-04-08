import Loader from "@/components/Loader";
import axios from "axios";
import React, { Suspense } from "react";
import Image from "next/image";
import { IoLanguageSharp } from "react-icons/io5";
import { Button } from "@/components/ui/button"; 
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; 
import FormForRegisteration from "@/components/forms/FormForRegisteration"; 

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

  return (
    <div className="min-h-screen py-20 px-2 pt-36 md:pt-40 sm:px-8 lg:px-10">
      <div
        key={service.id}
        className="dark:bg-darkMod-100 border   border-gray-200 dark:border-gray-500 dark:shadow-darkMod-400 rounded-[8px] p-2 md:px-10 py-5 pt-10 shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
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
          <div className="flex flex-1 flex-col justify-center md:px-10">
            <div className="flex items-center">
              <p
                className="xs:text-[17px] text-center w-full text-gray-700 dark:text-gray-300 prose-strong:dark:text-white md:text-[18px] pb-10"
                style={{ lineHeight: 2 }}
                dangerouslySetInnerHTML={{
                  __html: service.description,
                }}
              />
            </div>
            <div className="flex flex-col items-center">
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
                </p>
              </div>
              
            
            </div>
          </div>
          <div className="flex h-[80%] flex-1">
            {service.image && (
              <div className="relative w-[90%] sm:w-[80%] xl:w-full h-full mx-auto aspect-[9/5] rounded-xl mb-3">
                <Image
                  src={`https://main.hivetech.space/storage/${service.image}`}
                  alt={service.title}
                  fill
                  className="aspect-[9/5] rounded-xl"
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center">

<Dialog >
  <DialogTrigger asChild>
    <Button className="mt-6 bg-primary-color1 hover:bg-primary-hover max-xs:w-[230px] max-xs:mt-8 w-[200px] h-[50px] rounded-[8px] text-lg tracking-wider ">
      Register Now
    </Button>
  </DialogTrigger>
  <DialogContent className="w-[97%] max-sm:my-12 sm:max-w-[700px] lg:max-w-[900px] max-h-[100vh]  overflow-y-auto thin-scrollbar rounded-[5px] sm:rounded-xl lg:rounded-xl">
  <style>
            {`
        .thin-scrollbar::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        .thin-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 2px;
        }
        .thin-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 2px;
        }
        .thin-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.4);
        }
        .thin-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.3) rgba(0, 0, 0, 0.1);
        }
      `}
          </style>
    <DialogHeader className="text-start">
      <DialogTitle  className="tracking-widest max-sm:tracking-wide  text-white" style={{lineHeight: "30px"}}>Register for {service.title}</DialogTitle>
    
    </DialogHeader>
    <div className="py-4 pt-6">
      <FormForRegisteration service_id={service.id} />
    </div>
  </DialogContent>
</Dialog>
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