import { User, Building, FileText, CreditCard } from "lucide-react";

export const STORAGE_KEY = "service-request-form-data";
export const STORAGE_TTL = 24 * 60 * 60 * 1000; // 24 hours

export const STEP_CONFIG: StepConfig[] = [
  {
    id: 1,
    key: "personalInfo",
    icon: User,
    questionKey: "personal_information",
  },
  {
    id: 2,
    key: "generalInfo",
    icon: Building,
    questionKey: "general_info",
  },
  {
    id: 3,
    key: "serviceDetails",
    icon: FileText,
    questionKey: "service_details",
  },
  {
    id: 4,
    key: "pricing",
    icon: CreditCard,
    questionKey: "pricing_questions",
  },
];
