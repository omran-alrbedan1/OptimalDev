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



'use client';

import ServiceCard from '@/components/cards/ServiceCard';
import Header from '@/components/Header';
import Loader from '@/components/Loader';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ServiceProps, ServicesArray } from '@/types';

export default function Page() {
  // State for services and selected category
  const [services, setServices] = useState<ServicesArray>([]);
  const [selectedCategory, setSelectedCategory] = useState<string|null>();
  const [loading, setLoading] = useState(true);

  // Define categories (you can fetch these dynamically if needed)
  const categories = ['All', 'Web Development', 'Mobile Development', 'Training', 'Marketing'];

  // Fetch services on component mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("https://main.hivetech.space/api/services", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setServices(response.data.data); // Assuming the API returns { data: [...] }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false); // Stop loading after fetch
      }
    };

    fetchServices();
  }, []);

  // Filter services based on the selected category
  const filteredServices = selectedCategory
    ? services.filter((service) => service.category.title === selectedCategory)
    : services;

  return (
    <section className="flex flex-col items-center mt-28 bg-gray-50 py-10 px-3 sm:px-10 sm:mb-40">
      {/* Header */}
      <Header title="All Services" paragragh="This is all of our services" />

      {/* Category Buttons */}
      <div className="flex justify-center items-center gap-4 flex-wrap mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category === 'All' ? null : category)}
            className={`text-primary-color2 px-4 py-2 rounded-md text-lg font-medium transition-colors ${
              selectedCategory === category || (!selectedCategory && category === 'All')
                ?'underline'
                : ''
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {filteredServices.length > 0 ? (
            filteredServices.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))
          ) : (
            <p className="text-gray-700">No services found in this category.</p>
          )}
        </div>
      )}
    </section>
  );
}