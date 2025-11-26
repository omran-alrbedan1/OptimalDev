import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "antd";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

interface NavigationControlsProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  isAnswered: boolean;
  submitLoading: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

const NavigationControls: React.FC<NavigationControlsProps> = ({
  currentQuestionIndex,
  totalQuestions,
  isAnswered,
  submitLoading,
  onPrevious,
  onNext,
  onSubmit,
}) => {
  const t = useTranslations("testQuestionPage");
  const locale = useLocale();
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  return (
    <div className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700">
      <button
        onClick={onPrevious}
        disabled={currentQuestionIndex === 0}
        className={`flex items-center gap-2 px-6 py-2.5 rounded-[4px] font-medium text-sm transition-all duration-300 ${
          currentQuestionIndex === 0
            ? "border border-gray-200 dark:border-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed bg-gray-100 dark:bg-gray-700"
            : "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-[#22ace3] hover:bg-[#22ace3]/5 hover:text-[#22ace3] bg-white dark:bg-gray-700 shadow-sm"
        }`}
      >
        {locale === "ar" ? (
          <>
            <ArrowRight className="w-4 h-4" />
            <span>{t("previous")}</span>
          </>
        ) : (
          <>
            <ArrowLeft className="w-4 h-4" />
            <span>{t("previous")}</span>
          </>
        )}
      </button>

      {isLastQuestion ? (
        <Button
          onClick={onSubmit}
          disabled={!isAnswered}
          loading={submitLoading}
          className={`flex items-center justify-center rounded-[4px] gap-2 px-6 h-10 font-medium text-sm transition-all duration-300 ${
            isAnswered
              ? "bg-gradient-to-r bg-[#22ace3] hover:bg-[#1e9bc9] text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] border-none"
              : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed border-none"
          }`}
          icon={!submitLoading && <Sparkles className="w-4 h-4" />}
        >
          {submitLoading ? t("submitting") : t("submitTest")}
        </Button>
      ) : (
        <button
          onClick={onNext}
          disabled={!isAnswered}
          className={`flex items-center gap-2 px-6 lg:px-7 py-2.5 rounded-[4px] font-medium text-sm transition-all duration-300 ${
            isAnswered
              ? "bg-gradient-to-r bg-[#22ace3] hover:bg-[#1e9bc9] text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
          }`}
        >
          <span>{t("next")}</span>
          {locale === "ar" ? (
            <ArrowLeft className="w-4 h-4" />
          ) : (
            <ArrowRight className="w-4 h-4" />
          )}
        </button>
      )}
    </div>
  );
};

export default NavigationControls;
