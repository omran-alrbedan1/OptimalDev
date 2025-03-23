
import axios from "axios";
import { ServiceProps } from "@/types";

import Loader from "@/components/Loader";
import { Suspense } from "react";
import Image from "next/image";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { BiError } from "react-icons/bi";

const CategoryDetails = async ({ id }: { id: number }) => {
  // Simulate loading (optional)
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Fetch services data
  const response = await axios.get(
    `https://main.hivetech.space/api/services/category/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  // Fetch category data
  const response2 = await axios.get(
    `https://main.hivetech.space/api/category/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const services = response.data.data;
  const category = response2.data.data;

  return (
    <div className="min-h-screen py-20">
      <div className=" relative h-[60vh] md:h-[70vh] w-full">

        <img src={category.image} alt="backgroundImage" className="absolute w-full h-full object-contain md:object-fill "/>
        <div className="absolute w-full h-full bg-primary-color2 opacity-70"/>
        <div className="absolute w-full h-full flex flex-col items-center justify-center px-5">
          <h1 className="text-4xl md:text-5xl text-white font-bold mb-4 tracking-widest">
            {category.title}
          </h1>
          <p className="text:lg md:text-xl text-gray-300 max-w-2xl text-center">
            {category.description}
          </p>
          <div className="flex items-center absolute bottom-10 text-white font-semibold text-2xl md:text-3xl tracking-wider">
            <h3>The related services {"   "} </h3>
            <span><MdOutlineKeyboardDoubleArrowDown className="text-primary-color1 text-5xl ml-5 animate-bounce"/>
            </span>
          </div>
        </div>
      </div>

      {/* Services Section */}
   { services.length > 0?  <div className=" mx-auto px-1 md:px-8 mt-20">
     
        <div className="grid grid-cols-1 gap-8">
          {services.map((service: ServiceProps) => (
            <div
              key={service.id}
              className="bg-white border-2 border-dashed border-primary-color1 rounded-lg p-2 py-5 pt-10 shadow-lg overflow-hidden  hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-wider">
                  {service.title}
                </h3>
                <p className="text-lg text-gray-500 mb-4">
                  {service.sub_title}
                </p>
              </div>

              <div
                className="xs:text-[17px] w-full text-gray-700  md:text-[18px]  py-10 text-center md:px-10 lg:px-20"
                style={{lineHeight: 2}}
                dangerouslySetInnerHTML={{ __html: service.description }}
              />
              <div className="flex flex-col-reverse xl:flex-row justify-center md:px-10">
                {" "}
                <div className=" flex flex-col flex-1 basis-[18%] items-center ">
                  <div
                    className="xs:text-[17px] md:text-[18px] prose pb-4"
                    dangerouslySetInnerHTML={{ __html: service.outlines }}
                  />
                  <p className="float-left sm:text-md text-gray-500">
                    Language: {service.language}
                  </p>{" "}
                </div>
                {service.image && (
                  // max-xs:h-56 relative drop-shadow-2xl rounded-xl
                  <div className="flex-1 relative basis[400px] max-xl:w-[90%] mx-auto aspect-[9/5] rounded-xl mb-3"
                  >
                    <Image
                      src={`https://main.hivetech.space/storage/${service.image}`}
                      alt={service.title}
                      fill
                      className="object-fill aspect-[9/5] rounded-xl"
                      // object-contain rounded-xl h-full w-full
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>: 
      
          <div className="flex justify-center items-center h-[30vh]">
            <h1 className="text-4xl text-gray-600 font-bold">No services Found for this Category</h1>
     
            <span><BiError className="ml-5 text-red-500 text-6xl"/>
            </span>
          </div>
      }
    </div>
  );
};

export default async function Page({ params }: { params: { id: number } }) {
  const { id } = await params;
  return (
    <Suspense fallback={<Loader />}>
      <CategoryDetails id={id} />
    </Suspense>
  );
}
