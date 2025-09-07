import { NextIntlClientProvider, hasLocale } from "next-intl";  
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Footer from "@/components/parts/Footer";
import Header from "@/components/parts/Header";
import { Providers } from "@/store/providers";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Providers as ThemeProvider } from "@/components/providers/ThemeProvider";
import { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";
import { Toaster } from "sonner";

const zain = localFont({
  src: [
    {
      path: "../../fonts/Zain-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../fonts/Zain-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../fonts/Zain-Bold.ttf",
      weight: "700",
      style: "normal",
    },

    {
      path: "../../fonts/Zain-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/Zain-Light.ttf",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-zain",
});

export const metadata: Metadata = {
  title: "Optimal Path",
  description: "Pitch , Vote and Grow",
  icons: {
    icon: "/images/favicon.png",
  },
};
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!hasLocale(routing.locales, params.locale)) {
    notFound();
  }

  const messages = (await import(`@/messages/${params.locale}.json`)).default;

  return (
    <html
      lang={params.locale}
      dir={params.locale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body className={zain.variable}>
        <TooltipProvider>
          <ThemeProvider>
            <Providers>
              <NextIntlClientProvider
                locale={params.locale}
                messages={messages}
              >
                <Header />
                {children}
                <Footer />
                <Toaster
                  richColors
                  position={params.locale == "en" ? "top-right" : "top-left"}
                />
              </NextIntlClientProvider>
            </Providers>
          </ThemeProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
