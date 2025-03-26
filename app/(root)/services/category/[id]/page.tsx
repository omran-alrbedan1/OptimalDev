// import axios from "axios";
// import { ServiceProps } from "@/types";

// import Loader from "@/components/Loader";
// import { Suspense } from "react";
// import Image from "next/image";
// import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
// import { BiError } from "react-icons/bi";

// const CategoryDetails = async ({ id }: { id: number }) => {
//   // Simulate loading (optional)
//   await new Promise((resolve) => setTimeout(resolve, 1000));

//   // Fetch services data
//   const response = await axios.get(
//     `https://main.hivetech.space/api/services/category/${id}`,
//     {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   // Fetch category data
//   const response2 = await axios.get(
//     `https://main.hivetech.space/api/category/${id}`,
//     {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   const services = response.data.data;
//   const category = response2.data.data;
//   console.log(services);

//   return (
//     <div className="min-h-screen py-20">
//       <div className="relative h-[60vh] md:h-[70vh] w-full">
//         <img
//           src={category.image}
//           alt="backgroundImage"
//           className="absolute w-full h-full object-cover md:object-fill "
//         />
//         <div className="absolute w-full h-full bg-primary-color2 opacity-70" />
//         <div className="relative top-20 sm:top-40 w-full h-full flex flex-col items-center justify-start px-5">
//           <h1 className="text-4xl md:text-5xl text-white font-bold mb-4 tracking-widest">
//             {category.title}
//           </h1>
//           <p className="text:lg md:text-xl text-gray-300 max-w-2xl text-center">
//             {category.description}
//           </p>
//         </div>
//         <div className="w-full flex items-center justify-center absolute bottom-10 text-white font-semibold text-xl sm:text-2xl md:text-3xl tracking-wider">
//           <h3>The related services {"   "} </h3>
//           <span className="mt-4">
//             <MdOutlineKeyboardDoubleArrowDown className="text-primary-color1 text-5xl ml-2 sm:ml-5 animate-bounce" />
//           </span>
//         </div>
//       </div>

//       {services.length > 0 ? (
//         <div className=" mx-auto px-1 md:px-8 mt-20">
//           <div className="grid grid-cols-1 gap-8">
//             {services.map((service: ServiceProps) => (
//               <div
//                 key={service.id}
//                 className="dark:bg-darkMod-100 border border-dotted  border-primary-color1 rounded-xl p-2 py-5 pt-10 shadow-lg overflow-hidden  hover:shadow-2xl transition-shadow duration-300"
//               >
//                 <div className="text-center">
//                   <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-wider">
//                     {service.title}
//                   </h3>
//                   <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
//                     {service.sub_title}
//                   </p>
//                 </div>

//                 <div className="flex flex-col-reverse xl:flex-row justify-center md:px-10">
//                   {" "}
//                  <div className="flex w-1/2 items-center max-xl:w-full">
//                   <p
//                     className="xs:text-[17px] text-center w-full  text-gray-700 dark:text-gray-300  prose-strong:dark:text-white  md:text-[18px]  py-10  md:px-10 lg:px-20"
//                     style={{ lineHeight: 2 }}
//                     dangerouslySetInnerHTML={{ __html: service.description }}
//                   />
//                 </div>
//                   {service.image && (
//                     // max-xs:h-56 relative drop-shadow-2xl rounded-xl
//                     <div className="w-[40%] relative max-xl:w-[90%] mx-auto aspect-[9/5] rounded-xl mb-3">
//                       <Image
//                         src={`https://main.hivetech.space/storage/${service.image}`}
//                         alt={service.title}
//                         fill
//                         className="object-fill aspect-[9/5] rounded-xl"
//                         // object-contain rounded-xl h-full w-full
//                       />
//                     </div>
//                   )}
//                 </div>
//                 <div className=" flex flex-col  ">
//                     <div
//                       className="xs:text-[17px] md:text-[18px] dark:text-gray-300 prose prose-strong:dark:text-white pb-4"
//                       dangerouslySetInnerHTML={{ __html: service.outlines }}
//                     />
//                     <p className="float-left sm:text-md text-gray-500">
//                       Language: {service.language}
//                     </p>{" "}
//                   </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <div className="flex justify-center items-center h-[30vh]">
//           <h1 className="text-4xl text-gray-600 font-bold">
//             No services Found for this Category
//           </h1>

//           <span>
//             <BiError className="ml-5 text-red-500 text-6xl" />
//           </span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default async function Page({ params }: { params: { id: number } }) {
//   const { id } = await params;
//   return (
//     <Suspense fallback={<Loader />}>
//       <CategoryDetails id={id} />
//     </Suspense>
//   );
// }

import { IoLanguageSharp } from "react-icons/io5";

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
  console.log(services);

  return (
    <div className="min-h-screen py-20">
      <div className="relative h-[60vh] md:h-[70vh] w-full">
        <img
          src={category.image}
          alt="backgroundImage"
          className="absolute w-full h-full object-cover md:object-fill "
        />
        <div className="absolute w-full h-full bg-primary-color2 opacity-70" />
        <div className="relative top-20 sm:top-40 w-full h-full flex flex-col items-center justify-start px-5">
          <h1 className="text-3xl sm:text-4xl  text-center lg:text-5xl text-white font-bold mb-4 tracking-widest">
            {category.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl text-center">
            {category.description}
          </p>
        </div>
        <div className="w-full flex items-center justify-center absolute bottom-10 text-white font-semibold text-xl sm:text-2xl md:text-3xl tracking-wider">
          <h3>The related services {"   "} </h3>
          <span className="mt-4">
            <MdOutlineKeyboardDoubleArrowDown className="text-primary-color1 text-5xl ml-2 sm:ml-5 animate-bounce" />
          </span>
        </div>
      </div>

      {services.length > 0 ? (
        <div className=" mx-auto px-1 md:px-8 mt-20">
          <div className="grid grid-cols-1 gap-8">
            {services.map((service: ServiceProps) => (
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
            ))}
          </div>
        </div>
      ) : (
        <div className="flex max-xs:flex-col max-xs:gap-5 justify-center items-center  h-[30vh]">
          <h1 className="text-2xl md:text-4xl text-center text-gray-600 font-bold">
            No services Found for this Category
          </h1>

          <span>
            <BiError className="xs:ml-5 text-red-500 text-4xl md:text-5xl" />
          </span>
        </div>
      )}
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
