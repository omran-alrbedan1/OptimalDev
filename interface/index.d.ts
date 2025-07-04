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

interface Job {
  id: number;
  title: string;
  description: string;
  company: {
    id: number;
    name: string;
    description: string;
    address: string;
    logo: string | null;
    email: string;
    phone: string;
  };
  work_sector: {
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
  };
  country: {
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
  };
  city: {
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
  };
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
  preferred_candidate: string | null;
  applicants_count: number;
}

interface PaginationLinks {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

interface JobsResponse {
  data: Job[];
  links: PaginationLinks;
  meta: PaginationMeta;
}
