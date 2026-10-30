export type MainCategory = 
  | 'Tech & Data'
  | 'Cloud & DevOps'
  | 'AI & Emerging Tech'
  | 'Security & Networking'
  | 'Business, Finance & Management'
  | 'Engineering & Core Tech'
  | 'Life Sciences & Healthcare'
  | 'Software Tools & Platforms'
  | 'Design & Creative'
  | 'Specialized & Others';

export type BranchDomain =
  | 'IT / Computer Science & Engineering'
  | 'Electronics & Communication / EEE'
  | 'Mechanical / Civil Engineering'
  | 'Bio Technology'
  | 'Management'
  | 'Health Information Management / Life Science';

export type DepartmentCategory = string;

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
  department: string;
  category: MainCategory;
  branch?: BranchDomain;
  location: string;
  stipend: string;
  duration: string;
  trainingDuration: string;
  internshipDuration: string;
  mode: string;
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

export interface MentorshipDomain {
  id: string;
  domain: string;
  category: MainCategory;
  branch?: BranchDomain;
  tagline: string;
  description: string;
  topics: string[];
  duration: string;
  icon: string;
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
  savedInternships: string[];
  applications: Application[];
  theme: 'dark' | 'light';
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  program: string;
  review: string;
  rating: number;
  avatar?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface CertificateRecord {
  id: string;
  studentName: string;
  program: string;
  issueDate: string;
  status: 'Verified & Authentic' | 'Pending Verification';
  grade: string;
  credentialUrl?: string;
}
