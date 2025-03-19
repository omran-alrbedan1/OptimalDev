// import ServiceCard from '@/components/cards/ServiceCard';
// import Header from '@/components/Header';
// import Loader from '@/components/Loader';
// import { ServiceProps } from '@/types';
// import axios from 'axios';
// import React, { Suspense } from 'react'

// const ServicesPage = async () => {
//   await new Promise((resolve) => setTimeout(resolve, 1000))
//   const response = await axios.get("https://main.hivetech.space/api/services", {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   const services = response.data.data;

//   return (
//     <section className=" flex flex-col items-center mt-28 bg-gray-50 py-10 px-3 sm:px-10 sm:mb-40">
// <Header title='All Services' paragragh='this is all of our services'/>
// <div className="flex justify-center items-center gap-5">
//   <span></span>
// </div>

// <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
// {services.map((service: ServiceProps, index: number) => {
//    return (<ServiceCard key={service.id} service={service} index={index}/>)})}
//    </div>
//    </section>
//   )
// }

// export default function page() {
//   return (
//         <Suspense fallback={<Loader />}><ServicesPage /> </Suspense>
//   )
// }



// 'use client';

// import ServiceCard from '@/components/cards/ServiceCard';
// import Header from '@/components/Header';
// import Loader from '@/components/Loader';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import {  CategoryArray, CategoryProps, ServicesArray } from '@/types';

// export default function Page() {
//   // State for services and selected category
//   const [services, setServices] = useState<ServicesArray>([]);
//   const [selectedCategory, setSelectedCategory] = useState<string|null>();
//   const [categories, setCategories] = useState<CategoryArray>([]);
//   const [loading, setLoading] = useState(true);



//   // Fetch services on component mount
//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const response = await axios.get("https://main.hivetech.space/api/services", {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         setServices(response.data.data); 
//         const response2 = await axios.get("https://main.hivetech.space/api/category/with-services", {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         setCategories(response2.data.data); 
//       } catch (error) {
//         console.error("Error fetching services:", error);
//       } finally {
//         setLoading(false); // Stop loading after fetch
//       }
//     };

//     fetchServices();
//   }, []);

//   // Filter services based on the selected category
//   const filteredServices = selectedCategory
//     ? services.filter((service) => service.category.title === selectedCategory)
//     : services;

//   return (
//     <section className="min-h-screen">
//       {/* Header */}
//       <Header title="All Services" paragragh="This is all of our services" />

//       {/* Category Buttons */}
//       <div className="flex justify-center items-center gap-4 flex-wrap mb-8">
//         {categories.map((category: CategoryProps, index:number) => (
//           <button
//             key={index}
//             onClick={() => setSelectedCategory(category.title === 'All' ? null : category.title)}
//             className={`text-primary-color2 px-4 py-2 rounded-md text-lg font-medium transition-colors ${
//               selectedCategory === category.title || (!selectedCategory && category.title === 'All')
//                 ?'underline'
//                 : ''
//             }`}
//           >
//             {category.title}
//           </button>
//         ))}
//       </div>

//       {/* Loading State */}
//       {loading ? (
//         <Loader />
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
//           {filteredServices.length > 0 ? (
//             filteredServices.map((service, index) => (
//               <ServiceCard key={service.id} service={service} index={index} />
//             ))
//           ) : (
//             <p className="text-gray-700">No services found in this category.</p>
//           )}
//         </div>
//       )}
//     </section>
//   );
// }


import axios from "axios";

import {  ServiceProps } from "@/types";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import { Suspense } from "react";
import ServiceCard from "@/components/cards/ServiceCard";

const  ServicesPage = async () =>  {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const response = await axios.get("https://main.hivetech.space/api/services", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const services = response.data.data;
  return (

      <section className="container flex flex-col items-center  pt-40 px-5 mx-auto">
        <Header
          title="All Services"
          paragragh="this is the all of our Services"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-x-8 sm:gap-y-10 justify-items-center mx-auto mt-10 ">
          {services.map((service: ServiceProps, index: number) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </section>
   
  );
}

export default function page() {
  return (
        <Suspense fallback={<Loader />}><ServicesPage /> </Suspense>
  )
}