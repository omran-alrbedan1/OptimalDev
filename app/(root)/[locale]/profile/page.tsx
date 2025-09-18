import dynamic from "next/dynamic";
import { Suspense } from "react";

// استيراد المكون باستخدام Dynamic Import مع تعطيل SSR
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

const ProfilePage = () => {
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

export default ProfilePage;
