// @ts-nocheck
"use client";

import { useState, useMemo, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useParams } from "next/navigation";
import { useFetch, useFetchWithId } from "@/hooks/useFetch";
import {
  fetchCountries,
  fetchCities,
  requestService,
  fetchSubServiceQuestions,
  fetchSubService,
} from "@/lib/client-action";
import { useTranslations } from "next-intl";
import { requestServiceFormShema } from "@/lib/validation/userValidation";
import { STEP_CONFIG, STORAGE_KEY } from "@/constants/service-request";
import { getDefaultValues, validateInputByRules } from "../utils/helper";

export type FormValues = z.infer<typeof requestServiceFormShema>;
type AnswerValue = string | string[] | number;

export const useServiceRequestForm = () => {
  const { id } = useParams();
  const t = useTranslations("serviceRequest");

  // State
  const [step, setStep] = useState(1);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [countryId, setCountryId] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [expandedOptions, setExpandedOptions] = useState<Set<string>>(
    new Set()
  );
  const [fieldValidationErrors, setFieldValidationErrors] = useState<
    Record<string, string>
  >({});

  // Data fetching
  const { data: questions, isLoading: questionsLoading } =
    useFetchWithId<QuestionResponse>(fetchSubServiceQuestions, Number(id));
  const { data: service, isLoading: serviceLoading } =
    useFetchWithId<SubService>(fetchSubService, Number(id));
  const { data: countries, isLoading: countriesLoading } =
    useFetch<Country[]>(fetchCountries);
  const { data: cities, isLoading: citiesLoading } = useFetchWithId<City[]>(
    fetchCities,
    Number(countryId)
  );

  // Memoized values
  const allQuestions = useMemo(() => {
    if (!questions) return [];
    return Object.values(questions).flat().filter(Boolean) as Question[];
  }, [questions]);

  const availableSteps = useMemo(() => {
    return STEP_CONFIG.filter(
      (stepConfig) =>
        questions && questions[stepConfig.questionKey]?.length! > 0
    ).map((stepConfig) => stepConfig.id);
  }, [questions]);

  const stepItems = useMemo(() => {
    return STEP_CONFIG.filter((item) => availableSteps.includes(item.id)).map(
      (item) => ({
        ...item,
        title: t(`steps.${item.key}.title`),
        description: t(`steps.${item.key}.description`),
      })
    );
  }, [t, availableSteps]);

  // Form setup
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(requestServiceFormShema),
    defaultValues: useMemo(
      () => getDefaultValues(id, allQuestions),
      [id, allQuestions]
    ),
  });

  // Helper functions
  const getStoredFormData = (): Partial<FormValues> | null => {
    if (typeof window === "undefined") return null;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const isSameService = parsed.sub_service_id === Number(id);
        const isDataRecent =
          parsed.timestamp &&
          Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000;
        const wasSubmitted = parsed.submitted === true;

        if (isSameService && isDataRecent && !wasSubmitted) {
          return parsed;
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch (error) {
      console.error("Error loading stored form data:", error);
      localStorage.removeItem(STORAGE_KEY);
    }
    return null;
  };

  const clearStoredFormData = () => {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Error clearing form data:", error);
    }
  };

  const saveFormDataToStorage = (data: FormValues) => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          ...data,
          sub_service_id: Number(id),
          timestamp: Date.now(),
        })
      );
    } catch (error) {
      console.error("Error saving form data:", error);
    }
  };

  const getActualStep = (stepIndex: number) => {
    return availableSteps[stepIndex - 1] || stepIndex;
  };

  const getCurrentStepQuestions = (): Question[] => {
    if (!questions) return [];
    const actualStep = getActualStep(step);
    const stepConfig = STEP_CONFIG.find((config) => config.id === actualStep);
    if (!stepConfig || !questions[stepConfig.questionKey]) return [];
    return (questions[stepConfig.questionKey] as Question[]).sort(
      (a, b) => (a.sort_order || 0) - (b.sort_order || 0)
    );
  };

  const getCurrentQuestion = (): Question | null => {
    const currentStepQuestions = getCurrentStepQuestions();
    return currentStepQuestions[currentQuestionIndex] || null;
  };

  const getTotalQuestionsInCurrentStep = (): number => {
    return getCurrentStepQuestions().length;
  };

  const getValidationErrorMessage = (
    validationRules: string[] | null
  ): string => {
    if (!validationRules || validationRules.length === 0) return "";

    const rulesMap: Record<string, string> = {
      numeric: t("validationErrors.enterNumbersOnly"),
      alpha: t("validationErrors.enterLettersOnly"),
      alphanumeric: t("validationErrors.enterLettersNumbersOnly"),
      email: t("validationErrors.enterValidEmail"),
    };

    const messages = validationRules
      .map((rule) => rulesMap[rule])
      .filter(Boolean);
    return messages.length > 0 ? messages[0] : "";
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

  // Event handlers
  const handleAnswerChange = (questionId: string, value: AnswerValue) => {
    setValue(`answers.${questionId}`, value);
    trigger(`answers.${questionId}`);
    setValidationErrors([]);
  };

  const handleParentOptionWithSubOptions = (
    questionId: string,
    option: any,
    isChecked: boolean
  ) => {
    const currentValues = watch(`answers.${questionId}`) || [];
    const currentSubAnswers = watch(`sub_answers.${questionId}`) || {};

    let newValue: string[];
    let newSubAnswers = { ...currentSubAnswers };

    if (isChecked) {
      newValue = [...currentValues, option.option.current];
      if (option.has_sub_options && option.sub_options) {
        newSubAnswers[option.id.toString()] = [];
      }
    } else {
      newValue = currentValues.filter(
        (v: string) => v !== option.option.current
      );
      delete newSubAnswers[option.id.toString()];
    }

    handleAnswerChange(questionId, newValue);
    setValue(`sub_answers.${questionId}`, newSubAnswers);
  };

  const handleSubAnswerChange = (
    questionId: string,
    optionId: string,
    value: string[]
  ) => {
    const currentAnswers = watch(`answers.${questionId}`) || [];
    const currentSubAnswers = watch(`sub_answers.${questionId}`) || {};
    const question = allQuestions.find((q) => q.id.toString() === questionId);
    const parentOption = question?.options?.find(
      (opt) => opt.id.toString() === optionId
    );

    let updatedAnswers = [...currentAnswers];
    let updatedSubAnswers = { ...currentSubAnswers };

    if (value.length > 0) {
      updatedSubAnswers[optionId] = value;
      if (
        parentOption &&
        !updatedAnswers.includes(parentOption.option.current)
      ) {
        updatedAnswers.push(parentOption.option.current);
      }
    } else {
      delete updatedSubAnswers[optionId];
      const hasOtherSubOptions = Object.keys(updatedSubAnswers).some(
        (key) => key !== optionId && updatedSubAnswers[key]?.length > 0
      );
      if (!hasOtherSubOptions && parentOption) {
        updatedAnswers = updatedAnswers.filter(
          (v: string) => v !== parentOption.option.current
        );
      }
    }

    setValue(`answers.${questionId}`, updatedAnswers);
    setValue(`sub_answers.${questionId}`, updatedSubAnswers);
    trigger(`answers.${questionId}`);
    setValidationErrors([]);
  };

  const toggleOptionExpansion = (optionKey: string) => {
    setExpandedOptions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(optionKey)) {
        newSet.delete(optionKey);
      } else {
        newSet.add(optionKey);
      }
      return newSet;
    });
  };

  const canGoToNextQuestion = (): boolean => {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return false;

    const currentValue = watch(`answers.${currentQuestion.id.toString()}`);
    const currentSubAnswers =
      watch(`sub_answers.${currentQuestion.id.toString()}`) || {};

    // Check if question is required and answered
    if (currentQuestion.is_required) {
      if (currentQuestion.type === "checkbox") {
        const hasMainAnswers =
          Array.isArray(currentValue) && currentValue.length > 0;
        const hasSubAnswers = Object.keys(currentSubAnswers).some(
          (key) =>
            Array.isArray(currentSubAnswers[key]) &&
            currentSubAnswers[key].length > 0
        );
        if (!hasMainAnswers && !hasSubAnswers) return false;
      } else {
        if (!currentValue || currentValue === "") return false;
      }
    }

    // Check validation rules for text inputs
    if (
      currentQuestion.type === "text" &&
      currentValue &&
      currentQuestion.validation_rules
    ) {
      const isValid = validateInputByRules(
        currentValue.toString(),
        currentQuestion.validation_rules
      );
      if (!isValid) return false;
    }

    return true;
  };

  const nextQuestion = () => {
    if (!canGoToNextQuestion()) {
      setHasAttemptedSubmit(true);
      return;
    }

    const totalQuestions = getTotalQuestionsInCurrentStep();
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentQuestionIndex(0);
      setStep(step + 1);
    }
    setValidationErrors([]);
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (step > 1) {
      const prevStepQuestions = getCurrentStepQuestionsForStep(step - 1);
      setStep(step - 1);
      setCurrentQuestionIndex(prevStepQuestions.length - 1);
    }
    setValidationErrors([]);
  };

  const getCurrentStepQuestionsForStep = (stepNumber: number): Question[] => {
    if (!questions) return [];
    const actualStep = getActualStep(stepNumber);
    const stepConfig = STEP_CONFIG.find((config) => config.id === actualStep);
    if (!stepConfig || !questions[stepConfig.questionKey]) return [];
    return (questions[stepConfig.questionKey] as Question[]).sort(
      (a, b) => (a.sort_order || 0) - (b.sort_order || 0)
    );
  };

  const validateCurrentStep = async (): Promise<boolean> => {
    setValidationErrors([]);
    const currentFormValues = watch();
    const currentStepQuestions = getCurrentStepQuestions();
    const stepErrors: string[] = [];
    let hasErrors = false;

    for (const question of currentStepQuestions) {
      if (question.is_required) {
        const answer = currentFormValues.answers?.[question.id.toString()];
        const subAnswers =
          currentFormValues.sub_answers?.[question.id.toString()];
        let isAnswered = false;

        if (question.type === "checkbox") {
          const hasMainAnswers = Array.isArray(answer) && answer.length > 0;
          const hasSubAnswers =
            subAnswers &&
            Object.keys(subAnswers).some(
              (key) =>
                Array.isArray(subAnswers[key]) && subAnswers[key].length > 0
            );
          isAnswered = hasMainAnswers || hasSubAnswers;
        } else {
          isAnswered = !!(answer && answer !== "");
        }

        if (!isAnswered) {
          const fieldText = extractTextFromHTML(question.title.current);
          stepErrors.push(
            t("validationErrors.questionRequired", { field: fieldText })
          );
          hasErrors = true;
        }
      }

      const answer = currentFormValues.answers?.[question.id.toString()];
      if (question.type === "text" && answer && question.validation_rules) {
        const isValid = validateInputByRules(
          answer.toString(),
          question.validation_rules
        );
        if (!isValid) {
          const fieldText = extractTextFromHTML(question.title.current);
          stepErrors.push(
            `${fieldText}: ${getValidationErrorMessage(
              question.validation_rules
            )}`
          );
          hasErrors = true;
        }
      }
    }

    if (hasErrors) {
      setValidationErrors(stepErrors);
      return false;
    }
    return true;
  };

  const nextStep = async () => {
    const isValid = await validateCurrentStep();
    if (isValid && step < stepItems.length) {
      setStep(step + 1);
      setCurrentQuestionIndex(0);
      setValidationErrors([]);
    }
    setHasAttemptedSubmit(true);
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      setCurrentQuestionIndex(0);
      setValidationErrors([]);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsSubmittingForm(true);
    setHasAttemptedSubmit(true);
    const isValid = await validateCurrentStep();
    if (!isValid) {
      setIsSubmittingForm(false);
      return;
    }

    try {
      const isValid = await trigger(undefined, { shouldFocus: true });
      if (!isValid) {
        setIsSubmittingForm(false);
        return;
      }

      const formattedAnswers: Record<string, any> = {};
      const formattedSubAnswers: Record<string, any> = {};

      // Process main answers
      allQuestions.forEach((question) => {
        const value = data.answers[question.id.toString()];
        if (value !== undefined && value !== null && value !== "") {
          if (question.type === "checkbox") {
            if (Array.isArray(value) && value.length > 0) {
              formattedAnswers[question.id.toString()] = value.map((v) =>
                v.toString()
              );
            }
          } else {
            formattedAnswers[question.id.toString()] = value.toString();
          }
        }
      });

      // Process sub answers
      const currentSubAnswers = watch("sub_answers");
      if (currentSubAnswers && typeof currentSubAnswers === "object") {
        Object.entries(currentSubAnswers).forEach(([questionId, options]) => {
          if (options && typeof options === "object") {
            const nonEmptyOptions: Record<string, string[]> = {};
            Object.entries(options).forEach(([optionId, subValues]) => {
              if (Array.isArray(subValues) && subValues.length > 0) {
                const cleanedValues = subValues
                  .filter((v) => v !== null && v !== undefined && v !== "")
                  .map((v) => String(v));
                if (cleanedValues.length > 0) {
                  nonEmptyOptions[optionId] = cleanedValues;
                }
              }
            });
            if (Object.keys(nonEmptyOptions).length > 0) {
              formattedSubAnswers[questionId] = nonEmptyOptions;
            }
          }
        });
      }

      const requestData = {
        sub_service_id: Number(id),
        answers: formattedAnswers,
        sub_answers: formattedSubAnswers,
      };

      await requestService(requestData);

      // Mark as submitted before clearing
      if (typeof window !== "undefined") {
        try {
          const stored = localStorage.getItem(STORAGE_KEY);
          if (stored) {
            const parsed = JSON.parse(stored);
            localStorage.setItem(
              STORAGE_KEY,
              JSON.stringify({ ...parsed, submitted: true })
            );
          }
        } catch (error) {
          console.error("Error marking form as submitted:", error);
        }
      }

      clearStoredFormData();
      resetFormToInitialState();
      setSubmitSuccess(true);
    } catch (error: any) {
      console.error("❌ COMPLETE SUBMISSION FAILURE:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
        response: error.response?.data,
        status: error.response?.status,
      });

      if (error.response?.data?.errors) {
        const backendErrors = Object.entries(error.response.data.errors).map(
          ([field, messages]) =>
            `${field}: ${
              Array.isArray(messages) ? messages.join(", ") : messages
            }`
        );
        setValidationErrors(backendErrors);
      } else if (error.response?.data?.message) {
        setValidationErrors([error.response.data.message]);
      } else if (error.message) {
        setValidationErrors([error.message]);
      } else {
        setValidationErrors([t("validationErrors.submissionFailed")]);
      }
    } finally {
      setIsSubmittingForm(false);
    }
  };

  const resetFormToInitialState = () => {
    const initialValues: FormValues = {
      sub_service_id: Number(id),
      answers: {},
      sub_answers: {},
    };

    allQuestions.forEach((question) => {
      initialValues.answers[question.id.toString()] =
        question.type === "checkbox" ? [] : "";
      if (question.options?.some((opt) => opt.has_sub_options)) {
        initialValues.sub_answers[question.id.toString()] = {};
      }
    });

    reset(initialValues);
    setStep(1);
    setCurrentQuestionIndex(0);
    setValidationErrors([]);
    setHasAttemptedSubmit(false);
    setExpandedOptions(new Set());
    setFieldValidationErrors({});
  };

  // Effects
  useEffect(() => {
    const storedData = getStoredFormData();
    if (storedData && storedData.sub_service_id !== Number(id)) {
      clearStoredFormData();
    }
  }, [id]);

  useEffect(() => {
    const answers = watch();
    if (Object.keys(answers).length > 0 && answers.answers) {
      saveFormDataToStorage(answers);
    }
  }, [watch()]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            ...parsed,
            currentStep: step,
            currentQuestionIndex: currentQuestionIndex,
          })
        );
      }
    } catch (error) {
      console.error("Error saving navigation state:", error);
    }
  }, [step, currentQuestionIndex]);

  useEffect(() => {
    if (allQuestions.length > 0) {
      const storedData = getStoredFormData();
      if (storedData) {
        reset(storedData as FormValues);
        if (storedData.currentStep) setStep(storedData.currentStep);
        if (storedData.currentQuestionIndex !== undefined)
          setCurrentQuestionIndex(storedData.currentQuestionIndex);
      } else {
        const initialValues = getDefaultValues(id, allQuestions);
        reset(initialValues);
      }
    }
  }, [allQuestions, id, reset]);

  useEffect(() => {
    setCurrentQuestionIndex(0);
    setExpandedOptions(new Set());
    setFieldValidationErrors({});
  }, [step]);

  useEffect(() => {
    const currentQuestion = getCurrentQuestion();
    if (
      currentQuestion &&
      currentQuestion.type === "text" &&
      currentQuestion.validation_rules
    ) {
      const currentValue = watch(`answers.${currentQuestion.id.toString()}`);
      if (currentValue && currentValue !== "") {
        const isValid = validateInputByRules(
          currentValue.toString(),
          currentQuestion.validation_rules
        );
        setFieldValidationErrors((prev) => {
          const newErrors = { ...prev };
          if (!isValid) {
            newErrors[currentQuestion.id.toString()] =
              getValidationErrorMessage(currentQuestion.validation_rules);
          } else {
            delete newErrors[currentQuestion.id.toString()];
          }
          return newErrors;
        });
      } else {
        setFieldValidationErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[currentQuestion.id.toString()];
          return newErrors;
        });
      }
    }
  }, [
    watch(`answers.${getCurrentQuestion()?.id.toString()}`),
    step,
    currentQuestionIndex,
  ]);

  useEffect(() => {
    const checkForSubmittedData = () => {
      if (typeof window === "undefined") return;
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.submitted === true) {
            clearStoredFormData();
            resetFormToInitialState();
            return;
          }
        }
      } catch (error) {
        console.error("Error checking submitted data:", error);
        clearStoredFormData();
      }
    };
    checkForSubmittedData();
  }, [id]);

  return {
    // State
    step,
    validationErrors,
    isSubmittingForm,
    submitSuccess,
    hasAttemptedSubmit,
    countryId,
    currentQuestionIndex,
    expandedOptions,
    fieldValidationErrors,

    // Data
    questions,
    service,
    countries,
    cities,
    questionsLoading,
    serviceLoading,
    countriesLoading,
    citiesLoading,
    allQuestions,
    stepItems,

    // Form methods
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    reset,
    errors,
    isSubmitting,

    // Helper functions
    getCurrentQuestion,
    getTotalQuestionsInCurrentStep,
    canGoToNextQuestion,

    // Event handlers
    handleAnswerChange,
    handleParentOptionWithSubOptions,
    handleSubAnswerChange,
    toggleOptionExpansion,
    nextQuestion,
    prevQuestion,
    nextStep,
    prevStep,
    onSubmit,

    // Setters
    setCountryId,
    setHasAttemptedSubmit,
    setSubmitSuccess,

    // Utility functions
    clearStoredFormData,
    resetFormToInitialState,
  };
};

export const getStoredFormData = (): Partial<FormValues> | null => {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      const isSameService = parsed.sub_service_id === Number(id);
      const isDataRecent =
        parsed.timestamp && Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000;
      const wasSubmitted = parsed.submitted === true;
      if (isSameService && isDataRecent && !wasSubmitted) {
        return parsed;
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
  return null;
};
