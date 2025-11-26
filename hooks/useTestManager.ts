"use client";
import { useState, useEffect } from "react";
import { fetchJobTest, submitTestAnswers } from "@/lib/client-action";
import { toast } from "sonner";

interface TestData {
  id: number;
  name: string;
  description: string;
  type: string;
  is_active: boolean;
  email: string;
  retryable: boolean;
  questions: Question[];
}

interface Question {
  id: number;
  title: {
    ar: string;
    en: string;
    current: string;
  };
  question: string;
  type: string;
  is_required: boolean;
  sort_order: number;
  parent_id: number | null;
  validation_rules: any;
  options: Option[];
  images: QuestionImage[];
}

interface Option {
  id: number;
  title: {
    ar: string;
    en: string;
    current: string;
  };
  sort_order: number;
  image: string | null;
  has_sub_options: boolean;
  sub_options?: SubOption[];
}

interface SubOption {
  ar: string;
  en: string;
  current: string;
  sort_order: number;
}

interface QuestionImage {
  id: number;
  title: {
    ar: string;
    en: string;
    current: string;
  };
  image: string;
  sort_order: number;
}

interface AnswerState {
  selectedOptions: Record<number, number | number[]>;
  textAnswers: Record<number, string>;
  fileAnswers: Record<number, File | null>;
  dateAnswers: Record<number, string>;
  subAnswers: Record<number, Record<number, string[]>>;
}

export const useTestManager = (jobId: number, testId: number) => {
  const [testData, setTestData] = useState<TestData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerState>({
    selectedOptions: {},
    textAnswers: {},
    fileAnswers: {},
    dateAnswers: {},
    subAnswers: {},
  });
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [testResult, setTestResult] = useState<{
    message: string;
    score: number;
    status: "success" | "failed";
  } | null>(null);

  const currentQuestion = testData?.questions?.[currentQuestionIndex];

  useEffect(() => {
    const getJobTest = async () => {
      try {
        const response = await fetchJobTest(jobId, testId);
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

  const isAnswered = () => {
    if (!currentQuestion) return false;

    switch (currentQuestion.type) {
      case "radio":
        return answers.selectedOptions[currentQuestion.id] !== undefined;

      case "checkbox":
        const checkboxAnswers =
          (answers.selectedOptions[currentQuestion.id] as number[]) || [];
        return checkboxAnswers.length > 0;

      case "text":
        return Boolean(answers.textAnswers[currentQuestion.id]?.trim());

      case "date":
        return Boolean(answers.dateAnswers[currentQuestion.id]);

      case "file":
        return answers.fileAnswers[currentQuestion.id] !== null;

      case "image":
        return answers.selectedOptions[currentQuestion.id] !== undefined;

      case "country":
      case "city":
        return Boolean(answers.textAnswers[currentQuestion.id]?.trim());

      default:
        return false;
    }
  };

  const progressPercentage = testData?.questions
    ? ((currentQuestionIndex + 1) / testData.questions.length) * 100
    : 0;

  const handleRadioSelect = (optionId: number) => {
    if (currentQuestion) {
      setAnswers((prev) => ({
        ...prev,
        selectedOptions: {
          ...prev.selectedOptions,
          [currentQuestion.id]: optionId,
        },
      }));
    }
  };

  const handleCheckboxSelect = (optionId: number, checked: boolean) => {
    if (currentQuestion) {
      setAnswers((prev) => {
        const currentSelections =
          (prev.selectedOptions[currentQuestion.id] as number[]) || [];

        let newSelections: number[];
        if (checked) {
          // Add the option if it's not already selected
          newSelections = currentSelections.includes(optionId)
            ? currentSelections
            : [...currentSelections, optionId];
        } else {
          // Remove the option
          newSelections = currentSelections.filter((id) => id !== optionId);

          // If this option has sub-options, clear them when unchecking
          const option = currentQuestion.options?.find(
            (opt) => opt.id === optionId
          );
          if (option?.has_sub_options) {
            return {
              ...prev,
              selectedOptions: {
                ...prev.selectedOptions,
                [currentQuestion.id]: newSelections,
              },
              subAnswers: {
                ...prev.subAnswers,
                [currentQuestion.id]: {
                  ...prev.subAnswers[currentQuestion.id],
                  [optionId]: [],
                },
              },
            };
          }
        }

        return {
          ...prev,
          selectedOptions: {
            ...prev.selectedOptions,
            [currentQuestion.id]: newSelections,
          },
        };
      });
    }
  };

  const handleTextAnswerChange = (value: string) => {
    if (currentQuestion) {
      setAnswers((prev) => ({
        ...prev,
        textAnswers: {
          ...prev.textAnswers,
          [currentQuestion.id]: value,
        },
      }));
    }
  };

  const handleDateChange = (date: string) => {
    if (currentQuestion) {
      setAnswers((prev) => ({
        ...prev,
        dateAnswers: {
          ...prev.dateAnswers,
          [currentQuestion.id]: date,
        },
      }));
    }
  };

  const handleFileUpload = (file: File | null) => {
    if (currentQuestion) {
      setAnswers((prev) => ({
        ...prev,
        fileAnswers: {
          ...prev.fileAnswers,
          [currentQuestion.id]: file,
        },
      }));
    }
  };

  const handleSubAnswerChange = (
    questionId: number,
    optionId: number,
    value: string[]
  ) => {
    setAnswers((prev) => ({
      ...prev,
      subAnswers: {
        ...prev.subAnswers,
        [questionId]: {
          ...prev.subAnswers[questionId],
          [optionId]: value,
        },
      },
    }));
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
        switch (question.type) {
          case "radio":
          case "image":
            formattedAnswers.answers[question.id] =
              answers.selectedOptions[question.id] || null;
            break;

          case "checkbox":
            formattedAnswers.answers[question.id] =
              answers.selectedOptions[question.id] || [];
            break;

          case "text":
          case "country":
          case "city":
            formattedAnswers.answers[question.id] =
              answers.textAnswers[question.id] || "";
            break;

          case "date":
            formattedAnswers.answers[question.id] =
              answers.dateAnswers[question.id] || "";
            break;

          case "file":
            formattedAnswers.answers[question.id] = answers.fileAnswers[
              question.id
            ]
              ? "file_uploaded"
              : "";
            break;

          default:
            formattedAnswers.answers[question.id] = "";
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

  return {
    testData,
    currentQuestion,
    currentQuestionIndex,
    loading,
    submitLoading,
    showResultsModal,
    testResult,
    isAnswered: isAnswered(),
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
  };
};

export type { TestData, Question, Option, SubOption, QuestionImage };
