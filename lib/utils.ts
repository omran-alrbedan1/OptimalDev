import { ClassValue, clsx } from "clsx";
import { useLocale } from "next-intl";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getLocaleFromUrl = (): string => {
  if (typeof window === "undefined") return "en";

  const pathParts = window.location.pathname.split("/");
  const possibleLocale = pathParts[1];

  const supportedLocales = ["en", "ar"];

  return supportedLocales.includes(possibleLocale) ? possibleLocale : "en";
};

export const formatPostedDate = (dateString: string) => {
  const publishedDate = new Date(dateString);
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate.getTime() - publishedDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (useLocale() === "ar") {
    const arabicNumerals = diffDays
      .toString()
      .replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[parseInt(d)]);

    if (diffDays === 1) {
      return "نُشر منذ يوم واحد";
    } else if (diffDays === 2) {
      return "نُشر منذ يومين";
    } else if (diffDays >= 3 && diffDays <= 10) {
      return `نُشر منذ ${arabicNumerals} أيام`;
    } else {
      return `نُشر منذ ${arabicNumerals} يومًا`;
    }
  } else {
    return `Posted ${diffDays} ${diffDays === 1 ? "day" : "days"} ago`;
  }
};
