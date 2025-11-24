import { STORAGE_KEY } from "@/constants/service-request";
import { getStoredFormData } from "../hooks/useServiceRequestForm";

export const validateInputByRules = (
  value: string,
  validationRules: string[] | null
): boolean => {
  if (!validationRules || validationRules.length === 0) return true;

  for (const rule of validationRules) {
    switch (rule) {
      case "numeric":
        if (!/^\d+$/.test(value)) return false;
        break;
      case "alpha":
        if (!/[a-zA-Z\s]+$/.test(value)) return false;
        break;
      case "alphanumeric":
        if (!/^[a-zA-Z0-9\s]+$/.test(value)) return false;
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

export const getDefaultValues = (
  id: any,
  allQuestions: Question[]
): FormValues => {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.submitted === true) {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch (error) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  const storedData = getStoredFormData();
  if (storedData) return storedData as FormValues;

  const values: FormValues = {
    sub_service_id: Number(id),
    answers: {},
    sub_answers: {},
  };

  allQuestions.forEach((question) => {
    values.answers[question.id.toString()] =
      question.type === "checkbox" ? [] : "";
    if (question.options?.some((opt) => opt.has_sub_options)) {
      values.sub_answers[question.id.toString()] = {};
    }
  });

  return values;
};
