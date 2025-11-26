"use client";
import { useState, useEffect } from "react";
import { fetchJobTest, submitTestAnswers } from "@/lib/client-action";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

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
  validation_rules: string[] | null;
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

interface ValidationErrors {
  [questionId: number]: string;
}

// Helper functions for validation
const validateInputByRules = (
  value: string,
  rules: string[] | null
): boolean => {
  if (!rules || rules.length === 0) return true;

  for (const rule of rules) {
    switch (rule) {
      case "numeric":
        if (!/^\d+$/.test(value)) return false;
        break;
      case "alpha":
        if (!/^[A-Za-z\s]+$/.test(value)) return false;
        break;
      case "alphanumeric":
        if (!/^[A-Za-z0-9\s]+$/.test(value)) return false;
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return false;
        break;
      default:
        break;
    }
  }
  return true;
};

const extractTextFromHTML = (htmlString: string): string => {
  if (typeof document === "undefined")
    return htmlString.replace(/<[^>]*>/g, "");
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;
  return (
    tempDiv.textContent ||
    tempDiv.innerText ||
    htmlString.replace(/<[^>]*>/g, "")
  );
};

// Generate a unique storage key for each test
const getStorageKey = (jobId: number, testId: number) => {
  return `test_answers_${jobId}_${testId}`;
};

// Helper function to save answers to localStorage
const saveAnswersToStorage = (
  jobId: number,
  testId: number,
  answers: AnswerState
) => {
  try {
    const storageKey = getStorageKey(jobId, testId);
    const answersToSave = {
      selectedOptions: answers.selectedOptions,
      textAnswers: answers.textAnswers,
      dateAnswers: answers.dateAnswers,
      subAnswers: answers.subAnswers,
    };
    localStorage.setItem(storageKey, JSON.stringify(answersToSave));
  } catch (error) {
    console.warn("Failed to save answers to localStorage:", error);
  }
};

// Helper function to load answers from localStorage
const loadAnswersFromStorage = (
  jobId: number,
  testId: number
): Partial<AnswerState> => {
  try {
    const storageKey = getStorageKey(jobId, testId);
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.warn("Failed to load answers from localStorage:", error);
  }
  return {};
};

// Helper function to clear answers from localStorage
const clearAnswersFromStorage = (jobId: number, testId: number) => {
  try {
    const storageKey = getStorageKey(jobId, testId);
    localStorage.removeItem(storageKey);
  } catch (error) {
    console.warn("Failed to clear answers from localStorage:", error);
  }
};

export const useTestManager = (jobId: number, testId: number) => {
  const t = useTranslations("testQuestionPage.testValidation");
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
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [fieldValidationErrors, setFieldValidationErrors] = useState<
    Record<number, string>
  >({});

  const currentQuestion = testData?.questions?.[currentQuestionIndex];

  // Load saved answers when component mounts
  useEffect(() => {
    const savedAnswers = loadAnswersFromStorage(jobId, testId);
    setAnswers((prev) => ({
      ...prev,
      ...savedAnswers,
    }));
  }, [jobId, testId]);

  // Save answers whenever they change
  useEffect(() => {
    if (testData) {
      saveAnswersToStorage(jobId, testId, answers);
    }
  }, [answers, jobId, testId, testData]);

  useEffect(() => {
    const getJobTest = async () => {
      try {
        const response = await fetchJobTest(jobId, testId);
        //@ts-ignore
        setTestData(response?.data);

        // Load current question index from localStorage if available
        const savedIndex = localStorage.getItem(
          `test_current_index_${jobId}_${testId}`
        );
        if (savedIndex) {
          setCurrentQuestionIndex(parseInt(savedIndex, 10));
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load test");
      } finally {
        setLoading(false);
      }
    };

    getJobTest();
  }, [jobId, testId]);

  // Save current question index when it changes
  useEffect(() => {
    if (testData) {
      localStorage.setItem(
        `test_current_index_${jobId}_${testId}`,
        currentQuestionIndex.toString()
      );
    }
  }, [currentQuestionIndex, jobId, testId, testData]);

  // Validate current question when answers change
  useEffect(() => {
    if (currentQuestion) {
      validateCurrentQuestion();
    }
  }, [answers, currentQuestionIndex, currentQuestion]);

  const validateCurrentQuestion = (): boolean => {
    if (!currentQuestion) return true;

    const error = getQuestionError(currentQuestion);

    setValidationErrors((prev) => {
      const newErrors = { ...prev };
      if (error) {
        newErrors[currentQuestion.id] = error;
      } else {
        delete newErrors[currentQuestion.id];
      }
      return newErrors;
    });

    return !error;
  };

  const getQuestionError = (question: Question): string | null => {
    if (!question.is_required) return null;

    const questionId = question.id;

    switch (question.type) {
      case "radio":
      case "image":
        if (answers.selectedOptions[questionId] === undefined) {
          return "required";
        }
        break;

      case "checkbox":
        const checkboxAnswers =
          (answers.selectedOptions[questionId] as number[]) || [];
        if (checkboxAnswers.length === 0) {
          // Check if there are any sub-answers
          const hasSubAnswers = Object.keys(
            answers.subAnswers[questionId] || {}
          ).some(
            (optionId) =>
              (answers.subAnswers[questionId]?.[Number(optionId)] || [])
                .length > 0
          );
          if (!hasSubAnswers) {
            return "required";
          }
        }
        break;

      case "text":
      case "country":
      case "city":
        const textAnswer = answers.textAnswers[questionId];
        if (!textAnswer?.trim()) {
          return "required";
        }
        // Validate against validation rules
        if (textAnswer?.trim() && question.validation_rules) {
          const isValid = validateInputByRules(
            textAnswer,
            question.validation_rules
          );
          if (!isValid) {
            return question.validation_rules[0] || "invalid";
          }
        }
        break;

      case "date":
        if (!answers.dateAnswers[questionId]) {
          return "required";
        }
        break;

      case "file":
        if (!answers.fileAnswers[questionId]) {
          return "required";
        }
        break;

      default:
        break;
    }

    return null;
  };

  const getErrorMessage = (errorType: string, question?: Question): string => {
    const fieldName = question
      ? extractTextFromHTML(question.title.current)
      : t("thisField");

    const errorMessages: Record<string, string> = {
      required: t("required", { field: fieldName }),
      numeric: t("numeric"),
      alpha: t("alpha"),
      alphanumeric: t("alphanumeric"),
      email: t("email"),
      invalid: t("invalid"),
    };

    return errorMessages[errorType] || t("completeQuestion");
  };

  const getValidationErrorMessage = (
    validationRules: string[] | null
  ): string => {
    if (!validationRules || validationRules.length === 0) return "";

    const rulesMap: Record<string, string> = {
      numeric: t("enterNumbersOnly"),
      alpha: t("enterLettersOnly"),
      alphanumeric: t("enterLettersNumbersOnly"),
      email: t("enterValidEmail"),
    };

    const messages = validationRules
      .map((rule) => rulesMap[rule])
      .filter(Boolean);
    return messages.length > 0 ? messages[0] : "";
  };

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

  const canGoToNextQuestion = (): boolean => {
    if (!currentQuestion) return true;

    // If question is required, validate it
    if (currentQuestion.is_required) {
      return validateCurrentQuestion();
    }

    return true;
  };

  const handleNextQuestion = () => {
    if (!canGoToNextQuestion()) {
      setHasAttemptedSubmit(true);
      return;
    }

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

  const clearSavedProgress = () => {
    clearAnswersFromStorage(jobId, testId);
    localStorage.removeItem(`test_current_index_${jobId}_${testId}`);
    setAnswers({
      selectedOptions: {},
      textAnswers: {},
      fileAnswers: {},
      dateAnswers: {},
      subAnswers: {},
    });
    setCurrentQuestionIndex(0);
    setValidationErrors({});
    setHasAttemptedSubmit(false);
    setFieldValidationErrors({});
    toast.success("Test progress cleared");
  };

  const validateAllQuestions = (): boolean => {
    if (!testData) return false;

    const errors: ValidationErrors = {};
    let hasErrors = false;

    testData.questions.forEach((question) => {
      const error = getQuestionError(question);
      if (error) {
        errors[question.id] = error;
        hasErrors = true;
      }
    });

    setValidationErrors(errors);
    setHasAttemptedSubmit(true);

    return !hasErrors;
  };

  const submitTest = async () => {
    if (!testData) return;

    // Validate all questions before submission
    if (!validateAllQuestions()) {
      toast.error("Please complete all required questions");
      return;
    }

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

      // Clear saved answers after successful submission
      clearAnswersFromStorage(jobId, testId);
      localStorage.removeItem(`test_current_index_${jobId}_${testId}`);

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

  // Update field validation for text inputs
  useEffect(() => {
    if (
      currentQuestion &&
      currentQuestion.type === "text" &&
      currentQuestion.validation_rules
    ) {
      const currentValue = answers.textAnswers[currentQuestion.id];
      if (currentValue && currentValue !== "") {
        const isValid = validateInputByRules(
          currentValue.toString(),
          currentQuestion.validation_rules
        );
        setFieldValidationErrors((prev) => {
          const newErrors = { ...prev };
          if (!isValid) {
            newErrors[currentQuestion.id] = getValidationErrorMessage(
              currentQuestion.validation_rules
            );
          } else {
            delete newErrors[currentQuestion.id];
          }
          return newErrors;
        });
      } else {
        setFieldValidationErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[currentQuestion.id];
          return newErrors;
        });
      }
    }
  }, [answers.textAnswers, currentQuestionIndex, currentQuestion]);

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
    validationErrors,
    hasAttemptedSubmit,
    fieldValidationErrors,
    getErrorMessage,
    getValidationErrorMessage,
    handleRadioSelect,
    handleCheckboxSelect,
    handleTextAnswerChange,
    handleDateChange,
    handleFileUpload,
    handleSubAnswerChange,
    handleNextQuestion,
    handlePreviousQuestion,
    clearSavedProgress,
    submitTest,
    handleResultsModalClose,
    setHasAttemptedSubmit,
  };
};

export type { TestData, Question, Option, SubOption, QuestionImage };
