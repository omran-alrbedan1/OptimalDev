"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useLanguage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLang = localStorage.getItem("preferredLanguage");
      const urlLang = pathname.split("/")[1];

      const finalLang =
        storedLang || (["en", "ar"].includes(urlLang) ? urlLang : "en");

      setLanguage(finalLang);
    }
  }, [pathname]);

  const changeLanguage = (langCode: string) => {
    setLanguage(langCode);
    localStorage.setItem("preferredLanguage", langCode);
    document.cookie = `preferredLanguage=${langCode}; max-age=${
      365 * 24 * 60 * 60
    }; path=/`;

    const newPath = `/${langCode}${pathname.replace(/^\/[a-z]{2}/, "")}`;
    router.push(newPath, { scroll: false });
  };

  return { language, changeLanguage };
};
