// components/FormContent.tsx
"use client";

import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Loader2,
} from "lucide-react";

interface FormContentProps {
  step: number;
  stepItems: Array<{
    id: number;
    key: string;
    title: string;
    description: string;
    icon: React.ComponentType<any>;
  }>;
  currentQuestionIndex: number;
  validationErrors: string[];
  hasAttemptedSubmit: boolean;
  isSubmittingForm: boolean;
  questions: QuestionResponse | null;
  countries: Country[] | null;
  cities: City[] | null;
  countriesLoading: boolean;
  citiesLoading: boolean;
  watch: any;
  setValue: any;
  trigger: any;
  errors: any;
  handleSubmit: any;
  onSubmit: SubmitHandler<any>;
  prevQuestion: () => void;
  nextQuestion: () => void;
  nextStep: () => void;
  getCurrentQuestion: () => Question | null;
  getTotalQuestionsInCurrentStep: () => number;
  canGoToNextQuestion: () => boolean;
  renderQuestionInput: (question: Question) => JSX.Element | null;
  setHasAttemptedSubmit: (value: boolean) => void;
}

const FormContent = ({
  step,
  stepItems,
  currentQuestionIndex,
  validationErrors,
  hasAttemptedSubmit,
  isSubmittingForm,
  questions,
  countries,
  cities,
  countriesLoading,
  citiesLoading,
  watch,
  setValue,
  trigger,
  errors,
  handleSubmit,
  onSubmit,
  prevQuestion,
  nextQuestion,
  nextStep,
  getCurrentQuestion,
  getTotalQuestionsInCurrentStep,
  canGoToNextQuestion,
  renderQuestionInput,
  setHasAttemptedSubmit,
}: FormContentProps) => {
  const t = useTranslations("serviceRequest");
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
                          {String(errors.answers[currentQuestion.id]?.message)}
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

export default FormContent;
