import Image from "next/image";
import React from "react";

import { FaInstagram } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { TbArrowBadgeLeftFilled, TbX } from "react-icons/tb";
import { RiTelegram2Fill } from "react-icons/ri";
import Link from "next/link";
import Button from "@/app/elements/Button/button";
import { images } from "@/constants/images";

const Footer = () => {
  return (
    <div className="relative min-h-[60vh] w-full bg-[#f7f7f8] dark:bg-darkMod-200 dark:text-white ">
      <div className="relative w-full h-full pt-12 md:pt-20 overflow-hidden md:px-2 lg:px-4 xl:px-10 max-xs:pb-28 max-xl:pb-20 xl:pb-20">
        <div className="flex flex-wrap items-stretch gap-14 text-darkMod-100">
          <div className="flex flex-col flex-grow basis-[400px]  items-start gap-6 md:gap-8 px-10 justify-start">
            <div className="flex items-center justify-center">
              <Image
                src={images.logo}
                width={230}
                height={230}
                className="mb-5"
                alt="logo"
              />
            </div>
            <p className=" text-start text-gray-600 dark:text-gray-200">
              Growing your business with strategic design and innovative
              solutions. Let’s elevate your brand together.
            </p>
            <div
              className="flex items-center justify-start
             gap-4 sm:gap-5 md:mt-8 flex-wrap max-xs:mt-4"
            >
              <Button
                href="/"
                target="_blank"
                type="link"
                isExternal
                className="w-10 h-10 sm:w-11 sm:h-11 p-2 flex justify-center hover:bg-transparent items-center bg-darkMod-400 text-6xl text-white hover:text-primary-color1 rounded-[6px]"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-label="X"
                  role="img"
                  className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1nao33i r-16y2uox r-lwhw9o hover:text-gray-600"
                  fill="currentColor"
                >
                  <g>
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                  </g>
                </svg>
              </Button>
              <Button
                href="/"
                target="_blank"
                type="link"
                isExternal
                className="w-10 h-10 sm:w-11 sm:h-11 p-2 flex justify-center hover:bg-transparent items-center bg-darkMod-400 text-6xl text-white hover:text-primary-color1 rounded-[6px]"
              >
                <RiTelegram2Fill className="text-6xl" />
              </Button>

              <Button
                href="/"
                target="_blank"
                type="link"
                isExternal
                className="w-10 h-10 sm:w-11 sm:h-11 p-2 flex justify-center hover:bg-transparent items-center bg-darkMod-400 text-6xl text-white hover:text-primary-color1 rounded-[6px]"
              >
                <FaFacebookF className="text-3xl" />
              </Button>
              <Button
                href="/"
                target="_blank"
                type="link"
                isExternal
                className="w-10 h-10 sm:w-11 sm:h-11 p-2 flex justify-center hover:bg-transparent items-center bg-darkMod-400 text-6xl text-white hover:text-primary-color1 rounded-[6px]"
              >
                <FaInstagram className="text-3xl" />
              </Button>
            </div>
          </div>
          <div className="flex flex-col flex-grow basis-[200px]   items-start px-10 gap-8 md:gap-10 justify-start">
            <div className="flex flex-col items-start justify-start">
              <h1 className=" font-semibold dark:text-gray-300 tracking-wider text-xl xl:text-2xl">
                Fast Links
              </h1>
              <span className="block mt-5 w-8 h-1 bg-primary-color1 rounded-xl" />
            </div>
            <div className="flex flex-col justify-between items-start gap-5 md:gap-8">
              <Link
                href="/about-us"
                className="text-gray-600 dark:text-white-100 flex items-center gap-2 transform hover:translate-x-[10px] hover:scale-105 transition-all duration-500  "
              >
                <TbArrowBadgeLeftFilled className=" text-2xl" />
                About us
              </Link>
              <Link
                href="/contact-us"
                className="text-gray-600 dark:text-white-100 flex items-center gap-2 transform hover:translate-x-[10px] hover:scale-105 transition-all duration-500  "
              >
                <TbArrowBadgeLeftFilled className=" text-2xl" />
                Contact us
              </Link>
              <Link
                href="/projects"
                className="text-gray-600 dark:text-white-100 flex items-center gap-2 transform hover:translate-x-[10px] hover:scale-105 transition-all duration-500  "
              >
                <TbArrowBadgeLeftFilled className=" text-2xl" />
                Career
              </Link>
            </div>
          </div>
          <div className="flex flex-col flex-grow dark:text-gray-300  basis-[400px]   items-start px-10 gap-8 md:gap-10 justify-start">
            <div className="flex flex-col items-start justify-start">
              <h1 className=" font-semibold tracking-wider text-xl xl:text-2xl">
                Contact Us
              </h1>
              <span className="block mt-5 w-8 h-1 bg-primary-color1 rounded-xl" />
            </div>
            <div className="text-gray-600 flex flex-col justify-between items-start gap-6 md:gap-8">
              <div className="flex dark:text-white-100 items-center gap-2 transform hover:translate-x-[10px] hover:scale-105 transition-all duration-500 ">
                <FaLocationDot className="text-2xl" />
                Jordan
              </div>
              <div className="flex items-center gap-2 dark:text-white-100 transform hover:translate-x-[10px] hover:scale-105 transition-all duration-500 ">
                <MdOutlineMail className=" text-2xl" />
                info@optimalpathmc.com
              </div>
              <div className="flex items-center gap-2 dark:text-white-100 transform hover:translate-x-[10px] hover:scale-105 transition-all duration-500 ">
                <FaPhoneAlt className=" text-2xl" />
                <span className="whitespace-nowrap">+962797701545 </span>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-[90%] textgray  items-center justify-center absolute bottom-[12px] left-1/2 -translate-x-1/2">
        <span className="basis-[1px] flex-grow h-[1.5px] bg-gray-400" />
        <p className="text-center  font-light text-[14px] px-5 text-gray-600 dark:text-gray-200">
          <span className="text-xl mt-2"> &copy;</span> 2025 Your Company. All
          rights reserved. by{" "}
          <span className="text-[16px] text-primary-color1 font-medium ">
            Optimal
            <span className="text-black ml-1 dark:text-gray-200">Path</span>
          </span>
        </p>
        <span className="basis-[1px] flex-grow h-[1.5px] bg-gray-400" />
      </div>
    </div>
  );
};

export default Footer;
