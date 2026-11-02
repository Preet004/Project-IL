import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useUser } from '../context/UserContext';
import { 
  Sparkles, 
  Rocket, 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  Code, 
  FileCheck, 
  Award, 
  Users, 
  Clock, 
  Target, 
  Briefcase,
  Compass,
  Laptop
} from 'lucide-react';

export const StudentPathwaySection: React.FC = () => {
  const { navigateToView, navigateToProgram, setActiveModal } = useUser();
  const [selectedTrack, setSelectedTrack] = useState<'first-year' | 'final-year'>('first-year');

  const firstYearCurriculum = [
    {
      step: '01',
      title: 'Explore & Discover Your Calling',
      desc: 'Zero coding background needed. Test-drive Web Dev, Python, AI basics, or Core Engineering without overwhelm.',
      icon: <Compass className="w-5 h-5 text-blue-600 dark:text-blue-400" />
    },
    {
      step: '02',
      title: 'Interactive Foundations & Live Doubts',
      desc: 'Weekly beginner-friendly live classes after college hours with mentors who explain concepts from ground zero.',
      icon: <Code className="w-5 h-5 text-teal-600 dark:text-teal-400" />
    },
    {
      step: '03',
      title: 'Build Your Very First Project',
      desc: 'Create real portfolio projects like a responsive web app or automated Python tool to show off in college hackathons.',
      icon: <Laptop className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
    },
    {
      step: '04',
      title: 'First Verified ISO 9001:2015 Certificate',
      desc: 'Stand out from batchmates early with official accredited credentials for your 1st-year college submissions.',
      icon: <Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />
    }
  ];

  const finalYearCurriculum = [
    {
      step: '01',
      title: 'Select Production Capstone Domain',
      desc: 'Pick your major specialization (Full Stack MERN, Advanced AI/ML, Cloud DevOps, VLSI, or Business Analytics).',
      icon: <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
    },
    {
      step: '02',
      title: '2 Months Live Industry Capstone Project',
      desc: 'Build production-grade systems following agile workflows, git commits, code reviews, and industry architecture.',
      icon: <Briefcase className="w-5 h-5 text-teal-600 dark:text-teal-400" />
    },
    {
      step: '03',
      title: 'Official LOR & College Project Submission',
      desc: 'Receive verified documentation, project report templates, and a verified Letter of Recommendation (LOR) for university credit.',
      icon: <FileCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
    },
    {
      step: '04',
      title: 'Placement Readiness & Referral Access',
      desc: 'Mock technical interviews, ATS resume audits, and direct access to active job openings on our verified Recruiter portal.',
      icon: <Rocket className="w-5 h-5 text-amber-600 dark:text-amber-400" />
    }
  ];

  const firstYearPrograms = [
    { id: 'prog-web-dev', title: 'Full Stack Web Development', tag: 'High Campus Demand' },
    { id: 'prog-python', title: 'Python Programming Essentials', tag: 'Best for Beginners' },
    { id: 'prog-artificial-intelligence', title: 'AI & Machine Learning Primer', tag: 'Futuristic' },
    { id: 'prog-ui-ux', title: 'UI/UX Design & Figma Mastery', tag: 'Creative & Tech' }
  ];

  const finalYearPrograms = [
    { id: 'prog-full-stack', title: 'Full Stack MERN & Next.js', tag: 'Placement Favorite' },
    { id: 'prog-data-science', title: 'End-to-End Data Science & AI', tag: 'High CTC Roles' },
    { id: 'prog-devops', title: 'DevOps, Docker & Kubernetes', tag: 'Cloud Architect' },
    { id: 'prog-vlsi', title: 'VLSI & Embedded Systems', tag: 'Core Tech & Hardware' }
  ];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white via-blue-50/40 to-white dark:from-neutral-950 dark:via-neutral-900/60 dark:to-neutral-950 transition-colors duration-300">
      <div className="max-w-[1240px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold mb-4 shadow-2xs">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <span>Built Specifically For College Undergraduates</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-neutral-950 dark:text-white tracking-tight mb-4">
            Tailored Paths for <span className="text-blue-600 dark:text-blue-400">1st-Year</span> & <span className="text-teal-600 dark:text-teal-400">Final-Year</span> Students
          </h2>
          
          <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
            Whether you are taking your first steps in engineering or preparing for final campus placement drives, our dual-phase programs adapt directly to your current semester needs.
          </p>

          {/* Interactive Student Year Switcher */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-inner max-w-xl mx-auto w-full sm:w-auto">
            <button
              onClick={() => setSelectedTrack('first-year')}
              className={`flex-1 sm:flex-none px-6 py-3 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                selectedTrack === 'first-year'
                  ? 'bg-white dark:bg-neutral-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>1st & 2nd Year (Freshers Track)</span>
            </button>

            <button
              onClick={() => setSelectedTrack('final-year')}
              className={`flex-1 sm:flex-none px-6 py-3 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                selectedTrack === 'final-year'
                  ? 'bg-white dark:bg-neutral-900 text-teal-600 dark:text-teal-400 shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Rocket className="w-4 h-4 text-teal-500" />
              <span>3rd & Final Year (Placement Track)</span>
            </button>
          </div>
        </div>

        {/* Dynamic Track Content */}
        <AnimatePresence mode="wait">
          {selectedTrack === 'first-year' ? (
            <motion.div
              key="first-year"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {/* Highlight Card */}
              <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-xl relative overflow-hidden">
                <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 blur-2xl pointer-events-none" />
                <div className="relative z-10 max-w-3xl space-y-4">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-blue-200">
                    Fresher Friendly • No Prior Experience Required
                  </span>
                  <h3 className="text-2xl md:text-3xl font-extrabold">
                    Start College with Real Coding Momentum & Industry Clarity
                  </h3>
                  <p className="text-sm md:text-base text-blue-100 leading-relaxed">
                    Most college curriculums start slow. InternsLoom gives you a head start with friendly mentors, guided projects, and flexible weekend cohorts designed to not clash with your college semester exams.
                  </p>
                  
                  {/* Quick Feature Perks */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
                    <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                      <p className="text-xs font-bold text-white">Zero Pre-reqs</p>
                      <p className="text-[11px] text-blue-100">Explained from scratch</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                      <p className="text-xs font-bold text-white">After-College Hours</p>
                      <p className="text-[11px] text-blue-100">Live recorded lectures</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                      <p className="text-xs font-bold text-white">1-on-1 Doubt Help</p>
                      <p className="text-[11px] text-blue-100">Patient mentor guidance</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                      <p className="text-xs font-bold text-white">Verified Certificate</p>
                      <p className="text-[11px] text-blue-100">ISO 9001:2015 accredited</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4-Step Roadmap */}
              <div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-6 text-center">
                  Your 4-Step Fresher Learning Journey
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {firstYearCurriculum.map((item) => (
                    <div
                      key={item.step}
                      className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 shadow-xs hover:border-blue-500/50 hover:shadow-md transition-all space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-900/60">
                          {item.icon}
                        </div>
                        <span className="text-2xl font-black text-neutral-200 dark:text-neutral-800 font-mono">
                          {item.step}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-neutral-950 dark:text-white">
                        {item.title}
                      </h4>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended First-Year Tracks */}
              <div className="p-6 md:p-8 rounded-3xl bg-neutral-100/70 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-neutral-950 dark:text-white">
                      Recommended 1st-Year Starter Programs
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Popular introductory courses chosen by engineering and computer science freshers
                    </p>
                  </div>
                  <button
                    onClick={() => navigateToView('programs')}
                    className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <span>View all 79 programs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {firstYearPrograms.map((prog) => (
                    <div
                      key={prog.id}
                      onClick={() => navigateToProgram(prog.id)}
                      className="p-4 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-sm cursor-pointer transition-all group"
                    >
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                        {prog.tag}
                      </span>
                      <h4 className="text-sm font-bold text-neutral-900 dark:text-white mt-2 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {prog.title}
                      </h4>
                      <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 inline-flex items-center gap-1">
                        Explore syllabus <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="final-year"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {/* Highlight Card */}
              <div className="p-8 rounded-3xl bg-gradient-to-r from-teal-700 via-teal-800 to-emerald-800 text-white shadow-xl relative overflow-hidden">
                <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 blur-2xl pointer-events-none" />
                <div className="relative z-10 max-w-3xl space-y-4">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-teal-200">
                    Placement & Final-Year Capstone Ready
                  </span>
                  <h3 className="text-2xl md:text-3xl font-extrabold">
                    Crack Campus Placements with Production Projects & Verified LOR
                  </h3>
                  <p className="text-sm md:text-base text-teal-100 leading-relaxed">
                    Companies look for candidates with hands-on project experience. Our 2-month capstone internship replicates a real corporate environment, complete with code reviews, deployment pipelines, and academic credit reports.
                  </p>
                  
                  {/* Quick Feature Perks */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
                    <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                      <p className="text-xs font-bold text-white">Live Capstone</p>
                      <p className="text-[11px] text-teal-100">Industry production code</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                      <p className="text-xs font-bold text-white">Verified LOR</p>
                      <p className="text-[11px] text-teal-100">Valid for university credit</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                      <p className="text-xs font-bold text-white">Mock Interviews</p>
                      <p className="text-[11px] text-teal-100">Technical & HR rounds</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                      <p className="text-xs font-bold text-white">Recruiter Access</p>
                      <p className="text-[11px] text-teal-100">Direct hiring vacancies</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4-Step Roadmap */}
              <div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-6 text-center">
                  Your 4-Step Placement Readiness Roadmap
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {finalYearCurriculum.map((item) => (
                    <div
                      key={item.step}
                      className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 shadow-xs hover:border-teal-500/50 hover:shadow-md transition-all space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200/60 dark:border-teal-900/60">
                          {item.icon}
                        </div>
                        <span className="text-2xl font-black text-neutral-200 dark:text-neutral-800 font-mono">
                          {item.step}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-neutral-950 dark:text-white">
                        {item.title}
                      </h4>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Final-Year Tracks */}
              <div className="p-6 md:p-8 rounded-3xl bg-neutral-100/70 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-neutral-950 dark:text-white">
                      Top Placement-Oriented Capstone Tracks
                    </h3>
                    <p className="text-xs text-neutral-500">
                      High-conversion programs with the highest hiring demand in campus placements
                    </p>
                  </div>
                  <button
                    onClick={() => navigateToView('careers')}
                    className="text-xs font-bold text-teal-600 dark:text-teal-400 flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <span>Check open job vacancies</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {finalYearPrograms.map((prog) => (
                    <div
                      key={prog.id}
                      onClick={() => navigateToProgram(prog.id)}
                      className="p-4 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-teal-500 dark:hover:border-teal-400 hover:shadow-sm cursor-pointer transition-all group"
                    >
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400">
                        {prog.tag}
                      </span>
                      <h4 className="text-sm font-bold text-neutral-900 dark:text-white mt-2 mb-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                        {prog.title}
                      </h4>
                      <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 inline-flex items-center gap-1">
                        View Capstone Syllabus <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
