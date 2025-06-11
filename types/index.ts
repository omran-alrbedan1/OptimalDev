export interface ProjectProps {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  content: string;
  image: string;
  project_link: string | null;
  demo_link: string | null;
  views: number;
  likes: number;
}
export interface Category {
  id: number;
  title: string;
  description: string;
  image: string;
  image_icon: string;
  created_at: string;
  updated_at: string;
}
export interface Partner {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface ServiceProps {
  id: number;
  title: string;
  sub_title: string;
  image: string;
  code: string;
  start_date: string | null;
  end_date: string | null;
  hours: string | null;
  change_active_date: string;
  fee: string | null;
  description: string;
  outlines: string;
  language: string;
  venue: string | null;
  category: Category;
}

export interface TestimoniProps {
  id: number;
  image: string;
  title: string;
  sub_title: string;
  content: string;
  url: string;
}
export interface Projects {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  content: string;
  image: string;
  project_link: string | null;
  demo_link: string | null;
  views: number;
  likes: number;
  type: string;
}
export interface SliderProps {
  id: number;
  title: string;
  description: string;
  first_btn_text: string;
  first_btn_url: string;
  second_btn_text: string;
  second_btn_url: string;
  backgroundImage?: string;
}
export interface CategoryProps {
  id: number;
  title: string;
  description: string;
  image: string;
  image_icon: string;
  created_at: string;
  updated_at: string;
}
export interface SectionProps {
  id: number;
  title: string;
  description: string;
  image: string;
  type: {
    id: number;
    type: string;
    created_at: string;
    updated_at: string;
  };
}
export interface ContactUsProps {
  id: number;
  url: string;
  content: string;
  type: string;
}
export interface AboutUsProps {
  id: number;
  title: string;
  description: string;
}
export interface PersonalProjectsProps {
  id: number;
  title: string;
  team_id: number;
  repository_link: string;
}

export interface Teams {
  id: number;
  name: string;
  bio: string;
  image: string;
  code: string;
  cv: string;
  position: string;
  whatsapp: string;
  phone: string;
  email: string;
  linkedin: string;
}

export type ProjectsArray = ProjectProps[];
export type ServicesArray = ServiceProps[];
export type TestimoniArray = TestimoniProps[];
export type SliderArray = SliderProps[];
export type CategoryArray = CategoryProps[];
export type SectionArray = SectionProps[];
export type PersonalProjectsArray = PersonalProjectsProps[];
