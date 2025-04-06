import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const workSans = localFont({
  src: [
    {
      path: "./fonts/WorkSans-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-Thin.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-ExtraLight.ttf",
      weight: "100",
      style: "normal",
    },
  ],
  variable: "--font-work-sans",
});
export const metadata: Metadata = {
  title: "Hive Tech",
  description: "Pitch , Vote and Grow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
        <head>
   
        <link
      rel="icon"
      href="/Hive Tech Logo.svg"
      media="(prefers-color-scheme: light)"
    />
    <link
      rel="icon"
      href="/logos/logo dark.png"
      media="(prefers-color-scheme: dark)"
    />

    {/* <link rel="icon" type="image/svg+xml" href={`/logos/logo dark.png`} /> */}
    {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
    {/* <title>Adrian | JavaScript Mastery Portfolio</title> */}
  </head>
      <body className={workSans.variable}>
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
