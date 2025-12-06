export interface Job {
  id: number;
  title: string;
  company: {
    name: string;
    logo?: string;
  };
  work_sector: {
    name: string;
  };
  city: {
    name: string;
  };
  country: {
    name: string;
  };
  description: string;
  salary_min: number;
  salary_max: number;
  published_at: string;
  type: string;
  duties_responsibilities: string;
  technical_skills: string;
  years_experience: string;
  other_requirements: string;
  address: string;
}

export interface FilterOptions {
  work_sectors: Array<{ id: number; name: string }>;
  contract_types: Array<{ id: number; name: string }>;
  work_modes: Array<{ id: number; name: string }>;
  experience_levels: Array<{ id: number; name: string }>;
  education_levels: Array<{ id: number; name: string }>;
  countries: Array<{ id: number; name: string }>;
}

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface JobFilters {
  searchQuery: string;
  currentPage: number;
  selectedIndustries: number[];
  selectedJobTypes: number[];
  selectedWorkModes: number[];
  selectedExperienceLevels: number[];
  selectedEducationLevels: number[];
  selectedCountries: number[];
  salaryRange: [number, number];
}

export interface FetchJobsParams {
  page: number;
  search?: string;
  work_sectors?: number[];
  contract_types?: number[];
  work_modes?: number[];
  experience_levels?: number[];
  education_levels?: number[];
  countries?: number[];
  salary_min?: number;
  salary_max?: number;
}
