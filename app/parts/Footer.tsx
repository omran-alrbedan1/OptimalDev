

import Image from "next/image";
import React from "react";

import { FaInstagram } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { TbArrowBadgeLeftFilled } from "react-icons/tb";
import Button from "../elements/Button/button";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="relative min-h-[60vh] w-full">
      <img
        className="absolute w-full h-full object-fill"
        src="/assets/footer-bg.png"
      />
      <div className="absolute w-full h-full bg-[#1f4d92]/70" />
      <div className="relative w-full h-full pt-12 md:pt-20 overflow-hidden md:px-2 lg:px-4 xl:px-10 pb-5">
        <div className="flex flex-wrap items-stretch gap-14">
          <div className="flex flex-col flex-grow basis-[400px]  items-start gap-6 md:gap-8 px-10 justify-start">
            <div className="flex items-center justify-center">
              <Image
                src={"/logos/logo with text dark.png"}
                width={230}
                height={230}
                className="mb-5"
                alt="logo"
              />
            </div>
            <p className="text-[#BBBBBB] text-start ">
              Growing your business with strategic design and innovative
              solutions. Let’s elevate your brand together.
            </p>
            <div className="flex items-center justify-between gap-5">
              <Button
                href="https://github.com/racmathafidz"
                target="_blank"
                type="link"
                isExternal
                className="w-11 h-11 p-2 flex justify-center hover:bg-transparent items-center bg-darkMod-400 text-6xl text-white rounded-[6px]"
              >
                <FaGithub className="text-6xl" />
              </Button>
              <Button
                href="https://www.linkedin.com/in/racmat-hafidz-89982a156/"
                target="_blank"
                type="link"
                isExternal
                className="w-11 h-11 p-2 flex justify-center hover:bg-transparent items-center bg-darkMod-400 text-6xl text-white rounded-[6px]"
              >
                <FaLinkedinIn className="text-2xl" />
              </Button>
              <Button
                href="https://github.com/racmathafidz"
                target="_blank"
                type="link"
                isExternal
                className="w-11 h-11 p-2 flex justify-center hover:bg-transparent items-center bg-darkMod-400 text-6xl text-white rounded-[6px]"
              >
                <FaFacebookF className="text-3xl" />
              </Button>
              <Button
                href="https://www.instagram.com/racmathafidz/"
                target="_blank"
                type="link"
                isExternal
                className="w-11 h-11 p-2 flex justify-center hover:bg-transparent items-center bg-darkMod-400 text-6xl text-white rounded-[6px]"
              >
                <FaInstagram className="text-3xl" />
              </Button>
            </div>
          </div>
          <div className="flex flex-col flex-grow basis-[200px]   items-start px-10 gap-8 md:gap-10 justify-start">
            <div className="flex flex-col items-start justify-start">
              <h1 className="text-white font-semibold tracking-wider text-xl xl:text-2xl">
                Fast Links
              </h1>
              <span className="block mt-5 w-8 h-1 bg-primary-color1 rounded-xl" />
            </div>
            <div className="flex flex-col justify-between items-start gap-5 md:gap-8">
              <Link
                href="/about-us"
                className="flex items-center gap-2 transform hover:translate-x-[10px] hover:scale-105 transition-all duration-700 hover:text-white-100 text-[#BBBBBB]"
              >
                <TbArrowBadgeLeftFilled className="text-[#BBBBBB] text-2xl" />
                About us
              </Link>
              <Link
                href="/contact-us"
                className="flex items-center gap-2 transform hover:translate-x-[10px] hover:scale-105 transition-all duration-700 hover:text-white-100 text-[#BBBBBB]"
              >
                <TbArrowBadgeLeftFilled className="text-[#BBBBBB] text-2xl" />
                Contact us
              </Link>
              <Link
                href="/projects"
                className="flex items-center gap-2 transform hover:translate-x-[10px] hover:scale-105 transition-all duration-700 hover:text-white-100 text-[#BBBBBB]"
              >
                <TbArrowBadgeLeftFilled className="text-[#BBBBBB] text-2xl" />
                Projects
              </Link>
              <Link
                href="/services"
                className="flex items-center gap-2 transform hover:translate-x-[10px] hover:scale-105 transition-all duration-700 hover:text-white-100 text-[#BBBBBB]"
              >
                <TbArrowBadgeLeftFilled className="text-[#BBBBBB] text-2xl" />
                Services
              </Link>
            </div>
          </div>
          <div className="flex flex-col flex-grow basis-[400px]   items-start px-10 gap-8 md:gap-10 justify-start">
            <div className="flex flex-col items-start justify-start">
              <h1 className="text-white font-semibold tracking-wider text-xl xl:text-2xl">
                Contact Us
              </h1>
              <span className="block mt-5 w-8 h-1 bg-primary-color1 rounded-xl" />
            </div>
            <div className="flex flex-col justify-between items-start gap-6 md:gap-8">
              <div className="flex items-center gap-2 transform hover:translate-x-[10px] hover:scale-105 transition-all duration-700 hover:text-white-100 text-[#BBBBBB]">
                <FaLocationDot className="text-white text-2xl" />
                Damascus, Syria
              </div>
              <div className="flex items-center gap-2 transform hover:translate-x-[10px] hover:scale-105 transition-all duration-700 hover:text-white-100 text-[#BBBBBB]">
                <MdOutlineMail className="text-white text-2xl" />
                info@hivetech.space
              </div>
              <div className="flex items-center gap-2 transform hover:translate-x-[10px] hover:scale-105 transition-all duration-700 hover:text-white-100 text-[#BBBBBB]">
                <FaPhoneAlt className="text-white text-2xl" />
                <span className="whitespace-nowrap">+963937954969 /</span>{" "}
                <span className="whitespace-nowrap">+963 954 872 922</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-[90%]  items-center justify-center mx-auto mt-14">
          <span className="basis-[1px] flex-grow h-[1.5px] bg-darkMod-400"/>
          <p className="text-[#BBBBBB] text-center font-light text-[14px] px-5">
          &copy; 2025 Your Company. All rights reserved. by <span className='text-[16px] text-primary-color1 font-medium '>Hive<span className='text-black'>Tech</span></span>
          </p>
          <span className="basis-[1px] flex-grow h-[1.5px] bg-darkMod-400"/>
        </div>
      </div>
    </div>
  );
};

export default Footer;
