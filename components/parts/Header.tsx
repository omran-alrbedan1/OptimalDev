"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Drawer, Menu } from "antd";
import type { MenuProps } from "antd";
import { Menu as MenuIcon, PhoneIcon, X, User } from "lucide-react";
import { SlInfo } from "react-icons/sl";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { GrHomeRounded } from "react-icons/gr";
import { IoBriefcaseOutline } from "react-icons/io5";
import { ThemeToggler } from "@/components/ui/ThemeToggler";
import { images } from "@/constants/images";
import LanguageSwitcher from "../elements/Switcher";
import { useTranslations } from "next-intl";
import { icons } from "@/constants/icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const Header = () => {
  const t = useTranslations("header");
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const [windowWidth, setWindowWidth] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  const isArabic = path.includes("/ar");

  useEffect(() => {
    setIsClient(true);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 1024 && open) {
        setOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open]);

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  // mobile
  const servicesItems: MenuProps["items"] = [
    {
      key: "group1",
      label: (
        <span style={{ direction: isArabic ? "rtl" : "ltr" }}>
          {t("businessDev")}
        </span>
      ),
      children: [
        {
          key: "item1",
          label: (
            <Link
              href="/services/1"
              style={{ direction: isArabic ? "rtl" : "ltr" }}
            >
              {t("training")}
            </Link>
          ),
        },
        {
          key: "item2",
          label: (
            <Link
              href="/services/2"
              style={{ direction: isArabic ? "rtl" : "ltr" }}
            >
              {t("employment")}
            </Link>
          ),
        },
        {
          key: "item3",
          label: (
            <Link
              href="/services/3"
              style={{ direction: isArabic ? "rtl" : "ltr" }}
            >
              {t("hr")}
            </Link>
          ),
        },
        {
          key: "item4",
          label: (
            <Link
              href="/services/4"
              style={{ direction: isArabic ? "rtl" : "ltr" }}
            >
              {t("webManagement")}
            </Link>
          ),
        },
        {
          key: "item5",
          label: (
            <Link
              href="/services/5"
              style={{ direction: isArabic ? "rtl" : "ltr" }}
            >
              {t("marketing")}
            </Link>
          ),
        },
      ],
    },
    {
      key: "group2",
      label: (
        <span style={{ direction: isArabic ? "rtl" : "ltr" }}>
          {t("personalDev")}
        </span>
      ),
      children: [
        {
          key: "item6",
          label: (
            <Link
              href="/services/6"
              style={{ direction: isArabic ? "rtl" : "ltr" }}
            >
              {t("coaching")}
            </Link>
          ),
        },
        {
          key: "item7",
          label: (
            <Link
              href="/services/7"
              style={{ direction: isArabic ? "rtl" : "ltr" }}
            >
              {t("careerPath")}
            </Link>
          ),
        },
        {
          key: "item8",
          label: (
            <Link
              href="/services/8"
              style={{ direction: isArabic ? "rtl" : "ltr" }}
            >
              {t("internship")}
            </Link>
          ),
        },
      ],
    },
  ];

  // medium devices :
  const services = [
    {
      key: "sub",
      label: (
        <span className="w-fit" style={{ direction: isArabic ? "rtl" : "ltr" }}>
          {t("services")}
        </span>
      ),
      children: [
        {
          key: "sub1",
          label: (
            <span style={{ direction: isArabic ? "rtl" : "ltr" }}>
              {t("businessDev")}
            </span>
          ),
          children: [
            {
              key: "item1",
              label: (
                <Link
                  href="/services/1"
                  style={{ direction: isArabic ? "rtl" : "ltr" }}
                >
                  {t("training")}
                </Link>
              ),
            },
            {
              key: "item2",
              label: (
                <Link
                  href="/services/2"
                  style={{ direction: isArabic ? "rtl" : "ltr" }}
                >
                  {t("employment")}
                </Link>
              ),
            },
            {
              key: "item3",
              label: (
                <Link
                  href="/services/3"
                  style={{ direction: isArabic ? "rtl" : "ltr" }}
                >
                  {t("hr")}
                </Link>
              ),
            },
            {
              key: "item4",
              label: (
                <Link
                  href="/services/4"
                  style={{ direction: isArabic ? "rtl" : "ltr" }}
                >
                  {t("webManagement")}
                </Link>
              ),
            },
            {
              key: "item5",
              label: (
                <Link
                  href="/services/5"
                  style={{ direction: isArabic ? "rtl" : "ltr" }}
                >
                  {t("marketing")}
                </Link>
              ),
            },
          ],
        },
        {
          key: "sub2",
          label: (
            <span style={{ direction: isArabic ? "rtl" : "ltr" }}>
              {t("personalDev")}
            </span>
          ),
          children: [
            {
              key: "item6",
              label: (
                <Link
                  href="/services/6"
                  style={{ direction: isArabic ? "rtl" : "ltr" }}
                >
                  {t("coaching")}
                </Link>
              ),
            },
            {
              key: "item7",
              label: (
                <Link
                  href="/services/7"
                  style={{ direction: isArabic ? "rtl" : "ltr" }}
                >
                  {t("careerPath")}
                </Link>
              ),
            },
            {
              key: "item8",
              label: (
                <Link
                  href="/services/8"
                  style={{ direction: isArabic ? "rtl" : "ltr" }}
                >
                  {t("internship")}
                </Link>
              ),
            },
          ],
        },
      ],
    },
  ];

  if (!isClient) {
    return (
      <header className="fixed top-0 w-full h-16 bg-white dark:bg-darkMod-200 z-50 shadow-md">
        <div className="flex justify-between items-center h-full px-6">
          <div className="w-32 h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 w-full dark:bg-darkMod-200 bg-white z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center h-16 lg:h-24 px-4 lg:px-8">
        <Link
          href="/home"
          className="flex items-center focus:!border-none border-none"
        >
          <Image
            src={images.logo}
            width={windowWidth > 1024 ? 80 : 50}
            height={windowWidth > 1024 ? 30 : 30}
            alt="logo"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-4">
          <nav className="flex items-center">
            <ul className="flex space-x-6">
              {/* Home */}
              <li>
                <Link
                  href="/home"
                  className={`text-[16px] font-medium px-3 py-2 rounded-md transition-colors ${
                    path === "/home"
                      ? "text-primary-color1"
                      : "text-gray-700 dark:text-gray-300 hover:text-primary-color1"
                  }`}
                  style={{ direction: isArabic ? "rtl" : "ltr" }}
                >
                  {t("home")}
                </Link>
              </li>

              {/* About */}
              <li>
                <Link
                  href="/about-us"
                  className={`text-[16px] font-medium px-3 py-2 rounded-md transition-colors ${
                    path === "/about-us"
                      ? "text-primary-color1"
                      : "text-gray-700 dark:text-gray-300 hover:text-primary-color1"
                  }`}
                  style={{ direction: isArabic ? "rtl" : "ltr" }}
                >
                  {t("about")}
                </Link>
              </li>

              {/* Services */}
              <li className=" ">
                <Menu
                  style={{
                    border: "!none",
                  }}
                  className="-mt-2.5 font-semibold !border-none dark:bg-darkMod-200 text-gray-600 hover:!text-primary-color1"
                  mode="vertical"
                  items={services}
                />
              </li>

              {/* Career */}
              <li>
                <Link
                  href="/career"
                  className={`text-[16px] font-medium px-3 py-2 rounded-md transition-colors ${
                    path === "/career"
                      ? "text-primary-color1"
                      : "text-gray-700 dark:text-gray-300 hover:text-primary-color1"
                  }`}
                  style={{ direction: isArabic ? "rtl" : "ltr" }}
                >
                  {t("career")}
                </Link>
              </li>

              {/* Contact */}
              <li>
                <Link
                  href="/contact-us"
                  className={`text-[16px] font-medium px-3 py-2 rounded-md transition-colors ${
                    path === "/contact-us"
                      ? "text-primary-color1"
                      : "text-gray-700 dark:text-gray-300 hover:text-primary-color1"
                  }`}
                  style={{ direction: isArabic ? "rtl" : "ltr" }}
                >
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4 mb-2 ml-4">
            <ThemeToggler />
            <LanguageSwitcher />
          </div>

          <div className="flex items-center mb-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => router.push("/profile")}
                  className="p-2 rounded-full hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <Image
                    src={icons.user}
                    className="h-6 w-6 rounded-full"
                    alt="User profile"
                    width={28}
                    height={28}
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" align="end">
                <p className="text-white">Profile</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        <div className="flex lg:hidden items-center gap-4">
          {/* Mobile Profile Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => router.push("/profile")}
                className="p-2 rounded-full hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <Image
                  src={icons.user}
                  className="h-6 w-6 rounded-full"
                  alt="User profile"
                  width={28}
                  height={28}
                />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="end">
              <p className="text-white">Profile</p>
            </TooltipContent>
          </Tooltip>

          {/* Mobile Menu Button */}
          <button
            className="text-primary-color1 focus:outline-none"
            onClick={showDrawer}
          >
            <MenuIcon className="w-8 h-8" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title={
          <div className="flex justify-between items-center">
            <Link href="/home" className="flex items-center gap-1">
              <Image
                src={images.logo}
                width={50}
                height={40}
                alt="logo"
                priority
              />
              <p className="ml-3 text-lg font-bold text-primary-color1">
                Optimal
                <span className="text-blue-950 ml-1 dark:text-white-100">
                  Path
                </span>
              </p>
            </Link>
            <button onClick={onClose}>
              <X className="text-primary-color1" />
            </button>
          </div>
        }
        placement={isArabic ? "right" : "left"}
        onClose={onClose}
        open={open}
        width={300}
        closable={false}
        className={`dark:bg-darkMod-200 bg-white ${
          isArabic ? "rtl-drawer" : ""
        }`}
        footer={
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700">
            <ThemeToggler />
            <LanguageSwitcher />
          </div>
        }
      >
        <div className="flex flex-col h-full pt-4">
          <Menu
            mode="inline"
            items={[
              {
                key: "/home",
                icon: <GrHomeRounded className="w-5 h-5" />,
                label: (
                  <Link
                    href="/home"
                    className="text-[16px] font-medium text-gray-800 dark:text-gray-200"
                    style={{ direction: isArabic ? "rtl" : "ltr" }}
                  >
                    {t("home")}
                  </Link>
                ),
              },
              {
                key: "/about-us",
                icon: <SlInfo className="w-5 h-5" />,
                label: (
                  <Link
                    href="/about-us"
                    className="text-[16px] font-medium text-gray-800 dark:text-gray-200"
                    style={{ direction: isArabic ? "rtl" : "ltr" }}
                  >
                    {t("about")}
                  </Link>
                ),
              },
              {
                key: "/services",
                icon: <MdOutlineMiscellaneousServices className="w-5 h-5" />,
                label: (
                  <span
                    className="text-[16px] font-medium text-gray-800 dark:text-gray-200"
                    style={{ direction: isArabic ? "rtl" : "ltr" }}
                  >
                    {t("services")}
                  </span>
                ),
                children: servicesItems.map((group: any) => ({
                  ...group,
                  children: group.children.map((child: any) => ({
                    ...child,
                    label: (
                      <Link
                        href={child.label.props.href}
                        className="flex items-center gap-3 ml-2"
                        style={{ direction: isArabic ? "rtl" : "ltr" }}
                      >
                        <span className="text-gray-700 dark:text-gray-300">
                          {child.label.props.children}
                        </span>
                      </Link>
                    ),
                  })),
                })),
              },
              {
                key: "/career",
                icon: <IoBriefcaseOutline className="w-5 h-5" />,
                label: (
                  <Link
                    href="/career"
                    className="text-[16px] font-medium text-gray-800 dark:text-gray-200"
                    style={{ direction: isArabic ? "rtl" : "ltr" }}
                  >
                    {t("career")}
                  </Link>
                ),
              },
              {
                key: "/contact-us",
                icon: <PhoneIcon className="w-5 h-5" />,
                label: (
                  <Link
                    href="/contact-us"
                    className="text-[16px] font-medium text-gray-800 dark:text-gray-200"
                    style={{ direction: isArabic ? "rtl" : "ltr" }}
                  >
                    {t("contact")}
                  </Link>
                ),
              },
              {
                key: "/profile",
                icon: <User className="w-5 h-5" />,
                label: (
                  <Link
                    href="/profile"
                    className="text-[16px] font-medium text-gray-800 dark:text-gray-200"
                    style={{ direction: isArabic ? "rtl" : "ltr" }}
                  >
                    Profile
                  </Link>
                ),
              },
            ]}
            selectedKeys={[path]}
            defaultOpenKeys={path.startsWith("/services") ? ["/services"] : []}
            className={`border-r-0 [&_.ant-menu-item]:!h-12 [&_.ant-menu-submenu-title]:!h-12 ${
              isArabic ? "rtl-menu" : ""
            }`}
            style={{ direction: isArabic ? "rtl" : "ltr" }}
          />
        </div>
      </Drawer>
    </header>
  );
};

export default Header;
