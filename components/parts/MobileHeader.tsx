import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Drawer, Menu } from "antd";
import { Menu as MenuIcon, PhoneIcon, X, User, LogOut } from "lucide-react";
import { SlInfo } from "react-icons/sl";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { GrHomeRounded } from "react-icons/gr";
import { IoBriefcaseOutline } from "react-icons/io5";
import { ThemeToggler } from "@/components/ui/ThemeToggler";
import { images } from "@/constants/images";
import LanguageSwitcher from "../elements/Switcher";
import { cn } from "@/lib/utils";
import { useFetch } from "@/hooks/useFetch";
import { fetchServices } from "@/lib/client-action";
import { getUserAvatar } from "./avatar";

interface MobileHeaderProps {
  t: any;
  user: any;
  isAuthenticated: boolean;
  onLogout: () => void;
}

const MobileHeader = ({
  t,
  user,
  isAuthenticated,
  onLogout,
}: MobileHeaderProps) => {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const router = useRouter();
  const { data: services } = useFetch<Service[]>(fetchServices);

  const isArabic = path.includes("/ar");
  const isCareerPage = path.includes("/career");

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  const isActive = (href: string) => path === href || path.includes(href);

  // Mobile menu items
  const servicesItems =
    services?.map((service) => ({
      key: `group-${service.id}`,
      label: service.name,
      children: service.sub_services.map((subService) => ({
        key: `item-${subService.id}`,
        label: (
          <Link href={`/services/${subService.id}`} onClick={onClose}>
            {subService.name}
          </Link>
        ),
      })),
    })) || [];

  const menuItems = [
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
        <Link href="/home" onClick={onClose}>
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
        <Link href="/about-us" onClick={onClose}>
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
      label: t("services"),
      children: servicesItems,
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
        <Link href="/career" onClick={onClose}>
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
        <Link href="/contact-us" onClick={onClose}>
          {t("contact")}
        </Link>
      ),
    },
    ...(isAuthenticated
      ? [
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
              <Link href="/profile" onClick={onClose}>
                Profile
              </Link>
            ),
          },
          {
            key: "logout",
            icon: <LogOut className="w-6 h-5" />,
            label: (
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
              >
                Logout
              </button>
            ),
          },
        ]
      : []),
  ];

  return (
    <header className="lg:hidden fixed top-0 w-full dark:bg-darkMod-200 bg-white z-50 shadow-md">
      <div className="flex justify-between items-center h-[60px] px-4">
        {/* Logo */}
        <Link href="/home" className="flex items-center gap-2">
          <Image
            src={images.logo}
            width={200}
            height={60}
            alt="logo"
            priority
          />
        </Link>

        <div className="flex items-center gap-4">
          {/* Mobile Profile */}
          {isAuthenticated && getUserAvatar(user, "sm")}

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
          <div className="flex justify-between items-center -my-20">
            <Link
              href="/home"
              className="flex items-center gap-1"
              onClick={onClose}
            >
              <Image
                src={images.logo}
                width={200}
                height={200}
                alt="logo"
                priority
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
        className="dark:bg-darkMod-200 bg-white"
        footer={
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700">
            <ThemeToggler />
            <LanguageSwitcher />
          </div>
        }
      >
        <div className="flex flex-col h-full -ml-4">
          {/* User Info Section */}
          {isAuthenticated && user && (
            <div className="flex items-center gap-3 p-4 mb-4">
              {getUserAvatar(user, "md")}
              <div className="flex flex-col flex-1">
                <span className="font-medium dark:text-gray-200 text-sm">
                  {user.first_name} {user.last_name}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user.email}
                </span>
              </div>
            </div>
          )}

          <Menu
            mode="inline"
            items={menuItems}
            selectedKeys={[path]}
            defaultOpenKeys={path.startsWith("/services") ? ["/services"] : []}
            className="border-r-0 [&_.ant-menu-item]:!h-12 [&_.ant-menu-submenu-title]:!h-12"
          />

          {!isAuthenticated && isCareerPage && (
            <div className="flex items-center justify-evenly mt-24 gap-2">
              <Link
                href="/login"
                onClick={onClose}
                className="py-1.5 text-sm font-medium border border-primary-color1 px-8 rounded-md text-primary-color1"
              >
                {t("login")}
              </Link>
              <Link
                href="/register"
                onClick={onClose}
                className="px-8 py-1.5 text-sm font-medium text-white bg-primary-color1 rounded-md"
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

export default MobileHeader;
