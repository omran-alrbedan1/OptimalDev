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
} from "@ant-design/icons";
import Image from "next/image";
import { FaPhoneAlt, FaRegEdit } from "react-icons/fa";
import { images } from "@/constants/images";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useFetch } from "@/hooks/useFetch";
import { fetchProfileInfo } from "@/lib/client-action";
import { useState } from "react";
import PasswordChangeForm from "@/components/forms/RestPasswordForm";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { ApplicationsList } from "@/components/parts/ApplicationsList";

const ProfilePage = () => {
  const t = useTranslations();
  const { isAuthenticated, isLoading } = useAuth(true);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const locale = useLocale();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const tabChange = (key: string) => {
    setActiveTab(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <span className="flex items-center font-medium">
          <SolutionOutlined className="mx-2" />
          {t("profilePage.applications")}
        </span>
      ),
      children: <ApplicationsList />,
    },
    {
      key: "2",
      label: (
        <span className="flex items-center font-medium">
          <BookOutlined className="mx-2" />
          {t("profilePage.exams")}
        </span>
      ),
      children: (
        <div className="w-full flex flex-col items-center justify-center p-6 min-h-[400px]">
          <div className="max-w-md w-full text-center">
            <div className="flex justify-center mb-4">
              <Image
                src="/images/exams.png"
                alt="Exams"
                width={200}
                height={200}
                className="object-contain"
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              {t("profilePage.noExams.title")}
            </h2>
            <p className="text-gray-500">
              {t("profilePage.noExams.description")}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <span className="flex items-center font-medium">
          <MessageOutlined className="mx-2" />
          {t("profilePage.messages")}
        </span>
      ),
      children: (
        <div className="w-full flex flex-col items-center justify-center p-6 min-h-[400px]">
          <div className="max-w-md w-full text-center">
            <div className="flex justify-center mb-4">
              <Image
                src="/images/messages.png"
                alt="Messages"
                width={200}
                height={200}
                className="object-contain"
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              {t("profilePage.noMessages.title")}
            </h2>
            <p className="text-gray-500">
              {t("profilePage.noMessages.description")}
            </p>
          </div>
        </div>
      ),
    },
  ];

  const { data: userData, isLoading: profileLoading } =
    useFetch<User>(fetchProfileInfo);

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
        <Card className="w-full lg:w-1/3 p-6 shadow-sm border-0 rounded-xl">
          <div className="flex flex-col items-center">
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 flex items-center justify-center border-white dark:border-none shadow-lg mb-4">
              {profileLoading ? (
                <Skeleton.Avatar active size={160} shape="circle" />
              ) : (
                <Image
                  src={images.profile}
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
                locale === "en" ? "md:mr-8" : "md:ml-8"
              )}
            >
              <Button
                onClick={() => router.push("/profile/edit")}
                type="primary"
                icon={<FaRegEdit className="mr-2" />}
                block
                size="middle"
              >
                {t("profilePage.editProfile")}
              </Button>

              <Button
                onClick={showModal}
                icon={<LockOutlined className="mr-2" />}
                block
                size="middle"
              >
                {t("profilePage.changePassword")}
              </Button>
            </div>
          </div>
        </Card>

        {/* Profile Info Card */}
        <Card className="flex-1 p-6 shadow-sm border-0 rounded-xl">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                {t("profilePage.personalInfo.title")}
              </h2>
              <p className="text-gray-500">
                {t("profilePage.personalInfo.description")}
              </p>
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
                      {t("profilePage.email")}
                    </h3>
                    {profileLoading ? (
                      <Skeleton.Input active className="w-48 h-6" />
                    ) : (
                      <p className="text-gray-800 dark:text-gray-200 font-medium">
                        {userData?.email || t("profilePage.notProvided")}
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
                      {t("profilePage.location")}
                    </h3>
                    {profileLoading ? (
                      <Skeleton.Input active className="w-48 h-6" />
                    ) : (
                      <p className="text-gray-800 dark:text-gray-200 font-medium">
                        {userData?.city_name ||
                          userData?.country_name ||
                          t("profilePage.notSpecified")}
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
                      {t("profilePage.phone")}
                    </h3>
                    {profileLoading ? (
                      <Skeleton.Input active className="w-48 h-6" />
                    ) : (
                      <p className="text-gray-800 dark:text-gray-200 font-medium">
                        {userData?.phone || t("profilePage.notProvided")}
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
                      {t("profilePage.documents")}
                    </h3>
                    <p className="text-gray-800 dark:text-gray-200 font-medium">
                      {profileLoading ? (
                        <Skeleton.Input active className="w-48 h-6" />
                      ) : (
                        <Tag color="green">
                          {t("profilePage.viewDocuments")}
                        </Tag>
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
                {t("profilePage.secureAccount.title")}
              </h3>
              <p className="text-gray-500 text-center mt-2">
                {t("profilePage.secureAccount.description")}
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-6">
            <PasswordChangeForm onSuccess={() => setIsModalOpen(false)} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProfilePage;
