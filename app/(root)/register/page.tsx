"use client";
import { GalleryVerticalEnd } from "lucide-react";
import { images } from "@/constants/images";
import Image from "next/image";
import Animate from "@/components/animation/Animate";
import LoginForm from "@/components/form/LoginForm";
import { useEffect, useState } from "react";
import RegisterForm from "@/components/form/RegisterForm";

export const dynamic = "force-dynamic";
export default function RegisterPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  return (
    <div className="flex mx-auto w-fit  lg:grid-cols-2 min-h-[80vh] mt-20">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        {isMounted && (
          <Animate
            key={`register-animate-${Math.random()}`}
            y="50px"
            x="0"
            delay={0.1}
            index={1}
            duration={1}
            className="flex flex-1 items-center justify-center"
          >
            <div className="w-full max-w-2xl">
              <RegisterForm />
            </div>
          </Animate>
        )}
      </div>

      {/* Right Column - Image Section */}
      <div className="relative items-center  hidden bg-muted md:flex">
        <Animate
          key={`login-animate-${Math.random()}`}
          y="0"
          x="120px"
          delay={0.3}
          index={1}
          duration={0.8}
          opacity={0}
          className="w-full h-full flex items-center justify-center"
        >
          <Image
            src={images.signUp}
            alt="Login illustration"
            height={480}
            width={480}
            className="relative"
            priority
          />
        </Animate>
      </div>
    </div>
  );
}
