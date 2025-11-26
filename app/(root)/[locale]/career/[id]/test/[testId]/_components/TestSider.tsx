import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { images } from "@/constants/images";
import { Clock } from "lucide-react";
import { TestData } from "@/hooks/useTestManager";
import ProgressSection from "./ProgressSection";

interface TestSidebarProps {
  testData: TestData;
  progressPercentage: number;
  currentQuestionIndex: number;
}

const TestSidebar: React.FC<TestSidebarProps> = ({
  testData,
  progressPercentage,
  currentQuestionIndex,
}) => {
  const t = useTranslations("testQuestionPage");

  return (
    <div className="max-sm:hidden w-2/5 bg-white mt-10 dark:bg-gray-900 flex items-center justify-center p-8 relative overflow-hidden min-h-screen border-r border-gray-100 dark:border-gray-800">
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.08]">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
            <defs>
              <pattern
                id="grid"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="10" cy="10" r="1" fill="#22ace3" />
                <circle cx="5" cy="15" r="0.5" fill="#22ace3" />
                <circle cx="15" cy="5" r="0.5" fill="#22ace3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="absolute top-20 left-12 w-32 h-32 bg-[#22ace3]/5 dark:bg-[#22ace3]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-48 h-48 bg-[#22ace3]/3 dark:bg-[#22ace3]/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-8 w-24 h-24 bg-[#22ace3]/4 dark:bg-[#22ace3]/12 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="absolute top-16 right-20 w-3 h-3 bg-[#22ace3]/30 dark:bg-[#22ace3]/50 rounded-full animate-bounce"></div>
      <div className="absolute bottom-40 left-16 w-2 h-2 bg-[#22ace3]/40 dark:bg-[#22ace3]/60 rounded-full animate-bounce delay-300"></div>
      <div className="absolute top-1/3 right-12 w-1.5 h-1.5 bg-[#22ace3]/50 dark:bg-[#22ace3]/70 rounded-full animate-bounce delay-700"></div>

      <div className="text-center relative z-10 max-w-sm mx-auto">
        <div className="mb-6">
          <div className="relative inline-block">
            <div className="w-24 h-24 mx-auto mb-4 rounded-3xl flex items-center justify-center shadow-2xl shadow-[#22ace3]/25 dark:shadow-[#22ace3]/40 transform hover:scale-110 transition-all duration-500 rotate-3 hover:rotate-0">
              <Image
                src={images.favicon}
                height={64}
                width={64}
                alt="favicon"
              />
            </div>
            <div className="absolute inset-0 w-24 h-24 mx-auto border-4 border-[#22ace3]/20 dark:border-[#22ace3]/30 rounded-3xl animate-spin-slow"></div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg border-2 border-[#22ace3]/30">
              <div className="w-2 h-2 bg-[#22ace3] rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-8">
          <div className="space-y-2">
            <h1 className="text-xl xl:text-3xl font-semibold dark:text-white tracking-tight leading-none">
              {testData.name}
            </h1>
            <div className="w-16 h-1 bg-[#22ace3] rounded-full mx-auto"></div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
            {testData.description}
          </p>
        </div>

        <ProgressSection
          progressPercentage={progressPercentage}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={testData.questions.length}
        />

        <div className="mt-8 space-y-2">
          <div className="flex items-center justify-center gap-x-2">
            <div className="w-2 h-2 bg-[#22ace3] rounded-full animate-pulse"></div>
            <span className="text-md text-gray-500 dark:text-gray-400 font-medium">
              {t("motivation")}
            </span>
            <div className="w-2 h-2 bg-[#22ace3] rounded-full animate-pulse delay-300"></div>
          </div>
          <p className="text-sm text-gray-400 dark:text-gray-500 italic">
            {t("advice")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestSidebar;
