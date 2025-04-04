"use client";
import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import Button from "../elements/Button/button";
import { usePathname } from "next/navigation";

import Link from "next/link";
import { ThemeToggler } from "@/components/ui/ThemeToggler";

const Header = () => {
  const [isCollapse, setIsCollapse] = useState<boolean>(false);
  // const [isScrolled, setIsScrolled] = useState<boolean>(true);
  const path = usePathname();

  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    // Set initial width
    setWindowWidth(window.innerWidth);
    
    // Handle window resize
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="">
      {/* Conditionally render the Topbar based on scroll position */}
 
     
      {/* Header with fixed positioning #75767e */}
      <header
        className={`header fixed top-0 lg:-top-[20px] py-3 dark:bg-darkMod-100 bg-white z-50 min-w-full lg:h-[14vh] shadow-xl transition-all duration-900 ease-linear`}
      >
        <div className={`flex justify-between  px-6 lg:px-0 border-none lg:ml-10`}>
          <Link href={"/home"} className="dark:hidden block">
            <Image
              src={"/Hive Tech.png"}
              width={windowWidth>768 ? 170 : windowWidth  > 1024 ? 210 : 150}
              height={windowWidth>768 ? 170 : windowWidth  > 1024 ? 210 : 150}
   
              alt="logo"
            />
          </Link>
          <Link href={"/home"} className="hidden dark:block">
            <Image
              src={"/logos/logo with text dark.png"}
              width={windowWidth>768 ? 170 : windowWidth  > 1024 ? 210 : 150}
              height={windowWidth>768 ? 170 : windowWidth  > 1024 ? 210 : 150}
           
              alt="logo"
            />
          </Link>
          <div className="flex items-center justify-end gap-5">
            <span className="lg:hidden">

            <ThemeToggler />
            </span>
          
          <button
            className="block text-primary-color1 lg:hidden focus:outline-none"
            onClick={() => setIsCollapse(!isCollapse)}
          >
            <svg
              className="w-8 h-8"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                className={`${isCollapse ? "hidden" : "block"}`}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
              <path
                className={`${!isCollapse ? "hidden" : "block"}`}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          </div>
        </div>

        <ul className="hidden text-theme-blue tracking-widest items-center lg:flex flex-row mt-0">
          <li>
            <Button
              className={`${
                path === "/home" ? "active-link" : ""
              } text-[16px] font-semibold px-5 no-underline hover:underline`}
              type="link"
              href="/home"
            >
              Home 
            </Button>
          </li>
          <li>
            <Button
              className={`${
                path === "/about-us" ? "active-link" : ""
              } text-[16px] font-semibold px-5 no-underline hover:underline`}
              type="link"
              href="/about-us"
            >
              About Us
            </Button>
          </li>
          <li>
            <Button
              className={`${
                path === "/contact-us" ? "active-link" : ""
              } text-[16px] font-semibold px-5 no-underline hover:underline`}
              type="link"
              href="/contact-us"
            >
              Contact Us
            </Button>
          </li>
          <li className="py-2 lg:py-0">
            <Button
              className={`${
                path === "/teams" ? "active-link" : ""
              } text-[16px] font-semibold  px-5 no-underline hover:underline`}
              type="link"
              href="/teams"
            >
              Team
            </Button>
          </li>
          <li className="py-2 lg:py-0">
            <Button
              className={`${
                path === "/services" ? "active-link" : ""
              } text-[16px] font-semibold  px-5 no-underline hover:underline`}
              type="link"
              href="/services"
            >
              Services
            </Button>
          </li>
          <li className="py-2 lg:py-0">
            <Button
              className={`${
                path === "/projects" ? "active-link" : ""
              } text-[16px] font-semibold  px-5 no-underline hover:underline`}
              type="link"
              href="/projects"
            >
              Projects
            </Button>
          </li>
          {/* <li className="hidden xl:block">
            <Button
              type="link"
              className="text-[16px] font-semibold w-80 h-80 px-2 py-3 bg-primary-color1 rounded-full text-white-100"
              href="/discuss-project"
            >
              Discuss Project
            </Button>
          </li> */}
          <li className="">
          <ThemeToggler />
          </li>
        </ul>

        <Transition
          show={isCollapse}
          enter="transition-opacity duration-400"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-400"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ul className="z-50 flex flex-col items-center fixed  tracking-widest right-0 h-full  top-[78px] md:top-[84px] py-8 dark:bg-darkMod-300 bg-white-100 w-full sm:w-[60%] lg:hidden">
            <li className="py-2 ">
              <Button
                className={`${
                  path === "/home" ? "active-link" : ""
                } px-10 no-underline hover:underline`}
                type="link"
                href="/home"
                onClick={() => setIsCollapse(false)}
              >
                Home
              </Button>
            </li>
            <li className="py-2">
              <Button
                className={`${
                  path === "/teams" ? "active-link" : ""
                } px-10 no-underline hover:underline`}
                type="link"
                href="/teams"
                onClick={() => setIsCollapse(false)}
              >
                Team
              </Button>
            </li>
        
            <li className="py-2 ">
              <Button
                className={`${
                  path === "/contact-us" ? "active-link" : ""
                } px-10 no-underline hover:underline`}
                type="link"
                href="/contact-us"
                onClick={() => setIsCollapse(false)}
              >
                Contact Us
              </Button>
            </li>
            <li className="py-2 ">
              <Button
                className={`${
                  path === "/about-us" ? "active-link" : ""
                } px-10 no-underline hover:underline`}
                type="link"
                href="/about-us"
                onClick={() => setIsCollapse(false)}
              >
                About Us
              </Button>
            </li>
            <li className="py-2">
              <Button
                className={`${
                  path === "/services" ? "active-link" : ""
                } px-10 no-underline hover:underline`}
                type="link"
                href="/services"
                onClick={() => setIsCollapse(false)}
              >
                Services
              </Button>
            </li>
            <li className="py-2">
              <Button
                className={`${
                  path === "/projects" ? "active-link" : ""
                } px-10 no-underline hover:underline`}
                type="link"
                href="/projects"
                onClick={() => setIsCollapse(false)}
              >
                Projects
              </Button>
            </li>
            <li className="mx-auto my-9">
              <Button
                className=" px-6 py-3 bg-primary-color1 text-white rounded-full transition duration-200"
                type="link"
                href="/discuss-project"
                onClick={() => setIsCollapse(false)}
              >
                Discuss Project
              </Button>
            </li>
          </ul>
        </Transition>
      </header>
    </div>
  );
};

export default Header;