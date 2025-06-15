"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { Select } from "antd";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentLang, setCurrentLang] = useState("en");

  const languages = [
    {
      code: "en",
      name: "English",
      countryCode: "US",
    },
    {
      code: "ar",
      name: "العربية",
      countryCode: "JO",
    },
  ];

  useEffect(() => {
    const pathParts = pathname.split("/").filter(Boolean);
    const langFromPath = pathParts[0];

    if (languages.some((lang) => lang.code === langFromPath)) {
      setCurrentLang(langFromPath);
    } else {
      setCurrentLang("en");
    }
  }, [pathname]);

  const changeLanguage = (langCode: string) => {
    setCurrentLang(langCode);

    const pathParts = pathname.split("/").filter(Boolean);
    const isCurrentPathLang = languages.some(
      (lang) => lang.code === pathParts[0]
    );
    const remainingPath = isCurrentPathLang ? pathParts.slice(1) : pathParts;

    // Construct new path
    const newPath = `/${langCode}/${remainingPath.join("/")}`;
    router.push(newPath);
  };

  const currentLanguage =
    languages.find((lang) => lang.code === currentLang) || languages[0];

  return (
    <Select
      value={currentLang}
      onChange={changeLanguage}
      style={{ width: 140 }}
      optionLabelProp="label"
    >
      {languages.map((lang) => (
        <Select.Option
          key={lang.code}
          value={lang.code}
          label={
            <div className="flex items-center gap-2">
              <ReactCountryFlag
                countryCode={lang.countryCode}
                svg
                style={{ width: "1.2em", height: "1.2em" }}
              />
              <span>{lang.name}</span>
            </div>
          }
        >
          <div className="flex items-center gap-2">
            <ReactCountryFlag
              countryCode={lang.countryCode}
              svg
              style={{ width: "1.2em", height: "1.2em" }}
            />
            <span>{lang.name}</span>
          </div>
        </Select.Option>
      ))}
    </Select>
  );
}
