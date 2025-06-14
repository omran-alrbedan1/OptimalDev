"use client";
import { images } from "@/constants/images";
import Image from "next/image";
import Animate from "@/components/animation/Animate";
import ForgotPasswordForm from "@/components/form/ForgetPasswordForm";
import { useEffect, useState } from "react";

export default function ForgetPassword() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  return (
    <div className="grid max-w-7xl mx-auto min-h-[80vh] mt-16 lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        {isMounted && (
          <Animate
            key={"forget-password-animate"}
            y="30px"
            x="0"
            delay={0.2}
            index={1}
            duration={0.7}
            className="flex flex-1 items-center justify-center"
          >
            <div className="w-full max-w-xs">
              <ForgotPasswordForm />
            </div>
          </Animate>
        )}
      </div>

      {/* Right Column - Image Section */}
      <div className="relative items-center hidden bg-muted md:flex">
        <Animate
          key={"forget-password-animate"}
          y="30px"
          x="-30px"
          delay={0.2}
          index={1}
          duration={0.7}
          className="flex flex-1 items-center justify-center"
        >
          <Image
            src={images.forgetPassword}
            alt="Login illustration"
            height={430}
            width={430}
            className="relative"
            priority
          />
        </Animate>
      </div>
    </div>
  );
}
