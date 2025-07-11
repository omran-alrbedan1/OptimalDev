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
  work_sector: WorkSector;
  country: Country;
  city: City;
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

interface JobTest {
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
  applied_at: string;
  created_at: string;
  updated_at: string;
  job_opportunity: {
    id: number;
    title: string;
    description: string;
    image: string;
    salary_min: string;
    salary_max: string;
    expires_at: string;
    years_experience: number;
    technical_skills: string;
    contract_types_items: Array<{
      id: number;
      name: string;
    }>;
    work_modes_items: Array<{
      id: number;
      name: string;
    }>;
    experience_levels_items: Array<{
      id: number;
      name: string;
    }>;
    company: {
      id: number;
      name: string;
      description: string;
      address: string;
      logo: string | null;
      email: string;
      phone: string;
    };
  };
}

interface TestSubmissionResponse {
  message: string;
  score: number;
  submissionId: string;
}

interface TestAnswer {
  [questionId: string]: number[] | string;
}

interface FilterOptions {
  contract_types: {
    id: number;
    name: string;
    description: string | null;
  }[];
  work_modes: {
    id: number;
    name: string;
    description: string | null;
  }[];
  experience_levels: {
    id: number;
    name: string;
    description: string | null;
  }[];
  education_levels: {
    id: number;
    name: string;
    description: string | null;
  }[];
  countries: {
    id: number;
    name: string;
    description: string | null;
  }[];
  work_sectors: {
    id: number;
    name: string;
    description: string | null;
  }[];
}

interface FeaturedJobs {
  id: number;
  title: string;
  description: string;
  image: string;
  url?: string;
}
