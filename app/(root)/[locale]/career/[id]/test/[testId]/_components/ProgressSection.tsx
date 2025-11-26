import React from "react";
import { useTranslations } from "next-intl";
import { Clock } from "lucide-react";

interface ProgressSectionProps {
  progressPercentage: number;
  currentQuestionIndex: number;
  totalQuestions: number;
}

const ProgressSection: React.FC<ProgressSectionProps> = ({
  progressPercentage,
  currentQuestionIndex,
  totalQuestions,
}) => {
  const t = useTranslations("testQuestionPage");

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl px-5 py-2 dark:shadow-gray-900/30 border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-x-3">
          <div className="w-8 h-8 bg-[#22ace3]/10 dark:bg-[#22ace3]/20 rounded-full flex items-center justify-center">
            <Clock className="w-4 h-4 text-[#22ace3]" />
          </div>
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {t("progress")}
          </span>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
          {currentQuestionIndex + 1}/{totalQuestions}
        </span>
      </div>

      <div className="relative mb-4">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#22ace3] rounded-full transition-all duration-700 ease-out relative"
            style={{ width: `${progressPercentage}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="text-center flex items-center justify-center gap-x-2">
        <div className="text-xl font-black text-[#22ace3] mb-1">
          {Math.round(progressPercentage)}%
        </div>
        <div className="text-md text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          {t("complete")}
        </div>
      </div>
    </div>
  );
};

export default ProgressSection;
