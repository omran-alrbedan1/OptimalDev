"use client";
import React, { useEffect } from "react";
import { Modal, Progress, Button } from "antd";
import {
  TrophyOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { shootRelisticConfetti } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface ExamResultModalProps {
  visible: boolean;
  score: number;
  status: "success" | "failed";
  onClose: () => void;
}

const ExamResultModal: React.FC<ExamResultModalProps> = ({
  visible,
  score,
  status,
  onClose,
}) => {
  const t = useTranslations("examResultModal");
  const router = useRouter();
  const isPassed = status === "success";
  const isPerfectScore = isPassed && score === 100;

  useEffect(() => {
    if (visible && isPassed) {
      const timer = setTimeout(() => {
        shootRelisticConfetti();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [visible, isPassed]);

  const resultData = isPerfectScore
    ? {
        title: t("perfectScore.title"),
        icon: <TrophyOutlined className="text-5xl text-primary" />,
        color: "#52c41a",
      }
    : isPassed
    ? {
        title: t("passed.title"),
        icon: <CheckCircleOutlined className="text-5xl text-green-500" />,
        color: "#52c41a",
      }
    : {
        title: t("failed.title"),
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
      className="exam-result-modal"
      closable={false}
    >
      <div className="text-center p-8">
        {/* Result Icon */}
        <div className="mb-4 flex justify-center">
          <div className="relative">
            {resultData.icon}
            {isPassed && (
              <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-ping opacity-75"></div>
            )}
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold mb-2 dark:text-white">
          {resultData.title}
        </h2>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <Button
            type="primary"
            size="large"
            className="bg-primary hover:bg-primary/90"
            onClick={() => router.push("/profile")}
          >
            {t("viewMyExams")}
          </Button>
          {!isPassed && (
            <Button
              size="large"
              onClick={() => router.push("/career")}
              className="border-primary text-primary hover:bg-primary/10"
            >
              {t("tryAgain")}
            </Button>
          )}
        </div>

        {isPassed && (
          <div className="mt-6 animate-bounce">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 dark:bg-primary/20 rounded-full">
              <span className="text-primary dark:text-primary-300 font-medium">
                {isPerfectScore ? t("congratulations") : t("wellDone")}
              </span>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ExamResultModal;
