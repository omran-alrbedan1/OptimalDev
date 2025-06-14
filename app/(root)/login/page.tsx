import { GalleryVerticalEnd } from "lucide-react";
import { images } from "@/constants/images";
import Image from "next/image";
import Animate from "@/components/animation/Animate";
import LoginForm from "@/components/form/LoginForm";

export const dynamic = "force-dynamic";
export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Left Column - Form Section */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <Animate
          y="50px"
          x="0"
          delay={0.1}
          index={1}
          duration={1}
          className="flex flex-1 items-center justify-center"
        >
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </Animate>
      </div>

      {/* Right Column - Image Section */}
      <div className="relative items-center hidden bg-muted md:flex">
        <Animate
          y="0"
          x="120px"
          delay={0.3}
          index={1}
          duration={0.8}
          opacity={0}
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
        </Animate>
      </div>
    </div>
  );
}
