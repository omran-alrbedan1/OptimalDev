import { useMemo, useState } from "react";
import { STEP_CONFIG } from "@/constants/service-request";

export const useQuestionNavigation = (questions: any) => {
  const [step, setStep] = useState(1);
  const [index, setIndex] = useState(0);

  const availableSteps = useMemo(() => {
    if (!questions) return STEP_CONFIG.map((s) => s.id);
    return STEP_CONFIG.filter(
      (cfg) =>
        Array.isArray(questions[cfg.questionKey]) &&
        questions[cfg.questionKey].length > 0
    ).map((s) => s.id);
  }, [questions]);

  const getQuestionsForActualStep = (actualStep: number) => {
    const stepId = availableSteps[actualStep - 1] || actualStep;
    const cfg = STEP_CONFIG.find((c) => c.id === stepId);
    if (!cfg || !questions) return [];
    return (questions[cfg.questionKey] || []).sort(
      (a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0)
    );
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  return {
    step,
    index,
    setStep,
    setIndex,
    getQuestionsForActualStep,
    nextStep,
    prevStep,
  };
};
