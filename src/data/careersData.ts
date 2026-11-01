import { JobVacancy } from '../types';

export const INITIAL_JOB_VACANCIES: JobVacancy[] = [
  {
    id: 'vac-1',
    title: 'Full Stack Web Development Mentor & Lead',
    department: 'Engineering & Training',
    location: 'Bengaluru / Remote',
    type: 'Full-time',
    workplaceType: 'Remote',
    experience: '2 - 5 Years',
    salaryRange: '₹6,00,000 - ₹9,50,000 / year',
    description: 'We are seeking a passionate Full Stack Engineering Mentor to lead live interactive code reviews, architect real-world production capstones, and mentor undergraduate students in modern React, Node.js, Next.js, and TypeScript.',
    responsibilities: [
      'Conduct weekly live coding sessions and architecture masterclasses for batch cohorts.',
      'Review GitHub project PRs, provide inline feedback, and enforce Clean Code principles.',
      'Guide student capstone projects into production-ready deployments on cloud platforms.',
      'Develop modern curriculum modules reflecting current tech stack trends.'
    ],
    requirements: [
      'Strong hands-on expertise in React, TypeScript, Node.js, PostgreSQL/MongoDB, and Tailwind CSS.',
      'Prior experience in mentoring, technical blogging, or teaching is a big plus.',
      'Excellent verbal communication and empathetic student mentorship attitude.',
      'B.Tech / MCA or equivalent practical experience.'
    ],
    perks: [
      '100% Remote flexibility with flexible working hours',
      'Performance-based cohort bonuses',
      'Continuous learning budget and conference attendance passes',
      'MacBook / Home workstation setup allowance'
    ],
    postedDate: '2 days ago',
    status: 'Open'
  },
  {
    id: 'vac-2',
    title: 'AI / Machine Learning Subject Specialist',
    department: 'AI & Data Science',
    location: 'Remote (India)',
    type: 'Full-time',
    workplaceType: 'Remote',
    experience: '2 - 4 Years',
    salaryRange: '₹7,00,000 - ₹11,00,000 / year',
    description: 'Lead students through machine learning algorithms, deep learning with PyTorch/TensorFlow, and cutting-edge GenAI agentic workflows with LangChain and Hugging Face.',
    responsibilities: [
      'Design practical ML assignments using real Kaggle and industry datasets.',
      'Deliver weekend live cohorts on model training, fine-tuning, and model serving.',
      'Evaluate capstone submissions including predictive analytics, computer vision, and NLP apps.',
      'Address one-on-one student technical doubts and guide research papers/case studies.'
    ],
    requirements: [
      'Proficiency in Python, Scikit-Learn, PyTorch/TensorFlow, Pandas, and GenAI concepts.',
      'Solid foundations in linear algebra, statistics, and optimization.',
      'Experience in deploying ML APIs using FastAPI or Docker.'
    ],
    perks: [
      'Remote-first work culture',
      'Access to GPU cloud instances for personal and training research',
      'Mentorship recognition and ISO accreditation credentials'
    ],
    postedDate: '5 days ago',
    status: 'Open'
  },
  {
    id: 'vac-3',
    title: 'Student Academic Counselor & Admission Desk Lead',
    department: 'Student Support & Admissions',
    location: 'Noida / Hybrid',
    type: 'Full-time',
    workplaceType: 'Hybrid',
    experience: '1 - 3 Years',
    salaryRange: '₹3,50,000 - ₹5,50,000 / year + Incentives',
    description: 'Serve as the first point of contact for aspiring students across India seeking guidance on domain selections, curriculum tracks, LMS credentials, and scholarship applications.',
    responsibilities: [
      'Answer student calls, WhatsApp inquiries (+91 7019680860 desk), and email requests.',
      'Provide objective academic domain guidance based on student stream and career aspirations.',
      'Assist students with batch enrollment, LMS onboarding, and scholarship processing.',
      'Maintain admission records and student satisfaction benchmarks.'
    ],
    requirements: [
      'Exceptional spoken and written English and Hindi communication skills.',
      'Empathetic approach towards college undergraduates and recent graduates.',
      'Familiarity with CRM tools and WhatsApp Business web.'
    ],
    perks: [
      'Generous quarterly performance incentives',
      'Health insurance coverage for employee & family',
      'Fast-track leadership growth opportunities'
    ],
    postedDate: '1 week ago',
    status: 'Open'
  },
  {
    id: 'vac-4',
    title: 'Placement & Corporate Partnership Specialist',
    department: 'Career Services',
    location: 'Bengaluru / Hybrid',
    type: 'Full-time',
    workplaceType: 'Hybrid',
    experience: '2 - 5 Years',
    salaryRange: '₹5,50,000 - ₹8,50,000 / year',
    description: 'Drive hiring partnerships with 100+ startups and MNCs to facilitate internship and full-time hiring drives for our top-performing graduates.',
    responsibilities: [
      'Build relationships with HR leaders, engineering managers, and startup founders.',
      'Organize monthly virtual placement drives and resume shortlisting for partner companies.',
      'Conduct resume review and mock behavioral interview workshops for students.',
      'Track placement statistics, average compensation, and recruiter feedback.'
    ],
    requirements: [
      'Proven experience in campus recruitment, EdTech corporate partnerships, or HR recruitment.',
      'Strong network of talent acquisition contacts across Indian tech hubs.',
      'Data-driven mindset with polished interpersonal skills.'
    ],
    perks: [
      'High-impact role transforming student career trajectories',
      'Competitive bonus structure tied to student placement success',
      'Travel and networking allowances'
    ],
    postedDate: '3 days ago',
    status: 'Open'
  },
  {
    id: 'vac-5',
    title: 'Campus Ambassador & Growth Associate (Part-Time / Student Intern)',
    department: 'Campus Community',
    location: 'Pan-India (All Engineering / Degree Colleges)',
    type: 'Part-time',
    workplaceType: 'Remote',
    experience: 'College Student (Any Year)',
    salaryRange: '₹8,000 - ₹18,000 / month (Stipend + Performance Perks)',
    description: 'Represent InternsLoom on your college campus! Organize technical workshops, share bootcamps and scholarships, and build a vibrant coding club in your institution.',
    responsibilities: [
      'Represent InternsLoom among peer student circles and college clubs.',
      'Coordinate awareness webinars, hackathons, and scholarship drives.',
      'Collect feedback from students to help improve our internship syllabus.'
    ],
    requirements: [
      'Currently enrolled undergraduate student in Engineering, BCA, BSc, or Management.',
      'Active leadership in student societies, IEEE/ACM chapters, or tech clubs.',
      'Enthusiastic communicator on LinkedIn and campus groups.'
    ],
    perks: [
      'Guaranteed free access to any 1 InternsLoom training program',
      'Official Certificate of Campus Leadership & Letter of Recommendation',
      'Direct fast-track interview for full-time roles upon graduation'
    ],
    postedDate: 'Just now',
    status: 'Open'
  }
];
