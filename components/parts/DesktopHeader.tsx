import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { MdKeyboardArrowDown } from "react-icons/md";
import { ThemeToggler } from "@/components/ui/ThemeToggler";
import { images } from "@/constants/images";
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
import { useFetch } from "@/hooks/useFetch";
import { fetchServices } from "@/lib/client-action";
import { getUserAvatar } from "./avatar";

interface DesktopHeaderProps {
  t: any;
  user: any;
  isAuthenticated: boolean;
  onLogout: () => void;
}

const DesktopHeader = ({
  t,
  user,
  isAuthenticated,
  onLogout,
}: DesktopHeaderProps) => {
  const path = usePathname();
  const router = useRouter();
  const { data: services } = useFetch<Service[]>(fetchServices);

  const isArabic = path.includes("/ar");
  const isCareerPage = path.includes("/career");

  const isActive = (href: string) => path === href || path.includes(href);
  const activeLink = "text-primary-color1 font-bold";
  const inActiveLink =
    "text-gray-700 dark:text-gray-300 hover:text-primary-color1";

  const navItems = [
    { href: "/home", label: t("home") },
    { href: "/about-us", label: t("about") },
    { href: "/career", label: t("career") },
    { href: "/contact-us", label: t("contact") },
  ];

  return (
    <header className="hidden lg:block fixed top-0 w-full dark:bg-darkMod-200 bg-white z-50 shadow-md">
      <div className="max-w-[85rem] mx-auto flex justify-between items-center h-[90px] px-4">
        {/* Logo */}
        <Link href="/home" className="flex items-center gap-2">
          <Image
            src={images.logo}
            width={300}
            height={90}
            alt="logo"
            priority
          />
        </Link>

        <div className="flex items-center gap-4">
          {/* Navigation */}
          <nav className="flex items-center">
            <ul className="flex space-x-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-[16px] font-medium px-3 py-2 rounded-md transition-colors ${
                      isActive(item.href) ? activeLink : inActiveLink
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}

              {/* Services Dropdown */}
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={`text-[16px] font-medium px-3 focus:outline-none rounded-md transition-colors flex items-center gap-1 ${
                        isActive("/services") ? activeLink : inActiveLink
                      }`}
                    >
                      {t("services")}{" "}
                      <MdKeyboardArrowDown className="mt-1 ml-1" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white dark:bg-darkMod-200 border-none shadow-xl rounded-md p-1.5">
                    {services?.map((service) => (
                      <DropdownMenuSub key={service.id}>
                        <DropdownMenuSubTrigger className="p-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700/50">
                          {service.name}
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent className="w-full bg-white border-none dark:bg-darkMod-200 shadow-xl rounded-lg p-1.5 ml-1">
                          {service.sub_services.map((subService) => (
                            <DropdownMenuItem key={subService.id} asChild>
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
            </ul>
          </nav>

          {/* Theme and Language */}
          <div className="flex items-center gap-4 ml-4">
            <ThemeToggler />
            <LanguageSwitcher />
          </div>

          {/* User Profile or Auth Buttons */}
          {isAuthenticated ? (
            <button
              onClick={() => router.push("/profile")}
              className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none"
            >
              {getUserAvatar(user, "md")}
            </button>
          ) : (
            isCareerPage && (
              <div className="flex items-center gap-2 ml-4">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium border border-primary-color1 text-primary-color1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-[3px]"
                >
                  {t("login")}
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-color1 hover:bg-primary-color1/90 rounded-[3px]"
                >
                  {t("register")}
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default DesktopHeader;
