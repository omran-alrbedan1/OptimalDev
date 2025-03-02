export interface Project {
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