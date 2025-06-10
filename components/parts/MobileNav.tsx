import Link from "next/link";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { images } from "@/constants/images";
import Image from "next/image";
import { AppSidebar } from "../app-sidebar";

const MobileNav = () => {
  return (
    <header className="flex h-16 shrink-0 w-full justify-between px-4  items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <Link href={"/"} className=" flex items-center my-4 gap-2 mx-3">
        <img src="/assets/icons/logo.svg" alt="logo" className="size-[30px]" />
        <h1 className="text-2xl font-bold">Tourvisto</h1>
      </Link>
      <SidebarTrigger className="-ml-1" />
    </header>
  );
};

export default MobileNav;
