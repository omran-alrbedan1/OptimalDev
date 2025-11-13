"use client";

import { Loader } from "lucide-react";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const ClientProfileContent = dynamic(
  () => import("./_components/ClientProfileContent"),
  {
    ssr: false,
    loading: () => <Loader />,
  }
);

const ProfileClientWrapper = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ClientProfileContent />
    </Suspense>
  );
};

export default ProfileClientWrapper;
