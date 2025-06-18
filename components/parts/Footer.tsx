"use client";
import Image from "next/image";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaPhoneAlt,
} from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { RiTelegram2Fill } from "react-icons/ri";
import Link from "next/link";
import { images } from "@/constants/images";
import { FaLocationDot } from "react-icons/fa6";
import SubscribeForm from "../forms/SubscribeForm";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("footer");
  const socialLinks = [
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          aria-label="X"
          role="img"
          className="w-5 h-5"
          fill="currentColor"
        >
          <g>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
          </g>
        </svg>
      ),
      href: "/",
    },
    { icon: <RiTelegram2Fill className="text-xl" />, href: "/" },
    { icon: <FaFacebookF className="text-lg" />, href: "/" },
    { icon: <FaInstagram className="text-lg" />, href: "/" },
    { icon: <FaLinkedinIn className="text-lg" />, href: "/" },
  ];

  const contactItems = [
    { icon: <FaLocationDot className="text-xl" />, text: "Jordan" },
    {
      icon: <MdOutlineMail className="text-xl" />,
      text: "info@optimalpathmc.com",
    },
    { icon: <FaPhoneAlt className="text-xl" />, text: "+962 797 701 545" },
  ];

  return (
    <footer className="relative md:px-8  bg-[#f7f7f8]  dark:bg-darkMod-200  dark:text-white pt-12 md:pt-16 pb-16 md:pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-10">
          <div className="space-y-4 md:mr-8 md:space-y-6">
            <div className="flex items-center justify-center md:justify-start">
              <Image
                src={images.logo}
                width={120}
                height={120}
                className="size-10 md:size-12 lg:size-14"
                alt="Optimal Path Logo"
              />
              <p className="ml-3 text-lg md:text-xl font-semibold  text-primary-color1 ">
                Optimal
                <span className="text-[#005078] ml-2 dark:text-white-100">
                  Path
                </span>
              </p>
            </div>
            <p className="text-gray-600  dark:text-gray-300 text-xs md:text-sm leading-relaxed  md:text-center">
              {t("companyDescription")}
            </p>

            {/* Social links - centered on mobile */}
            <div className="flex justify-center md:justify-start space-x-3 md:space-x-4">
              {socialLinks.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  target="_blank"
                  className="p-1.5 md:p-2 rounded-full bg-white dark:bg-darkMod-400 text-gray-700 dark:text-gray-200 hover:bg-primary-color1 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4 md:space-y-6 col-span-1 md:col-span-1 lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white relative inline-block text-center md:text-left">
                  {t("contactUs")}
                  <span className="absolute -bottom-3 left-0 w-8 mt-5 h-0.5 bg-primary-color1 "></span>
                </h3>
                <ul className="mt-6 md:mt-6 space-y-2 md:space-y-4">
                  {contactItems.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start justify-start mt-4 md:justify-start"
                    >
                      <span className="text-primary-color1 dark:text-primary-color2 mt-0.5 mr-2 md:mr-3">
                        {item.icon}
                      </span>
                      <span className="text-gray-600 dark:text-gray-300 text-xs md:text-sm break-all">
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white relative inline-block text-center md:text-left mb-3 md:mb-4">
                  {t("subscribe")}
                  <span className="absolute -bottom-3 left-0 w-8 mt-5 h-0.5 bg-primary-color1 "></span>
                </h3>
                <SubscribeForm />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-[90%] textgray items-center justify-center absolute bottom-[8px] md:bottom-[12px] left-1/2 -translate-x-1/2">
        <span className="basis-[1px] flex-grow h-[1px] md:h-[1.5px] bg-gray-400" />
        <p className="text-center font-light text-xs md:text-[14px] px-3 md:px-5 text-gray-600 dark:text-gray-200">
          <span className="text-lg md:text-xl mt-1 md:mt-2"></span>
          {t("copyright")}{" "}
          <span className="text-sm md:text-[16px] text-primary-color1 font-medium">
            Optimal
            <span className="text-black ml-1 dark:text-gray-200">Path</span>
          </span>
        </p>
        <span className="basis-[1px] flex-grow h-[1px] md:h-[1.5px] bg-gray-400" />
      </div>
    </footer>
  );
};

export default Footer;
