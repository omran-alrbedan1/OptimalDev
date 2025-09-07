"use client";

import { Select } from "antd";
import ReactCountryFlag from "react-country-flag";  
import { useEffect, useState } from "react";
import { setCookie } from "cookies-next";

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState("en");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const lang =
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("preferredLanguage="))
        ?.split("=")[1] || "en";

    setLanguage(lang);
    setIsMounted(true);
  }, []);

  const changeLanguage = (lang: string) => {
    setCookie("preferredLanguage", lang, {
      maxAge: 365 * 24 * 60 * 60,
      path: "/",
    });
    window.location.href = `/${lang}${window.location.pathname.replace(
      /^\/(en|ar)/,
      ""
    )}`;
  };

  if (!isMounted) return null;

  return (
    <Select
      value={language}
      onChange={changeLanguage}
      style={{ width: 140 }}
      optionLabelProp="label"
      options={[
        {
          value: "en",
          label: (
            <div className="flex items-center gap-2">
              <ReactCountryFlag
                countryCode="US"
                svg
                style={{ width: "1.2em", height: "1.2em" }}
              />
              <span>English</span>
            </div>
          ),
        },
        {
          value: "ar",
          label: (
            <div className="flex items-center gap-2">
              <ReactCountryFlag
                countryCode="JO"
                svg
                style={{ width: "1.2em", height: "1.2em" }}
              />
              <span>العربية</span>
            </div>
          ),
        },
      ]}
    />
  );
}
