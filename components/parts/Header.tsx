//@ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Button from "../../app/elements/Button/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ThemeToggler } from "@/components/ui/ThemeToggler";
import { images } from "@/constants/images";

import { Drawer, Menu } from "antd";
import type { MenuProps } from "antd";
import { Menu as MenuIcon, PhoneIcon, X } from "lucide-react";
import { SlInfo } from "react-icons/sl";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { GrHomeRounded } from "react-icons/gr";
import { IoBriefcaseOutline } from "react-icons/io5";
import Switcher from "../elements/Switcher";
const Header = () => {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const [windowWidth, setWindowWidth] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 1024 && open) {
        setOpen(false);
      }
    };

    // Initialize width
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open]);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const servicesItems: MenuProps["items"] = [
    {
      key: "group1",
      label: "Business Development",
      children: [
        {
          key: "item1",
          label: <Link href="/services/1">Training</Link>,
        },
        {
          key: "item2",
          label: <Link href="/services/2">Employment</Link>,
        },
        {
          key: "item3",
          label: <Link href="/services/3">Human Resources</Link>,
        },
        {
          key: "item4",
          label: <Link href="/services/4">Website Management</Link>,
        },
        {
          key: "item5",
          label: <Link href="/services/5">Marketing Solutions</Link>,
        },
      ],
    },
    {
      key: "group2",
      label: "Personal Development",
      children: [
        {
          key: "item6",
          label: <Link href="/services/6">Life Coaching</Link>,
        },
        {
          key: "item7",
          label: <Link href="/services/7">Career Path</Link>,
        },
        {
          key: "item8",
          label: <Link href="/services/8">Internship</Link>,
        },
      ],
    },
  ];

  const navItems = [
    {
      name: "Home",
      path: "/home",
      icon: <GrHomeRounded className="w-5 h-5" />,
    },
    {
      name: "About Us",
      path: "/about-us",
      icon: <SlInfo className="w-5 h-5" />,
    },
    {
      name: "Our Services",
      path: "/services",
      icon: <MdOutlineMiscellaneousServices className="w-5 h-5" />,
      children: servicesItems,
    },
    {
      name: "Career",
      path: "/career",
      icon: <IoBriefcaseOutline className="w-5 h-5" />,
    },
    {
      name: "Contact Us",
      path: "/contact-us",
      icon: <PhoneIcon className="w-5 h-5" />,
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
        <Link href="/home" className="flex items-center">
          <Image
            src={images.logo}
            width={windowWidth > 1024 ? 80 : 50}
            height={windowWidth > 1024 ? 30 : 30}
            alt="logo"
            priority
          />
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          <nav className="flex items-center">
            <ul className="flex space-x-6">
              {navItems.slice(0, 2).map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className={`text-[16px] font-medium px-3 py-2 rounded-md transition-colors ${
                      path === item.path
                        ? "text-primary-color1"
                        : "text-gray-700 dark:text-gray-300 hover:text-primary-color1"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}

              {/* Our Services Menu */}
              <li className="">
                <Menu
                  mode="horizontal"
                  items={[
                    {
                      key: "services",
                      label: (
                        <span
                          className={`text-[16px] font-medium focus:no-underline hover:no-underline px-3 py-2 rounded-md transition-colors ${
                            path.startsWith("/services")
                              ? "text-primary-color1"
                              : "text-gray-700 dark:text-gray-300 hover:text-primary-color1"
                          }`}
                        >
                          Our Services
                        </span>
                      ),
                      children: servicesItems,
                    },
                  ]}
                  className="no-underline-menu   dark:bg-darkMod-200"
                  style={{
                    borderBottom: "none",
                    lineHeight: "normal",
                    minWidth: "150px",
                  }}
                />
              </li>

              {navItems.slice(3).map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className={`text-[16px] font-medium px-3 py-2 rounded-md transition-colors ${
                      path === item.path
                        ? "text-primary-color1"
                        : "text-gray-700 dark:text-gray-300  hover:text-primary-color1"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggler />
        </div>

        <div className="flex lg:hidden items-center gap-4">
          <ThemeToggler />
          <button
            className="text-primary-color1 focus:outline-none"
            onClick={showDrawer}
          >
            <MenuIcon className="w-8 h-8" />
          </button>
        </div>
      </div>

      <Drawer
        title={
          <div className="flex justify-between items-center">
            <Link href="/home" className=" items-center gap-1 flex">
              <Image
                src={images.logo}
                width={50}
                height={40}
                alt="logo"
                priority
              />
              <p className="ml-3 text-lg md:text-xl font-bold  text-primary-color1 ">
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
        placement="left"
        onClose={onClose}
        open={open}
        width={300}
        closable={false}
        className="dark:bg-darkMod-200 bg-white"
      >
        <div className="flex flex-col h-full pt-2 -ml-3">
          <Menu
            mode="inline"
            items={navItems.map((item) => {
              if (item.children) {
                return {
                  key: item.path,
                  icon: React.cloneElement(item.icon, { className: "w-5 h-5" }),
                  label: (
                    <span className="text-[16px]  font-medium text-gray-800 dark:text-gray-200">
                      {item.name}
                    </span>
                  ),
                  children: item.children.map((child) => ({
                    ...child,
                    label: (
                      <div className="flex items-center gap-3 ml-2">
                        {child?.icon ? (
                          React.cloneElement(child.icon, {
                            className:
                              "w-4 h-4 text-gray-600 dark:text-gray-400",
                          })
                        ) : (
                          <></>
                        )}
                        <span className="text-gray-700 dark:text-gray-300">
                          {child?.label}
                        </span>
                      </div>
                    ),
                  })),
                };
              }
              return {
                key: item.path,
                icon: React.cloneElement(item.icon, { className: "w-5 h-5" }),
                label: (
                  <Link
                    href={item.path}
                    className="text-[16px] p-2 pt-4 font-medium text-gray-800 dark:text-gray-200 hover:text-primary-color1 dark:hover:text-primary-color1"
                  >
                    {item.name}
                  </Link>
                ),
              };
            })}
            selectedKeys={[path]}
            defaultOpenKeys={path.startsWith("/services") ? ["/services"] : []}
            className="border-r-0  py-2 [&_.ant-menu-item]:!pl-4 [&_.ant-menu-submenu-title]:!pl-4 [&_.ant-menu-item]:!h-12 [&_.ant-menu-submenu-title]:!h-12 [&_.ant-menu-item]:!flex [&_.ant-menu-item]:!items-center [&_.ant-menu-submenu-title]:!flex [&_.ant-menu-submenu-title]:!items-center"
            theme="light"
            style={{
              background: "transparent",
            }}
          />
        </div>
      </Drawer>
    </header>
  );
};

export default Header;
