import confetti from "canvas-confetti";
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

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const shootRelisticConfetti = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 10000,
  };

  const confettiCanvas = document.createElement("canvas");
  confettiCanvas.style.position = "fixed";
  confettiCanvas.style.top = "0";
  confettiCanvas.style.left = "0";
  confettiCanvas.style.width = "100%";
  confettiCanvas.style.height = "100%";
  confettiCanvas.style.pointerEvents = "none";
  confettiCanvas.style.zIndex = "10000";
  document.body.appendChild(confettiCanvas);

  const customConfetti = confetti.create(confettiCanvas, {
    resize: true,
    useWorker: true,
  });

  function fire(particleRatio: number, opts: confetti.Options) {
    customConfetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, { spread: 26, startVelocity: 55 });
  setTimeout(() => fire(0.2, { spread: 60 }), 100);
  setTimeout(() => fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 }), 200);
  setTimeout(
    () =>
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 }),
    300
  );
  setTimeout(() => fire(0.1, { spread: 120, startVelocity: 45 }), 400);

  // Remove the canvas after animation completes
  setTimeout(() => {
    document.body.removeChild(confettiCanvas);
  }, 5000);
};
