// components/FileUploadSection.tsx
"use client";

import { useState } from "react";
import { Upload, Avatar, message } from "antd";
import type { UploadProps } from "antd";
import {
  CameraOutlined,
  EyeOutlined,
  FileAddOutlined,
  FilePdfOutlined,
  CheckOutlined,
  SyncOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface FileUploadSectionProps {
  profileData: any;
  onProfileImageChange: (file: File) => void;
  onCvChange: (file: File) => void;
  t: any;
}

export default function FileUploadSection({
  profileData,
  onProfileImageChange,
  onCvChange,
  t,
}: FileUploadSectionProps) {
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);

  const handleProfileImageUpload: UploadProps["onChange"] = (info) => {
    if (info.file.originFileObj) {
      setProfileImageFile(info.file.originFileObj);
      onProfileImageChange(info.file.originFileObj);
      message.success(`${info.file.name} ${t("messages.fileSelected")}`);
    }
  };

  const handleCvUpload: UploadProps["onChange"] = (info) => {
    if (info.file.originFileObj) {
      setCvFile(info.file.originFileObj);
      onCvChange(info.file.originFileObj);
      message.success(`${info.file.name} ${t("messages.fileSelected")}`);
    }
  };

  return (
    <>
      <div className="  dark:from-slate-800 dark:to-slate-700 rounded-2xl p-3 border border-slate-200 shadow-sm dark:border-slate-600/50 ">
        <div className="text-center flex flex-col">
          <div className="relative inline-block  mb-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative group"
            >
              <Avatar
                size={140}
                src={
                  profileImageFile
                    ? URL.createObjectURL(profileImageFile)
                    : profileData?.profile_image || undefined
                }
                icon={<UserOutlined className="text-4xl" />}
                className="relative border-4 border-white dark:border-slate-700 shadow-2xl"
              />
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-white/90 dark:bg-slate-800/90 p-3 rounded-full shadow-lg">
                  <CameraOutlined className="text-xl text-slate-700 dark:text-slate-300" />
                </div>
              </div>
            </motion.div>
          </div>

          <Upload
            name="profile_image"
            beforeUpload={(file) => {
              setProfileImageFile(file);
              onProfileImageChange(file);
              return false;
            }}
            onChange={handleProfileImageUpload}
            showUploadList={false}
            accept="image/*"
            className="w-full"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="button"
                className="w-full bg-gradient-to-r from-[#22ace3] to-[#1d9bd1] hover:from-[#1d9bd1] hover:to-[#188cb8] text-white font-semibold py-3 px-4 rounded-[4px] shadow-lg hover:shadow-xl transition-all duration-300 border-0"
              >
                <UploadOutlined className="mr-2 text-base" />
                {t("photoSection.changePhoto")}
              </Button>
            </motion.div>
          </Upload>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-6 dark:from-slate-800 dark:to-cyan-900/20 rounded-2xl p-6 border border-slate-200 dark:border-slate-600/50 shadow-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#22ace3] to-[#1d9bd1] rounded-[4px] flex items-center justify-center mr-3 shadow-lg">
              <FilePdfOutlined className="text-white text-lg" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-200 text-base">
                {t("photoSection.cvSection.title")}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                PDF, DOC, DOCX
              </p>
            </div>
          </div>

          {(cvFile || profileData?.cv_path) && (
            <motion.a
              whileHover={{ scale: 1.05 }}
              href={
                cvFile
                  ? URL.createObjectURL(cvFile)
                  : profileData?.cv_path || "#"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-[#22ace3] dark:text-[#22ace3] hover:text-[#1d9bd1] dark:hover:text-[#1d9bd1] font-medium text-sm"
            >
              <EyeOutlined className="mr-1" />
              {t("actions.view")}
            </motion.a>
          )}
        </div>

        <div
          className={`border-2 border-dashed rounded-[4px] p-6 mb-4 text-center transition-all duration-300 ${
            cvFile || profileData?.cv_path
              ? "border-primary/50 dark:border-[#22ace3]/50 bg-[#22ace3]/10 dark:bg-[#22ace3]/20"
              : "border-slate-300 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-800/50"
          }`}
        >
          {cvFile || profileData?.cv_path ? (
            <div className="text-[#22ace3] dark:text-[#22ace3]">
              <div className="relative inline-block mb-2">
                <FilePdfOutlined className="text-3xl" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#22ace3] rounded-full flex items-center justify-center">
                  <CheckOutlined className="text-white text-xs" />
                </div>
              </div>
              <p className="font-medium text-sm">
                {t("photoSection.cvSection.cvUploaded")}
              </p>
            </div>
          ) : (
            <div className="text-slate-400 dark:text-slate-500">
              <FileAddOutlined className="text-3xl mb-2" />
              <p className="text-sm">
                {t("photoSection.cvSection.uploadNewCV")}
              </p>
            </div>
          )}
        </div>

        <Upload
          name="cv"
          beforeUpload={(file) => {
            setCvFile(file);
            onCvChange(file);
            return false;
          }}
          onChange={handleCvUpload}
          showUploadList={false}
          accept=".pdf,.doc,.docx"
          className="w-full"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="button"
              variant={cvFile || profileData?.cv_path ? "outline" : "default"}
              className={`w-full font-semibold py-3 px-4 rounded-[4px] shadow-lg hover:shadow-xl transition-all duration-300 ${
                cvFile || profileData?.cv_path
                  ? "border-2 border-[#22ace3] text-[#22ace3] hover:bg-[#22ace3]/10 dark:border-[#22ace3] dark:text-[#22ace3] dark:hover:bg-[#22ace3]/20"
                  : "bg-gradient-to-r from-[#22ace3] to-[#1d9bd1] hover:from-[#1d9bd1] hover:to-[#188cb8] text-white border-0"
              }`}
            >
              {cvFile || profileData?.cv_path ? (
                <>
                  <SyncOutlined className="mr-2" />
                  {t("photoSection.cvSection.changeCV")}
                </>
              ) : (
                <>
                  <UploadOutlined className="mr-2" />
                  {t("photoSection.cvSection.uploadNewCV")}
                </>
              )}
            </Button>
          </motion.div>
        </Upload>
      </motion.div>
    </>
  );
}
