// "use client";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import { IoIosArrowBack } from "react-icons/io";
// import { IoIosArrowForward } from "react-icons/io";

// // Import Swiper components and styles
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// export default function Experience() {
//   const [categories, setCategories] = useState([]);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [activeGroupIndex, setActiveGroupIndex] = useState(0);
//   const images = [
//     "https://img.freepik.com/premium-vector/man-with-beard-is-standing-front-phone-that-says-ui_118167-3679.jpg?ga=GA1.1.1987066759.1737515883&semt=ais_authors_boost",
//     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAABjFBMVEX///+r5f/h9P1JyM0ARoG86P/6nGMAWIAAT3/zWlcAT3qbs8YAVn8QYovp/P8AQX4AQIBRdp3K2OIARHSPwdsDM3IAKU2lrrk5xcrO7vhgz9TD8P81aJf5l1gZN1X6k1L66t3/j1NAgauf4v+Y2/+n4eno7fb749js3thnjahYgqgLT3T/x8PxmA3M7/90tgb/iEWz7P8sX5Hy+v796+lqocDyTkvYmaD928pFoMrJxdP/3NQBgcnzZmGE2f9NyNR3vdv0h4T1dXDxREEAK28AJGz1k5HzX1Vdq88ycpwAWJiVzem33ez8sq72oZzzfnj70dDL9//wNzSF2OY1Y5VGvse3ssLpwMTVvMWGqMO9oq+MgJmdjqKY3eNkeptZZIsACmAAbrFfzuO6xnquv1io19cxTH1puL+hj5p7rbOZuEHdaWubmJ2FsgCXtyXA0qDAzpGxi4+l08TigIN7TnRjVH3Nytn4v578qoRVa4T2kHT6cjvxV0ADc7F1gJMAG0ajh2a/rJvHrIvut45ESSdpAAAKRklEQVR4nO2di1/b1hWAZWETVAImCSYykJTMELZUdXFkKyRGwy8cF9uYlpZHHkz0QdM1XbdlK0uXLtv6j++eq4ete69kOykWvr7fD/gZ2yi6X845Orq6tiVJIBAIBAKBQCAQCAQCgUAgEAjOC10G9LB3YxiQYxGbtPAVjBzpJB327lxoYqmIFxFcvkRohC0fYgxZkbB36oKSZrmKxMLerYuFnI6lUaegM11FUnLY+3eB0CNWUZcX2LJEIraRyeMfjQgth66qRLflwi7qZNkSzTymF1civGx6liXaU792Qdgi0Zktuy8j3Z72FVbACNetnl2lUvAFhL3L4dFV0vJyJIW+cYcPwpZTsj6idcu/w8ogUqkMgwVpWoKvkcM/onIfLxLcJbhyNFoRJvupSi1emyCZcYjbJOJXWRutoe/Z5IBHMgD8sjD1Me3q7rYrK2oTjybp82u5gH5cLQx2IIOA2WKhal6nXU1sbMRJWdHEpESlYgEHVY2/FGXJQoe8TI4ha8KNLNdVNH4HbSTdGV26fF8H6nXubNGylvGRkClrhiHrCmylU8tso1EAGvzZomoWdkXLiiYcPFloy0J1yg2urGmaJRNohjWo84I4GjrzpXRkXUPQgeXK6ggupVTd2WkVd8paOEM6Rxhh1TUNWbKQd9tXy2wVi6VW0ciGNKTzg91oBclKxF08siS7s2qaxWq11aoq4QzoXHFL/HKKkPU7EquPv3LHxSvLzsVds7pTRWnYCmc85wtZrxxZU6iH8PJHILLg8sli3CsLl/nsp2XgU+7qOyZGqrJlpZYJsKtYmwVSlhVaWYtQxnL+yHgephdZqVgsUBbaVigjGChyOubVkJug0jASi8Ri3WVxb4uezJt879LUtEwQ60EWfarIG/Ss+uR7l99SFu+2GMN7B1kM9RzBCoUusjJBsngOLZ01pxksK6NuBsjiWVd7ZLquT9s55MpKs2Rtjql7QbK4TsQ2ztlwO7LSlKzM/BgC2Vr4bCYxWpHliQJZomRhW0l8Y34TGFPHMOrY5ueIMYKnYQxiQMjEL7QssIVlzZNemKgr8PccXtshAHEMWcgWyEqqPckam3c2xRWN2UKhUG8Pq3OA3qNhsm9ZnFHP7R9omnZ4VLNTxhMMHbKSyWQ63ZMsdU91ZfG0HEKuHWo2B0d1+nFGn9VVlvpUWlFdWfxULTkHmh49fvwEnO3PUk/wkaXS2KKwK70jDfmJrBpS9KRSuXIc33qGknGyQT7BR9bTFQrL1YrriruaVUfxdLyVi8jScaWSQLaoa+0+smTqFEi3OlQp6bhyZfHSxqMkfL5Vz0TSUjSRqJyiRCTLll/N2iSZtyNLkqaJoyEn3UNjX9MquUymcPcUrjFvPUehRTyl3wKvruictg71A+3RViQz+0UFX5CvPNO0HJGHfR8N2w+6svgo8QVU3e9mMouWq0QlrmlHRNK8TetAyuKjaIGsStRZ67F9ck6y+Chas5CG7rKYk5PT3yANGbL4oHGoHVTcJUQblSfvWuBVdfNLYFP1yOIitPQjTXu8Zderje0EOkMke/i+ZFmzMktfff3VNx5ZnBQt1IeeVnAKbmx/8QhlIRkE3WW1f1MX4C+WPgK+UXmLLOvU8NlWpXKyXUk8Yp0cdpGlfnv9+YvvbGGWnT9hWV9/yVvNQlXrCGZnjj87ffYEbpAVq4ss9bvvDUB5ge/aw3+BXX30w1O1LYuXaZpGTnPZZ6zCDpKlvjAUBX2hH9+3I+sHLOvPe52y+MhDSUrWJg+wqsMcPUETKMtylS1ZtmBuBrv+Ecv60dM6cBJZiEahlsvVauwF2AGyPsdBJRUVbAsycR5v4i/gao+7PstCDioq/rLUv4IsU6piZ4qJ74R5roXG31Y2vU0pL2nYhQBZJgSUKTXLBugyvrW60vakqZAF2PUdKTJ3d9BzsjtQvF6QHepeeyv8yAocCUtWxgofiKcmrByVpF0DipaX+Y7UHmFZ9tsA4lKVza6uri7lkazdaS+D2v0LhP+So8xLqFTNJSRrVUOygrbCT+sQSMD6rMMyHARB1tKOYbwM2Ag3TWmXoQTIyrSgrueRraWWohwH/Qv8RNbbyorFTGSrqOXzu4rxd+b6rBEjeJnkyzKcR5fLyj9mgmRxEViy3ICVCEFjmbw8NXWbpL2m9Kd7JcV8ebg4w14maTPsk3/45cuSngRZ7bGsv3+DZHx8nLrPsCjfy8Twm2FQL3QiGPL6rjesMxe8Mq89lnVw052HSrVaNRXjXoa1Dp67F6Lgoq4ndSIFkSwqjG7QAh9W0WEQtQtMWWnK1bDLA1m3kxK5fG39xo31JYozWhZqQqvsyEL/ARLxloBDX7JkCeWgI8sdDZK1Sj+ZSs6HrZZhFpmRBf8LpJxhPxjavZUtyx0NpOH7FFQePjRa1WK2xZKVtlzZsfrPNZvxQQ7ut8Yry6XnAg8zWVmTloW22xFbq2u3EOvo59owv55VbyQx9q9O4jBaBxavceOglGlZaTe2AEuWtDTksgicF5/AfIuX/VevXv2e5KcHFlepl9BZppxO15KltVa5kuVPn683xKZwIkK35aRh64wrWf1csOgqS4bCpduy1tZQzfqZL1l+jSOWRbJA8Ik3DWFjuI1HssbXz4a+wFP4y7p06Q8kd0gmon4FHv3kT5YfIOsySZzEfXsVdKSADymwj7JIliZJP9/iTpZPaIEsiokohbcplW1bt9b+9fo17koHM4iBkZSyzZKimNV85720rMu/bGxs+MqCuOo43cnb8BVYCM2wVsQY1Y47aVmLyNXGiZ8siKu2rWE/K/SlWVZsjFL7Xh9Zv8T9ZHlOo4d9vsGP3TIEFXwbirHj3k3LmgJZ276R1TlBw9FVHS+mopR280VzNw+TVW6NYRR4FFonZGBFA6eVeSOPgsq5XTXaocU8GtIHQ6YsXpNQahqKW9c1Q3Gr1uS1HmW9ojY57LPJ/uwYivvefM2OKHsw90FPsub+Hc5+h0Kzo1BBt+Xcr8/dvPkByTWKm2/It+3m+XNJUeo5uQdL09qt1vU3N3tgjspCfpMQAV0DVqRBD7HbfuD6m7muvCGTkOOwAvBSx6Ldm5qehx5c78ZtYmPcXWclgSUxRqmIF9Pmuz89EM4DC1Ey7LOdt3KVPTtzDhC8hxWmqeD1HtUseUm5B84+RKzjm0n+4wqT1zSrtLvjvdob2Q8x2VHIQAbW9J2eoHsqBtH/WLL+WyjUZgsOI5GOFtZQZ3vjf7Ysz50jJKuvJnzVTcORpY/QwAX+7Px2ZRjQez4uHvz667t2Z8MPuTiQCfcde8/oXRon2Zo+5nYOuW/kNLOD0q2LqvhmasQ/pNULrPdIQxjp+FtO653HS3ilWIg7d0GBaNK9Oafr1qvqYrIukjEY4pOzYkKXP7L381RG/COTu0B/jGTYe3SBQbLu29RT9+8XhKwAILKcD5mxPmA67D26wCRFGvYBoSolTn2CSHsQnYNAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIOOP/+0L6IRv4X24AAAAASUVORK5CYII=",
//   ];

//   useEffect(() => {
//     // Fetch categories from the API
//     fetch("https://main.hivetech.space/api/category")
//       .then((response) => response.json())
//       .then((data) => setCategories(data.data))
//       .catch((error) => console.error("Error fetching categories:", error));
//   }, []);

//   return (
//     <div className="flex flex-col bg-gray-50">
//       {/* Header */}
//       <header className="py-12 text-center">
//         <motion.h1
//           initial={{ opacity: 0, y: 150 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2, duration: 0.8 }}
//           viewport={{ once: false }}
//           className="text-4xl sm:text-5xl font-bold text-primary-color1 mb-5"
//           style={{ letterSpacing: "4px" }}
//         >
//           Our Experience
//         </motion.h1>
//         <motion.p
//           initial={{ opacity: 0, y: 150 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4, duration: 0.8 }}
//           viewport={{ once: false }}
//           className="mt-2 text-xl text-gray-400"
//           style={{ letterSpacing: "2px" }}
//         >
//           Explore the categories of experiences we offer.
//         </motion.p>
//       </header>

//       {/* Main Content */}
//       <main className="flex-1 container w-11/12 mx-auto p-6">
//         <Swiper
//           modules={[Navigation, Pagination]}
//           spaceBetween={30} // Space between slides
//           slidesPerView={window.innerWidth < 1000 ? 1 : 2} // Show 2 slides at a time
//           navigation={{
//             nextEl: '.swiper-button-next-custom',
//             prevEl: '.swiper-button-prev-custom',
//           }}
//           pagination={{ clickable: true }}
//           slidesPerGroup={2}
//           // Add pagination dots
//           loop={true} // Enable infinite loop
//           onSlideChange={(swiper) => {
//             const realIndex = swiper.realIndex; // Get the real index of the active slide
//             const groupIndex = Math.floor(realIndex / 2); // Calculate group index (2 is slidesPerGroup)
//             console.log("Real Index:", realIndex);
//             console.log("Group Index:", groupIndex);
//             setActiveIndex(realIndex);
//             setActiveGroupIndex(groupIndex);
//             // Use realIndex or groupIndex to apply delays or animations
//           }}
//         >
//           {categories.map((category, index) => (
//             <SwiperSlide key={category?.id}>
//               <motion.div
//                 initial={{ opacity: 0, y: 150, x: "" }}
//                 whileInView={{ opacity: 1, y: 0, x: 0 }}
//                 transition={{
//                   delay:
//                     index !== activeGroupIndex || index !== activeIndex + 1
//                       ? 0.4
//                       : index * 0.2,
//                   duration: 0.8,
//                 }}
//                 className=""
//               >
//                 <div className="flex flex-col sm:flex-row mb-5 justify-between bg-white rounded-xl shadow-lg px-12 py-7 hover:shadow-xl transition-shadow duration-300">
//                   <Image
//                     src={images[index]}
//                     alt={`image${index}`}
//                     width={100}
//                     height={100}
//                     className="object-cover -mt-5 mr-4 w-56 h-40 z-0"
//                   />
//                   <div>
//                     <h2 className="text-xl sm:text-2xl text-primary-color6">
//                       {category?.title}
//                     </h2>
//                     <p className="mt-2 text-gray-500">
//                       {category?.description}
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>
//             </SwiperSlide>
//           ))}

//           {/* Custom Navigation Buttons */}
//           <div className="absolute top-1/2 w-full flex justify-between px-4 z-10">
//             {/* Previous Button */}
//             <button
//               className="swiper-button-prev-custom w-8 text-4xl h-8 hidden sm:w-10 sm:h-10 rounded-full sm:flex items-center justify-center text-primary-color4 hover:bg-gray-100 transition-all"
//               aria-label="Previous Slide"
//             >
//              <IoIosArrowBack />
//             </button>

//             {/* Next Button */}
//             <button
//               className="swiper-button-next-custom text-4xl hidden w-8 h-8 sm:w-10 sm:h-10 rounded-full sm:flex items-center justify-center  text-primary-color4 hover:bg-gray-100 transition-all"
//               aria-label="Next Slide"
//             >
//               <IoIosArrowForward />
//             </button>
//           </div>
//         </Swiper>
//       </main>
//     </div>
//   );
// }

import React from 'react'

const Experience = () => {
  return (
    <div>Experience</div>
  )
}

export default Experience