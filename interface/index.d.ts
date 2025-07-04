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
