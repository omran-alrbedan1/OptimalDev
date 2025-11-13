"use client";
import React, { useEffect } from "react";
import { Modal, Progress, Button } from "antd";
import { TrophyOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { shootRelisticConfetti } from "@/lib/utils";
import { useTranslations } from "next-intl";
interface ResultModalProps {
  visible: boolean;
  score: number;
  status: "success" | "failed";
  onClose: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({
  visible,
  score,
  status,
  onClose,
}) => {
  const t = useTranslations("resultModal");
  const router = useRouter();
  const isSuccess = status === "success";

  useEffect(() => {
    if (visible && isSuccess) {
      const timer = setTimeout(() => {
        shootRelisticConfetti();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [visible, isSuccess]);

  const resultData = isSuccess
    ? {
        title: t("perfectScore.title"),
        message: t("perfectScore.message"),
        icon: <TrophyOutlined className="text-5xl text-primary" />,
        color: "#52c41a",
      }
    : {
        title: t("notAccepted.title"),
        message: t("notAccepted.message"),
        icon: <CloseCircleOutlined className="text-5xl text-red-500" />,
        color: "#ff4d4f",
      };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      width={600}
      className="result-modal"
      closable={false}
    >
      <div className="text-center p-8">
        {/* Result Icon */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            {resultData.icon}
            {isSuccess && (
              <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-ping opacity-75"></div>
            )}
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold mb-2 dark:text-white">
          {resultData.title}
        </h2>

        {/* Message */}
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
          {resultData.message}
        </p>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <Button
            type="primary"
            size="large"
            className="bg-[#22ace3] hover:bg-[#1e9bc9]"
            onClick={() => router.push("/career")}
          >
            {t("backToCareerPage")}
          </Button>
          {!isSuccess && (
            <Button
              size="large"
              onClick={() => router.push("/profile")}
              className="border-[#22ace3] text-[#22ace3] hover:bg-[#22ace3]/10"
            >
              {t("backToApplicationPage")}
            </Button>
          )}
        </div>

        {/* Success Celebration */}
        {isSuccess && (
          <div className="mt-6 animate-bounce">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 dark:bg-primary/50 rounded-full">
              <span className="text-primary dark:text-primary font-medium">
                {t("congratulations")}
              </span>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
export default ResultModal;
