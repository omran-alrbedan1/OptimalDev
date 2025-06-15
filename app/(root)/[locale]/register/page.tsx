"use client";
import { images } from "@/constants/images";
import Image from "next/image";
import RegisterForm from "@/components/forms/RegisterForm";
import { motion } from "framer-motion";

export const dynamic = "force-dynamic";
export default function RegisterPage() {
  return (
    <div className="flex mx-auto w-fit lg:grid-cols-2 min-h-[80vh] mt-20">
      {/* Left Column - Form Section */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-1 items-center justify-center"
        >
          <div className="w-full max-w-2xl">
            <RegisterForm />
          </div>
        </motion.div>
      </div>

      {/* Right Column - Image Section */}
      <div className="relative items-center hidden bg-muted md:flex">
        <motion.div
          initial={{ x: 120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full h-full flex items-center justify-center"
        >
          <Image
            src={images.signUp}
            alt="Register illustration"
            height={480}
            width={480}
            className="relative"
            priority
          />
        </motion.div>
      </div>
    </div>
  );
}
