"use client";
import Image from "next/image";
import React from "react";
import "./globals.css";

const error = () => {
  return (
    <html dir="ltr" suppressHydrationWarning>
      <body>
        <div className="h-[90vh] flex justify-center flex-col items-center py-10">
          <Image
            src={"/images/error.png"}
            width={500}
            height={500}
            alt="error"
          />

          <p className="text-[30px] font-bold tracking-widest md:text-2xl text-gray-700 dark:text-gray-300">
            An error occured{" "}
          </p>
        </div>
      </body>
    </html>
  );
};

export default error;
