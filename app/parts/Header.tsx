"use client";
import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import Button from "../elements/Button/button";
import { usePathname } from "next/navigation";

// Define the type for the props
// interface HeaderProps {
//   location: {
//     pathname: string;
//   };
// }

const Header = () => {
  const [isCollapse, setIsCollapse] = useState<boolean>(false);
  const path = usePathname();
  console.log(path);

  return (
    <header className="header">
      <div className="flex justify-between px-4 lg:px-0 border-none">
        <Image
          src={"/Hive Tech.png"}
          width={230}
          height={230}
          className=""
          alt="logo"
        />

      </div>

      <ul className="hidden text-theme-blue tracking-widest items-center lg:flex flex-row mt-0">
        <li>
          <Button
            className={`${path === "/home" ? "active-link" : " text-black-100"} text-lg px-5 no-underline hover:underline`}
            type="link"
            href="home"
          >
            Home
          </Button>
        </li>
        <li className="py-2 lg:py-0">
          <Button
            className={`${path === "/team" ? "active-link" : "text-black-100"} text-lg  px-5 no-underline hover:underline`}
            type="link"
            href="/team"
          >
            Team
          </Button>
        </li>
        <li className="py-2 lg:py-0">
          <Button
            className={`${path === "/projects" ? "active-link" : "text-black-100"} text-lg  px-5 no-underline hover:underline`}
            type="link"
            href="/projects"
          >
            Projects
          </Button>
        </li>
        <li>
          <Button type="link" className="w-80 h-80 px-8 py-3 bg-primary-color1 rounded-full text-white-100" href="/discuss-project">
            Discuss Project
          </Button>
        </li>
      </ul>

      <Transition
        show={isCollapse}
        enter="transition-opacity duration-400"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-400"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <ul className="z-50 flex flex-col text-theme-blue tracking-widest my-6 mt-20 absolute bg-white w-full lg:hidden">
          <li className="py-2 bg-white">
            <Button
              className={`${path === "/home" ? "active-link" : "text-primary-color2"} px-10 no-underline hover:underline`}
              type="link"
              href="/home"
              onClick={() => setIsCollapse(false)}
            >
              Home
            </Button>
          </li>
          <li className="py-2 bg-white">
            <Button
              className={`${path === "/team" ? "active-link" : "text-primary-color2"} px-10 no-underline hover:underline`}
              type="link"
              href="/team"
              onClick={() => setIsCollapse(false)}
            >
              Team
            </Button>
          </li>
          <li className="py-2 bg-white">
            <Button
              className={`${path === "/projects" ? "active-link" : "text-primary-color2"} px-10 no-underline hover:underline`}
              type="link"
              href="/projects"
              onClick={() => setIsCollapse(false)}
            >
              Projects
            </Button>
          </li>
          <li className="mx-auto my-9 bg-white">
            <Button
              className=" -ml-10 px-6 py-3 bg-primary-color1 text-white rounded-full transition duration-200"
              type="link"
              href="/discuss-project"
              onClick={() => setIsCollapse(false)}
            >
              Discuss Project
            </Button>
          </li>
        </ul>
      </Transition>
    </header>
  );
};

export default Header;
