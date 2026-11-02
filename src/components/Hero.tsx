import React from 'react';
import { motion } from 'motion/react';
import { useUser } from '../context/UserContext';
import { ChevronRight, ArrowUpRight, Award, ShieldCheck, Users, CheckCircle2, BookOpen } from 'lucide-react';
import { brandAssets } from '../assets/brandAssets';

export const Hero: React.FC = () => {
  const { setActiveModal, setSelectedCategoryId, navigateToProgram, navigateToView } = useUser();

  const quickPrograms = [
    { id: 'prog-web-dev', title: 'Full Stack Web Dev' },
    { id: 'prog-artificial-intelligence', title: 'Artificial Intelligence (AI)' },
    { id: 'prog-machine-learning', title: 'Machine Learning (ML)' },
    { id: 'prog-data-science', title: 'Data Science' },
    { id: 'prog-genai-agentic', title: 'Generative AI' },
  ];

  return (
    <section className="relative pt-16 md:pt-24 pb-20 md:pb-28 overflow-hidden bg-gradient-to-b from-white via-neutral-50 to-neutral-100/60 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 transition-colors duration-300">
      
      {/* Subtle Background Ambient Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-indigo-500/10 dark:bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
        
        {/* Accreditation Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/15 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-6 shadow-sm"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Dual-Phase Training Model: 4 Weeks Live Training + 2 Months Live Capstone Project</span>
        </motion.div>

        {/* Brand Main Title with Official Logo */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col items-center justify-center mb-4"
        >
          <div className="mb-3 p-2.5 rounded-2xl bg-white/80 dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-800 shadow-sm backdrop-blur-xs inline-flex items-center justify-center">
            <img
              src={brandAssets.emblem}
              alt="InternsLoom Emblem"
              className="h-16 md:h-20 w-auto object-contain"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight font-sans">
            <span className="text-[#0c2b47] dark:text-white">INTERNS</span>
            <span className="text-[#1fa2a6] dark:text-[#2dd4bf]">LOOM</span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl font-normal text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto mb-8 leading-relaxed"
        >
          The bridge between student ambition and professional excellence.
        </motion.p>

        {/* Hero Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center items-center gap-4 mb-6"
        >
          <button
            onClick={() => navigateToView('programs')}
            className="px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 cursor-pointer"
          >
            <span>Explore Programs</span>
            <ArrowUpRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => {
              setActiveModal('mentors');
            }}
            className="inline-flex items-center gap-1.5 text-neutral-700 dark:text-neutral-200 hover:text-blue-600 dark:hover:text-blue-400 font-semibold text-base px-6 py-3.5 rounded-full border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all group cursor-pointer"
          >
            <span>Domain Mentorship</span>
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>

        {/* Quick Direct Program Links */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-wrap justify-center items-center gap-2 mb-14"
        >
          <span className="text-xs text-neutral-400 font-medium mr-1">Popular Programs:</span>
          {quickPrograms.map((qp) => (
            <button
              key={qp.id}
              onClick={() => navigateToProgram(qp.id)}
              className="text-xs font-semibold px-3 py-1 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-2xs cursor-pointer"
            >
              {qp.title} →
            </button>
          ))}
        </motion.div>

        {/* Stats Grid matching internsforge.com */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-14"
        >
          <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 shadow-sm text-center">
            <p className="text-2xl md:text-3xl font-extrabold text-blue-600 dark:text-blue-400">25+</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium mt-1">Career Programs</p>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 shadow-sm text-center">
            <p className="text-2xl md:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">50,000+</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium mt-1">Enrolled Learners</p>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 shadow-sm text-center">
            <p className="text-2xl md:text-3xl font-extrabold text-purple-600 dark:text-purple-400">100+</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium mt-1">Hiring Network</p>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 shadow-sm text-center">
            <p className="text-2xl md:text-3xl font-extrabold text-amber-600 dark:text-amber-400">ISO 9001</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium mt-1">2015 Accredited</p>
          </div>
        </motion.div>

        {/* Workspace Hero Image Container */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative max-w-[1000px] mx-auto rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800 shadow-2xl group"
        >
          <div className="aspect-[16/9] w-full relative bg-neutral-900 overflow-hidden">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnDe5c9DwnuxAGOjQ5XcM5w8lVo4zZbsIJE9PDdkLOnWTB6TJMB2LtVGYTYM4v2RXC29QjLJ1mU2Sd4TIAF-e71THYI5SW0PPStq2hBHgZ8K-vjuMB08BQiE1D4Gnk7vIL1OFozywHyOFWskKWdLQ29JhXX9D2RuMI-XHmoqM7Uayf5jeevJhz44hLKHiwaIQkuxSQEXARYOKvfhtOMCg7--9WIwkscJ9Ru8QNg5fs3K-5N3VXyfLhJA"
              alt="InternsLoom Platform Workspace Desk"
              className="w-full h-full object-cover object-center transform group-hover:scale-[1.02] transition-transform duration-700"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/50 via-transparent to-transparent pointer-events-none" />

            {/* Floating Interactive Badge on Image */}
            <div className="absolute bottom-6 left-6 right-6 md:right-auto flex flex-wrap items-center gap-3 p-4 rounded-xl backdrop-blur-xl bg-white/85 dark:bg-neutral-900/85 border border-white/20 dark:border-neutral-700/50 text-left shadow-xl">
              <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                IL
              </div>
              <div>
                <p className="text-sm font-bold text-neutral-900 dark:text-white">Dual Certification Platform</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">ISO Certified Training + Verified Experience Letter + Merit LOR</p>
              </div>
              <button
                onClick={() => navigateToView('programs')}
                className="ml-auto text-xs font-semibold px-3 py-1.5 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center gap-1 hover:opacity-90 cursor-pointer"
              >
                Browse Programs <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
