export type DepartmentCategory = 
  | 'Engineering & Dev' 
  | 'Creative & Design' 
  | 'Business Strategy' 
  | 'Startups' 
  | 'Data & AI'
  | 'Web Engineering'
  | 'Cyber Security & Forensics'
  | 'Artificial Intelligence & ML'
  | 'Network Engineering'
  | 'Data & Business Intelligence'
  | 'Cloud & DevOps'
  | 'Backend Engineering'
  | 'Talent Acquisition & Marketing';

export interface CurriculumModule {
  moduleNumber: number;
  title: string;
  duration: string;
  topics: string[];
}

export interface LiveProject {
  title: string;
  description: string;
  techStack: string[];
}

export interface Internship {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  department: DepartmentCategory;
  location: string;
  workType: 'Remote' | 'Hybrid' | 'Onsite';
  stipend: string;
  duration: string;
  trainingDuration: string;
  internshipDuration: string;
  mode: 'Live Interactive' | 'Self-Paced + Live Doubt Clearance' | 'Hybrid Bootcamp' | 'Live Interactive & Mentored' | 'Flexible WFH';
  batchDate: string;
  scholarshipFee: string;
  tags: string[];
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  certifications: string[];
  curriculum: CurriculumModule[];
  liveProjects: LiveProject[];
  toolsCovered: string[];
  postedDate: string;
  applicantsCount: number;
  featured?: boolean;
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  bio: string;
  expertise: string[];
  rating: number;
  reviewsCount: number;
  availability: string;
}

export interface Application {
  id: string;
  internshipId: string;
  companyName: string;
  roleTitle: string;
  appliedDate: string;
  status: 'Submitted' | 'Under Review' | 'Interview Scheduled' | 'Offer Received' | 'Archived';
  notes?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  school: string;
  major: string;
  gradYear: string;
  bio: string;
  skills: string[];
  savedInternships: string[]; // internship IDs
  applications: Application[];
  theme: 'dark' | 'light';
}

export interface ResourceItem {
  id: string;
  title: string;
  category: 'Interview Prep' | 'Resume Vault' | 'Cold Outreach' | 'Career Playbook';
  description: string;
  readTime: string;
  icon: string;
  featured?: boolean;
}
