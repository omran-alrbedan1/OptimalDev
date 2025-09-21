"use client";

import { Tabs, Button, Modal, Card, Tag, Divider, Skeleton } from "antd";
import type { TabsProps } from "antd";
import {
  MailOutlined,
  EnvironmentOutlined,
  FileTextOutlined,
  MessageOutlined,
  BookOutlined,
  SolutionOutlined,
  LockOutlined,
  EyeOutlined,
  LogoutOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import { FaPhoneAlt, FaRegEdit } from "react-icons/fa";
import { images } from "@/constants/images";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useFetch } from "@/hooks/useFetch";
import { fetchProfileInfo } from "@/lib/client-action";
import { useEffect, useState } from "react";
import PasswordChangeForm from "@/components/forms/RestPasswordForm";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { ApplicationsList } from "@/components/parts/ApplicationsList";
import { logout } from "@/store/slices/authSlice";
import { Loader2 } from "lucide-react";
import { ExamsList } from "@/components/parts/ExamsList";
import MessageLists from "@/components/parts/MessagesList";
import { useAppSelector } from "@/hooks/hook";
import { logout as apiLogout } from "@/lib/client-action";
import Loader from "@/components/Loader";

const ClientProfileContent = () => {
  const t = useTranslations("profilePage");
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const locale = useLocale();
  const dispatch = useDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const { data: userData, isLoading: profileLoading } =
    useFetch<User>(fetchProfileInfo);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await apiLogout();
      dispatch(logout());
      router.push("/home");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center"></div>
    );
  }
  if (profileLoading) {
    return <Loader />;
  }
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const hideLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const tabChange = (key: string) => {
    setActiveTab(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <button
          type="button"
          className="flex items-center font-medium border-none bg-transparent"
        >
          <SolutionOutlined className="mx-2" />
          {t("applications")}
        </button>
      ),
      children: <ApplicationsList />,
    },
    {
      key: "2",
      label: (
        <button
          type="button"
          className="flex items-center font-medium border-none bg-transparent"
        >
          <BookOutlined className="mx-2" />
          {t("exams")}
        </button>
      ),
      children: <ExamsList />,
    },
    {
      key: "3",
      label: (
        <button
          type="button"
          className="flex items-center font-medium border-none bg-transparent"
        >
          <MessageOutlined className="mx-2" />
          {t("messages")}
        </button>
      ),
      children: <MessageLists />,
    },
  ];

  return (
    <div className="container mx-auto px-4 md:mt-20 mt-8 py-8 max-w-7xl">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row gap-8 mb-8"
      >
        {/* Profile Image Card */}
        <Card className="w-full lg:w-2/5 p-6 shadow-sm border-0 rounded-xl">
          <div className="flex flex-col items-center">
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 flex items-center justify-center border-white dark:border-none shadow-lg mb-4">
              {profileLoading ? (
                <Skeleton.Avatar active size={160} shape="circle" />
              ) : (
                <Image
                  src={
                    userData?.profile_image
                      ? userData.profile_image
                      : images.anonymous
                  }
                  alt={`${userData?.first_name} ${userData?.last_name}`}
                  fill={!!userData?.profile_image}
                  className={
                    userData?.profile_image ? "object-cover" : "size-32"
                  }
                  priority
                />
              )}
            </div>

            {profileLoading ? (
              <Skeleton.Input active className="w-48 h-8 mb-2" />
            ) : (
              <h1 className="text-2xl font-bold text-center dark:text-gray-200 mb-1">
                {userData?.first_name} {userData?.last_name}
              </h1>
            )}

            <Divider className="my-4" />

            <div
              className={cn(
                "w-full flex flex-col md:flex-row items-center gap-4 md:gap-2 ",
                locale === "en" ? "md:mr-8" : "md:ml-16"
              )}
            >
              <Button
                onClick={() => router.push("/profile/edit")}
                type="primary"
                icon={<FaRegEdit className="mr-2" />}
                block
                size="middle"
              >
                {t("editProfile")}
              </Button>

              <Button
                onClick={showModal}
                icon={<LockOutlined className="mr-2" />}
                block
                size="middle"
              >
                {t("changePassword")}
              </Button>

              <Button
                onClick={showLogoutModal}
                danger
                icon={<LogoutOutlined className="mr-2" />}
                block
                size="middle"
              >
                {t("logout.button")}
              </Button>
            </div>
          </div>
        </Card>

        {/* Profile Info Card */}
        <Card className="flex-1 p-6 shadow-sm border-0 rounded-xl">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                {t("personalInfo.title")}
              </h2>
              <p className="text-gray-500">{t("personalInfo.description")}</p>
            </div>

            <Divider className="my-2" />

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="p-2 mx-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg mr-4">
                    <MailOutlined className="text-primary text-lg" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      {t("email")}
                    </h3>
                    {profileLoading ? (
                      <Skeleton.Input active className="w-48 h-6" />
                    ) : (
                      <p className="text-gray-800 dark:text-gray-200 font-medium">
                        {userData?.email || t("notProvided")}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 mx-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg mr-4">
                    <EnvironmentOutlined className="text-primary text-lg" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      {t("location")}
                    </h3>
                    {profileLoading ? (
                      <Skeleton.Input active className="w-48 h-6" />
                    ) : (
                      <p className="text-gray-800 dark:text-gray-200 font-medium">
                        {userData?.city_name ||
                          userData?.country_name ||
                          t("notSpecified")}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="p-2 mx-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg mr-4">
                    <FaPhoneAlt className="text-primary text-lg" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      {t("phone")}
                    </h3>
                    {profileLoading ? (
                      <Skeleton.Input active className="w-48 h-6" />
                    ) : (
                      <p className="text-gray-800 dark:text-gray-200 font-medium">
                        {userData?.phone || t("notProvided")}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 mx-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg mr-4">
                    <FileTextOutlined className="text-primary text-lg" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      {t("documents")}
                    </h3>
                    <p className="text-gray-800 dark:text-gray-200 font-medium">
                      {profileLoading ? (
                        <Skeleton.Input active className="w-48 h-6" />
                      ) : (
                        <a
                          href={userData?.cv_path || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary"
                        >
                          <EyeOutlined className="mr-1" />
                          {t("viewDocuments")}
                        </a>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Tabs Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Tabs
          activeKey={activeTab}
          onChange={tabChange}
          items={items}
          className="profile-tabs"
          tabBarStyle={{
            marginBottom: 0,
            padding: "0 16px",
            background: "transparent",
          }}
          tabBarGutter={24}
        />
      </motion.div>

      {/* Password Change Modal */}
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={800}
        centered
        destroyOnClose
      >
        <div className="flex flex-col md:flex-row">
          <div className="hidden md:block md:w-1/2 p-4 bg-gradient-to-b from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800 rounded-l-lg">
            <div className="h-full flex flex-col justify-center items-center">
              <Image
                src={images.resetPassword}
                height={300}
                width={300}
                alt="reset password"
                className="mb-6"
              />
              <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-gray-200">
                {t("secureAccount.title")}
              </h3>
              <p className="text-gray-500 text-center mt-2">
                {t("secureAccount.description")}
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-6">
            <PasswordChangeForm onSuccess={() => setIsModalOpen(false)} />
          </div>
        </div>
      </Modal>

      {/* Logout Confirmation Modal */}
      <Modal
        open={isLogoutModalOpen}
        onCancel={hideLogoutModal}
        footer={null}
        width={480}
        centered
        className="logout-modal"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center py-6"
        >
          {/* Warning Icon */}
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 rounded-full flex items-center justify-center shadow-lg">
              <ExclamationCircleOutlined className="text-4xl text-red-500 dark:text-red-400" />
            </div>
          </div>

          {/* Content */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              {t("logout.confirmTitle")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400  leading-relaxed">
              {t("logout.confirmMessage")}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Button
              onClick={hideLogoutModal}
              size="middle"
              className="min-w-[120px] h-10 text-lg font-medium"
            >
              {t("logout.cancel")}
            </Button>
            <Button
              onClick={handleLogout}
              danger
              type="primary"
              size="middle"
              loading={isLoggingOut}
              icon={!isLoggingOut ? <LogoutOutlined /> : <Loader2 />}
              className="min-w-[120px] h-10 text-lg font-medium bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 border-0 shadow-lg"
            >
              {isLoggingOut ? t("logout.loggingOut") : t("logout.button")}
            </Button>
          </div>
        </motion.div>
      </Modal>
    </div>
  );
};

export default ClientProfileContent;
