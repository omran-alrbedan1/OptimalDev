"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Image from 'next/image'; // For optimized images

import heroPortfolio from '../../../public/assets/portfolioHero.png';
import Button from '@/app/elements/Button/button';

const exampleData = [
  {
    id: 1,
    title: "Mobile App 1",
    type: "Mobile Apps",
    imageUrl: "data:image/jpeg;base64,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", // Replace with a valid URL
  },
  {
    id: 2,
    title: "Mobile App 2",
    type: "Mobile Apps",
    imageUrl: "https://images.unsplash.com/photo-1585282263861-f55e341878f8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bW9waWxlJTIwYXBwfGVufDB8fDB8fHww",
  },
  {
    id: 3,
    title: "Website 1",
    type: "Website",
    imageUrl: "https://example.com/images/website-1.jpg",
  },
  {
    id: 4,
    title: "Website 2",
    type: "Website",
    imageUrl: "https://example.com/images/website-2.jpg",
  },
  {
    id: 5,
    title: "UI/UX Design 1",
    type: "UI/UX",
    imageUrl: "https://example.com/images/ui-ux-1.jpg",
  },
  {
    id: 6,
    title: "UI/UX Design 2",
    type: "UI/UX",
    imageUrl: "https://example.com/images/ui-ux-2.jpg",
  },
];

const PortfolioPage = () => {
  const mobile = exampleData.filter((item) => item.type === 'Mobile Apps');
  const website = exampleData.filter((item) => item.type === 'Website');

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
          <h1 className="text-6xl text-primary-color1 font-bold leading-tight mb-5">
            Portfolio
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-light text-xl text-gray-400 leading-relaxed"
          >
            As a Software House that designs and develops website, mobile apps, and UI/UX design, we have been trusted by our clients from all around the world.
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
        className="container mx-auto"
      >
        <Tabs className="flex flex-col px-4">
          <TabList>
            <div className="flex flex-row mb-5">
              <Tab>
                <button className="font-normal px-5 py-2 mr-3 text-primary-color1 text-lg border border-theme-purple rounded-full transition duration-300 hover:bg-primary-color1 hover:text-white focus:outline-none focus:bg-primary-color1 focus:text-white">
                  Mobile
                </button>
              </Tab>
              <Tab>
                <button className="font-normal px-5 py-2 mr-3 text-primary-color1 text-lg border border-theme-purple rounded-full transition duration-300 hover:bg-primary-color1 hover:text-white focus:outline-none focus:bg-primary-color1 focus:text-white">
                  Website
                </button>
              </Tab>
              <Tab>
                <button className="font-normal px-8 py-2 text-primary-color1 text-lg border border-theme-purple rounded-full transition duration-300 hover:bg-primary-color1 hover:text-white focus:outline-none focus:bg-primary-color1 focus:text-white">
                  UI/UX
                </button>
              </Tab>
            </div>
          </TabList>

          {/* Mobile Apps Tab */}
          <TabPanel>
            <div className="grid grid-cols-2 sm:grid-cols-3 sm:gap-2 xl:gap-8 justify-items-center">
              {mobile.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Button type="link" href={`/project/${item.id}`}>
                    <div className="group rounded-2xl shadow-xl w-auto w-11/12 m-3 transform transition duration-500 hover:scale-110 portofolio-card">
                      <div className="relative">
                        <Image
                          src={item.imageUrl}
                          alt="Portfolio"
                          width={300}
                          height={200}
                          className="rounded-t-2xl z-0"
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
                </motion.div>
              ))}
            </div>
          </TabPanel>

          {/* Website Tab */}
          <TabPanel>
            <div className="grid grid-cols-2 sm:grid-cols-3 sm:gap-2 xl:gap-8 justify-items-center">
              {website.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Button type="link" href={`/project/${item.id}`}>
                    <div className="group rounded-2xl shadow-xl w-auto w-11/12 m-3 transform transition duration-500 hover:scale-110 portofolio-card">
                      <div className="relative">
                        <Image
                          src={item.imageUrl}
                          alt="Portfolio"
                          width={300}
                          height={200}
                          className="rounded-t-2xl z-0"
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
                </motion.div>
              ))}
            </div>
          </TabPanel>

          {/* UI/UX Tab */}
          <TabPanel>
            <div className="grid grid-cols-2 sm:grid-cols-3 sm:gap-2 xl:gap-8 justify-items-center">
              {exampleData.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Button type="link" href={`/project/${item.id}`}>
                    <div className="group rounded-2xl shadow-xl w-auto w-11/12 m-3 transform transition duration-500 hover:scale-110 portofolio-card">
                      <div className="relative">
                        <Image
                          src={item.imageUrl}
                          alt="Portfolio"
                          width={300}
                          height={200}
                          className="rounded-t-2xl z-0"
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