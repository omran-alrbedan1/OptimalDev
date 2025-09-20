"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const ClientProfileContent = dynamic(
  () => import("./_components/ClientProfileContent"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    ),
  }
);

const ProfileClientWrapper = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      }
    >
      <ClientProfileContent />
    </Suspense>
  );
};

export default ProfileClientWrapper;
