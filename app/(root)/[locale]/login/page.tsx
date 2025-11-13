"use client";
import { GalleryVerticalEnd } from "lucide-react";
import { images } from "@/constants/images";
import Image from "next/image";
import LoginForm from "@/components/forms/LoginForm";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const dynamic = "force-dynamic";
export default function LoginPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  return (
    <div className="grid lg:grid-cols-2 min-h-[80vh] mt-16">
      {/* Left Column - Form Section */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-1 items-center justify-center w-full"
        >
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </motion.div>
      </div>

      <div className="relative items-center hidden bg-muted md:flex">
        <motion.div
          initial={{ x: 120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full h-full flex items-center justify-center"
        >
          <Image
            src={images.signIn}
            alt="Login illustration"
            height={430}
            width={430}
            className="relative"
            priority
          />
        </motion.div>
      </div>
    </div>
  );
}
