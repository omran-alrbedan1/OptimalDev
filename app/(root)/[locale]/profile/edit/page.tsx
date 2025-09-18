"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "antd";

const EditProfileClient = dynamic(
  () => import("./_components/EditProfileClient"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <Skeleton active />
      </div>
    ),
  }
);

export default function EditProfilePage() {
  return <EditProfileClient />;
}
