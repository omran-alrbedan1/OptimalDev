//@ts-nocheck
"use client";

import { useState, useMemo, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useFetch, useFetchWithId } from "@/hooks/useFetch";
import {
  fetchCountries,
  fetchCities,
  requestService,
  fetchSubServiceQuestions,
  fetchSubService,
} from "@/lib/client-action";
import {
  User,
  Mail,
  Phone,
  Building,
  MapPin,
  Globe,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  FileText,
  CreditCard,
  Smartphone,
  Loader2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { requestServiceFormShema } from "@/lib/validation/userValidation";
import { Skeleton } from "antd";
import { STEP_CONFIG, STORAGE_KEY } from "@/constants/service-request";
import {
  FormContent,
  LoadingScreen,
  StepIndicator,
  SuccessScreen,
} from "./_components";
type FormValues = z.infer<typeof requestServiceFormShema>;

type AnswerValue = string | string[] | number;

const ServiceRequestPage = () => {
  const { id } = useParams();
  const router = useRouter();
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

  const getStoredFormData = (): Partial<FormValues> | null => {
    if (typeof window === "undefined") return null;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);

        const isSameService = parsed.sub_service_id === Number(id);
        const isDataRecent =
          parsed.timestamp &&
          Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000; // 24 hours

        // Check if form was successfully submitted - look for the submitted flag
        const wasSubmitted = parsed.submitted === true;

        if (isSameService && isDataRecent && !wasSubmitted) {
          return parsed;
        } else {
          // Clear expired, different service, or submitted data
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch (error) {
      console.error("Error loading stored form data:", error);
      localStorage.removeItem(STORAGE_KEY);
    }
    return null;
  };

  useEffect(() => {
    const storedData = getStoredFormData();
    if (storedData && storedData.sub_service_id !== Number(id)) {
      clearStoredFormData();
    }
  }, [id]);

  // Save form data to localStorage
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

  // Clear stored form data
  const clearStoredFormData = () => {
    if (typeof window === "undefined") return;

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Error clearing form data:", error);
    }
  };

  const defaultValues = useMemo(() => {
    // Always check for submitted data first
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.submitted === true) {
            clearStoredFormData();
          }
        }
      } catch (error) {
        clearStoredFormData();
      }
    }

    const storedData = getStoredFormData();

    // If we have valid stored data that hasn't been submitted, use it
    if (storedData) {
      return storedData as FormValues;
    }

    // Otherwise start with fresh values
    const values: FormValues = {
      sub_service_id: Number(id),
      answers: {},
      sub_answers: {},
    };

    allQuestions.forEach((question) => {
      values.answers[question.id.toString()] =
        question.type === "checkbox" ? [] : "";
    });

    return values;
  }, [id, allQuestions]);

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
    defaultValues,
  });

  // Watch all answers to handle conditional questions and save to localStorage
  const answers = watch();

  // Save form data to localStorage whenever answers change
  useEffect(() => {
    if (Object.keys(answers).length > 0 && answers.answers) {
      saveFormDataToStorage(answers);
    }
  }, [answers]);

  // Save step and question index to localStorage
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

  // Effects
  useEffect(() => {
    if (allQuestions.length > 0) {
      const storedData = getStoredFormData();

      if (storedData) {
        // Restore form state from localStorage
        reset(storedData as FormValues);

        // Restore navigation state
        if (storedData.currentStep) {
          setStep(storedData.currentStep);
        }
        if (storedData.currentQuestionIndex !== undefined) {
          setCurrentQuestionIndex(storedData.currentQuestionIndex);
        }
      } else {
        // Initialize with default values
        const initialAnswers: Record<string, any> = {};
        const initialSubAnswers: Record<string, any> = {};

        allQuestions.forEach((question) => {
          initialAnswers[question.id.toString()] =
            question.type === "checkbox" ? [] : "";

          // Initialize sub_answers structure for questions with sub-options
          if (question.options?.some((opt) => opt.has_sub_options)) {
            initialSubAnswers[question.id.toString()] = {};
          }
        });

        reset({
          sub_service_id: Number(id),
          answers: initialAnswers,
          sub_answers: initialSubAnswers,
        });
      }
    }
  }, [allQuestions, id, reset]);

  // Reset question index when step changes
  useEffect(() => {
    setCurrentQuestionIndex(0);
    setExpandedOptions(new Set());
  }, [step]);

  // Helper functions
  const getActualStep = (stepIndex: number) => {
    return availableSteps[stepIndex - 1] || stepIndex;
  };

  const formatAnswer = (
    value: any,
    type: string,
    countries?: Country[],
    cities?: City[]
  ) => {
    if (value === undefined || value === null) return "";

    switch (type) {
      case "checkbox":
        return Array.isArray(value)
          ? value.map((v) => v.toString())
          : [value.toString()];
      case "city":
        const city = cities?.find((c) => c.id === Number(value));
        return city?.id?.toString() || value.toString();
      case "country":
        const country = countries?.find((c) => c.id === Number(value));
        return country?.id || value.toString();
      case "date":
        return value instanceof Date
          ? value.toISOString().split("T")[0]
          : value.toString();
      default:
        return value.toString();
    }
  };

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
      // Select parent option and all sub-options
      newValue = [...currentValues, option.option.current];

      // Auto-select all sub-options
      if (option.has_sub_options && option.sub_options) {
        const allSubOptions = option.sub_options.map(
          (subOpt: any) => subOpt.title.current
        );
        newSubAnswers[option.id] = allSubOptions;
      }
    } else {
      // Deselect parent option and clear all sub-options
      newValue = currentValues.filter(
        (v: string) => v !== option.option.current
      );

      // Clear sub-answers for this option
      delete newSubAnswers[option.id];
    }

    // Update main answer
    handleAnswerChange(questionId, newValue);

    // Update sub-answers
    if (Object.keys(newSubAnswers).length > 0) {
      setValue(`sub_answers.${questionId}`, newSubAnswers);
    } else {
      setValue(`sub_answers.${questionId}`, {});
    }
  };

  const handleSubAnswerChange = (
    questionId: string,
    optionId: string,
    value: string[]
  ) => {
    const currentAnswers = watch(`answers.${questionId}`) || [];
    const currentSubAnswers = watch(`sub_answers.${questionId}`) || {};

    // Find the parent option
    const parentOption = allQuestions
      .flatMap((q) => q.options || [])
      .find((opt) => opt.id === optionId);

    let updatedAnswers = [...currentAnswers];
    let updatedSubAnswers = { ...currentSubAnswers };

    // Update sub-answers
    if (value.length > 0) {
      updatedSubAnswers[optionId] = value;

      // Auto-select parent if not already selected
      if (
        parentOption &&
        !updatedAnswers.includes(parentOption.option.current)
      ) {
        updatedAnswers.push(parentOption.option.current);
      }
    } else {
      // Remove this option from sub-answers
      delete updatedSubAnswers[optionId];

      // Check if we should deselect the parent
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

  const getCurrentStepQuestions = (): Question[] => {
    if (!questions) return [];

    const actualStep = getActualStep(step);
    const stepConfig = STEP_CONFIG.find((config) => config.id === actualStep);

    if (!stepConfig || !questions[stepConfig.questionKey]) return [];

    return (questions[stepConfig.questionKey] as Question[]).sort(
      (a, b) => (a.sort_order || 0) - (b.sort_order || 0)
    );
  };

  // Get current question to display
  const getCurrentQuestion = (): Question | null => {
    const currentStepQuestions = getCurrentStepQuestions();
    return currentStepQuestions[currentQuestionIndex] || null;
  };

  const getTotalQuestionsInCurrentStep = (): number => {
    return getCurrentStepQuestions().length;
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
        // For checkbox, check both main answers and sub-answers
        const hasMainAnswers =
          Array.isArray(currentValue) && currentValue.length > 0;
        const hasSubAnswers = Object.keys(currentSubAnswers).some(
          (key) =>
            Array.isArray(currentSubAnswers[key]) &&
            currentSubAnswers[key].length > 0
        );

        if (!hasMainAnswers && !hasSubAnswers) {
          return false;
        }
      } else {
        if (!currentValue || currentValue === "") {
          return false;
        }
      }
    }

    return true;
  };

  const nextQuestion = () => {
    const totalQuestions = getTotalQuestionsInCurrentStep();
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Move to next step
      setCurrentQuestionIndex(0);
      setStep(step + 1);
    }
    setValidationErrors([]);
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (step > 1) {
      // Move to previous step and set to last question
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

    // Check all questions in current step
    for (const question of currentStepQuestions) {
      if (question.is_required) {
        const answer = currentFormValues.answers?.[question.id.toString()];
        const subAnswers =
          currentFormValues.sub_answers?.[question.id.toString()];

        let isAnswered = false;

        if (question.type === "checkbox") {
          // For checkbox questions, check if either main answers or sub-answers exist
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
          stepErrors.push(
            t("validationErrors.questionRequired", {
              field: question.title.current,
            })
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
    if (!isValid) return;

    try {
      const isValid = await trigger(undefined, { shouldFocus: true });
      if (!isValid) return;

      const formattedAnswers: Record<string, any> = {};
      const formattedSubAnswers: Record<string, any> = {};

      // Process main answers
      allQuestions.forEach((question) => {
        const value = data.answers[question.id.toString()];
        if (value !== undefined && value !== null && value !== "") {
          formattedAnswers[question.id.toString()] = formatAnswer(
            value,
            question.type,
            countries || [],
            cities || []
          );
        }
      });

      // Process sub answers - only include non-empty sub answers
      if (data.sub_answers) {
        Object.entries(data.sub_answers).forEach(([questionId, options]) => {
          if (options && Object.keys(options).length > 0) {
            const nonEmptyOptions: Record<string, string[]> = {};

            Object.entries(options).forEach(([optionId, subValues]) => {
              if (Array.isArray(subValues) && subValues.length > 0) {
                nonEmptyOptions[optionId] = subValues.map((v) => v.toString());
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
        answers: Object.fromEntries(
          Object.entries(formattedAnswers).map(([key, value]) => {
            if (Array.isArray(value)) {
              return [key, value.map((item) => item.toString())];
            }
            return [key, value.toString()];
          })
        ),
        sub_answers: formattedSubAnswers,
      };

      console.log("Submitting data:", requestData);

      await requestService(requestData);

      // Clear everything and reset form to initial state after successful submission
      clearStoredFormData();
      resetFormToInitialState();
      setSubmitSuccess(true);
    } catch (error: any) {
      console.error("Failed to submit service request:", error);

      if (error.response?.data?.errors) {
        setValidationErrors(
          Object.values(error.response.data.errors).flat() as string[]
        );
      } else if (error.response?.data?.message) {
        setValidationErrors([error.response.data.message]);
      } else {
        setValidationErrors([t("validationErrors.submissionFailed")]);
      }
    } finally {
      setIsSubmittingForm(false);
    }
  };

  // Clear form data manually (optional - you can add a button for this)
  const handleClearForm = () => {
    clearStoredFormData();
    reset(defaultValues);
    setStep(1);
    setCurrentQuestionIndex(0);
    setValidationErrors([]);
    setHasAttemptedSubmit(false);
  };

  const renderQuestionInput = (question: Question) => {
    const currentValue = watch(`answers.${question.id.toString()}`);
    const currentSubAnswers =
      watch(`sub_answers.${question.id.toString()}`) || {};
    const inputClasses =
      "w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent focus:outline-none transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100";

    if (
      question.has_options &&
      (!question.options || question.options.length === 0)
    ) {
      return (
        <div className="flex items-center space-x-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <span className="text-red-600 dark:text-red-400 text-sm">
            {t("validationErrors.noOptions")}
          </span>
        </div>
      );
    }

    switch (question.type) {
      case "radio":
        return (
          <div className="space-y-3">
            {question.options?.map((option) => (
              <div
                key={option.id}
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                  currentValue === option.option.current
                    ? "border-primary bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-500"
                }`}
                onClick={() =>
                  handleAnswerChange(
                    question.id.toString(),
                    option.option.current
                  )
                }
              >
                <input
                  type="radio"
                  id={`${question.id}-${option.id}`}
                  checked={currentValue === option.option.current}
                  onChange={() =>
                    handleAnswerChange(
                      question.id.toString(),
                      option.option.current
                    )
                  }
                  className="w-5 h-5 mx-1 text-primary border-gray-300 dark:border-gray-600 focus:ring-primary"
                />
                <label
                  htmlFor={`${question.id}-${option.id}`}
                  className="ml-3 text-gray-700 dark:text-gray-300 font-medium cursor-pointer"
                >
                  {option.option.current}
                </label>
              </div>
            ))}
          </div>
        );

      case "checkbox":
        return (
          <div className="space-y-3">
            {question.options?.map((option) => {
              const hasSubOptions =
                option.has_sub_options && option.sub_options;
              const optionKey = `${question.id}-${option.id}`;
              const isExpanded = expandedOptions.has(optionKey);
              const isOptionSelected =
                Array.isArray(currentValue) &&
                currentValue.includes(option.option.current);
              const optionSubAnswers = currentSubAnswers[option.id] || [];

              // Check if all sub-options are selected (for select all functionality)
              const allSubOptionsSelected =
                hasSubOptions &&
                option.sub_options?.every((subOpt: any) =>
                  optionSubAnswers.includes(subOpt.title.current)
                );

              return (
                <div key={option.id} className="space-y-2">
                  {/* Main option */}
                  <div
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                      isOptionSelected
                        ? "border-primary bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-500"
                    }`}
                    onClick={() => {
                      handleParentOptionWithSubOptions(
                        question.id.toString(),
                        option,
                        !isOptionSelected
                      );

                      // Auto-expand if it has sub-options and is being selected
                      if (hasSubOptions && !isOptionSelected && !isExpanded) {
                        toggleOptionExpansion(optionKey);
                      }
                    }}
                  >
                    <input
                      type="checkbox"
                      id={`${question.id}-${option.id}`}
                      checked={isOptionSelected}
                      onChange={(e) => {
                        handleParentOptionWithSubOptions(
                          question.id.toString(),
                          option,
                          e.target.checked
                        );

                        // Auto-expand if it has sub-options and is being selected
                        if (hasSubOptions && e.target.checked && !isExpanded) {
                          toggleOptionExpansion(optionKey);
                        }
                      }}
                      className="w-5 h-5 mx-1 text-primary border-gray-300 dark:border-gray-600 rounded focus:ring-primary"
                    />
                    <label
                      htmlFor={`${question.id}-${option.id}`}
                      className="ml-3 text-gray-700 dark:text-gray-300 font-medium cursor-pointer flex-1"
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: option.option.current,
                        }}
                      />
                    </label>
                  </div>

                  {/* Sub-options - only show if expanded and has sub-options */}
                  <AnimatePresence>
                    {hasSubOptions && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-6 space-y-2"
                      >
                        {option.sub_options?.map((subOption, index) => {
                          const subOptionKey = `${optionKey}-${index}`;
                          const isSubOptionSelected = optionSubAnswers.includes(
                            subOption.title.current
                          );

                          return (
                            <div
                              key={index}
                              className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                                isSubOptionSelected
                                  ? "border-primary bg-blue-50 dark:bg-blue-900/20"
                                  : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800"
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                const currentSubValues = [...optionSubAnswers];
                                const isChecked = currentSubValues.includes(
                                  subOption.title.current
                                );
                                const newSubValues = isChecked
                                  ? currentSubValues.filter(
                                      (v: string) =>
                                        v !== subOption.title.current
                                    )
                                  : [
                                      ...currentSubValues,
                                      subOption.title.current,
                                    ];
                                handleSubAnswerChange(
                                  question.id.toString(),
                                  option.id,
                                  newSubValues
                                );
                              }}
                            >
                              <input
                                type="checkbox"
                                id={subOptionKey}
                                checked={isSubOptionSelected}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  const currentSubValues = [
                                    ...optionSubAnswers,
                                  ];
                                  const newSubValues = e.target.checked
                                    ? [
                                        ...currentSubValues,
                                        subOption.title.current,
                                      ]
                                    : currentSubValues.filter(
                                        (v: string) =>
                                          v !== subOption.title.current
                                      );
                                  handleSubAnswerChange(
                                    question.id.toString(),
                                    option.id,
                                    newSubValues
                                  );
                                }}
                                className="w-4 h-4 mx-1 text-primary border-gray-300 dark:border-gray-600 rounded focus:ring-primary"
                              />
                              <label
                                htmlFor={subOptionKey}
                                className="ml-2 text-gray-700 dark:text-gray-300 font-medium cursor-pointer text-sm"
                              >
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: subOption.title.current,
                                  }}
                                />
                              </label>
                            </div>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        );
      case "text":
      case "date":
        return (
          <input
            type={question.type}
            value={currentValue || ""}
            onChange={(e) =>
              handleAnswerChange(question.id.toString(), e.target.value)
            }
            className={inputClasses}
            placeholder={
              question.type === "text" ? t("form.textPlaceholder") : undefined
            }
          />
        );
      case "city":
        return (
          <div>
            <select
              value={currentValue || ""}
              onChange={(e) =>
                handleAnswerChange(
                  question.id.toString(),
                  Number(e.target.value)
                )
              }
              className={inputClasses}
              disabled={citiesLoading}
            >
              <option value="">{t("form.selectCity")}</option>
              {citiesLoading ? (
                <option value="" disabled>
                  {t("loading.cities")}
                </option>
              ) : (
                cities?.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))
              )}
            </select>
            {errors.answers?.[question.id] && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {String(errors.answers[question.id]?.message)}
              </p>
            )}
          </div>
        );
      case "country":
        return (
          <div>
            <select
              value={currentValue || ""}
              onChange={(e) => {
                handleAnswerChange(
                  question.id.toString(),
                  Number(e.target.value)
                );
                setCountryId(Number(e.target.value));
              }}
              className={inputClasses}
              disabled={countriesLoading}
            >
              <option value="">{t("form.selectCountry")}</option>
              {countriesLoading ? (
                <option value="" disabled>
                  {t("loading.countries")}
                </option>
              ) : (
                countries?.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))
              )}
            </select>
            {errors.answers?.[question.id] && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {String(errors.answers[question.id]?.message)}
              </p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    // Check if we're returning after a successful submission
    const checkForSubmittedData = () => {
      if (typeof window === "undefined") return;

      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);

          // If data is marked as submitted, clear everything and start fresh
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

  const resetFormToInitialState = () => {
    const initialValues: FormValues = {
      sub_service_id: Number(id),
      answers: {},
      sub_answers: {},
    };

    allQuestions.forEach((question) => {
      initialValues.answers[question.id.toString()] =
        question.type === "checkbox" ? [] : "";
    });

    reset(initialValues);
    setStep(1);
    setCurrentQuestionIndex(0);
    setValidationErrors([]);
    setHasAttemptedSubmit(false);
    setExpandedOptions(new Set());
  };

  // Main render logic
  if (serviceLoading || questionsLoading) {
    return <LoadingScreen />;
  }

  if (submitSuccess) {
    return <SuccessScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="relative max-w-7xl mx-auto p-6 pt-28">
        <div className="text-center mb-12">
          <div
            className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4"
            dangerouslySetInnerHTML={{
              __html: service?.name || "",
            }}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <StepIndicator step={step} stepItems={stepItems} />
          <FormContent
            step={step}
            stepItems={stepItems}
            currentQuestionIndex={currentQuestionIndex}
            validationErrors={validationErrors}
            hasAttemptedSubmit={hasAttemptedSubmit}
            isSubmittingForm={isSubmittingForm}
            questions={questions}
            countries={countries}
            cities={cities}
            countriesLoading={countriesLoading}
            citiesLoading={citiesLoading}
            watch={watch}
            setValue={setValue}
            trigger={trigger}
            errors={errors}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            prevQuestion={prevQuestion}
            nextQuestion={nextQuestion}
            nextStep={nextStep}
            getCurrentQuestion={getCurrentQuestion}
            getTotalQuestionsInCurrentStep={getTotalQuestionsInCurrentStep}
            canGoToNextQuestion={canGoToNextQuestion}
            renderQuestionInput={renderQuestionInput}
            setHasAttemptedSubmit={setHasAttemptedSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceRequestPage;
