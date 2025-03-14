"use client";
import React from "react";
import { motion } from "framer-motion";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import Image from "next/image"; // For optimized images

import heroPortfolio from "../../../public/assets/portfolioHero.png";
import Button from "@/app/elements/Button/button";
import { Projects } from "@/types";

const projects: Projects[] = [
  {
    id: 1,
    title: "Pinkey App",
    subtitle: "",
    description: "",
    content: "",
    image: "projects/images/01JMSHK0HZTP2YQR8XTPQZ5M7D.jpg",
    project_link: null,
    demo_link: null,
    views: 0,
    likes: 0,
    type: "Mobile Apps",
  },
  {
    id: 2,
    title: "CarConsultant App",
    subtitle: "",
    description: "",
    content: "",
    image: "projects/images/01JMSHX71XBY1EADX3QABPAMKS.jpg",
    project_link: null,
    demo_link: null,
    views: 0,
    likes: 0,
    type: "Website",
  },
  {
    id: 3,
    title: "Labor App",
    subtitle: "",
    description: "",
    content: "",
    image: "projects/images/01JMSJ49FK1S5RDAWQZGA3KYM2.jpg",
    project_link: null,
    demo_link: null,
    views: 0,
    likes: 0,
    type: "Website",
  },
  {
    id: 4,
    title: "Soon App",
    subtitle: "",
    description: "",
    content: "",
    image: "projects/images/01JMSJ7NNAT8FSXTJGR5G6TWFY.jpg",
    project_link: null,
    demo_link: null,
    views: 0,
    likes: 0,
    type: "Website",
  },
  {
    id: 5,
    title: "ِAtharna App",
    subtitle: "",
    description: "",
    content: "",
    image: "projects/images/01JMSJB4BGNNHHTJX6550S5202.jpg",
    project_link: null,
    demo_link: null,
    views: 0,
    likes: 0,
    type: "Mobile Apps",
  },
  {
    id: 6,
    title: "Orderbook App",
    subtitle: "",
    description: "",
    content: "",
    image: "projects/images/01JMSJEN125ZP5Y9GSH19P38GZ.jpg",
    project_link: null,
    demo_link: null,
    views: 0,
    likes: 0,
    type: "Mobile Apps",
  },
  {
    id: 7,
    title: "Ehtooa App",
    subtitle: "",
    description: "",
    content: "",
    image: "projects/images/01JMSJHTRQWFXM4Q8TDRATJFFE.jpg",
    project_link: null,
    demo_link: null,
    views: 0,
    likes: 0,
    type: "Mobile Apps",
  },
  {
    id: 9,
    title: " MY CURRENCY App",
    subtitle: "",
    description: "",
    content: "",
    image: "projects/images/01JMSJR1HKY6YY0BQJF60714GN.jpg",
    project_link: null,
    demo_link: null,
    views: 0,
    likes: 0,
    type: "Mobile Apps",
  },
  {
    id: 8,
    title: "Mosanad App",
    subtitle: "",
    description: "",
    content: "",
    image: "projects/images/01JMSJMFRAER1DDM82MCVSYJ2G.jpg",
    project_link: null,
    demo_link: null,
    views: 0,
    likes: 0,
    type: "Mobile Apps",
  },
  // Add more projects as needed
];

const PortfolioPage = () => {
  const mobile = projects.filter((item) => item.type === "Mobile Apps");
  const website = projects.filter((item) => item.type === "Website");
  const uiUx = projects.filter((item) => item.type === "uiUx");

  return (
    <div>
      {/* Hero Section */}
      <section className="hero sm:items-center lg:items-start sm:flex-row">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full sm:w-1/2 flex flex-col px-5 mb-5 sm:mb-0 sm:px-12 sm:mt-6 lg:mt-6 xl:mt-20"
        >
          <h1 className="text-5xl mt-5 sm:text-6xl sm:mt-0 text-primary-color1 font-bold leading-tight mb-5">
            Portfolio
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-light text-xl text-gray-400 leading-relaxed"
          >
            As a Software House that designs and develops website, mobile apps,
            and UI/UX design, we have been trusted by our clients from all
            around the world.
          </motion.p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full sm:w-1/2 sm:pr-12"
        >
          <Image
            src={heroPortfolio}
            alt="Hero"
            width={600}
            height={400}
            className="w-full h-auto"
          />
        </motion.div>
      </section>

      {/* Portfolio Tabs Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className=""
      >
        <Tabs className="flex flex-col mx-10">
          <TabList>
            <div className="flex flex-row mb-7 sm:mb-10">
              <Tab>
                <button className="font-normal px-3 sm:px-5 py-2 mr-3 text-primary-color1 text-lg border border-theme-purple rounded-full transition duration-300 hover:bg-primary-color1 hover:text-white focus:outline-none focus:bg-primary-color1 focus:text-white">
                  Mobile
                </button>
              </Tab>
              <Tab>
                <button className="font-normal px-3 sm:px-5 py-2 mr-3 text-primary-color1 text-lg border border-theme-purple rounded-full transition duration-300 hover:bg-primary-color1 hover:text-white focus:outline-none focus:bg-primary-color1 focus:text-white">
                  Website
                </button>
              </Tab>
              <Tab>
                <button className="font-normal px-5 sm:px-8 py-2 text-primary-color1 text-lg border border-theme-purple rounded-full transition duration-300 hover:bg-primary-color1 hover:text-white focus:outline-none focus:bg-primary-color1 focus:text-white">
                  UI/UX
                </button>
              </Tab>
            </div>
          </TabList>

          {/* Mobile Apps Tab */}
          <TabPanel>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10  justify-items-center">
              {mobile.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div className="w-full">
                    <Button
                      type="link"
                      href={`/project/${item.id}`}
                      className="w-full"
                    >
                      <div className="rounded-2xl w-full shadow-xl transform transition duration-500 hover:scale-110">
                        <div className="relative">
                          <Image
                            src={`https://main.hivetech.space/storage/${item.image}`}
                            alt="Portfolio"
                            width={400} // Fixed width for larger devices
                            height={300} // Fixed height for larger devices
                            className="rounded-t-2xl min-w-full h-64 sm:h-72 bg-contain bg-gray-200" // Enforce consistent size
                          />
                          <div className="absolute flex w-full h-full top-0 opacity-0 bg-black justify-center rounded-t-2xl rounded-b img-hover">
                            <button className="focus:outline-none">
                              <svg
                                className="w-20 h-20 text-gray-200"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className="py-4">
                          <h2 className="text-gray-500 text-center text-xl">
                            {item.title}
                          </h2>
                          <p className=" text-gray-400 text-center">
                            {item.type}
                          </p>
                        </div>
                      </div>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabPanel>

          {/* Website Tab */}
          <TabPanel>
            <div className="grid grid-cols-2 sm:grid-cols-3 justify-items-center ">
              {website.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div className="w-11/12">
                    <Button
                      type="link"
                      href={`/project/${item.id}`}
                      className=""
                    >
                      <div className="rounded-2xl w-full shadow-xl transform transition duration-500 hover:scale-110">
                        <div className="relative">
                          <Image
                            src={`https://main.hivetech.space/storage/${item.image}`}
                            alt="Portfolio"
                            width={300}
                            height={200}
                            className="rounded-t-2xl z-0 w-full bg-contain h-64 sm:h-72 "
                          />
                          <div className="absolute flex w-full h-full top-0 opacity-0 bg-black justify-center rounded-t-2xl rounded-b img-hover">
                            <button className="focus:outline-none">
                              <svg
                                className="w-20 h-20 text-gray-200"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className="py-4">
                          <h2 className="text-theme-blue text-center text-xl">
                            {item.title}
                          </h2>
                          <p className="font-light text-gray-400 text-center">
                            {item.type}
                          </p>
                        </div>
                      </div>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabPanel>

          {/* UI/UX Tab */}
          <TabPanel>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-10  justify-items-center">
              {uiUx.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div className="w-full">
                    <Button
                      type="link"
                      href={`/project/${item.id}`}
                      className="w-full"
                    >
                      <div className="rounded-2xl w-full shadow-xl transform transition duration-500 hover:scale-110">
                        <div className="relative">
                          <Image
                            src={`https://main.hivetech.space/storage/${item.image}`}
                            alt="Portfolio"
                            width={300}
                            height={200}
                            className="rounded-t-2xl z-0 w-full bg-content h-64 sm:h-72 bg-cover "
                          />
                          <div className="absolute flex w-full h-full top-0 opacity-0 bg-black justify-center rounded-t-2xl rounded-b img-hover">
                            <button className="focus:outline-none">
                              <svg
                                className="w-20 h-20 text-gray-200"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className="py-4">
                          <h2 className="text-theme-blue text-center text-xl">
                            {item.title}
                          </h2>
                          <p className="font-light text-gray-400 text-center">
                            {item.type}
                          </p>
                        </div>
                      </div>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabPanel>
        </Tabs>
      </motion.section>
    </div>
  );
};

export default PortfolioPage;
