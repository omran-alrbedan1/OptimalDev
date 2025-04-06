// "use client";
// import { Category, CategoryArray } from "@/types";

// import { motion } from "framer-motion";

// import { Tilt } from "react-tilt";

// const About = ({
//   content,
//   categories,
// }: {
//   content: string;
//   categories: CategoryArray;
// }) => {
//   return (
//     <section className="mx-auto max-w-7xl pb-16 transition-all duration-300">
//       <div className="sm:px-10 px-6">
//         {content && <div><motion.div
//           initial={{ opacity: 0, y: -50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1.25, delay: 0.2, type: "spring" }}
//         >
//           <p className="sm:text-[18px] text-[14px] dark:text-gray-300 uppercase tracking-wider text-gray-500">
//             Introduction
//           </p>
//           <h2 className="font-bold md:text-[40px] sm:text-[30px] xs:text-[30px] text-[25px] tracking-wider">
//             Overview.
//           </h2>
//         </motion.div>

//           <motion.p
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{
//               duration: 1,
//               delay: 0.5,
//               type: "spring",
//               ease: "easeOut",
//               once: true,
//             }}
//             className="mt-4 text-[17px] max-w-4xl leading-[30px] tracking-wider text-gray-600 dark:text-gray-300"

//             dangerouslySetInnerHTML={{
//               __html: content
//             }}
//           />
//         </div>
//         }


//         {categories.length>0 && <div className="mt-20">

//           <motion.div
//             initial={{ opacity: 0, y: -50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1.25, delay: 0.2, type: "spring" }}
//           >

//             <h2 className="font-semibold md:text-[25px] text-[20px]  tracking-wider">
//               Skills and Qualifications
//             </h2>
//           </motion.div>

//           <motion.p
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{
//               duration: 1,
//               delay: 0.5,
//               type: "spring",
//               ease: "easeOut",
//               once: true,
//             }}
//             className="mt-4 text-[17px] max-w-4xl leading-[30px] tracking-wider text-gray-600 dark:text-gray-300"
//           >
//             These skills represent the culmination of the experiences and capabilities I have acquired over time, reflecting my
//             ability to achieve tangible results and add real value to any project or team.
//           </motion.p>
//         </div>}

//         {categories.length>0 &&<div className="mt-16 flex flex-wrap gap-10">
//           {categories.map((category: Category, index: number) => (
//             <Tilt
//               options={{
//                 max: 45,
//                 scale: 1,
//                 speed: 450,
//               }}
//               className="basis-[360px] flex-grow max-w-[420px]"
//               key={category.id}
//             >
//               <motion.div
//                 initial={{ opacity: 0, x: -100 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 transition={{
//                   duration: 0.75,
//                   delay: 0.4 * index,
//                   type: "spring",
//                   ease: "easeOut",
//                   once: true,
//                 }}
//                 className="w-full relative  p-[1px] rounded-[12px] overflow-hidden group"
//               >
//                 <div className="absolute w-full h-full z-10 rounded-[12px]  translate-y-[-101%] flex  group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
//                   <img
//                     src={category.image}
//                     alt="web-development"
//                     width={105}
//                     height={105}
//                     className="w-full h-full rounded-[12px] object-fill"
//                   />
//                   <div className="w-full h-full absolute z-10 bg-darkMod-700/30 rounded-[20px]" />

//                 </div>
//                 <div
//                   className="bg-white-100  dark:bg-darkMod-200  rounded-[12px] xs:min-h-[220px] min-h-[210px] pt-1 pb-3 pr-3  flex justify-start gap-1 items-start flex-col"
//                 >
//                   <img
//                     src={category.image_icon}
//                     alt="web-development"
//                     width={80}
//                     height={80}
//                     className="object-contain"
//                   />

//                   <h3 className="pl-4 text-[20px] font-bold text-start">
//                     {category.title}
//                   </h3>
//                   <p className="pl-4 text-start dark:text-gray-300">
//                     {category.description}
//                   </p>
//                 </div>
//               </motion.div>
//             </Tilt>
//           ))}
//         </div>}
//       </div>
//     </section>
//   );
// };

// export default About;










"use client";
import { Category, CategoryArray } from "@/types";

import { motion } from "framer-motion";

import { Tilt } from "react-tilt";

const About = ({
  content,
  categories,
}: {
  content: string;
  categories: CategoryArray;
}) => {
  return (
    <section className="mx-auto max-w-7xl pb-16 transition-all duration-300">
      <div className="sm:px-10 px-6">
        {content && <div><motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.25, delay: 0.2, type: "spring" }}
        >
          <p className="sm:text-[18px] text-[14px] dark:text-gray-300 uppercase tracking-wider text-gray-500">
            Introduction
          </p>
          <h2 className="font-bold md:text-[40px] sm:text-[30px] xs:text-[30px] text-[25px] tracking-wider">
            Overview.
          </h2>
        </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              duration: 1,
              delay: 0.5,
              type: "spring",
              ease: "easeOut",
              once: true,
            }}
            className="mt-4 text-[17px] max-w-4xl leading-[30px] tracking-wider text-gray-600 dark:text-gray-300"

            dangerouslySetInnerHTML={{
              __html: content
            }}
          />
        </div>
        }


        {categories.length > 0 && <div className="mt-20">

          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.25, delay: 0.2, type: "spring" }}
          >

            <h2 className="font-semibold md:text-[25px] text-[20px]  tracking-wider">
              Skills and Qualifications
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              duration: 1,
              delay: 0.5,
              type: "spring",
              ease: "easeOut",
              once: true,
            }}
            className="mt-4 text-[17px] max-w-4xl leading-[30px] tracking-wider text-gray-600 dark:text-gray-300"
          >
            These skills represent the culmination of the experiences and capabilities I have acquired over time, reflecting my
            ability to achieve tangible results and add real value to any project or team.
          </motion.p>
        </div>}

        {categories.length > 0 && <div className="mt-16 flex flex-wrap gap-10 gap-y-16 ">
          {categories.map((category: Category, index: number) => (
            <Tilt
              options={{
                max: 45,
                scale: 1,
                speed: 450,
              }}
              className="basis-[360px] flex-grow  max-w-[420px] "
              key={category.id}
            >
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.75,
                  delay: 0.4 * index,
                  type: "spring",
                  ease: "easeOut",
                  once: true,
                }}
                className=" flex flex-1 h-[250px]  border border-zinc-300 dark:border-gray-600  rounded-xl w-full relative   p-[1px]  group"
              >
                <div className="absolute hidden w-full h-full z-10 rounded-xl  translate-y-[-101%]    group-hover:translate-y-0 group-hover:flex transition-transform duration-1000 ease-in-out">
                  <img
                    src={category.image}
                    alt="web-development"
                    width={105}
                    height={105}
                    className="w-full h-full rounded-[12px] object-fill"
                  />
                  <div className="w-full h-full absolute z-10 bg-darkMod-700/30 rounded-[20px]" />

                </div>

                <div

                  className=" px-5 relative cursor-pointer w-full h-full pt-16 pb-5 flex flex-col gap-2 justify-start items-start"
                >
                  <span className="group-hover:hidden absolute w-32 flex justify-center rounded-3xl items-center left-1/2 -top-[45px] bg-white dark:bg-darkMod-500  transform -translate-x-1/2">
                    {category.image_icon && (
                      <div className="">
                        <img
                          src={`${category.image_icon}`}
                          width={90}
                          height={90}
                          alt="Image icone"
                          className=""
                        />
                      </div>
                    )}{" "} </span>

                  <h3 className="  font-semibold  xl:text-[19px] py-1">
                    {category.title}
                  </h3>


                  <p className="text-start text-gray-600  dark:text-gray-300 text-[15px]">
                    {category.description}
                  </p>
                </div>

              </motion.div>
            </Tilt>
          ))}
        </div>}
      </div>
    </section>
  );
};

export default About;




