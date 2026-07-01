// ============================================
// Type Definitions for Portfolio
// ============================================

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Skill {
  name: string;
  icon: string;
  category: SkillCategory;
}

export type SkillCategory = 
  | 'Programming' 
  | 'Frontend' 
  | 'Backend' 
  | 'AI/ML' 
  | 'Cloud' 
  | 'Tools';

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  category: ProjectCategory;
  featured: boolean;
  technologies: string[];
  github?: string;
  demo?: string;
  caseStudy?: string;
  problemStatement?: string;
  architecture?: string;
  challenges?: string[];
  solution?: string;
  features?: string[];
  futureScope?: string[];
  lessonsLearned?: string[];
}

export type ProjectCategory = 
  | 'AI' 
  | 'Web Development' 
  | 'Hackathon' 
  | 'Research' 
  | 'Personal';

export interface ExperienceItem {
  title: string;
  company: string;
  type: ExperienceType;
  period: string;
  description: string;
  highlights: string[];
  technologies?: string[];
}

export type ExperienceType = 
  | 'Internship' 
  | 'Freelance' 
  | 'Hackathon' 
  | 'Leadership' 
  | 'Volunteer';

export interface EducationItem {
  institution: string;
  degree: string;
  field: string;
  period: string;
  grade?: string;
  highlights?: string[];
  isCurrent?: boolean;
  isFuture?: boolean;
}

export interface Achievement {
  title: string;
  description: string;
  icon: string;
  category: string;
  year: string;
  url?: string;
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
  icon: string;
  image?: string;
}

export interface PersonalityTrait {
  title: string;
  description: string;
  icon: string;
}
