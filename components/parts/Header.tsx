"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { logout, loadStoredAuth } from "@/store/slices/authSlice";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

const Header = () => {
  const t = useTranslations("header");
  const [isClient, setIsClient] = useState(false);
  const dispatch = useDispatch();

  // Get auth state from Redux
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    setIsClient(true);
    dispatch(loadStoredAuth());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!isClient) {
    return <HeaderSkeleton />;
  }

  return (
    <>
      <DesktopHeader
        t={t}
        user={user}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />
      <MobileHeader
        t={t}
        user={user}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />
    </>
  );
};

const HeaderSkeleton = () => (
  <header className="fixed top-0 w-full h-16 bg-white dark:bg-darkMod-200 z-50 shadow-md">
    <div className="flex justify-between items-center h-full px-6">
      <div className="w-32 h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
  </header>
);

export default Header;
