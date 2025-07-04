"use client";

import { Select } from "antd";
import ReactCountryFlag from "react-country-flag";
import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";

export default function LanguageSwitcher() {
  const { language, changeLanguage } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

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
