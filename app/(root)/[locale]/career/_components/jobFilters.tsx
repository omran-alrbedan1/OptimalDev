import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "antd";
import {
  FiBook,
  FiBriefcase,
  FiDollarSign,
  FiFilter,
  FiLayers,
  FiMapPin,
  FiChevronDown,
} from "react-icons/fi";
import { useState, useRef, useEffect } from "react";

interface JobFiltersProps {
  filterOptions: FilterOptions | null;
  selectedIndustries: number[];
  selectedJobTypes: number[];
  selectedWorkModes: number[];
  selectedExperienceLevels: number[];
  selectedEducationLevels: number[];
  selectedCountries: number[];
  salaryRange: [number, number];
  onIndustryChange: (id: number) => void;
  onJobTypeChange: (id: number) => void;
  onWorkModeChange: (id: number) => void;
  onSalaryChange: (value: number | number[]) => void;
  onExperienceLevelChange: (id: number) => void;
  onEducationLevelChange: (id: number) => void;
  onCountryChange: (id: number) => void;
  onResetFilters: () => void;
}

const JobFilters = ({
  filterOptions,
  selectedIndustries,
  selectedJobTypes,
  selectedWorkModes,
  selectedExperienceLevels,
  selectedEducationLevels,
  selectedCountries,
  salaryRange,
  onIndustryChange,
  onJobTypeChange,
  onWorkModeChange,
  onSalaryChange,
  onExperienceLevelChange,
  onEducationLevelChange,
  onCountryChange,
  onResetFilters,
}: JobFiltersProps) => {
  const t = useTranslations("careerPage");
  const locale = useLocale();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const FilterDropdown = ({
    title,
    icon: Icon,
    items,
    selectedItems,
    onChange,
    type,
  }: {
    title: string;
    icon: any;
    items: Array<{ id: number; name: string }>;
    selectedItems: number[];
    onChange: (id: number) => void;
    type: string;
  }) => {
    const selectedCount = selectedItems.length;
    const isOpen = openDropdown === type;

    const toggleDropdown = () => {
      setOpenDropdown(isOpen ? null : type);
    };

    const handleCheckboxChange = (id: number) => {
      onChange(id);
    };

    return (
      <div className="mb-4 relative">
        <button
          onClick={toggleDropdown}
          className="w-full h-12 flex items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 rounded-md px-3 text-left transition-colors duration-200"
        >
          <div className="flex items-center gap-2 flex-1">
            <Icon className="text-blue-500 text-lg" />
            <div className="flex flex-col">
              <span className="font-medium text-sm dark:text-white">
                {title}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {selectedCount > 0 && (
              <span className="bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {selectedCount}
              </span>
            )}
            <FiChevronDown
              className={`h-4 w-4 opacity-50 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </button>

        {/* Dropdown Content */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
            <div className="p-3 space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <Checkbox
                    id={`${type}-${item.id}`}
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={() => handleCheckboxChange(item.id)}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-blue-500"
                  />
                  <Label
                    htmlFor={`${type}-${item.id}`}
                    className="flex-1 text-gray-700 dark:text-gray-300 cursor-pointer text-sm"
                  >
                    {item.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="w-full"
      ref={filterRef}
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
        {/* Your existing filter content */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-bold text-lg dark:text-white">{t("filters")}</h1>
          <button
            onClick={onResetFilters}
            className="text-sm flex items-center gap-2 px-3 py-2 rounded-[4px] bg-blue-50 hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-primary-color1 transition-colors duration-200 border border-blue-200 dark:border-gray-600 shadow-sm"
          >
            <FiFilter className="text-md" />
            <span className="font-medium">{t("resetAllFilters")}</span>
          </button>
        </div>

        {/* Industry Filter Dropdown */}
        {filterOptions?.work_sectors && (
          <FilterDropdown
            title={t("industry")}
            icon={FiLayers}
            items={filterOptions.work_sectors}
            selectedItems={selectedIndustries}
            onChange={onIndustryChange}
            type="industry"
          />
        )}

        {/* Job Type Filter Dropdown */}
        {filterOptions?.contract_types && (
          <FilterDropdown
            title={t("jobType")}
            icon={FiBriefcase}
            items={filterOptions.contract_types}
            selectedItems={selectedJobTypes}
            onChange={onJobTypeChange}
            type="jobType"
          />
        )}

        {/* Salary Range Filter */}
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2 dark:text-white">
            <FiDollarSign className="text-green-500" /> {t("salaryRange")}
          </h3>
          <div className="px-2 mt-6">
            <Slider
              range
              min={0}
              max={2000}
              value={salaryRange}
              onChange={onSalaryChange}
              marks={{
                0: t("salaryMarks.0"),
                500: t("salaryMarks.500"),
                1000: t("salaryMarks.1000"),
                1500: t("salaryMarks.1500"),
                2000: t("salaryMarks.2000"),
              }}
              tooltip={{ placement: "bottom" }}
              className="!text-primary-color1 my-4 dark:[&_.ant-slider-track]:bg-blue-500 dark:[&_.ant-slider-handle]:border-blue-500"
              reverse={locale === "ar"}
            />
            <div className="flex mt-4 justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>
                {locale === "ar"
                  ? `${salaryRange[0]} ${t("currencySymbol")} :${t(
                      "minSalary"
                    )}`
                  : `${t("minSalary")}: ${t("currencySymbol")}${
                      salaryRange[0]
                    }`}
              </span>
              <span>
                {locale === "ar"
                  ? `${salaryRange[1]} ${t("currencySymbol")} :${t(
                      "maxSalary"
                    )}`
                  : `${t("maxSalary")}: ${t("currencySymbol")}${
                      salaryRange[1]
                    }`}
              </span>
            </div>
          </div>
        </div>

        {/* Work Mode Filter Dropdown */}
        {filterOptions?.work_modes && (
          <FilterDropdown
            title={t("workMode")}
            icon={FiMapPin}
            items={filterOptions.work_modes}
            selectedItems={selectedWorkModes}
            onChange={onWorkModeChange}
            type="workMode"
          />
        )}

        {/* Experience Level Filter Dropdown */}
        {filterOptions?.experience_levels && (
          <FilterDropdown
            title={t("experienceLevel")}
            icon={FiBriefcase}
            items={filterOptions.experience_levels}
            selectedItems={selectedExperienceLevels}
            onChange={onExperienceLevelChange}
            type="experience"
          />
        )}

        {/* Education Level Filter Dropdown */}
        {filterOptions?.education_levels && (
          <FilterDropdown
            title={t("educationLevel")}
            icon={FiBook}
            items={filterOptions.education_levels}
            selectedItems={selectedEducationLevels}
            onChange={onEducationLevelChange}
            type="education"
          />
        )}

        {/* Country Filter Dropdown */}
        {filterOptions?.countries && (
          <FilterDropdown
            title={t("country")}
            icon={FiMapPin}
            items={filterOptions.countries}
            selectedItems={selectedCountries}
            onChange={onCountryChange}
            type="country"
          />
        )}
      </div>
    </motion.aside>
  );
};

export default JobFilters;
