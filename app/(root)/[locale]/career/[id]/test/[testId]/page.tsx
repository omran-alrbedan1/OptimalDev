"use client";
import Loader from "@/components/Loader";
import TestResultsModal from "@/components/modal/TestResultModal";
import { images } from "@/constants/images";
import { fetchJobTest, submitTestAnswers } from "@/lib/client-action";
import { Button } from "antd";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock,
  Sparkles,
  XCircle,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaQuestion } from "react-icons/fa6";
import { toast } from "sonner";

interface TestData {
  id: number;
  name: string;
  description: string;
  type: string;
  is_active: boolean;
  questions: Question[];
}

interface Question {
  id: number;
  question: string;
  answer_type: string;
  choices?: Choice[];
}

interface Choice {
  id: number;
  text: string;
}

const TestPage = () => {
  const params = useParams();
  const jobId = Number(params.id);
  const testId = Number(params.testId);
  const t = useTranslations("testQuestionPage");
  const [testData, setTestData] = useState<TestData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number>
  >({});
  const [textAnswers, setTextAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [showResultsModal, setShowResultsModal] = useState(false);
  const [testResult, setTestResult] = useState<{
    message: string;
    score: number;
  } | null>(null);

  useEffect(() => {
    const getJobTest = async () => {
      try {
        const response = await fetchJobTest(jobId, testId);
        //@ts-ignore
        setTestData(response?.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load test");
      } finally {
        setLoading(false);
      }
    };

    getJobTest();
  }, [jobId, testId]);

  const currentQuestion = testData?.questions?.[currentQuestionIndex];
  const isAnswered =
    currentQuestion &&
    (currentQuestion.answer_type === "text"
      ? Boolean(textAnswers[currentQuestion.id])
      : selectedAnswers[currentQuestion.id] !== undefined);

  const progressPercentage = testData?.questions
    ? ((currentQuestionIndex + 1) / testData.questions.length) * 100
    : 0;

  const handleAnswerSelect = (choiceId: number) => {
    if (currentQuestion) {
      setSelectedAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: choiceId,
      }));
    }
  };

  const handleTextAnswerChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (currentQuestion) {
      setTextAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: e.target.value,
      }));
    }
  };

  const handleNextQuestion = () => {
    if (
      testData?.questions &&
      currentQuestionIndex < testData.questions.length - 1
    ) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const submitTest = async () => {
    if (!testData) return;

    setSubmitLoading(true);
    try {
      const formattedAnswers: { answers: Record<string, any> } = {
        answers: {},
      };

      testData.questions.forEach((question) => {
        if (question.answer_type === "text") {
          formattedAnswers.answers[question.id] =
            textAnswers[question.id] || "";
        } else {
          formattedAnswers.answers[question.id] = [
            selectedAnswers[question.id] || 0,
          ];
        }
      });

      const result = await submitTestAnswers(jobId, testId, formattedAnswers);

      setTestResult({
        message: result.message,
        score: result.score,
      });
      setShowResultsModal(true);
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(error.message || "Test submission failed");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleResultsModalClose = () => {
    setShowResultsModal(false);
    setTestResult(null);
  };
  const renderQuestionContent = () => {
    if (!currentQuestion) return null;

    switch (currentQuestion.answer_type) {
      case "choice":
        if (!currentQuestion.choices) return null;

        return (
          <div className="space-y-3">
            {currentQuestion.choices.map((choice) => {
              const isSelected =
                selectedAnswers[currentQuestion.id] === choice.id;
              return (
                <div
                  key={choice.id}
                  onClick={() => handleAnswerSelect(choice.id)}
                  className={`group relative p-4 border rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md ${
                    isSelected
                      ? "border-[#22ace3] bg-[#22ace3]/5 shadow-sm"
                      : "border-gray-200 dark:border-gray-600 hover:border-[#22ace3]/60 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-x-3">
                    <div
                      className={`relative w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                        isSelected
                          ? "border-[#22ace3] bg-[#22ace3]"
                          : "border-gray-300 group-hover:border-[#22ace3]/70"
                      }`}
                    >
                      {isSelected && (
                        <CheckCircle className="w-5 h-5 text-white absolute -top-0.5 -left-0.5" />
                      )}
                    </div>
                    <span
                      className={`text-sm font-medium transition-colors duration-200 ${
                        isSelected
                          ? "text-[#22ace3]"
                          : "text-gray-700 dark:text-gray-300 group-hover:text-[#22ace3]"
                      }`}
                    >
                      {choice.text}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        );

      case "text":
        return (
          <div className="mt-4">
            <textarea
              value={textAnswers[currentQuestion.id] || ""}
              onChange={handleTextAnswerChange}
              className="w-full p-4 border-1 border-gray-200 dark:border-gray-600 rounded-xl transition-all duration-300 min-h-[120px] resize-none text-base bg-white/90 dark:bg-gray-700/90 text-gray-800 dark:text-gray-100 focus:border-[#22ace3] focus:ring-4 focus:ring-[#22ace3]/30 focus:outline-none focus:shadow-md focus:shadow-[#22ace3]/20"
              placeholder={t("textAnswerPlaceholder")} // Make sure to add this translation
            />
          </div>
        );

      default:
        return <div>Unsupported question type</div>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-[#22ace3] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm">
            <Loader />
          </p>
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
        <div className=" max-sm:hidden w-2/5 bg-white mt-10 dark:bg-gray-900 flex items-center justify-center p-8 relative overflow-hidden min-h-screen border-r border-gray-100 dark:border-gray-800">
          <div className="absolute inset-0">
            {/* Geometric Pattern */}
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

            {/* Floating Orbs */}
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
                <div className="w-24 h-24 mx-auto mb-4  rounded-3xl flex items-center justify-center shadow-2xl shadow-[#22ace3]/25 dark:shadow-[#22ace3]/40 transform hover:scale-110 transition-all duration-500 rotate-3 hover:rotate-0">
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
                  {currentQuestionIndex + 1}/{testData.questions.length}
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

        <div className="max-sm:w-full w-3/5 bg-gray-50 dark:bg-gray-800 flex flex-col p-8 relative h-[85vh] mt-24">
          <div className="flex-grow ">
            <div className="">
              <div className="flex items-center text-start gap-x-2 mb-4">
                <div className="w-8 h-8 bg-[#22ace3]/10 dark:bg-[#22ace3]/20 rounded-lg flex items-center justify-center">
                  <FaQuestion className="w-4 h-4 text-[#22ace3]" />
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  {useLocale() === "ar" ? "السؤال" : "Question"}{" "}
                  {currentQuestionIndex + 1}
                </span>
              </div>

              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 leading-relaxed">
                {currentQuestion?.question}
              </h2>

              {renderQuestionContent()}
            </div>
          </div>

          <div className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-[4px] font-medium text-sm transition-all duration-300 ${
                currentQuestionIndex === 0
                  ? "border border-gray-200 dark:border-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed bg-gray-100 dark:bg-gray-700"
                  : "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-[#22ace3] hover:bg-[#22ace3]/5 hover:text-[#22ace3] bg-white dark:bg-gray-700 shadow-sm"
              }`}
            >
              {useLocale() === "ar" ? (
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

            {currentQuestionIndex === testData.questions.length - 1 ? (
              <Button
                onClick={submitTest}
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
                onClick={handleNextQuestion}
                disabled={!isAnswered}
                className={`flex items-center gap-2 px-6 lg:px-7 py-2.5 rounded-[4px] font-medium text-sm transition-all duration-300 ${
                  isAnswered
                    ? "bg-gradient-to-r bg-[#22ace3] hover:bg-[#1e9bc9] text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                }`}
              >
                <span>{t("next")}</span>
                {useLocale() === "ar" ? (
                  <ArrowLeft className="w-4 h-4" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
      {showResultsModal && testResult && (
        <TestResultsModal
          visible={showResultsModal}
          onClose={handleResultsModalClose}
          score={testResult.score}
        />
      )}
    </div>
  );
};

export default TestPage;
