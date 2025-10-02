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

type FormValues = z.infer<typeof requestServiceFormShema>;

type AnswerValue = string | string[] | number;

const STEP_CONFIG = [
  {
    id: 1,
    key: "personalInfo",
    icon: User,
    questionKey: "personal_information" as keyof QuestionResponse,
  },
  {
    id: 2,
    key: "generalInfo",
    icon: Building,
    questionKey: "general_info" as keyof QuestionResponse,
  },
  {
    id: 3,
    key: "serviceDetails",
    icon: FileText,
    questionKey: "service_details" as keyof QuestionResponse,
  },
  {
    id: 4,
    key: "pricing",
    icon: CreditCard,
    questionKey: "pricing_questions" as keyof QuestionResponse,
  },
];

// Storage key for localStorage
const STORAGE_KEY = "service-request-form-data";

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
  const [expandedChildQuestions, setExpandedChildQuestions] = useState<
    Set<number>
  >(new Set());

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

  console.log(questions);

  // Memoized values
  const allQuestions = useMemo(() => {
    if (!questions) return [];
    return Object.values(questions).flat().filter(Boolean) as Question[];
  }, [questions]);

  // Get stored form data from localStorage
  const getStoredFormData = (): Partial<FormValues> | null => {
    if (typeof window === "undefined") return null;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Check if the stored data is for the same service
        if (parsed.sub_service_id === Number(id)) {
          return parsed;
        }
      }
    } catch (error) {
      console.error("Error loading stored form data:", error);
    }
    return null;
  };

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
    const storedData = getStoredFormData();

    if (storedData) {
      return storedData as FormValues;
    }

    const values: FormValues = {
      sub_service_id: Number(id),
      answers: {},
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

        allQuestions.forEach((question) => {
          initialAnswers[question.id.toString()] =
            question.type === "checkbox" ? [] : "";
        });

        reset({
          sub_service_id: Number(id),
          answers: initialAnswers,
        });
      }
    }
  }, [allQuestions, id, reset]);

  // Reset question index when step changes
  useEffect(() => {
    setCurrentQuestionIndex(0);
    setExpandedChildQuestions(new Set());
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

  const toggleChildExpansion = (childId: number) => {
    setExpandedChildQuestions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(childId)) {
        newSet.delete(childId);
      } else {
        newSet.add(childId);
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

  // Get organized questions for current step (parents and children)
  const getCurrentStepOrganizedQuestions = () => {
    const currentStepQuestions = getCurrentStepQuestions();
    if (!currentStepQuestions.length)
      return { parents: [], childrenMap: new Map() };

    const parents = currentStepQuestions.filter((q) => !q.parent_id);
    const childrenMap = new Map<number, Question[]>();

    // Group children by parent_id
    currentStepQuestions.forEach((question) => {
      if (question.parent_id) {
        if (!childrenMap.has(question.parent_id)) {
          childrenMap.set(question.parent_id, []);
        }
        childrenMap.get(question.parent_id)!.push(question);
      }
    });

    // Sort children by sort_order
    childrenMap.forEach((children, parentId) => {
      children.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
    });

    return { parents, childrenMap };
  };

  // Get current question to display
  const getCurrentQuestion = (): Question | null => {
    const { parents, childrenMap } = getCurrentStepOrganizedQuestions();

    let currentIndex = 0;

    // Iterate through parents
    for (const parent of parents) {
      if (currentIndex === currentQuestionIndex) {
        return parent;
      }
      currentIndex++;
    }

    return null;
  };

  // Helper function to get children for a specific question
  const getChildrenForQuestion = (questionId: number): Question[] => {
    const { childrenMap } = getCurrentStepOrganizedQuestions();
    return childrenMap.get(questionId) || [];
  };

  const getTotalQuestionsInCurrentStep = (): number => {
    const { parents } = getCurrentStepOrganizedQuestions();
    return parents.length;
  };

  const canGoToNextQuestion = (): boolean => {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return false;

    const currentValue = watch(`answers.${currentQuestion.id.toString()}`);

    // Check if parent question is required and answered
    if (currentQuestion.is_required) {
      if (currentQuestion.type === "checkbox") {
        if (!Array.isArray(currentValue) || currentValue.length === 0) {
          return false;
        }
      } else {
        if (!currentValue || currentValue === "") {
          return false;
        }
      }
    }

    // Check if any child questions are required and not answered
    const children = getChildrenForQuestion(currentQuestion.id);

    if (children.length > 0) {
      for (const child of children) {
        const childValue = watch(`answers.${child.id.toString()}`);

        // For child questions that are checkboxes, check if they are selected and have required options
        if (
          child.type === "checkbox" &&
          Array.isArray(childValue) &&
          childValue.length > 0
        ) {
          // If child is selected and has required options, check those options
          if (child.is_required && childValue.length === 0) {
            return false;
          }
        } else if (child.is_required) {
          // For other types, check if required and empty
          if (
            !childValue ||
            childValue === "" ||
            (Array.isArray(childValue) && childValue.length === 0)
          ) {
            return false;
          }
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
      const totalQuestions = prevStepQuestions.filter(
        (q) => !q.parent_id
      ).length;
      setStep(step - 1);
      setCurrentQuestionIndex(totalQuestions - 1);
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
    const { parents, childrenMap } = getCurrentStepOrganizedQuestions();
    const stepErrors: string[] = [];
    let hasErrors = false;

    // Check all parents and their visible children
    for (const parent of parents) {
      // Validate parent if required
      if (parent.is_required) {
        const parentAnswer = currentFormValues.answers?.[parent.id.toString()];
        if (
          !parentAnswer ||
          parentAnswer === "" ||
          (Array.isArray(parentAnswer) && parentAnswer.length === 0)
        ) {
          stepErrors.push(
            t("validationErrors.questionRequired", {
              field: parent.title.current,
            })
          );
          hasErrors = true;
        }
      }

      // Validate children
      const children = childrenMap.get(parent.id) || [];
      for (const child of children) {
        const childAnswer = currentFormValues.answers?.[child.id.toString()];

        if (child.is_required) {
          if (
            !childAnswer ||
            childAnswer === "" ||
            (Array.isArray(childAnswer) && childAnswer.length === 0)
          ) {
            stepErrors.push(
              t("validationErrors.questionRequired", {
                field: child.title.current,
              })
            );
            hasErrors = true;
          }
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

  // Event handlers
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsSubmittingForm(true);
    setHasAttemptedSubmit(true);
    const isValid = await validateCurrentStep();
    if (!isValid) return;

    try {
      const isValid = await trigger(undefined, { shouldFocus: true });
      if (!isValid) return;

      const formattedAnswers: Record<string, any> = {};

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
      };

      await requestService(requestData);

      // Clear stored data on successful submission
      clearStoredFormData();
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
    const inputClasses =
      "w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent focus:outline-none transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100";

    // Get children for this question
    const children = getChildrenForQuestion(question.id);
    const hasChildren = children.length > 0;

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
            {/* Render parent options */}
            {question.options?.map((option) => (
              <div
                key={option.id}
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                  Array.isArray(currentValue) &&
                  currentValue.includes(option.option.current)
                    ? "border-primary bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-500"
                }`}
                onClick={() => {
                  const currentValues = Array.isArray(currentValue)
                    ? currentValue
                    : [];
                  const isChecked = currentValues.includes(
                    option.option.current
                  );
                  const newValue = isChecked
                    ? currentValues.filter(
                        (v: string) => v !== option.option.current
                      )
                    : [...currentValues, option.option.current];
                  handleAnswerChange(question.id.toString(), newValue);
                }}
              >
                <input
                  type="checkbox"
                  id={`${question.id}-${option.id}`}
                  checked={
                    Array.isArray(currentValue)
                      ? currentValue.includes(option.option.current)
                      : false
                  }
                  onChange={(e) => {
                    const currentValues = Array.isArray(currentValue)
                      ? currentValue
                      : [];
                    const newValue = e.target.checked
                      ? [...currentValues, option.option.current]
                      : currentValues.filter(
                          (v: string) => v !== option.option.current
                        );
                    handleAnswerChange(question.id.toString(), newValue);
                  }}
                  className="w-5 h-5 mx-1 text-primary border-gray-300 dark:border-gray-600 rounded focus:ring-primary"
                />
                <label
                  htmlFor={`${question.id}-${option.id}`}
                  className="ml-3 text-gray-700 dark:text-gray-300 font-medium cursor-pointer"
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: option.option.current }}
                  />
                </label>
              </div>
            ))}

            {/* Render child questions as checkbox options */}
            {hasChildren && (
              <div className=" space-y-3 ">
                {children.map((child) => {
                  const childValue = watch(`answers.${child.id.toString()}`);
                  const isChildSelected =
                    Array.isArray(childValue) && childValue.length > 0;
                  const isExpanded = expandedChildQuestions.has(child.id);

                  return (
                    <div key={child.id} className="space-y-2">
                      {/* Child question as a checkbox */}
                      <div
                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                          isChildSelected
                            ? " bg-blue-50 dark:bg-blue-900/20"
                            : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-500"
                        }`}
                        onClick={() => {
                          // Toggle child selection
                          const newValue = isChildSelected
                            ? []
                            : [child.title.current];
                          handleAnswerChange(child.id.toString(), newValue);
                          toggleChildExpansion(child.id);
                        }}
                      >
                        <label
                          htmlFor={`child-${child.id}`}
                          className="ml-3 text-gray-700 dark:text-gray-300 font-medium cursor-pointer flex-1"
                        >
                          <div
                            dangerouslySetInnerHTML={{
                              __html: child.title.current,
                            }}
                          />
                        </label>

                        {/* Expand/collapse button for child options */}
                        {child.options.length > 0 && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleChildExpansion(child.id);
                            }}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                          >
                            {isExpanded ? (
                              <ChevronUp className="h-4 w-4 text-gray-500" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-gray-500" />
                            )}
                          </button>
                        )}
                      </div>

                      {/* Child question options - only show if expanded */}
                      <AnimatePresence>
                        {isExpanded &&
                          child.options &&
                          child.options.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="ml-6 space-y-2"
                            >
                              {child.options.map((childOption) => (
                                <div
                                  key={childOption.id}
                                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                                    Array.isArray(childValue) &&
                                    childValue.includes(
                                      childOption.option.current
                                    )
                                      ? "border-primary bg-blue-50 dark:bg-blue-900/20"
                                      : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800"
                                  }`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const currentChildValues = Array.isArray(
                                      childValue
                                    )
                                      ? childValue
                                      : [];
                                    const isChildChecked =
                                      currentChildValues.includes(
                                        childOption.option.current
                                      );
                                    const newChildValue = isChildChecked
                                      ? currentChildValues.filter(
                                          (v: string) =>
                                            v !== childOption.option.current
                                        )
                                      : [
                                          ...currentChildValues,
                                          childOption.option.current,
                                        ];
                                    handleAnswerChange(
                                      child.id.toString(),
                                      newChildValue
                                    );
                                  }}
                                >
                                  <input
                                    type="checkbox"
                                    id={`${child.id}-${childOption.id}`}
                                    checked={
                                      Array.isArray(childValue)
                                        ? childValue.includes(
                                            childOption.option.current
                                          )
                                        : false
                                    }
                                    onChange={(e) => {
                                      e.stopPropagation();
                                      const currentChildValues = Array.isArray(
                                        childValue
                                      )
                                        ? childValue
                                        : [];
                                      const newChildValue = e.target.checked
                                        ? [
                                            ...currentChildValues,
                                            childOption.option.current,
                                          ]
                                        : currentChildValues.filter(
                                            (v: string) =>
                                              v !== childOption.option.current
                                          );
                                      handleAnswerChange(
                                        child.id.toString(),
                                        newChildValue
                                      );
                                    }}
                                    className="w-4 h-4 mx-1 text-primary border-gray-300 dark:border-gray-600 rounded focus:ring-primary"
                                  />
                                  <label
                                    htmlFor={`${child.id}-${childOption.id}`}
                                    className="ml-2 text-gray-700 dark:text-gray-300 font-medium cursor-pointer text-sm"
                                  >
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: childOption.option.current,
                                      }}
                                    />
                                  </label>
                                </div>
                              ))}
                            </motion.div>
                          )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            )}
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

  const renderSuccessScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-sky-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
          staggerChildren: 0.1,
        }}
        className="relative mt-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-10 max-w-lg w-full shadow-2xl border border-white/20 dark:border-gray-700/20 text-center overflow-hidden"
      >
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-cyan-200 to-blue-300 dark:from-cyan-600 dark:to-blue-700 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-tr from-sky-200 to-cyan-300 dark:from-sky-600 dark:to-cyan-700 rounded-full opacity-15 blur-2xl"></div>

        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.8,
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
          className="relative w-24 h-24 bg-gradient-to-br from-[#22ace3] to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <CheckCircle className="h-12 w-12 text-white drop-shadow-sm" />
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 0 }}
            transition={{
              delay: 0.8,
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 2,
            }}
            className="absolute inset-0 rounded-full border-4 border-[#22ace3]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent mb-4 leading-tight">
            {t("success.title")}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed"
          >
            {t("success.message")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-2xl p-4 mb-8 border border-cyan-200 dark:border-cyan-700"
          >
            <p className="text-sm text-[#22ace3] font-medium">
              ✨ {t("success.responseTime")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.4 }}
          >
            <Button
              className="group relative w-full bg-gradient-to-r from-[#22ace3] to-cyan-500 hover:from-[#1a9bc7] hover:to-cyan-600 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 overflow-hidden"
              onClick={() => router.push("/home")}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {t("success.returnHome")}
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  →
                </motion.span>
              </span>

              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );

  const renderLoadingScreen = () => (
    <div className="bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-7xl">
        <div className="text-center mb-12">
          <Skeleton.Input
            active
            size="large"
            className="w-64 h-12 mx-auto mb-4"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Steps Sidebar Skeleton */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 sticky top-6">
              <Skeleton
                active
                title={{ width: "60%" }}
                paragraph={false}
                className="mb-6"
              />
              <div className="space-y-8">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex items-start">
                    <Skeleton.Avatar active size="large" className="mr-4" />
                    <div className="flex-1">
                      <Skeleton
                        active
                        title={{ width: "70%" }}
                        paragraph={{ rows: 1, width: "100%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Form Skeleton */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <div className="text-center mb-8">
                <Skeleton
                  active
                  title={{ width: "50%" }}
                  paragraph={{ rows: 1, width: "70%" }}
                  className="mx-auto"
                />
              </div>

              <div className="space-y-6">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="space-y-3">
                    <Skeleton
                      active
                      title={{ width: "40%" }}
                      paragraph={false}
                    />
                    <Skeleton.Input active size="large" className="w-full" />
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
                <Skeleton.Button active size="large" />
                <Skeleton.Button active size="large" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStepIndicator = () => (
    <div className="w-full lg:w-1/3">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 sticky top-6 transition-colors duration-300">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-6">
          {t("progressTitle")}
        </h3>
        <div className="relative">
          <div className="absolute left-7 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-600"></div>

          <div className="space-y-8">
            {stepItems.map((item, index) => {
              const StepIcon = item.icon;
              const isActive = step === index + 1;
              const isCompleted = step > index + 1;

              return (
                <div key={index} className="relative flex items-start">
                  <div
                    className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full ${
                      isActive
                        ? "bg-primary text-white"
                        : isCompleted
                        ? "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500"
                    } relative z-10 mx-2 transition-colors duration-300`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <StepIcon className="h-5 w-5" />
                    )}
                  </div>

                  <div className="ml-4">
                    <h4
                      className={`text-sm font-medium ${
                        isActive
                          ? "text-primary"
                          : isCompleted
                          ? "text-green-600 dark:text-green-400"
                          : "text-gray-500 dark:text-gray-400"
                      } transition-colors duration-300`}
                    >
                      <div dangerouslySetInnerHTML={{ __html: item.title }} />
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const renderFormContent = () => {
    const currentQuestion = getCurrentQuestion();

    return (
      <div className="w-full lg:w-2/3">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-300">
          {validationErrors.length > 0 && hasAttemptedSubmit && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-6 mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
            >
              <div className="flex items-center mb-2">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <h3 className="text-red-800 dark:text-red-400 font-semibold">
                  {t("validationErrors.title")}
                </h3>
              </div>
              <ul className="list-disc list-inside text-red-700 dark:text-red-400 space-y-1">
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${step}-${currentQuestionIndex}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-primary mb-2">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: stepItems[step - 1]?.title,
                        }}
                      />
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {stepItems[step - 1]?.description}
                    </p>

                    {/* Progress indicator */}
                    <div className="mt-4">
                      <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                        <span>
                          {currentQuestionIndex + 1} /{" "}
                          {getTotalQuestionsInCurrentStep()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {currentQuestion && (
                    <div className="space-y-6">
                      {/* Parent Question - now includes children as nested options */}
                      <motion.div
                        key={currentQuestion.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-3"
                      >
                        <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: currentQuestion.title.current,
                            }}
                            className="inline-block"
                          />
                          {currentQuestion.is_required && (
                            <span className="text-red-500"> *</span>
                          )}
                        </label>
                        {renderQuestionInput(currentQuestion)}
                        {errors.answers?.[currentQuestion.id] && (
                          <p className="text-red-500 text-sm mt-2 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {String(
                              errors.answers[currentQuestion.id]?.message
                            )}
                          </p>
                        )}
                      </motion.div>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
              {step > 1 || currentQuestionIndex > 0 ? (
                <Button
                  type="button"
                  onClick={prevQuestion}
                  variant="outline"
                  className="flex items-center gap-2 border-2 border-primary text-primary dark:border-primary dark:text-primary hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white"
                >
                  <ChevronLeft className="h-5 w-5" />
                  {t("buttons.previous")}
                </Button>
              ) : (
                <div></div>
              )}

              {currentQuestionIndex < getTotalQuestionsInCurrentStep() - 1 ? (
                <Button
                  type="button"
                  onClick={nextQuestion}
                  disabled={!canGoToNextQuestion()}
                  className="flex items-center gap-2 text-white bg-primary hover:bg-primary/90 disabled:opacity-50"
                >
                  {t("buttons.next")}
                  <ChevronRight className="h-5 w-5" />
                </Button>
              ) : step < stepItems.length ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2 text-white bg-primary hover:bg-primary/90"
                >
                  {t("buttons.next")}
                  <ChevronRight className="h-5 w-5" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={() => {
                    setHasAttemptedSubmit(true);
                    handleSubmit(onSubmit)();
                  }}
                  disabled={isSubmittingForm}
                  className="flex items-center gap-2 text-white bg-primary hover:bg-primary/90 disabled:opacity-50"
                >
                  {isSubmittingForm ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      {t("buttons.submitting")}
                    </>
                  ) : (
                    <>
                      {t("buttons.submit")}
                      <CheckCircle className="h-5 w-5" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Main render logic
  if (serviceLoading || questionsLoading) {
    return renderLoadingScreen();
  }

  if (submitSuccess) {
    return renderSuccessScreen();
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
          {renderStepIndicator()}
          {renderFormContent()}
        </div>
      </div>
    </div>
  );
};

export default ServiceRequestPage;
