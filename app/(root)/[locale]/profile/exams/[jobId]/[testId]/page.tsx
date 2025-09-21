"use client";
import Loader from "@/components/Loader";
import ExamResultModal from "@/components/modal/ExamResultModal";
import TestResultsModal from "@/components/modal/TestResultModal";
import { images } from "@/constants/images";
import { fetchJobTest, submitTestAnswers } from "@/lib/client-action";
import { Button } from "antd";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Timer,
  Brain,
  Zap,
  Trophy,
  BookOpen,
  Target,
  Send,
  Award,
  Clock,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaQuestion } from "react-icons/fa";
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

const ExamPage = () => {
  const params = useParams();
  const jobId = Number(params.jobId);
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
    status: "success" | "failed";
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
        status: "success",
      });
      setShowResultsModal(true);
    } catch (error: any) {
      console.error("Submission error:", error);
      setTestResult({
        message: error.message || "Test submission failed",
        score: 0,
        status: "failed",
      });
      setShowResultsModal(true);
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
          <div className="space-y-4">
            {currentQuestion.choices.map((choice, index) => {
              const isSelected =
                selectedAnswers[currentQuestion.id] === choice.id;
              const optionLabel = String.fromCharCode(65 + index);

              return (
                <div
                  key={choice.id}
                  onClick={() => handleAnswerSelect(choice.id)}
                  className={`group relative overflow-hidden rounded-xl p-1 cursor-pointer transition-all duration-300 hover:scale-[1.01] ${
                    isSelected
                      ? " border border-primary text-white "
                      : "bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-primary/50 hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-600"
                  }`}
                >
                  <div className="p-2 flex items-center space-x-4">
                    <div
                      className={`flex-shrink-0 w-10 mx-2 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                        isSelected
                          ? "bg-primary"
                          : "bg-primary/10 text-primary group-hover:bg-primary/20"
                      }`}
                    >
                      {isSelected ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        optionLabel
                      )}
                    </div>
                    <span
                      className={`flex-1 font-medium  transition-all duration-300 ${
                        isSelected
                          ? "text-primary"
                          : "text-gray-700 dark:text-gray-300 group-hover:text-primary"
                      }`}
                    >
                      <div dangerouslySetInnerHTML={{ __html: choice.text }} />
                    </span>
                  </div>
                  {isSelected && (
                    <div className="absolute inset-0 bg-white/5 animate-pulse" />
                  )}
                </div>
              );
            })}
          </div>
        );

      case "text":
        return (
          <div className="mt-6">
            <div className="relative">
              <textarea
                value={textAnswers[currentQuestion.id] || ""}
                onChange={handleTextAnswerChange}
                className="w-full p-6 border border-gray-200 dark:border-gray-600 rounded-2xl transition-all duration-300 min-h-[180px] resize-none text-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/20 focus:outline-none placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:shadow-lg"
                placeholder={
                  t("textAnswerPlaceholder") ||
                  "Type your detailed answer here..."
                }
              />
              <div className="absolute bottom-4 right-4 text-xs text-gray-400 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded-lg">
                {textAnswers[currentQuestion.id]?.length || 0} characters
              </div>
            </div>
          </div>
        );

      default:
        return <div>Unsupported question type</div>;
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!testData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full border border-gray-100 dark:border-gray-700">
          <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 bg-red-100 dark:bg-red-900/20">
            <Target className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">
            Test Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            The requested test could not be loaded. Please try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-24 pb-24 bg-gray-50 dark:bg-gray-900 flex overflow-hidden">
      {/* Left Sidebar - Fixed height */}
      <div className="max-sm:hidden w-2/5 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 relative overflow-hidden border-r-2 border-primary/20 h-screen">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/3 via-transparent to-primary/8"></div>
          <div className="absolute top-32 left-16 w-48 h-48 bg-primary/8 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-24 right-12 w-64 h-64 bg-primary/6 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-2/3 left-4 w-36 h-36 bg-primary/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        {/* Content with fixed height and overflow */}
        <div className="relative z-10 h-full flex flex-col p-8">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 mx-auto bg-white dark:bg-gray-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/25 transform hover:scale-105 transition-all duration-500 border-4 border-primary/20 hover:border-primary/40">
                <Image
                  src={images.favicon}
                  height={56}
                  width={56}
                  alt="favicon"
                  className="drop-shadow-lg"
                />
              </div>
              <div className="absolute -inset-2 border-2 border-dashed border-primary/30 rounded-3xl animate-pulse"></div>
              <div className="absolute -top-3 -right-3 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg">
                <Brain className="w-5 h-5 text-white" />
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-xl xl:text-2xl font-bold text-gray-800 dark:text-white tracking-tight leading-none">
                {testData.name}
              </h1>
              <div className="w-20 h-1 bg-primary rounded-full mx-auto"></div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium ">
                {testData.description}
              </p>
            </div>
          </div>

          {/* Progress Section */}
          <div className="bg-white/70 dark:bg-gray-800/70 rounded-3xl p-6 shadow-xl backdrop-blur-sm border-2 border-primary/10 mb-8">
            <div className=" text-center mb-3">
              <div className="inline-flex gap-2 items-center  ">
                <Timer className="w-6 h-6 text-primary" />
                <span className="font-bold text-primary">
                  {t("progress") || "Test Progress"}
                </span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="relative w-36 h-36">
                <svg
                  className="w-36 h-36 transform -rotate-90"
                  viewBox="0 0 36 36"
                >
                  <path
                    className="text-gray-200 dark:text-gray-600"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="transparent"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-primary"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray={`${progressPercentage}, 100`}
                    strokeLinecap="round"
                    fill="transparent"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-xl font-black text-primary">
                      {Math.round(progressPercentage)}%
                    </span>
                    <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t("complete") || "Done"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-4 w-full max-w-xs">
                <div className="bg-white/80 dark:bg-gray-700/80 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-600">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Award className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        {t("questionsCompleted")}
                      </p>
                      <p className="text-xl font-bold text-gray-800 dark:text-white">
                        {currentQuestionIndex + 1}
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                          /{testData.questions.length}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 dark:bg-gray-700/80 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-600">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        {t("questionsRemaining")}
                      </p>
                      <p className="text-xl font-bold text-gray-800 dark:text-white">
                        {testData.questions.length - currentQuestionIndex - 1}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Motivation */}
          <div className="mt-auto text-center pb-8">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-lg text-gray-500 dark:text-gray-400 font-medium">
                {t("motivation") || "Stay Focused"}
              </span>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-300"></div>
            </div>
            <p className="text-sm text-gray-400 dark:text-gray-500 italic max-w-xs mx-auto">
              {t("advice")}
            </p>
          </div>
        </div>
      </div>

      <div className="max-sm:w-full w-3/5  bg-gray-50 dark:bg-gray-800 flex flex-col p-8 relative h-[85vh] ">
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

      {showResultsModal && testResult && (
        <ExamResultModal
          visible={showResultsModal}
          onClose={handleResultsModalClose}
          status={testResult.status}
        />
      )}
    </div>
  );
};

export default ExamPage;
