"use client"

import * as React from "react"
import { Moon, MoonIcon, Sun, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggler() {
  const { theme, setTheme } = useTheme()

  return (

    <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className=" h-6 w-8 md:h-8 md:w-10 bg-primary-color1 rounded-[10%] hover:bg-[#d2a240dd]">
      <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
      <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
    </Button>
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    //     <Button variant="outline" size="icon">
    //       <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
    //       <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    //       <span className="sr-only">Toggle theme</span>
    //     </Button>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent align="end">
    //     <DropdownMenuItem onClick={() => setTheme("light")}>
    //       Light
    //     </DropdownMenuItem>
    //     <DropdownMenuItem onClick={() => setTheme("dark")}>
    //       Dark
    //     </DropdownMenuItem>
    //     <DropdownMenuItem onClick={() => setTheme("system")}>
    //       System
    //     </DropdownMenuItem>
    //   </DropdownMenuContent>
    // </DropdownMenu>
  )
}
