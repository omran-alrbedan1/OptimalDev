"use client";
import React, { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Upload,
  AlertCircle,
  X,
} from "lucide-react";
import { Question } from "@/hooks/useTestManager";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface QuestionContentProps {
  currentQuestion: Question;
  answers: any;
  validationErrors: Record<number, string>;
  hasAttemptedSubmit: boolean;
  fieldValidationErrors: Record<number, string>;
  getErrorMessage: (errorType: string, question?: Question) => string;
  handleRadioSelect: (optionId: number) => void;
  handleCheckboxSelect: (optionId: number, checked: boolean) => void;
  handleTextAnswerChange: (value: string) => void;
  handleDateChange: (date: string) => void;
  handleFileUpload: (file: File | null) => void;
  handleSubAnswerChange: (
    questionId: number,
    optionId: number,
    value: string[]
  ) => void;
}

const QuestionContent: React.FC<QuestionContentProps> = ({
  currentQuestion,
  answers,
  validationErrors,
  hasAttemptedSubmit,
  fieldValidationErrors,
  getErrorMessage,
  handleRadioSelect,
  handleCheckboxSelect,
  handleTextAnswerChange,
  handleDateChange,
  handleFileUpload,
  handleSubAnswerChange,
}) => {
  const t = useTranslations("testQuestionPage");
  const [expandedOptions, setExpandedOptions] = useState<Set<number>>(
    new Set()
  );
  const [imagePreviews, setImagePreviews] = useState<Record<number, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  if (!currentQuestion) return null;

  const toggleSubOptions = (optionId: number) => {
    setExpandedOptions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(optionId)) {
        newSet.delete(optionId);
      } else {
        newSet.add(optionId);
      }
      return newSet;
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && currentQuestion) {
      handleFileUpload(file);
      if (file.type.startsWith("image/")) {
        const previewUrl = URL.createObjectURL(file);
        // Store preview by question ID
        setImagePreviews(prev => ({
          ...prev,
          [currentQuestion.id]: previewUrl
        }));
      }
    }
  };

  const handleClearFile = () => {
    if (currentQuestion) {
      handleFileUpload(null);
      // Clear preview for current question
      setImagePreviews(prev => {
        const newPreviews = { ...prev };
        // Revoke the object URL to prevent memory leaks
        if (newPreviews[currentQuestion.id]) {
          URL.revokeObjectURL(newPreviews[currentQuestion.id]);
          delete newPreviews[currentQuestion.id];
        }
        return newPreviews;
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };
    const currentImagePreview = currentQuestion ? imagePreviews[currentQuestion.id] : null;

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      Object.values(imagePreviews).forEach(previewUrl => {
        URL.revokeObjectURL(previewUrl);
      });
    };
  }, []);

  const handleSubOptionSelect = (
    optionId: number,
    subOptionValue: string,
    isSelected: boolean
  ) => {
    const currentSubAnswers =
      answers.subAnswers?.[currentQuestion.id]?.[optionId] || [];

    const newSubAnswers = isSelected
      ? currentSubAnswers.filter((v: string) => v !== subOptionValue)
      : [...currentSubAnswers, subOptionValue];

    handleSubAnswerChange(currentQuestion.id, optionId, newSubAnswers);
  };

  // Check if current question has validation error
  const hasError = validationErrors[currentQuestion.id] && hasAttemptedSubmit;
  const errorMessage = hasError
    ? getErrorMessage(validationErrors[currentQuestion.id], currentQuestion)
    : null;

  // Check if current question has field validation error (for text inputs)
  const hasFieldError =
    fieldValidationErrors[currentQuestion.id] && hasAttemptedSubmit;
  const fieldErrorMessage = hasFieldError
    ? fieldValidationErrors[currentQuestion.id]
    : null;

  const renderQuestionImages = () => {
    if (!currentQuestion.images || currentQuestion.images.length === 0)
      return null;

    return (
      <div className="mb-6 space-y-4">
        {currentQuestion.images.map((image) => (
          <div key={image.id} className="text-center">
            {image.title?.current && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                {image.title.current}
              </p>
            )}
            <div className="relative w-full max-w-md mx-auto h-64 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
              <Image
                src={image.image}
                alt={image.title?.current || "Question image"}
                fill
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderSubOptions = (option: any, parentSelected: boolean) => {
    if (
      !option.has_sub_options ||
      !option.sub_options ||
      option.sub_options.length === 0
    ) {
      return null;
    }

    const isExpanded = expandedOptions.has(option.id);
    const currentSubAnswers =
      answers.subAnswers?.[currentQuestion.id]?.[option.id] || [];

    return (
      <div className="ml-8 mt-3 space-y-2 border-l-2 border-gray-200 dark:border-gray-600 pl-4">
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-2 mt-2 overflow-hidden"
            >
              {option.sub_options.map((subOption: any, index: number) => {
                const subOptionValue =
                  subOption.current || subOption.ar || subOption.en;
                const isSubOptionSelected =
                  currentSubAnswers.includes(subOptionValue);

                return (
                  <div
                    key={index}
                    className={`p-3 border rounded-lg transition-all duration-200 cursor-pointer ${
                      parentSelected
                        ? isSubOptionSelected
                          ? "border-[#22ace3] bg-[#22ace3]/10"
                          : "border-[#22ace3]/30 bg-[#22ace3]/5 hover:bg-[#22ace3]/10"
                        : "border-gray-200 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-700/50"
                    } ${
                      !parentSelected ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() => {
                      if (parentSelected) {
                        handleSubOptionSelect(
                          option.id,
                          subOptionValue,
                          isSubOptionSelected
                        );
                      }
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                          parentSelected
                            ? isSubOptionSelected
                              ? "border-[#22ace3] bg-[#22ace3]"
                              : "border-gray-400 bg-white dark:bg-gray-800"
                            : "border-gray-300 bg-gray-100 dark:bg-gray-700"
                        }`}
                      >
                        {isSubOptionSelected && parentSelected && (
                          <CheckCircle className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span
                        className={`text-sm ${
                          parentSelected && isSubOptionSelected
                            ? "text-[#22ace3] font-medium"
                            : "text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        {subOptionValue}
                      </span>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const renderStandardOptions = () => {
    if (!currentQuestion.options || currentQuestion.options.length === 0)
      return null;

    return (
      <div className="space-y-3">
        {currentQuestion.options.map((option) => {
          const isSelected =
            currentQuestion.type === "radio"
              ? answers.selectedOptions[currentQuestion.id] === option.id
              : (
                  (answers.selectedOptions[currentQuestion.id] as number[]) ||
                  []
                ).includes(option.id);

          const hasSubOptions =
            option.has_sub_options &&
            option.sub_options &&
            option.sub_options.length > 0;

          return (
            <div key={option.id}>
              <div
                className={`group relative p-4 border rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md ${
                  isSelected
                    ? "border-[#22ace3] bg-[#22ace3]/5 shadow-sm"
                    : "border-gray-200 dark:border-gray-600 hover:border-[#22ace3]/60 hover:bg-gray-50 dark:hover:bg-gray-700"
                } ${hasSubOptions ? "pb-3" : ""} ${
                  hasError ? "border-red-300 dark:border-red-700" : ""
                }`}
                onClick={() => {
                  if (currentQuestion.type === "radio") {
                    handleRadioSelect(option.id);
                    if (hasSubOptions && !expandedOptions.has(option.id)) {
                      toggleSubOptions(option.id);
                    }
                  } else if (currentQuestion.type === "checkbox") {
                    const isCurrentlySelected = (
                      (answers.selectedOptions[
                        currentQuestion.id
                      ] as number[]) || []
                    ).includes(option.id);

                    // Use the main handleCheckboxSelect for ALL checkboxes
                    handleCheckboxSelect(option.id, !isCurrentlySelected);

                    // Expand sub-options when selecting an option that has them
                    if (
                      hasSubOptions &&
                      !isCurrentlySelected &&
                      !expandedOptions.has(option.id)
                    ) {
                      toggleSubOptions(option.id);
                    }
                  }
                }}
              >
                <div className="flex items-center gap-x-3">
                  {currentQuestion.type === "radio" ? (
                    <div
                      className={`relative w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                        isSelected
                          ? "border-[#22ace3] bg-[#22ace3]"
                          : "border-gray-300 group-hover:border-[#22ace3]/70"
                      }`}
                    >
                      {isSelected && (
                        <CheckCircle className="w-5 h-5 text-white absolute -top-0.5 -left-0.5" />
                      )}
                    </div>
                  ) : (
                    <div
                      className={`relative w-5 h-5 border-2 rounded transition-all duration-200 ${
                        isSelected
                          ? "border-[#22ace3] bg-[#22ace3]"
                          : "border-gray-300 group-hover:border-[#22ace3]/70"
                      }`}
                    >
                      {isSelected && (
                        <CheckCircle className="w-5 h-5 text-white absolute -top-0.5 -left-0.5" />
                      )}
                    </div>
                  )}

                  <div className="flex-1">
                    {option.image && (
                      <div className="relative w-40 h-40 mb-2 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                        <Image
                          src={option.image}
                          alt={option.title.current}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span
                        className={`text-sm font-medium transition-colors duration-200 ${
                          isSelected
                            ? "text-[#22ace3]"
                            : "text-gray-700 dark:text-gray-300 group-hover:text-[#22ace3]"
                        }`}
                      >
                        {option.title.current}
                      </span>

                      {hasSubOptions && (
                        <div
                          className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSubOptions(option.id);
                          }}
                        >
                          <span>
                            {t("details", { defaultValue: "Details" })}
                          </span>
                          {expandedOptions.has(option.id) ? (
                            <ChevronUp className="w-3 h-3" />
                          ) : (
                            <ChevronDown className="w-3 h-3" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {renderSubOptions(option, isSelected)}
            </div>
          );
        })}
      </div>
    );
  };

  const renderImageOptions = () => {
    if (!currentQuestion.options || currentQuestion.options.length === 0)
      return null;

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {currentQuestion.options.map((option) => {
            const isSelected =
              answers.selectedOptions[currentQuestion.id] === option.id;
            const hasSubOptions =
              option.has_sub_options &&
              option.sub_options &&
              option.sub_options.length > 0;

            return (
              <div key={option.id} className="space-y-3">
                <div
                  className={`relative border-2 rounded-xl cursor-pointer transition-all duration-200 overflow-hidden group ${
                    isSelected
                      ? "border-[#22ace3] bg-[#22ace3]/5 shadow-lg"
                      : "border-gray-200 dark:border-gray-600 hover:border-[#22ace3]/60 hover:shadow-md"
                  } ${hasError ? "border-red-300 dark:border-red-700" : ""}`}
                  onClick={() => {
                    handleRadioSelect(option.id);
                    if (hasSubOptions && !expandedOptions.has(option.id)) {
                      toggleSubOptions(option.id);
                    }
                  }}
                >
                  {option.image && (
                    <div className="relative w-full h-48">
                      <Image
                        src={option.image}
                        alt={option.title.current}
                        fill
                        className="object-cover"
                      />

                      {isSelected && (
                        <div className="absolute inset-0 bg-[#22ace3]/30 flex items-center justify-center">
                          <div className="bg-[#22ace3] rounded-full p-2 shadow-lg">
                            <CheckCircle className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      )}

                      {!isSelected && (
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="bg-white/90 rounded-full p-2">
                            <CheckCircle className="w-6 h-6 text-[#22ace3]" />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="p-3 bg-white dark:bg-gray-800">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-sm font-medium transition-colors duration-200 ${
                          isSelected
                            ? "text-[#22ace3]"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {option.title.current}
                      </span>

                      {hasSubOptions && (
                        <div
                          className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSubOptions(option.id);
                          }}
                        >
                          <span>
                            {t("details", { defaultValue: "Details" })}
                          </span>
                          {expandedOptions.has(option.id) ? (
                            <ChevronUp className="w-3 h-3" />
                          ) : (
                            <ChevronDown className="w-3 h-3" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="absolute top-2 right-2">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        isSelected
                          ? "border-[#22ace3] bg-[#22ace3]"
                          : "border-white bg-white/80"
                      }`}
                    >
                      {isSelected && (
                        <CheckCircle className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>
                </div>

                {hasSubOptions && renderSubOptions(option, isSelected)}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderFileUpload = () => {
     const currentFileAnswer = answers.fileAnswers?.[currentQuestion.id];
  const currentImagePreview = imagePreviews[currentQuestion.id];
    return(
   <div className="space-y-4">
        <div
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
          currentFileAnswer || currentImagePreview
            ? "border-[#22ace3] bg-[#22ace3]/5"
            : "border-gray-300 dark:border-gray-600 hover:border-[#22ace3] hover:bg-gray-50 dark:hover:bg-gray-700"
        } ${hasError ? "border-red-300 dark:border-red-700" : ""}`}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          className="hidden"
          accept={currentQuestion.type === "image" ? "image/*" : "*/*"}
        />
    

         {currentFileAnswer || currentImagePreview ? (
          <div className="space-y-3">
            {currentImagePreview && (
              <div className="mx-auto max-w-48 max-h-48 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                <img
                  src={currentImagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <Upload className="h-8 w-8 text-[#22ace3] mx-auto" />
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {currentFileAnswer?.name ||
                t("fileSelected", { defaultValue: "File selected" })}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {t("clickToChangeFile", { defaultValue: "Click to change file" })}
            </p>
          </div>

        ) : (
          <div className="space-y-2">
            <Upload className="h-12 w-12 text-gray-400 mx-auto" />
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {currentQuestion.type === "image"
                ? t("uploadImage", { defaultValue: "Upload image" })
                : t("uploadFile", { defaultValue: "Upload file" })}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {t("dragAndDrop", {
                defaultValue: "Drag and drop or click to browse",
              })}
            </p>
          </div>
        )}
      </div>

        {(currentFileAnswer || currentImagePreview) && (
        <button
          type="button"
          onClick={handleClearFile}
          className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors duration-200"
        >
          <X className="w-4 h-4" />
          {t("removeFile", { defaultValue: "Remove file" })}
        </button>
      )}
    </div>
  )};

  const renderTextInput = () => (
    <div className="mt-4">
      <textarea
        value={answers.textAnswers?.[currentQuestion.id] || ""}
        onChange={(e) => handleTextAnswerChange(e.target.value)}
        className={`w-full p-4 border rounded-xl transition-all duration-300 min-h-[120px] resize-none text-base bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none ${
          hasFieldError
            ? "border-red-300 dark:border-red-700 focus:ring-2 focus:ring-red-500/30"
            : "border-gray-200 dark:border-gray-600 focus:border-[#22ace3] focus:ring-2 focus:ring-[#22ace3]/30"
        }`}
        placeholder={t("textAnswerPlaceholder")}
      />
      {hasFieldError && (
        <p className="text-red-500 text-sm mt-2 flex items-center">
          <AlertCircle className="w-4 h-4 mr-1" />
          {fieldErrorMessage}
        </p>
      )}
    </div>
  );

  const renderDateInput = () => (
    <div className="mt-4">
      <input
        type="date"
        value={answers.dateAnswers?.[currentQuestion.id] || ""}
        onChange={(e) => handleDateChange(e.target.value)}
        className={`w-full p-4 border rounded-xl transition-all duration-300 text-base bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none ${
          hasError
            ? "border-red-300 dark:border-red-700 focus:ring-2 focus:ring-red-500/30"
            : "border-gray-200 dark:border-gray-600 focus:border-[#22ace3] focus:ring-2 focus:ring-[#22ace3]/30"
        }`}
      />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Error Message */}
      {hasError && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm font-medium">{errorMessage}</span>
          </div>
        </div>
      )}

      {/* Question Content */}
      <div>
        {(() => {
          switch (currentQuestion.type) {
            case "radio":
            case "checkbox":
              return (
                <>
                  {renderQuestionImages()}
                  {renderStandardOptions()}
                </>
              );

            case "image":
              if (
                currentQuestion.options &&
                currentQuestion.options.length > 0
              ) {
                return (
                  <>
                    {renderQuestionImages()}
                    {renderImageOptions()}
                  </>
                );
              } else {
                return (
                  <>
                    {renderQuestionImages()}
                    {renderFileUpload()}
                  </>
                );
              }

            case "file":
              return (
                <>
                  {renderQuestionImages()}
                  {renderFileUpload()}
                </>
              );

            case "text":
            case "country":
            case "city":
              return (
                <>
                  {renderQuestionImages()}
                  {renderTextInput()}
                </>
              );

            case "date":
              return (
                <>
                  {renderQuestionImages()}
                  {renderDateInput()}
                </>
              );

            default:
              return (
                <div className="text-center p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl">
                  <AlertCircle className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <p className="text-yellow-600 dark:text-yellow-400">
                    {t("unsupportedQuestionType", {
                      defaultValue: "Unsupported question type:",
                    })}{" "}
                    {currentQuestion.type}
                  </p>
                </div>
              );
          }
        })()}
      </div>
    </div>
  );
};

export default QuestionContent;
