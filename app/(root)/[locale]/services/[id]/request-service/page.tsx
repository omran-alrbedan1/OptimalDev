// @ts-nocheck
"use client";

import { useServiceRequestForm } from "./hooks/useServiceRequestForm";
import {
  FormContent,
  LoadingScreen,
  StepIndicator,
  SuccessScreen,
} from "./_components";

const ServiceRequestPage = () => {
  const {
    // State
    step,
    validationErrors,
    isSubmittingForm,
    submitSuccess,
    hasAttemptedSubmit,
    currentQuestionIndex,
    expandedOptions,
    fieldValidationErrors,

    // Data
    service,
    questions,
    countries,
    cities,
    questionsLoading,
    serviceLoading,
    countriesLoading,
    citiesLoading,
    stepItems,

    // Form methods
    handleSubmit,
    watch,
    setValue,
    trigger,
    errors,

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
    onSubmit,

    // Setters
    setCountryId,
    setHasAttemptedSubmit,
  } = useServiceRequestForm();

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
          <div
            className=""
            dangerouslySetInnerHTML={{
              __html: service?.service_note || "",
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
            setHasAttemptedSubmit={setHasAttemptedSubmit}
            fieldValidationErrors={fieldValidationErrors}
            expandedOptions={expandedOptions}
            handleAnswerChange={handleAnswerChange}
            handleParentOptionWithSubOptions={handleParentOptionWithSubOptions}
            handleSubAnswerChange={handleSubAnswerChange}
            toggleOptionExpansion={toggleOptionExpansion}
            setCountryId={setCountryId}
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceRequestPage;
