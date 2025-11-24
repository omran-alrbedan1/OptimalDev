// @ts-nocheck
"use client";

import {
  AlertCircle,
  ChevronDown,
  Upload,
  Image as ImageIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Combobox } from "@/components/ui/combobox";
import { useTranslations } from "next-intl";
import { useState, useRef } from "react";

interface QuestionInputProps {
  question: Question;
  currentValue: any;
  currentSubAnswers: Record<string, any>;
  fieldValidationErrors: Record<string, string>;
  countries?: Country[];
  cities?: City[];
  countriesLoading?: boolean;
  citiesLoading?: boolean;
  errors?: any;
  expandedOptions: Set<string>;
  onAnswerChange: (questionId: string, value: any) => void;
  onParentOptionWithSubOptions: (
    questionId: string,
    option: any,
    isChecked: boolean
  ) => void;
  onSubAnswerChange: (
    questionId: string,
    optionId: string,
    value: string[]
  ) => void;
  onToggleOptionExpansion: (optionKey: string) => void;
  setCountryId?: (id: number) => void;
}

const QuestionInput = ({
  question,
  currentValue,
  currentSubAnswers,
  fieldValidationErrors,
  countries,
  cities,
  countriesLoading = false,
  citiesLoading = false,
  errors,
  expandedOptions,
  onAnswerChange,
  onParentOptionWithSubOptions,
  onSubAnswerChange,
  onToggleOptionExpansion,
  setCountryId,
}: QuestionInputProps) => {
  const t = useTranslations("serviceRequest");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const inputClasses =
    "w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent focus:outline-none transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100";

  const hasFieldValidationError = fieldValidationErrors[question.id.toString()];

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onAnswerChange(question.id.toString(), file);

      // If it's an image type and we want to show preview
      if (question.type === "image" && file.type.startsWith("image/")) {
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
      }
    }
  };

  // Handle image selection from options (for image type questions with predefined options)
  const handleImageOptionSelect = (option: any) => {
    onAnswerChange(question.id.toString(), option);
  };

  // Clear file/image
  const handleClearFile = () => {
    onAnswerChange(question.id.toString(), null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

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

  if (question.is_dropdown_style && question.options) {
    const comboboxOptions: ComboboxOption[] = question.options.map(
      (option) => ({
        value: option.option.current,
        label: option.option.current,
        hasSubOptions: option.has_sub_options,
      })
    );

    if (question.type === "checkbox") {
      return (
        <div className="space-y-3 ">
          <Combobox
            options={comboboxOptions}
            value={Array.isArray(currentValue) ? currentValue : []}
            onChange={(value) => onAnswerChange(question.id.toString(), value)}
            placeholder={t("form.selectOptions")}
            multiple={true}
            className="!w-full"
          />
        </div>
      );
    } else {
      return (
        <Combobox
          options={comboboxOptions}
          value={currentValue || ""}
          onChange={(value) => onAnswerChange(question.id.toString(), value)}
          placeholder={t("form.selectOption")}
          multiple={false}
        />
      );
    }
  }

  switch (question.type) {
    case "file":
      return (
        <div className="space-y-4">
          {/* File upload area */}
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200 ${
              currentValue
                ? "border-primary bg-blue-50 dark:bg-blue-900/20"
                : "border-gray-300 dark:border-gray-600 hover:border-primary hover:bg-gray-50 dark:hover:bg-gray-700"
            } ${
              hasFieldValidationError
                ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                : ""
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              className="hidden"
              accept={question.validation_rules?.accept || "*/*"}
            />

            {currentValue ? (
              <div className="space-y-2">
                <Upload className="h-8 w-8 text-primary mx-auto" />
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {typeof currentValue === "string"
                    ? currentValue
                    : currentValue.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t("form.clickToChangeFile")}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {t("form.uploadFile")}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t("form.dragDropOrClick")}
                </p>
              </div>
            )}
          </div>

          {/* Clear button when file is selected */}
          {currentValue && (
            <button
              type="button"
              onClick={handleClearFile}
              className="px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors duration-200"
            >
              {t("form.removeFile")}
            </button>
          )}

          {/* Validation error */}
          {hasFieldValidationError && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {hasFieldValidationError}
            </p>
          )}
        </div>
      );

    case "image":
      // Check if this is an image upload or image selection from options
      if (
        question.has_options &&
        question.options &&
        question.options.length > 0
      ) {
        // Image selection from predefined options
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {question.options.map((option) => (
                <div
                  key={option.id}
                  className={`relative border-2 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                    currentValue?.id === option.id
                      ? "border-primary ring-2 ring-primary ring-opacity-50"
                      : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                  }`}
                  onClick={() => handleImageOptionSelect(option)}
                >
                  {option.image && (
                    <div className="aspect-square bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <img
                        src={option.image}
                        alt={option.option.current}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-2 bg-white dark:bg-gray-800">
                    <p className="text-xs text-center text-gray-700 dark:text-gray-300 font-medium">
                      {option.option.current}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Also show image upload option if there are images in the images array */}
            {question.images && question.images.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  {t("form.additionalImages")}
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {question.images.map((image) => (
                    <div
                      key={image.id}
                      className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden"
                    >
                      <div className="aspect-video bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                        <img
                          src={image.image}
                          alt={image.title.current}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-2 bg-white dark:bg-gray-800">
                        <p className="text-xs text-center text-gray-600 dark:text-gray-400">
                          {image.title.current}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Validation error */}
            {hasFieldValidationError && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {hasFieldValidationError}
              </p>
            )}
          </div>
        );
      } else {
        // Regular image upload
        return (
          <div className="space-y-4">
            {/* Image upload area */}
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200 ${
                currentValue || imagePreview
                  ? "border-primary bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-300 dark:border-gray-600 hover:border-primary hover:bg-gray-50 dark:hover:bg-gray-700"
              } ${
                hasFieldValidationError
                  ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                  : ""
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />

              {currentValue || imagePreview ? (
                <div className="space-y-3">
                  {imagePreview && (
                    <div className="mx-auto max-w-48 max-h-48 rounded-lg overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <ImageIcon className="h-6 w-6 text-primary mx-auto" />
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {typeof currentValue === "string"
                      ? currentValue
                      : currentValue?.name || t("form.imageSelected")}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t("form.clickToChangeImage")}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <ImageIcon className="h-8 w-8 text-gray-400 mx-auto" />
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {t("form.uploadImage")}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t("form.dragDropOrClick")}
                  </p>
                </div>
              )}
            </div>

            {/* Clear button when image is selected */}
            {(currentValue || imagePreview) && (
              <button
                type="button"
                onClick={handleClearFile}
                className="px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors duration-200"
              >
                {t("form.removeImage")}
              </button>
            )}

            {/* Validation error */}
            {hasFieldValidationError && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {hasFieldValidationError}
              </p>
            )}
          </div>
        );
      }

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
                onAnswerChange(question.id.toString(), option.option.current)
              }
            >
              <input
                type="radio"
                id={`${question.id}-${option.id}`}
                checked={currentValue === option.option.current}
                onChange={() =>
                  onAnswerChange(question.id.toString(), option.option.current)
                }
                className="w-5 h-5 mx-1 text-primary border-gray-300 dark:border-gray-600 focus:ring-primary"
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
        </div>
      );

    case "checkbox":
      return (
        <div className="space-y-3">
          {question.options?.map((option) => {
            const hasSubOptions = option.has_sub_options && option.sub_options;
            const optionKey = `${question.id}-${option.id}`;
            const isExpanded = expandedOptions.has(optionKey);
            const isOptionSelected =
              Array.isArray(currentValue) &&
              currentValue.includes(option.option.current);
            const optionSubAnswers =
              currentSubAnswers[option.id.toString()] || [];

            return (
              <div key={option.id} className="space-y-2">
                {/* Main option with dropdown indicator */}
                <div
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                    isOptionSelected
                      ? "border-primary bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-500"
                  }`}
                >
                  <input
                    type="checkbox"
                    id={`${question.id}-${option.id}`}
                    checked={isOptionSelected}
                    onChange={(e) => {
                      onParentOptionWithSubOptions(
                        question.id.toString(),
                        option,
                        e.target.checked
                      );

                      if (e.target.checked && !isExpanded) {
                        onToggleOptionExpansion(optionKey);
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

                  {/* Dropdown indicator for options with sub-options */}
                  {hasSubOptions && (
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleOptionExpansion(optionKey);
                        }}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      >
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-gray-500"
                        >
                          <ChevronDown className="h-5 w-5" />
                        </motion.div>
                      </button>
                    </div>
                  )}
                </div>

                {/* Sub-options as combobox/dropdown */}
                <AnimatePresence>
                  {hasSubOptions && isOptionSelected && isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -10 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="ml-8 bg-white dark:bg-gray-800 overflow-hidden"
                    >
                      {/* Sub-options grid */}
                      <div className="p-4 grid md:grid-cols-2 gap-3">
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
                                  : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500"
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
                                onSubAnswerChange(
                                  question.id.toString(),
                                  option.id.toString(),
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
                                  onSubAnswerChange(
                                    question.id.toString(),
                                    option.id.toString(),
                                    newSubValues
                                  );
                                }}
                                className="w-4 h-4 mx-1 text-primary border-gray-300 dark:border-gray-600 rounded focus:ring-primary"
                              />
                              <label
                                htmlFor={subOptionKey}
                                className="ml-2 text-gray-700 dark:text-gray-300 font-medium cursor-pointer text-sm flex-1"
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
                      </div>
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
        <div className="space-y-2">
          <input
            type={question.type}
            value={currentValue || ""}
            onChange={(e) =>
              onAnswerChange(question.id.toString(), e.target.value)
            }
            className={`${inputClasses} ${
              hasFieldValidationError
                ? "border-red-500 focus:ring-red-500 dark:border-red-500"
                : ""
            }`}
            placeholder={
              question.type === "text" ? t("form.textPlaceholder") : undefined
            }
          />
          {/* Show validation error message */}
          {hasFieldValidationError && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {hasFieldValidationError}
            </p>
          )}
        </div>
      );

    case "city":
      return (
        <div>
          <select
            value={currentValue || ""}
            onChange={(e) =>
              onAnswerChange(question.id.toString(), Number(e.target.value))
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
          {errors?.answers?.[question.id] && (
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
              onAnswerChange(question.id.toString(), Number(e.target.value));
              setCountryId?.(Number(e.target.value));
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
          {errors?.answers?.[question.id] && (
            <p className="text-red-500 text-sm mt-2 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {String(errors.answers[question.id]?.message)}
            </p>
          )}
        </div>
      );

    default:
      return (
        <div className="flex items-center space-x-2 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <AlertCircle className="h-5 w-5 text-yellow-500" />
          <span className="text-yellow-600 dark:text-yellow-400 text-sm">
            {t("validationErrors.unsupportedType")}
          </span>
        </div>
      );
  }
};

export default QuestionInput;
