import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useUser } from '../context/UserContext';
import { MOCK_INTERNSHIPS } from '../data/mockData';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Award, 
  CheckCircle2, 
  BookOpen, 
  Layers, 
  ShieldCheck, 
  Download, 
  ChevronDown, 
  ChevronUp, 
  Share2, 
  Star,
  Users,
  Sparkles,
  Check,
  X,
  FileCheck2,
  HelpCircle
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface PricingPlan {
  id: 'self-paced' | 'mentor-led';
  name: string;
  subtitle: string;
  price: string;
  paymentType: string;
  isPopular?: boolean;
  features: {
    included: boolean;
    text: string;
  }[];
}

const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'self-paced',
    name: 'Self Paced',
    subtitle: 'Learn with your speed',
    price: '₹6,500',
    paymentType: 'One Time Payment',
    isPopular: false,
    features: [
      { included: true, text: 'RECORDED LECTURES' },
      { included: true, text: 'REAL TIME PROJECTS' },
      { included: true, text: '4+ HRS OF LIVE SESSIONS' },
      { included: true, text: 'ONE ON ONE DOUBT SESSIONS' },
      { included: true, text: 'CERTIFICATIONS' },
      { included: false, text: 'MENTOR SUPPORT' },
      { included: false, text: 'PLACEMENT GUIDANCE' },
      { included: false, text: 'INTERVIEW ASSISTANCE' },
    ]
  },
  {
    id: 'mentor-led',
    name: 'Mentor Led',
    subtitle: 'Live Mentorship',
    price: '₹9,000',
    paymentType: 'One Time Payment',
    isPopular: true,
    features: [
      { included: true, text: '4+ HRS OF LIVE SESSIONS' },
      { included: true, text: 'RECORDED LECTURES' },
      { included: true, text: 'REAL TIME PROJECTS' },
      { included: true, text: 'ONE ON ONE DOUBT SESSIONS' },
      { included: true, text: 'CERTIFICATIONS' },
      { included: true, text: 'MENTOR SUPPORT' },
      { included: true, text: 'PLACEMENT GUIDANCE' },
      { included: true, text: 'INTERVIEW ASSISTANCE' },
    ]
  }
];

export const ProgramDetailPage: React.FC = () => {
  const { 
    selectedInternshipId, 
    navigateToView, 
    navigateToProgram, 
    showToast,
    applyToInternship 
  } = useUser();

  const program = MOCK_INTERNSHIPS.find((p) => p.id === selectedInternshipId) || MOCK_INTERNSHIPS[0];
  const [expandedModule, setExpandedModule] = useState<number | null>(1);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedPlanForEnroll, setSelectedPlanForEnroll] = useState<PricingPlan | null>(null);
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [studentCollege, setStudentCollege] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const toggleModule = (modNumber: number) => {
    setExpandedModule(expandedModule === modNumber ? null : modNumber);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleStartLearning = (plan: PricingPlan) => {
    setSelectedPlanForEnroll(plan);
    setEnrollModalOpen(true);
  };

  const handleEnrollmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    applyToInternship(program.id, 'InternsLoom', `${program.title} (${selectedPlanForEnroll?.name} - ${selectedPlanForEnroll?.price})`);
    showToast(`Enrollment request submitted for ${program.title} (${selectedPlanForEnroll?.name})!`);
    setTimeout(() => {
      setIsSuccess(false);
      setEnrollModalOpen(false);
    }, 2400);
  };

  const handleDownloadSyllabus = () => {
    showToast(`Downloading complete curriculum PDF for ${program.title}...`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: program.title,
        text: `Check out ${program.title} on InternsLoom!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Program link copied to clipboard!');
    }
  };

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Hi InternsLoom, I want details regarding the "${program.title}" training & internship program. Could you share batch dates and curriculum details?`
    );
    window.open(`https://wa.me/917019680860?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  // Program-specific FAQs
  const programFaqs = [
    {
      q: `What is the difference between Self-Paced (₹6,500) and Mentor-Led (₹9,000) for ${program.title}?`,
      a: `Both tracks provide full access to recorded lectures, real-time industry projects, 4+ hours of live masterclasses, one-on-one doubt resolution, and authentic ISO certifications. The Mentor-Led track adds dedicated personalized 1-on-1 industry mentor sessions, weekly code reviews, resume building, mock interviews, and priority hiring partner placement guidance.`
    },
    {
      q: `What certificates will I receive upon completing ${program.title}?`,
      a: `You receive dual verified credentials: (1) An ISO 9001:2015 Accredited Training Certificate recognizing your technical mastery, and (2) A Live Industry Capstone Project Internship Experience Certificate. Exemplary learners additionally qualify for an Academic & Corporate Letter of Recommendation (LOR).`
    },
    {
      q: `Can I take this program alongside my college classes and exams?`,
      a: `Yes! Our curriculum is designed specifically for university students and early professionals. The Self-Paced option offers complete scheduling freedom, while the Mentor-Led track conducts live interactive sessions on weekends and evenings with flexible assignment submission windows.`
    },
    {
      q: `How do one-on-one doubt sessions and live projects work?`,
      a: `Whenever you get stuck while coding or executing modules, you can schedule a 1-on-1 screen-sharing doubt clearing session with our technical mentors. For the 2-month live capstone project, you will build and deploy a production-grade application following standard industry Git workflows.`
    },
    {
      q: `How do I verify the authenticity of my certificate?`,
      a: `Every certificate issued by InternsLoom includes a unique verification credential ID and QR code. Anyone (recruiters, college authorities, or background checkers) can verify it 24/7 on our online portal under the "Verify Certificate" tab.`
    }
  ];

  // Other related programs in the same category
  const relatedPrograms = MOCK_INTERNSHIPS
    .filter((p) => p.category === program.category && p.id !== program.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300 pb-24">
      
      {/* Top Sticky Breadcrumb / Action Bar */}
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 sticky top-16 z-30 shadow-xs">
        <div className="max-w-[1240px] mx-auto px-6 py-3.5 flex items-center justify-between">
          <button
            onClick={() => navigateToView('programs')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Programs & Bootcamps</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              title="Share Program"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleWhatsAppInquiry}
              className="px-3.5 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>Ask on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* STEP 1: PROGRAM DETAILS & OVERVIEW */}
      {/* ============================================================== */}
      <div className="relative overflow-hidden bg-gradient-to-b from-cyan-50/40 via-white to-[#fafbfc] dark:from-[#0a0f1d] dark:via-[#070b12] dark:to-[#070b12] border-b border-neutral-200/80 dark:border-neutral-800/80 py-14 md:py-20">
        <div className="absolute top-0 right-10 w-[500px] h-[300px] bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute inset-0 cyber-grid pointer-events-none opacity-40" />

        <div className="max-w-[1240px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                <span className="text-cyan-600 dark:text-cyan-400 font-bold">{program.department}</span>
                <span aria-hidden="true">·</span>
                <span>{program.category}</span>
                {program.branch && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-600 dark:text-emerald-400">{program.branch}</span>
                  </>
                )}
                <span aria-hidden="true">·</span>
                <span className="font-mono text-cyan-600 dark:text-cyan-400">ISO 9001:2015</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-950 dark:text-white tracking-tight leading-tight">
                {program.title}
              </h1>

              <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-3xl">
                {program.description}
              </p>

              {/* Badges / Highlights */}
              <div className="flex flex-wrap items-center gap-6 pt-3 text-xs md:text-sm text-neutral-600 dark:text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-cyan-500" />
                  <span className="font-semibold text-neutral-900 dark:text-white">{program.batchDate}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-indigo-500" />
                  <span className="font-mono">{program.duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="font-bold text-neutral-900 dark:text-white">4.9 / 5.0</span>
                  <span>(1,200+ students rated)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>ISO 9001:2015 Accredited</span>
                </div>
              </div>
            </div>

            {/* Quick Summary Action Card */}
            <div className="lg:col-span-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
                <span className="text-xs uppercase font-bold text-neutral-400 tracking-wider">Learning Track</span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                  Admissions Open
                </span>
              </div>

              <div>
                <span className="text-xs text-neutral-400">Tuition Starting At</span>
                <div className="text-3xl font-extrabold text-neutral-900 dark:text-white mt-0.5">
                  ₹6,500 <span className="text-xs font-normal text-neutral-500">/ One Time</span>
                </div>
                <p className="text-[11px] text-neutral-500 mt-1">
                  Choose between Self-Paced (₹6,500) or Live Mentor-Led (₹9,000)
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <a
                  href="#learning-options"
                  className="w-full py-3 px-4 rounded-xl bg-brand-gradient text-white font-bold text-sm text-center block shadow-glow transition-all cursor-pointer"
                >
                  Choose Learning Option
                </a>

                <button
                  onClick={handleDownloadSyllabus}
                  className="w-full py-2.5 px-4 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-semibold text-xs text-center flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Curriculum PDF</span>
                </button>
              </div>

              <div className="pt-2 text-center">
                <p className="text-[11px] text-neutral-400">
                  Dual certifications: ISO 9001:2015 Training + 2-Month Live Capstone Internship.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Flow Content Container */}
      <div className="max-w-[1240px] mx-auto px-6 py-12 space-y-16">
        
        {/* Mentorship continuity notice */}
        <div 
          className="p-5 md:p-6 rounded-3xl border shadow-xs flex flex-col md:flex-row items-center justify-between gap-4"
          style={{
            backgroundColor: 'rgba(var(--primary-rgb), 0.06)',
            borderColor: 'rgba(var(--primary-rgb), 0.25)'
          }}
        >
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-base md:text-lg font-bold text-neutral-900 dark:text-white">
              Looking for dedicated personal guidance?
            </h3>
            <p className="text-sm md:text-base font-medium text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Accelerate your professional growth with our structured curriculum — to complement your program with personalized, one-on-one industry mentorship,{' '}
              <a
                href="#learning-options"
                className="font-bold underline underline-offset-4 cursor-pointer"
                style={{ color: 'var(--primary)' }}
              >
                click here ↗
              </a>
              .
            </p>
          </div>
          <a
            href="#learning-options"
            className="px-5 py-2.5 rounded-xl bg-brand-gradient text-white text-sm font-bold shrink-0 shadow-glow transition-all cursor-pointer"
          >
            Compare Plans Below
          </a>
        </div>

        {/* Dual Phase Structure Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-900/40 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Phase 1: Foundation Technical Training</span>
            </div>
            <h4 className="text-lg font-bold text-neutral-900 dark:text-white">
              {program.trainingDuration}
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Intensive live masterclasses and structured hands-on modules covering engineering fundamentals, best practices, frameworks, and architecture.
            </p>
            <ul className="space-y-1.5 text-xs text-neutral-700 dark:text-neutral-300 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Hands-on weekly code evaluations & problem sets</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>One-on-one doubt resolution with domain mentors</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-3xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold">
              <Award className="w-3.5 h-3.5" />
              <span>Phase 2: Live Industry Capstone Internship</span>
            </div>
            <h4 className="text-lg font-bold text-neutral-900 dark:text-white">
              {program.internshipDuration}
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Deploy actual client-grade code to production, work in agile sprints, submit Git pull requests, and gain verifiable project credentials.
            </p>
            <ul className="space-y-1.5 text-xs text-neutral-700 dark:text-neutral-300 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verified Capstone Project completion credentials</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Letter of Recommendation (LOR) for top performers</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ============================================================== */}
        {/* STEP 2: TOPICS TO BE COVERED (Syllabus, Modules, Tools) */}
        {/* ============================================================== */}
        <div id="topics-covered" className="space-y-8 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">
                <BookOpen className="w-4 h-4" />
                <span>Curriculum Roadmap</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
                Topics to be Covered
              </h2>
              <p className="text-sm text-neutral-500 mt-1">
                Comprehensive step-by-step syllabus designed to take you from foundational syntax to enterprise system architecture.
              </p>
            </div>
            <button
              onClick={handleDownloadSyllabus}
              className="px-4 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold flex items-center gap-1.5 hover:opacity-90 transition-opacity cursor-pointer self-start sm:self-auto shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Full Syllabus PDF</span>
            </button>
          </div>

          {/* Module Accordions */}
          <div className="space-y-3.5">
            {program.curriculum.map((module) => {
              const isOpen = expandedModule === module.moduleNumber;
              return (
                <div
                  key={module.moduleNumber}
                  className="rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-white dark:bg-neutral-900 transition-all shadow-xs"
                >
                  <button
                    onClick={() => toggleModule(module.moduleNumber)}
                    className="w-full p-4 md:p-5 flex items-center justify-between text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 font-extrabold flex items-center justify-center text-xs shrink-0">
                        M{module.moduleNumber}
                      </div>
                      <div>
                        <h4 className="text-sm md:text-base font-bold text-neutral-900 dark:text-white">
                          {module.title}
                        </h4>
                        <span className="text-xs text-neutral-400 font-medium">
                          {module.duration}
                        </span>
                      </div>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-neutral-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-neutral-400 shrink-0" />
                    )}
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-5 pb-5 pt-1 border-t border-neutral-100 dark:border-neutral-800"
                      >
                        <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2.5">
                          Topics Covered in this Module:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {module.topics.map((topic, tIdx) => (
                            <div key={tIdx} className="flex items-start gap-2.5 text-xs text-neutral-700 dark:text-neutral-300">
                              <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                              <span className="leading-snug">{topic}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Tools & Technologies Covered */}
          <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-500" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400">
                Software Tools & Platforms Covered
              </h3>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {program.toolsCovered.map((tool) => (
                <span
                  key={tool}
                  className="px-3.5 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-semibold border border-neutral-200/80 dark:border-neutral-700"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Featured Live Capstone Project */}
          {program.liveProjects.length > 0 && (
            <div className="p-6 md:p-8 rounded-3xl bg-neutral-900 text-white space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Live Capstone Project Immersion
                </span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Production Deployment
                </span>
              </div>
              <h4 className="text-lg md:text-xl font-bold text-white">
                {program.liveProjects[0].title}
              </h4>
              <p className="text-xs md:text-sm text-neutral-300 leading-relaxed max-w-3xl">
                {program.liveProjects[0].description}
              </p>
              <div>
                <p className="text-xs font-semibold text-neutral-400 mb-2">Applied Project Tech Stack:</p>
                <div className="flex flex-wrap gap-2">
                  {program.liveProjects[0].techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg bg-neutral-800 text-neutral-200 text-xs font-medium border border-neutral-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ============================================================== */}
        {/* STEP 3: REQUIREMENTS (Eligibility, Prerequisites, Criteria) */}
        {/* ============================================================== */}
        <div id="requirements" className="space-y-6 scroll-mt-24">
          <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <div className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
              <FileCheck2 className="w-4 h-4" />
              <span>Eligibility & Preparation</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
              Program Requirements & Prerequisites
            </h2>
            <p className="text-sm text-neutral-500 mt-1">
              Review candidate criteria, technical prerequisites, and required weekly engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Eligibility */}
            <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
                1
              </div>
              <h4 className="text-base font-bold text-neutral-900 dark:text-white">
                Who Can Apply
              </h4>
              <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
                {program.requirements.map((req, rIdx) => (
                  <li key={rIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Freshers, university students (1st - 4th year), and career transitioners welcome.</span>
                </li>
              </ul>
            </div>

            {/* Hardware & Setup */}
            <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">
                2
              </div>
              <h4 className="text-base font-bold text-neutral-900 dark:text-white">
                Hardware & Connectivity
              </h4>
              <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>A laptop or desktop PC (Windows, macOS, or Linux).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Minimum 4GB RAM (8GB recommended for modern SDKs and tools).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Stable broadband internet connection for video streaming & live mentor calls.</span>
                </li>
              </ul>
            </div>

            {/* Time Commitment */}
            <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                3
              </div>
              <h4 className="text-base font-bold text-neutral-900 dark:text-white">
                Commitment & Ethics
              </h4>
              <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Dedicate 6 to 8 hours per week to code exercises, quizzes, and live project deliverables.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Adherence to academic integrity and collaborative sprint communication.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Active participation in capstone milestone reviews.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* ============================================================== */}
        {/* STEP 4: DO YOU WANT THIS PROGRAM TO BE SELF-PACED OR MENTOR-LED? */}
        {/* Exact Replica of image_0e9da4bf.png */}
        {/* ============================================================== */}
        <div id="learning-options" className="scroll-mt-24 space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Transparent Pricing & Plans</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
              Do you want this program to be self-paced or mentor-led?
            </h2>
            <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 mt-2">
              Select the learning format that matches your personal speed and career goals. Both tracks include full project evaluations and ISO certification.
            </p>
          </div>

          <div className="bg-[#fbf9f5] dark:bg-neutral-900/60 p-6 md:p-12 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
              {PRICING_PLANS.map((plan) => {
                return (
                  <div
                    key={plan.id}
                    className={`relative bg-white dark:bg-neutral-800 rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                      plan.isPopular
                        ? 'border-2 border-orange-500/80 shadow-2xl shadow-orange-500/10 ring-4 ring-orange-500/10'
                        : 'border border-neutral-200 dark:border-neutral-700 shadow-md'
                    }`}
                  >
                    {/* Orange Angled Ribbon Badge for "POPULAR" */}
                    {plan.isPopular && (
                      <div className="absolute -top-3 left-6 overflow-hidden rounded-md">
                        <span className="bg-[#f26b1d] text-white text-[11px] font-black uppercase tracking-wider py-1 px-4 shadow-sm inline-block">
                          POPULAR
                        </span>
                      </div>
                    )}

                    <div>
                      {/* Plan Header */}
                      <div className="text-center mb-6 pt-2">
                        <h3 className="text-2xl font-black text-neutral-950 dark:text-white mb-1">
                          {plan.name}
                        </h3>
                        <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                          {plan.subtitle}
                        </p>

                        <div className="my-5">
                          <span className="text-4xl font-black text-neutral-950 dark:text-white tracking-tight">
                            {plan.price}
                          </span>
                          <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1 font-medium">
                            {plan.paymentType}
                          </p>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-neutral-100 dark:bg-neutral-700/80 mb-6" />

                      {/* Features List */}
                      <ul className="space-y-3.5 mb-8">
                        {plan.features.map((feature, fIdx) => (
                          <li
                            key={fIdx}
                            className={`flex items-center gap-3 text-xs font-bold tracking-wide uppercase ${
                              feature.included
                                ? 'text-neutral-800 dark:text-neutral-200'
                                : 'text-neutral-400 dark:text-neutral-500'
                            }`}
                          >
                            {feature.included ? (
                              <span className="text-emerald-500 font-extrabold text-base leading-none">
                                +
                              </span>
                            ) : (
                              <span className="text-red-500 font-extrabold text-base leading-none">
                                ✕
                              </span>
                            )}
                            <span>{feature.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Start Learning Action Button */}
                    <button
                      onClick={() => handleStartLearning(plan)}
                      className="w-full py-3.5 px-6 rounded-full bg-[#f26b1d] hover:bg-[#e05d12] text-white font-extrabold text-sm tracking-wide shadow-md shadow-orange-500/20 hover:shadow-lg transition-all transform active:scale-98 cursor-pointer text-center"
                    >
                      Start Learning
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* STEP 5: FREQUENTLY ASKED QUESTIONS (FAQs) */}
        {/* ============================================================== */}
        <div id="faqs" className="space-y-6 scroll-mt-24">
          <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <div className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">
              <HelpCircle className="w-4 h-4" />
              <span>Clear Answers</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-neutral-500 mt-1">
              Have questions about batch schedules, doubt resolution, or career placement assistance?
            </p>
          </div>

          <div className="space-y-3">
            {programFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-white dark:bg-neutral-900 transition-all shadow-xs"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4 md:p-5 flex items-center justify-between text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors cursor-pointer gap-4"
                  >
                    <span className="text-sm md:text-base font-bold text-neutral-900 dark:text-white">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-neutral-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-neutral-400 shrink-0" />
                    )}
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-5 pb-5 pt-1 border-t border-neutral-100 dark:border-neutral-800 text-xs md:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Related Programs in the same Category */}
        {relatedPrograms.length > 0 && (
          <div className="space-y-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
            <h3 className="text-xl font-bold text-neutral-950 dark:text-white">
              Explore Other Programs in {program.category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPrograms.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => navigateToProgram(rel.id)}
                  className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500/50 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-2 mb-4">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300">
                      {rel.department}
                    </span>
                    <h4 className="text-base font-bold text-neutral-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-neutral-500 line-clamp-2">
                      {rel.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-3 border-t border-neutral-100 dark:border-neutral-800">
                    <span className="text-neutral-400">{rel.duration.split(' ')[0]} {rel.duration.split(' ')[1]}</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">View Program →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Enrollment Modal */}
      <AnimatePresence>
        {enrollModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEnrollModalOpen(false)}
              className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden z-10 p-6 space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
                <div>
                  <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                    {selectedPlanForEnroll?.name} Plan ({selectedPlanForEnroll?.price})
                  </span>
                  <h3 className="text-lg font-bold text-neutral-950 dark:text-white">
                    Enroll in {program.title}
                  </h3>
                </div>
                <button
                  onClick={() => setEnrollModalOpen(false)}
                  className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {isSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-neutral-900 dark:text-white">
                    Enrollment Request Confirmed!
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-sm mx-auto">
                    Our admissions advisor will send your LMS login details and batch schedule to your WhatsApp number ({studentPhone || '+91 7019680860'}) and email.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleEnrollmentSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="e.g. Babalu Bharti"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      placeholder="student@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      WhatsApp Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={studentPhone}
                      onChange={(e) => setStudentPhone(e.target.value)}
                      placeholder="+91 9876543210"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      College / University Name
                    </label>
                    <input
                      type="text"
                      value={studentCollege}
                      onChange={(e) => setStudentCollege(e.target.value)}
                      placeholder="e.g. SRM / VIT / Delhi University"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-xs text-orange-800 dark:text-orange-300">
                    Selected: <strong>{selectedPlanForEnroll?.name}</strong> at <strong>{selectedPlanForEnroll?.price}</strong> (One Time Payment).
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-[#f26b1d] hover:bg-[#e05d12] text-white font-extrabold text-sm shadow-md transition-all cursor-pointer"
                  >
                    Confirm & Start Learning
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
