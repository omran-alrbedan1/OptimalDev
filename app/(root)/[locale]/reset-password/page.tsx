"use client";
import { images } from "@/constants/images";
import Image from "next/image";
import { motion } from "framer-motion";
import ResetPasswordForm from "@/components/forms/ResetPassword";

export default function ResetPassword() {
  return (
    <div className="grid max-w-7xl mx-auto min-h-[80vh] mt-16 lg:grid-cols-2">
      {/* Left Column - Image Section */}
      <div className="relative items-center hidden bg-muted md:flex">
        <motion.div
          initial={{ y: 30, x: -30, opacity: 0 }}
          animate={{ y: 0, x: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-1 items-center justify-center"
        >
          <Image
            src={images.resetPassword}
            alt="Password reset illustration"
            height={430}
            width={430}
            className="relative"
            priority
          />
        </motion.div>
      </div>

      {/* Right Column - Form Section */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-1 items-center justify-center"
        >
          <div className="w-full max-w-xs">
            <ResetPasswordForm />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
