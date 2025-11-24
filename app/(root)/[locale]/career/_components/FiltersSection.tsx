// app/careers/_components/FiltersSection.tsx
"use client";
import JobFilters from "./jobFilters";
import { useJobSearch } from "@/hooks/useJobSearch";

export default function FiltersSection() {
  const {
    filterOptions,
    selectedIndustries,
    selectedJobTypes,
    selectedWorkModes,
    selectedExperienceLevels,
    selectedEducationLevels,
    selectedCountries,
    salaryRange,
    handleIndustryChange,
    handleJobTypeChange,
    handleWorkModeChange,
    handleSalaryChange,
    handleExperienceLevelChange,
    handleEducationLevelChange,
    handleCountryChange,
    handleResetFilters,
  } = useJobSearch();

  return (
    <div className="sticky top-8 h-[calc(100vh-100px)] overflow-y-auto">
      <JobFilters
        //@ts-ignore
        filterOptions={filterOptions}
        selectedIndustries={selectedIndustries}
        selectedJobTypes={selectedJobTypes}
        selectedWorkModes={selectedWorkModes}
        selectedExperienceLevels={selectedExperienceLevels}
        selectedEducationLevels={selectedEducationLevels}
        selectedCountries={selectedCountries}
        salaryRange={salaryRange}
        onIndustryChange={handleIndustryChange}
        onJobTypeChange={handleJobTypeChange}
        onWorkModeChange={handleWorkModeChange}
        onSalaryChange={handleSalaryChange}
        onExperienceLevelChange={handleExperienceLevelChange}
        onEducationLevelChange={handleEducationLevelChange}
        onCountryChange={handleCountryChange}
        onResetFilters={handleResetFilters}
      />
    </div>
  );
}
