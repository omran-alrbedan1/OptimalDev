"use client";
import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import Button from "../elements/Button/button";
import { usePathname } from "next/navigation";

import Link from "next/link";

const Header = () => {
  const [isCollapse, setIsCollapse] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const path = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {

      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="">
      {/* Conditionally render the Topbar based on scroll position */}
 
     
      {/* Header with fixed positioning #75767e */}
      <header
        className={`header fixed lg:-top-[20px] sm:h-[110px] bg-white ${
          isScrolled ? "top-0  bg-opacity-95 " : ""
        } z-50 min-w-full  shadow-sm transition-all duration-900 ease-linear`}
      >
        <div className={`flex justify-between sm:justify-around  px-6 lg:px-0 border-none lg:ml-20`}>
          <Link href={"/home"} >
            <Image
              src={"/Hive Tech.png"}
              width={190}
              height={190}
              className=""
              alt="logo"
            />
          </Link>
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

        <ul className="hidden text-theme-blue tracking-widest items-center lg:flex flex-row mt-0">
          <li>
            <Button
              className={`${
                path === "/home" ? "active-link" : " text-primary-color2"
              } text-[16px] font-semibold px-5 no-underline hover:underline`}
              type="link"
              href="home"
            >
              Home
            </Button>
          </li>
          <li>
            <Button
              className={`${
                path === "/about-us" ? "active-link" : " text-primary-color2"
              } text-[16px] font-semibold px-5 no-underline hover:underline`}
              type="link"
              href="about-us"
            >
              About Us
            </Button>
          </li>
          <li>
            <Button
              className={`${
                path === "/contact-us" ? "active-link" : " text-primary-color2"
              } text-[16px] font-semibold px-5 no-underline hover:underline`}
              type="link"
              href="contact-us"
            >
              Contact Us
            </Button>
          </li>
          <li className="py-2 lg:py-0">
            <Button
              className={`${
                path === "/team" ? "active-link" : "text-primary-color2"
              } text-[16px] font-semibold  px-5 no-underline hover:underline`}
              type="link"
              href="/team"
            >
              Team
            </Button>
          </li>
          <li className="py-2 lg:py-0">
            <Button
              className={`${
                path === "/projects" ? "active-link" : "text-primary-color2"
              } text-[16px] font-semibold  px-5 no-underline hover:underline`}
              type="link"
              href="/projects"
            >
              Projects
            </Button>
          </li>
          <li className="hidden xl:block">
            <Button
              type="link"
              className="text-[16px] font-semibold w-80 h-80 px-8 py-3 bg-primary-color1 rounded-full text-white-100"
              href="/discuss-project"
            >
              Discuss Project
            </Button>
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
          <ul className="z-50 flex flex-col text-theme-blue tracking-widest my-6 mt-16 absolute bg-white w-full lg:hidden">
            <li className="py-2 bg-white">
              <Button
                className={`${
                  path === "/home" ? "active-link" : "text-primary-color2"
                } px-10 no-underline hover:underline`}
                type="link"
                href="/home"
                onClick={() => setIsCollapse(false)}
              >
                Home
              </Button>
            </li>
            <li className="py-2 bg-white">
              <Button
                className={`${
                  path === "/team" ? "active-link" : "text-primary-color2"
                } px-10 no-underline hover:underline`}
                type="link"
                href="/team"
                onClick={() => setIsCollapse(false)}
              >
                Team
              </Button>
            </li>
            <li className="py-2 bg-white">
              <Button
                className={`${
                  path === "/projects" ? "active-link" : "text-primary-color2"
                } px-10 no-underline hover:underline`}
                type="link"
                href="/projects"
                onClick={() => setIsCollapse(false)}
              >
                Projects
              </Button>
            </li>
            <li className="py-2 bg-white">
              <Button
                className={`${
                  path === "/contact-us" ? "active-link" : "text-primary-color2"
                } px-10 no-underline hover:underline`}
                type="link"
                href="/contact-us"
                onClick={() => setIsCollapse(false)}
              >
                Contact Us
              </Button>
            </li>
            <li className="py-2 bg-white">
              <Button
                className={`${
                  path === "/about-us" ? "active-link" : "text-primary-color2"
                } px-10 no-underline hover:underline`}
                type="link"
                href="/about-us"
                onClick={() => setIsCollapse(false)}
              >
                About Us
              </Button>
            </li>
            <li className="mx-auto my-9 bg-white">
              <Button
                className=" -ml-10 px-6 py-3 bg-primary-color1 text-white rounded-full transition duration-200"
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