"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "../../app/elements/Button/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ThemeToggler } from "@/components/ui/ThemeToggler";
import { images } from "@/constants/images";

import { Drawer } from "antd";
import { Menu, X } from "lucide-react";
import { Home, Users, Briefcase, Phone, HelpCircle } from "lucide-react";

const Header = () => {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const [windowWidth, setWindowWidth] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      // Set initial width
      setWindowWidth(window.innerWidth);

      // Handle window resize
      const handleResize = () => {
        const newWidth = window.innerWidth;
        setWindowWidth(newWidth);

        // Close drawer if window is resized to larger than mobile size
        if (newWidth >= 1024 && open) {
          setOpen(false);
        }
      };

      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, [open]);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const navItems = [
    { name: "Home", path: "/home", icon: <Home className="w-5 h-5" /> },
    {
      name: "About Us",
      path: "/about-us",
      icon: <Users className="w-5 h-5" />,
    },
    {
      name: "Our Services",
      path: "/",
      icon: <HelpCircle className="w-5 h-5" />,
    },
    { name: "Career", path: "/", icon: <Briefcase className="w-5 h-5" /> },
    {
      name: "Contact Us",
      path: "/contact-us",
      icon: <Phone className="w-5 h-5" />,
    },
  ];

  if (!isClient) {
    // Return a simplified version during SSR
    return (
      <header className="fixed top-0 w-full h-16 bg-white dark:bg-darkMod-200 z-50 shadow-md">
        {/* Placeholder for SSR */}
        <div className="flex justify-between items-center h-full px-6">
          <div className="w-32 h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </header>
    );
  }

  return (
    <div className="">
      <header
        className={`header fixed flex top-0 md:px-16 lg:-top-[20px] dark:bg-darkMod-200 bg-white z-50 min-w-full lg:h-[15vh] shadow-md transition-all duration-900 ease-linear`}
      >
        <div className={`flex justify-between px-6 lg:px-0 border-none`}>
          <Link href={"/home"} className="dark:hidden block">
            <Image
              src={images.logo}
              width={windowWidth > 768 ? 240 : windowWidth > 1024 ? 240 : 140}
              height={windowWidth > 768 ? 170 : windowWidth > 1024 ? 210 : 150}
              alt="logo"
              priority
            />
          </Link>
          <Link href={"/home"} className="hidden dark:block">
            <Image
              src={images.dark_logo}
              width={windowWidth > 768 ? 240 : windowWidth > 1024 ? 240 : 140}
              height={windowWidth > 768 ? 170 : windowWidth > 1024 ? 210 : 150}
              alt="dark logo"
              priority
            />
          </Link>
          <div className="flex items-center justify-end gap-5">
            <span className="lg:hidden">
              <ThemeToggler />
            </span>

            <button
              className="block text-primary-color1 lg:hidden focus:outline-none"
              onClick={showDrawer}
            >
              <Menu className="w-8 h-8" />
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden tracking-widest items-center lg:flex flex-row mt-0">
          {navItems.map((item) => (
            <li key={item.name}>
              <Button
                className={`${
                  path === item.path ? "active-link" : ""
                } text-[16px] font-medium px-5 no-underline hover:text-primary-color1`}
                type="link"
                href={item.path}
              >
                {item.name}
              </Button>
            </li>
          ))}
          <li className="">
            <ThemeToggler />
          </li>
        </ul>

        {/* Mobile Drawer */}
        <Drawer
          title={
            <div className="flex justify-between items-center">
              <Link href={"/home"} className="dark:hidden block">
                <Image
                  src={images.logo}
                  width={140}
                  height={150}
                  alt="logo"
                  priority
                />
              </Link>
              <Link href={"/home"} className="hidden dark:block">
                <Image
                  src={images.dark_logo}
                  width={140}
                  height={150}
                  alt="dark logo"
                  priority
                />
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
          className="dark:bg-darkMod-200 hidden bg-gray-100"
        >
          <div className="flex flex-col h-full pt-4">
            <ul className="flex-1 space-y-3">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Button
                    className={`
                      flex items-center gap-4 px-2 py-3 rounded-lg transition-all
                      text-[17px] font-medium w-full text-left
                      ${
                        path === item.path
                          ? "bg-primary-color1/10 text-primary-color1 border-l-4 border-primary-color1"
                          : "dark:text-gray-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-darkMod-300"
                      }
                      hover:translate-x-1 hover:shadow-sm
                    `}
                    type="link"
                    href={item.path}
                    onClick={onClose}
                  >
                    <span
                      className={
                        path === item.path
                          ? "text-primary-color1"
                          : "text-gray-500 dark:text-gray-400"
                      }
                    >
                      {item.icon}
                    </span>
                    {item.name}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </Drawer>
      </header>
    </div>
  );
};

export default Header;
