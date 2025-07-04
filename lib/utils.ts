import { ClassValue, clsx } from "clsx";
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
  return `Posted ${diffDays} days ago`;
};
