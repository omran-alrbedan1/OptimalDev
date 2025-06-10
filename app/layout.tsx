import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const zain = localFont({
  src: [
    {
      path: "./fonts/Zain-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/Zain-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/Zain-Bold.ttf",
      weight: "700",
      style: "normal",
    },

    {
      path: "./fonts/Zain-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Zain-Light.ttf",
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
    icon: "/images/small_logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={zain.variable}>
        {" "}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
