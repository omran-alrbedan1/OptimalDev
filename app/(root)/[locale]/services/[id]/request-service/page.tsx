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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { requestServiceFormShema } from "@/lib/validation/userValidation";

type FormValues = z.infer<typeof requestServiceFormShema>;

const ServiceRequestPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const t = useTranslations("serviceRequest");

  const { data: questions } = useFetchWithId<QuestionResponse>(
    fetchSubServiceQuestions,
    Number(id)
  );

  const { data: service, isLoading } = useFetchWithId<SubService>(
    fetchSubService,
    Number(id)
  );

  const allQuestions = useMemo(() => {
    if (!questions) return [];
    return [
      ...(questions.general_info || []),
      ...(questions.service_details || []),
      ...(questions.pricing_questions || []),
    ];
  }, [questions]);

  const defaultValues = useMemo(() => {
    const values: FormValues = {
      sub_service_id: Number(id),
      full_name: "",
      email: "",
      phone: "",
      company_name: "",
      job_title: "",
      country_id: 0,
      city_id: 0,
      answers: {},
    };

    allQuestions.forEach((question) => {
      values.answers[question.id.toString()] =
        question.type === "checkbox" ? [] : "";
    });

    return values;
  }, [id, allQuestions]);

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

  const { data: countries, isLoading: countriesLoading } =
    useFetch<Country[]>(fetchCountries);
  const countryId = watch("country_id");
  const { data: cities, isLoading: citiesLoading } = useFetchWithId<City[]>(
    fetchCities,
    countryId
  );

  const availableSteps = useMemo(() => {
    const steps = [1];

    if (
      questions &&
      questions.general_info &&
      questions.general_info.length > 0
    ) {
      steps.push(2);
    }

    if (
      questions &&
      questions.service_details &&
      questions.service_details.length > 0
    ) {
      steps.push(steps.length + 1);
    }

    if (
      questions &&
      questions.pricing_questions &&
      questions.pricing_questions.length > 0
    ) {
      steps.push(steps.length + 1);
    }

    return steps;
  }, [questions]);

  const stepItems = useMemo(() => {
    const items = [
      {
        id: 1,
        title: t("steps.personalInfo.title"),
        description: t("steps.personalInfo.description"),
        icon: User,
      },
      {
        id: 2,
        title: t("steps.generalInfo.title"),
        description: t("steps.generalInfo.description"),
        icon: Building,
      },
      {
        id: 3,
        title: t("steps.serviceDetails.title"),
        description: t("steps.serviceDetails.description"),
        icon: FileText,
      },
      {
        id: 4,
        title: t("steps.pricing.title"),
        description: t("steps.pricing.description"),
        icon: CreditCard,
      },
    ];

    // Only include steps that are available
    return items.filter((item) => availableSteps.includes(item.id));
  }, [t, availableSteps]);

  const getActualStep = (stepIndex: number) => {
    return availableSteps[stepIndex - 1] || stepIndex;
  };

  useEffect(() => {
    if (allQuestions.length > 0) {
      const initialAnswers: Record<string, any> = {};

      allQuestions.forEach((question) => {
        initialAnswers[question.id.toString()] =
          question.type === "checkbox" ? [] : "";
      });

      reset({
        sub_service_id: Number(id),
        full_name: "",
        email: "",
        phone: "",
        company_name: "",
        job_title: "",
        country_id: 0,
        city_id: 0,
        answers: initialAnswers,
      });
    }
  }, [allQuestions, id, reset]);

  const formatAnswer = (
    value: any,
    type: string,
    countries?: Country[],
    cities?: City[]
  ) => {
    if (value === undefined || value === null) return "";

    switch (type) {
      case "checkbox":
        return Array.isArray(value) ? value : [value];
      case "city":
        const city = cities?.find((c) => c.id === Number(value));
        return city?.name || value;
      case "country":
        const country = countries?.find((c) => c.id === Number(value));
        return country?.name || value;
      case "date":
        return value instanceof Date
          ? value.toISOString().split("T")[0]
          : value;
      default:
        return value;
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
        full_name: data.full_name,
        email: data.email,
        phone: data.phone,
        company_name: data.company_name || "",
        job_title: data.job_title || "",
        country_id: Number(data.country_id),
        city_id: Number(data.city_id),
        answers: formattedAnswers,
      };

      await requestService(requestData);
      setSubmitSuccess(true);
    } catch (error: any) {
      console.error("Failed to submit service request:", error);
      console.error("Response data:", error.response?.data);
      setValidationErrors([t("validationErrors.submissionFailed")]);
    } finally {
      setIsSubmittingForm(false);
    }
  };

  const handleAnswerChange = (questionId: string, value: AnswerValue) => {
    setValue(`answers.${questionId}`, value);
    trigger(`answers.${questionId}`);
    setValidationErrors([]);
  };

  const getCurrentStepQuestions = (): Question[] => {
    if (!questions) return [];

    const actualStep = getActualStep(step);

    switch (actualStep) {
      case 2:
        return (questions.general_info || []).sort(
          (a, b) => (a.sort_order || 0) - (b.sort_order || 0)
        );
      case 3:
        return (questions.service_details || []).sort(
          (a, b) => (a.sort_order || 0) - (b.sort_order || 0)
        );
      case 4:
        return (questions.pricing_questions || []).sort(
          (a, b) => (a.sort_order || 0) - (b.sort_order || 0)
        );
      default:
        return [];
    }
  };

  const validateCurrentStep = async (): Promise<boolean> => {
    setValidationErrors([]);
    const currentFormValues = watch();
    const actualStep = getActualStep(step);

    if (actualStep === 1) {
      // Existing step 1 validation
      const isValid = await trigger([
        "full_name",
        "email",
        "phone",
        "country_id",
        "city_id",
      ]);

      if (!isValid) {
        const stepErrors: string[] = [];
        if (errors.full_name)
          stepErrors.push(t("validationErrors.fullNameRequired"));
        if (errors.email) stepErrors.push(t("validationErrors.emailRequired"));
        if (errors.phone) stepErrors.push(t("validationErrors.phoneRequired"));
        if (errors.country_id)
          stepErrors.push(t("validationErrors.countryRequired"));
        if (errors.city_id) stepErrors.push(t("validationErrors.cityRequired"));
        setValidationErrors(stepErrors);
      }

      return isValid;
    } else {
      const currentStepQuestions = getCurrentStepQuestions();
      const requiredQuestions = currentStepQuestions.filter(
        (q) => q.is_required
      );
      const stepErrors: string[] = [];
      let hasErrors = false;

      // Only validate if the user has interacted with the form
      const hasUserInteracted = Object.keys(
        currentFormValues.answers || {}
      ).some((key) => {
        const questionId = key.toString();
        const question = currentStepQuestions.find(
          (q) => q.id.toString() === questionId
        );
        return question && currentFormValues.answers[questionId] !== undefined;
      });

      if (!hasUserInteracted) return true;

      const requiredFields = requiredQuestions.map(
        (q) => `answers.${q.id}` as keyof FormValues
      );
      const isFormValid = await trigger(requiredFields);

      for (const question of requiredQuestions) {
        const answerValue = currentFormValues.answers?.[question.id.toString()];

        if (
          errors.answers?.[question.id] ||
          (question.is_required &&
            (answerValue === undefined ||
              answerValue === null ||
              answerValue === "" ||
              (Array.isArray(answerValue) && answerValue.length === 0)))
        ) {
          stepErrors.push(
            t("validationErrors.questionRequired", {
              field: question.title.current,
            })
          );
          hasErrors = true;
        }
      }

      if (hasErrors) {
        setValidationErrors(stepErrors);
        return false;
      }

      return isFormValid;
    }
  };

  const nextStep = async () => {
    const isValid = await validateCurrentStep();
    if (isValid && step < stepItems.length) {
      setStep(step + 1);
      setValidationErrors([]);
    }
    setHasAttemptedSubmit(true);
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      setValidationErrors([]);
    }
  };

  const renderQuestionInput = (question: Question) => {
    const currentValue = watch(`answers.${question.id.toString()}`);

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

    const inputClasses =
      "w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent focus:outline-none transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100";

    switch (question.type) {
      case "radio":
        if (!question.options || question.options.length === 0) {
          return (
            <div className="flex items-center space-x-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <span className="text-red-600 dark:text-red-400 text-sm">
                {t("validationErrors.radioConfigError")}
              </span>
            </div>
          );
        }
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
                  {option.option.current}
                </label>
              </div>
            ))}
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
              {cities?.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
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
              onChange={(e) =>
                handleAnswerChange(
                  question.id.toString(),
                  Number(e.target.value)
                )
              }
              className={inputClasses}
              disabled={countriesLoading}
            >
              <option value="">{t("form.selectCountry")}</option>
              {countries?.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
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

  const getInputIcon = (fieldName: string) => {
    const iconClasses = "h-5 w-5 text-gray-400 dark:text-gray-500";
    switch (fieldName) {
      case "full_name":
        return <User className={iconClasses} />;
      case "email":
        return <Mail className={iconClasses} />;
      case "phone":
        return <Smartphone className={iconClasses} />;
      case "company_name":
      case "job_title":
        return <Building className={iconClasses} />;
      case "country_id":
        return <Globe className={iconClasses} />;
      case "city_id":
        return <MapPin className={iconClasses} />;
      default:
        return null;
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-sky-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
            staggerChildren: 0.1,
          }}
          className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-10 max-w-lg w-full shadow-2xl border border-white/20 dark:border-gray-700/20 text-center overflow-hidden"
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
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="relative max-w-7xl mx-auto p-6 pt-28">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4"
            dangerouslySetInnerHTML={{
              __html: service?.name || "",
            }}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Steps Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 sticky top-6 transition-colors duration-300">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-6">
                {t("progressTitle")}
              </h3>
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-7 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-600"></div>

                <div className="space-y-8">
                  {stepItems.map((item, index) => {
                    const StepIcon = item.icon;
                    const isActive = step === index + 1;
                    const isCompleted = step > index + 1;

                    return (
                      <div key={index} className="relative flex items-start">
                        {/* Step indicator */}
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

                        {/* Step content */}
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
                            {item.title}
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

          {/* Main Form */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-300">
              {/* Validation Errors */}
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
                    key={step}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Step 1: Personal Info */}
                    {getActualStep(step) === 1 && (
                      <div className="space-y-6">
                        <div className="text-center mb-8">
                          <h2 className="text-2xl font-bold text-primary mb-2">
                            {t("steps.personalInfo.title")}
                          </h2>
                          <p className="text-gray-600 dark:text-gray-400">
                            {t("steps.personalInfo.description")}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                              {t("form.fullName")}{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                {getInputIcon("full_name")}
                              </div>
                              <input
                                {...register("full_name")}
                                className="w-full pl-10 pr-4 py-3 border focus:outline-none border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                placeholder={t("form.fullName")}
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                              {t("form.email")}{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                {getInputIcon("email")}
                              </div>
                              <input
                                {...register("email")}
                                type="email"
                                className="w-full pl-10 focus:outline-none pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                placeholder={t("form.email")}
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                              {t("form.phone")}{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                {getInputIcon("phone")}
                              </div>
                              <input
                                {...register("phone")}
                                className="w-full pl-10 pr-4 py-3 border focus:outline-none border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                placeholder={t("form.phone")}
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                              {t("form.companyName")}
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                {getInputIcon("company_name")}
                              </div>
                              <input
                                {...register("company_name")}
                                className="w-full pl-10 pr-4 py-3 border focus:outline-none border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                placeholder={t("form.companyName")}
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                              {t("form.jobTitle")}
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                {getInputIcon("job_title")}
                              </div>
                              <input
                                {...register("job_title")}
                                className="w-full pl-10 pr-4 py-3 border focus:outline-none border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                placeholder={t("form.jobTitle")}
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                              {t("form.country")}{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                {getInputIcon("country_id")}
                              </div>
                              <select
                                {...register("country_id", {
                                  valueAsNumber: true,
                                })}
                                className="w-full pl-10 pr-4 py-3 border focus:outline-none border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 appearance-none"
                                disabled={countriesLoading}
                              >
                                <option value="">
                                  {t("form.selectCountry")}
                                </option>
                                {countries?.map((country) => (
                                  <option key={country.id} value={country.id}>
                                    {country.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                              {t("form.city")}{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                {getInputIcon("city_id")}
                              </div>
                              <select
                                {...register("city_id", {
                                  valueAsNumber: true,
                                })}
                                className="w-full pl-10 pr-4 py-3 border focus:outline-none border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 appearance-none"
                                disabled={!countryId || citiesLoading}
                              >
                                <option value="">{t("form.selectCity")}</option>
                                {cities?.map((city) => (
                                  <option key={city.id} value={city.id}>
                                    {city.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Steps 2-4 */}
                    {[2, 3, 4].includes(getActualStep(step)) && (
                      <div className="space-y-6">
                        <div className="text-center mb-8">
                          <h2 className="text-2xl font-bold text-primary mb-2">
                            {stepItems[step - 1]?.title}
                          </h2>
                          <p className="text-gray-600 dark:text-gray-400">
                            {stepItems[step - 1]?.description}
                          </p>
                        </div>

                        {getCurrentStepQuestions().map((question) => (
                          <motion.div
                            key={question.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="space-y-3"
                          >
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                              {question.title.current}
                              {question.is_required && (
                                <span className="text-red-500"> *</span>
                              )}
                            </label>
                            {renderQuestionInput(question)}
                            {errors.answers?.[question.id] && (
                              <p className="text-red-500 text-sm mt-2 flex items-center">
                                <AlertCircle className="h-4 w-4 mr-1" />
                                {String(errors.answers[question.id]?.message)}
                              </p>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className="flex justify-between mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
                  {step > 1 ? (
                    <Button
                      type="button"
                      onClick={prevStep}
                      variant="outline"
                      className="flex items-center gap-2 border-2 border-primary text-primary dark:border-primary dark:text-primary hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white"
                    >
                      <ChevronLeft className="h-5 w-5" />
                      {t("buttons.previous")}
                    </Button>
                  ) : (
                    <div></div>
                  )}

                  {step < stepItems.length ? (
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
                        if (step === stepItems.length) {
                          setHasAttemptedSubmit(true);
                          handleSubmit(onSubmit)();
                        } else {
                          nextStep();
                        }
                      }}
                      disabled={isSubmittingForm}
                      className="flex items-center gap-2 text-white bg-primary hover:bg-primary/90 disabled:opacity-50"
                    >
                      {isSubmittingForm ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
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
        </div>
      </div>
    </div>
  );
};

export default ServiceRequestPage;
