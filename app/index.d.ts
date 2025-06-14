declare interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
}

export type Job = {
  id: string;
  title: string;
  company: string;
  industry: number;
  city: string;
  country: string;
  type_of_contract: string;
  work_mode: string;
  post_date: string;
  image?: string;
  description: string;
  salary: string;
};
