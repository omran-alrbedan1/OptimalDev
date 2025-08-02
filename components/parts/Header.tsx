"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Drawer, Menu } from "antd";
import type { MenuProps } from "antd";
import { Menu as MenuIcon, PhoneIcon, X, User } from "lucide-react";
import { SlInfo } from "react-icons/sl";
import {
  MdKeyboardArrowDown,
  MdOutlineMiscellaneousServices,
} from "react-icons/md";
import { GrHomeRounded } from "react-icons/gr";
import { IoBriefcaseOutline } from "react-icons/io5";
import { ThemeToggler } from "@/components/ui/ThemeToggler";
import { images } from "@/constants/images";
import { useTranslations } from "next-intl";
import { icons } from "@/constants/icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import LanguageSwitcher from "../elements/Switcher";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useFetch } from "@/hooks/useFetch";
import { fetchServices } from "@/lib/client-action";

const Header = () => {
  const t = useTranslations("header");
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const [windowWidth, setWindowWidth] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth(true);

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

  const { data: services } = useFetch<Service[]>(fetchServices);

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  const isActive = (href: string) => {
    return path === href || path.includes(`${href}`);
  };

  const activeLink = "text-primary-color1 font-bold";
  const inActiveLink =
    "text-gray-700 dark:text-gray-300 hover:text-primary-color1";

  // mobile
  const servicesItems: MenuProps["items"] =
    services?.map((service) => ({
      key: `group-${service.id}`,
      label: (
        <span style={{ direction: isArabic ? "rtl" : "ltr" }}>
          {service.name}
        </span>
      ),
      children: service.sub_services.map((subService) => ({
        key: `item-${subService.id}`,
        label: (
          <Link
            href={`/services/${subService.id}`}
            style={{ direction: isArabic ? "rtl" : "ltr" }}
            className={`${
              isActive(`/services/${subService.id}`)
                ? "text-primary-color1 shadow-sm"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            {subService.name}
          </Link>
        ),
      })),
    })) || [];

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
      <div className=" max-w-[85rem] mx-auto flex justify-between items-center h-[75px] lg:h-24 px-4 lg:px-4">
        <Link
          href="/home"
          className="flex items-center gap-2 focus:!border-none border-none"
        >
          <Image
            src={images.logo}
            width={windowWidth > 1024 ? 300 : 200}
            height={windowWidth > 1024 ? 100 : 200}
            alt="logo"
            priority
            className="focus:!border-none"
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
                    isActive("/home") ? activeLink : inActiveLink
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
                    isActive("/about-us") ? activeLink : inActiveLink
                  }`}
                  style={{ direction: isArabic ? "rtl" : "ltr" }}
                >
                  {t("about")}
                </Link>
              </li>
              <li className="relative">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={`text-[16px] font-medium px-3 focus:!outline-none rounded-md transition-colors flex items-center gap-1 ${
                        isActive("/services") ? activeLink : inActiveLink
                      }`}
                      style={{ direction: isArabic ? "rtl" : "ltr" }}
                    >
                      {t("services")}{" "}
                      <MdKeyboardArrowDown className="mt-1 ml-1" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-56 min-w-[14rem] bg-white dark:bg-darkMod-200 !shadow-xl !border-none rounded-md p-1.5"
                    align={isArabic ? "end" : "start"}
                  >
                    {services?.map((service) => (
                      <DropdownMenuSub key={service.id}>
                        <DropdownMenuSubTrigger className="p-2 text-sm rounded-sm flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-800 dark:text-gray-200">
                          {service.name}
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent
                          className="w-full bg-white dark:bg-darkMod-200 shadow-xl border-none !rounded-lg p-1.5 ml-1"
                          sideOffset={isArabic ? -4 : 4}
                        >
                          {service.sub_services.map((subService) => (
                            <DropdownMenuItem
                              key={subService.id}
                              className={`px-2 p-2 text-sm rounded-sm hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-800 dark:text-gray-200 focus:bg-gray-100 dark:focus:bg-gray-700/50 ${
                                isActive(`/services/${subService.id}`)
                                  ? `${activeLink} bg-blue-100/90`
                                  : ""
                              }`}
                              asChild
                            >
                              <Link
                                href={`/services/${subService.id}`}
                                className="w-full"
                              >
                                {subService.name}
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
              {/* Career */}
              <li>
                <Link
                  href="/career"
                  className={`text-[16px] font-medium px-3 py-2 rounded-md transition-colors ${
                    isActive("/career") ? activeLink : inActiveLink
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
                    isActive("/contact-us") ? activeLink : inActiveLink
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

          {isAuthenticated ? (
            <div className="flex items-center mb-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => router.push("/profile")}
                    className={`p-2 rounded-full hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      isActive("/profile") ? "shadow-md" : ""
                    }`}
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
          ) : (
            <div className="flex items-center gap-2 ml-4">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium !rounded-[3px] border border-primary-color1  text-primary-color1 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {t("login")}
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 text-sm font-medium !rounded-[3px] text-white bg-primary-color1  hover:bg-primary-color1/90"
              >
                {t("register")}
              </Link>
            </div>
          )}
        </div>

        <div className="flex lg:hidden items-center gap-4">
          {/* Mobile Profile Button */}
          {isAuthenticated && (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => router.push("/profile")}
                  className={`p-2 rounded-full hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    isActive("/profile") ? "shadow-md" : ""
                  }`}
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
          )}

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
                width={200}
                height={200}
                alt="logo"
                priority
                className="-my-20 -mt-20 -ml-4"
              />
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
          <div className="flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700">
              <ThemeToggler />
              <LanguageSwitcher />
            </div>
          </div>
        }
      >
        <div className="flex flex-col h-full -ml-4">
          <Menu
            mode="inline"
            items={[
              {
                key: "/home",
                icon: (
                  <GrHomeRounded
                    className={cn(
                      "w-6 h-5",
                      isActive("/home") ? "!text-primary-color1" : ""
                    )}
                  />
                ),
                label: (
                  <Link
                    href="/home"
                    className={`text-[16px] font-medium ${
                      isActive("/home")
                        ? "!text-primary-color1 shadow-sm "
                        : "text-gray-800 dark:text-gray-200"
                    }`}
                    style={{ direction: isArabic ? "rtl" : "ltr" }}
                  >
                    {t("home")}
                  </Link>
                ),
              },
              {
                key: "/about-us",
                icon: (
                  <SlInfo
                    className={cn(
                      "w-6 h-5",
                      isActive("/about-us") ? "!text-primary-color1" : ""
                    )}
                  />
                ),
                label: (
                  <Link
                    href="/about-us"
                    className={`text-[16px] font-medium ${
                      isActive("/about-us")
                        ? "!text-primary-color1 shadow-sm"
                        : "text-gray-800 dark:text-gray-200"
                    }`}
                    style={{ direction: isArabic ? "rtl" : "ltr" }}
                  >
                    {t("about")}
                  </Link>
                ),
              },
              {
                key: "/services",
                icon: (
                  <MdOutlineMiscellaneousServices
                    className={cn(
                      "w-5 h-5",
                      isActive("/services") ? "!text-primary-color1" : ""
                    )}
                  />
                ),
                label: (
                  <span
                    className={`text-[16px] font-medium ${
                      isActive("/services")
                        ? "!text-primary-color1 shadow-sm"
                        : "text-gray-800 dark:text-gray-200"
                    }`}
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
                        className={`flex items-center gap-3 ml-2 ${
                          isActive(child.label.props.href)
                            ? "text-primary-color1 shadow-sm"
                            : ""
                        }`}
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
                icon: (
                  <IoBriefcaseOutline
                    className={cn(
                      "w-6 h-5",
                      isActive("/career") ? "!text-primary-color1" : ""
                    )}
                  />
                ),
                label: (
                  <Link
                    href="/career"
                    className={`text-[16px] font-medium ${
                      isActive("/career")
                        ? "!text-primary-color1 shadow-sm"
                        : "text-gray-800 dark:text-gray-200"
                    }`}
                    style={{ direction: isArabic ? "rtl" : "ltr" }}
                  >
                    {t("career")}
                  </Link>
                ),
              },
              {
                key: "/contact-us",
                icon: (
                  <PhoneIcon
                    className={cn(
                      "w-6 h-5",
                      isActive("/contact-us") ? "!text-primary-color1" : ""
                    )}
                  />
                ),
                label: (
                  <Link
                    href="/contact-us"
                    className={`text-[16px] font-medium ${
                      isActive("/contact-us")
                        ? "!text-primary-color1 shadow-sm"
                        : "text-gray-800 dark:text-gray-200"
                    }`}
                    style={{ direction: isArabic ? "rtl" : "ltr" }}
                  >
                    {t("contact")}
                  </Link>
                ),
              },
              {
                key: "/profile",
                icon: (
                  <User
                    className={cn(
                      "w-6 h-5",
                      isActive("/profile") ? "!text-primary-color1" : ""
                    )}
                  />
                ),
                label: (
                  <Link
                    href="/profile"
                    className={`text-[16px] font-medium ${
                      isActive("/profile")
                        ? "!text-primary-color1 shadow-sm"
                        : "text-gray-800 dark:text-gray-200"
                    }`}
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
          {!isAuthenticated && (
            <div className="flex items-center w-full justify-evenly mt-24  gap-2">
              <Link
                href="/login"
                className=" py-1.5 text-sm font-medium border border-primary-color1 px-8   rounded-md text-primary-color1 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {t("login")}
              </Link>
              <Link
                href="/register"
                className="px-8 py-1.5 text-sm font-medium text-white bg-primary-color1 rounded-md hover:bg-primary-color1/90"
              >
                {t("register")}
              </Link>
            </div>
          )}
        </div>
      </Drawer>
    </header>
  );
};

export default Header;
