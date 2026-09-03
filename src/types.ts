export type ThemeId = 'cyber-neon' | 'emerald-obsidian' | 'violet-pulsar' | 'solar-amber' | 'minimal-light';

export interface ThemeOption {
  id: ThemeId;
  name: string;
  bgClass: string;
  cardBgClass: string;
  accentHex: string;
  textAccentClass: string;
  borderAccentClass: string;
  gradientClass: string;
  previewColors: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'ai-cloud' | 'tools';
  iconName: string;
  description: string;
  techTags: string[];
  featured?: boolean;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'fullstack' | 'ai' | 'cloud' | 'saas';
  description: string;
  longDescription: string;
  keyFeatures: string[];
  techStack: string[];
  metrics: { label: string; value: string }[];
  imageUrl?: string;
  imageAlt?: string;
  githubUrl?: string;
  featured: boolean;
  architectureOverview?: string;
  codeSnippet?: {
    filename: string;
    language: string;
    code: string;
  };
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
  skills: string[];
  type: 'full-time' | 'contract' | 'open-source';
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  details: string;
  badges?: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}
