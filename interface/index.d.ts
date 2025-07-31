declare interface Slider {
  id: number;
  title: string;
  description: string;
  image: string;
  link_text: string;
  link_url: string;
  sort_order: number;
}

declare interface Partner {
  id: number;
  title: string;
  description: string;
  image: string;
  details: string;
  sort_order: number;
}

declare interface Client {
  id: number;
  name: string;
  description: string;
  logo: string;
  sort_order: number;
}

interface Organization {
  id: number;
  name: string;
  address: string;
  description: string;
  email: string;
  phone: string;
  logo: string;
  social_links: {
    twitter: string;
    youtube: string;
    facebook: string;
    linkedin: string;
  };
  about_us: string;
  vision: string;
  mission: string;
  values: string;
}

interface Company {
  id: number;
  name: string;
  description: string;
  address: string;
  logo: string | null;
  email: string;
  phone: string;
}

interface ContractType {
  id: number;
  name: string;
  description: string | null;
  parent_id: number | null;
}

interface WorkMode {
  id: number;
  name: string;
  description: string | null;
  parent_id: number | null;
}

interface ExperienceLevel {
  id: number;
  name: string;
  description: string | null;
  parent_id: number | null;
}

interface EducationLevel {
  id: number;
  name: string;
  description: string | null;
  parent_id: number | null;
}

interface WorkSector {
  id: number;
  name: string;
  description: string | null;
  type: {
    id: number;
    name_en: string;
    name_ar: string;
    is_active: number;
    created_at: string;
    updated_at: string;
  };
  parent_id: number | null;
}

interface Country {
  id: number;
  name: string;
  description: string | null;
  type: {
    id: number;
    name_en: string;
    name_ar: string;
    is_active: number;
    created_at: string;
    updated_at: string;
  };
  parent_id: number | null;
}

interface City {
  id: number;
  name: string;
  description: string | null;
  type: {
    id: number;
    name_en: string;
    name_ar: string;
    is_active: number;
    created_at: string;
    updated_at: string;
  };
  parent_id: number;
}

interface Job {
  id: number;
  title: string;
  description: string;
  company: Company;
  work_sector?: WorkSector;
  country?: Country;
  city?: City;
  salary_min: string;
  salary_max: string;
  published_at: string;
  expires_at: string;
  status: string;
  type: string;
  duties_responsibilities: string;
  technical_skills: string;
  years_experience: number;
  other_requirements: string;
  address: string;
  preferred_candidate: null;
  applicants_count: number;
  applied?: boolean;
  contract_types: ContractType[];
  work_modes: WorkMode[];
  experience_levels: ExperienceLevel[];
  education_levels: EducationLevel[];
  image: string;
}

interface User {
  id: number;
  first_name: string;
  last_name: string;
  country_id: number;
  country_name?: string;
  city_id: number;
  city_name?: string;
  phone: string;
  email: string;
  email_verified_at: string | null;
  registered_at: string;
  cv_path: string | null;
  profile_image: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  country: Country;
  city: City;
}

interface LoginResponse {
  message: string;
  user: User;
  access_token: string;
  token_type: "Bearer";
}

declare interface JobTest {
  id: number;
  job_id: number;
  title: string;
  description: string;
  duration_minutes: number;
  passing_score: number;
  questions: TestQuestion[];
  created_at: string;
  updated_at: string;
}

interface TestQuestion {
  id: number;
  test_id: number;
  question_text: string;
  question_type: string;
  options: TestOption[];
  created_at: string;
  updated_at: string;
}

interface TestOption {
  id: number;
  question_id: number;
  option_text: string;
  is_correct: boolean;
  created_at: string;
  updated_at: string;
}

interface Application {
  id: number;
  user_id: number;
  job_opportunity_id: number;
  status: string;
  final_score: number | null;
  applied_at: string | null;
  created_at: string;
  updated_at: string;
  job_opportunity: Job;
  tests: any[];
}

interface ContractType {
  id: number;
  name: string;
  description: null | string;
  parent_id: null | number;
}

interface WorkMode {
  id: number;
  name: string;
  description: null | string;
  parent_id: null | number;
}

interface ExperienceLevel {
  id: number;
  name: string;
  description: null | string;
  parent_id: null | number;
}

interface EducationLevel {
  id: number;
  name: string;
  description: null | string;
  parent_id: null | number;
}

interface JobOpportunity {
  id: number;
  title: string;
  description: string;
  salary_min: string;
  salary_max: string;
  contract_types: ContractType[];
  work_modes: WorkMode[];
  experience_levels: ExperienceLevel[];
  education_levels: EducationLevel[];
  published_at: string;
  expires_at: string;
  status: string;
  type: string;
  image: string;
  duties_responsibilities: string;
  technical_skills: string;
  years_experience: number;
  other_requirements: string;
  address: string;
  preferred_candidate: null | string;
  applicants_count: number;
  applied: boolean;
}

interface Application {
  id: number;
  job_opportunity: JobOpportunity;
  status: string;
  final_score: null | number;
  applied_at: null | string;
  created_at: string;
}

interface Test {
  id: number;
  name: string;
  description: string;
  type: string;
  is_active: boolean;
  email: null | string;
  retryable: boolean;
  application_status?: string;
}

interface MyExamItem {
  job_opportunity: JobOpportunity;
  application: {
    id: number;
    job_opportunity: JobOpportunity;
    status: string;
    final_score: null | number;
    applied_at: null | string;
    created_at: string;
  };
  tests: Test[];
}

interface TestSubmissionResponse {
  message: string;
  score: number;
}

interface TestAnswer {
  [questionId: string]: number[] | string;
}

interface TestResult {
  id: number;
  interview: {
    id: number;
    name: string;
    description: string;
    type: string;
    is_active: boolean;
    email: string | null;
    retryable: boolean;
  };
  submitted_at: string | null;
  result_score: string | null;
  status: string;
  details: {
    id: number;
    question: {
      id: number;
      question: string;
      answer_type: string;
      choices?: {
        id: number;
        is_correct: boolean;
        text: string;
      }[];
    };
    answer: string;
    answer_texts: string[] | string;
    question_status: string;
  }[];
}

interface FilterOptions {
  contract_types: ContractType[];
  work_modes: WorkMode[];
  experience_levels: ExperienceLevel[];
  education_levels: EducationLevel[];
  countries: Country[];
  work_sectors: WorkSector[];
}

interface FeaturedJobs {
  id: number;
  title: string;
  description: string;
  image: string;
  url?: string;
}

interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}
interface PaginatedResponse<T> {
  data: T;
  links?: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: PaginationMeta;
}
