"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { FaQuestion } from "react-icons/fa6";
import { XCircle } from "lucide-react";

// Components
import Loader from "@/components/Loader";
import TestResultsModal from "@/components/modal/TestResultModal";
import {
  TestSidebar,
  QuestionContent,
  NavigationControls,
} from "./_components";
import { useTestManager } from "@/hooks/useTestManager";

const TestPage = () => {
  const params = useParams();
  const jobId = Number(params.id);
  const testId = Number(params.testId);
  const t = useTranslations("testQuestionPage");
  const locale = useLocale();

  const {
    testData,
    currentQuestion,
    currentQuestionIndex,
    loading,
    submitLoading,
    showResultsModal,
    testResult,
    isAnswered,
    progressPercentage,
    answers,
    handleRadioSelect,
    handleCheckboxSelect,
    handleTextAnswerChange,
    handleDateChange,
    handleFileUpload,
    handleSubAnswerChange,
    handleNextQuestion,
    handlePreviousQuestion,
    submitTest,
    handleResultsModalClose,
  } = useTestManager(jobId, testId);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-[#22ace3] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div className="mt-3 text-gray-600 dark:text-gray-300 text-sm">
            <Loader />
          </div>
        </div>
      </div>
    );
  }

  if (!testData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-sm w-full border border-gray-100 dark:border-gray-700">
          <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 bg-red-50 dark:bg-red-900/20">
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
            Test not found
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            The requested test could not be loaded.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        <TestSidebar
          testData={testData}
          progressPercentage={progressPercentage}
          currentQuestionIndex={currentQuestionIndex}
        />

        <div className="max-sm:w-full w-3/5 max-h-[80vh] overflow-auto beautiful-sidebar bg-gray-50 dark:bg-gray-800 flex flex-col p-8 relative h-[85vh] mt-24">
          <div className="flex-grow">
            <div className="pb-16">
              <div className="flex items-center text-start gap-x-2 mb-4">
                <div className="w-8 h-8 bg-[#22ace3]/10 dark:bg-[#22ace3]/20 rounded-lg flex items-center justify-center">
                  <FaQuestion className="w-4 h-4 text-[#22ace3]" />
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  {locale === "ar" ? "السؤال" : "Question"}{" "}
                  {currentQuestionIndex + 1}
                </span>
              </div>

              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 leading-relaxed">
                {currentQuestion?.question}
              </h2>

              <QuestionContent
                currentQuestion={currentQuestion!}
                answers={answers}
                handleRadioSelect={handleRadioSelect}
                handleCheckboxSelect={handleCheckboxSelect}
                handleTextAnswerChange={handleTextAnswerChange}
                handleDateChange={handleDateChange}
                handleFileUpload={handleFileUpload}
                handleSubAnswerChange={handleSubAnswerChange}
              />
            </div>
          </div>

          <NavigationControls
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={testData.questions.length}
            isAnswered={isAnswered}
            submitLoading={submitLoading}
            onPrevious={handlePreviousQuestion}
            onNext={handleNextQuestion}
            onSubmit={submitTest}
          />
        </div>
      </div>

      {showResultsModal && testResult && (
        <TestResultsModal
          visible={showResultsModal}
          onClose={handleResultsModalClose}
          score={testResult.score}
          status={testResult.status}
        />
      )}
    </div>
  );
};

export default TestPage;
