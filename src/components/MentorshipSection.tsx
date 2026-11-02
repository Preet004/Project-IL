import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useUser } from '../context/UserContext';
import { MENTORSHIP_DOMAINS, MOCK_INTERNSHIPS } from '../data/mockData';
import { ShieldCheck, BookOpen, Clock, Users, ArrowUpRight } from 'lucide-react';

export const MentorshipSection: React.FC = () => {
  const { setActiveModal } = useUser();
  const [selectedDomain, setSelectedDomain] = useState<string>('Full Stack Web Development');

  const domainOptions = Array.from(
    new Set([
      'Full Stack Web Development',
      'Artificial Intelligence',
      'Machine Learning',
      'Data Science',
      'Data Analytics',
      'Cloud Computing (AWS / Azure)',
      'Cyber Security',
      'VLSI & Embedded Systems',
      'Python Full Stack Development',
      'Java Full Stack Development',
      'Bioinformatics',
      'Robotics & Automation',
      'Digital Marketing & Business Analytics'
    ])
  );

  const handleStartLearning = () => {
    setActiveModal('mentors');
  };

  return (
    <section id="mentorship" className="py-24 bg-[#faf8f5] dark:bg-neutral-950/60 border-t border-neutral-200/80 dark:border-neutral-800/80 transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold mb-3 border border-orange-500/20">
            <Users className="w-3.5 h-3.5" />
            <span>Learning Tracks & Mentorship</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-950 dark:text-white tracking-tight mb-3">
            Choose Your Learning & Mentorship Track
          </h2>
          
          {/* Sophisticated program & mentorship callout */}
          <div className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-orange-50/80 via-white to-amber-50/80 dark:from-neutral-900/90 dark:via-neutral-900/70 dark:to-neutral-900/90 border border-orange-200/80 dark:border-neutral-800 shadow-sm shadow-orange-500/5 mt-2 transition-all duration-300 hover:border-orange-300 dark:hover:border-neutral-700">
            <p className="text-sm md:text-[15px] font-medium text-neutral-700 dark:text-neutral-300 leading-relaxed tracking-normal">
              Accelerate your professional growth with our structured curriculum — to complement your program with personalized, one-on-one industry mentorship,{' '}
              <button
                onClick={handleStartLearning}
                className="inline-flex items-center gap-0.5 font-bold text-[#f26b1d] dark:text-orange-400 hover:text-[#d95a12] dark:hover:text-orange-300 underline underline-offset-4 decoration-orange-400/60 hover:decoration-orange-500 transition-colors cursor-pointer"
              >
                click here
                <ArrowUpRight className="w-3.5 h-3.5 inline ml-0.5" />
              </button>
              .
            </p>
          </div>
        </div>

        {/* Domain Selector Bar */}
        <div className="max-w-xl mx-auto mb-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Select Domain:
          </span>
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="w-full sm:w-80 px-4 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-xs font-bold text-neutral-900 dark:text-white shadow-xs focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
          >
            {domainOptions.map((domain) => (
              <option key={domain} value={domain}>
                {domain}
              </option>
            ))}
          </select>
        </div>

        {/* EXACT 2 CARDS FROM THE SCREENSHOT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          
          {/* CARD 1: Self Paced (₹6,500) */}
          <div className="relative rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 p-8 md:p-10 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="text-center mb-6">
                <h3 className="text-3xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
                  Self Paced
                </h3>
                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mt-1">
                  Learn with your speed
                </p>
                
                <div className="mt-6">
                  <span className="text-4xl md:text-5xl font-black text-neutral-950 dark:text-white tracking-tight">
                    ₹6,500
                  </span>
                  <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mt-1">
                    One Time Payment
                  </p>
                </div>
              </div>

              {/* Checklist matching image */}
              <div className="space-y-3.5 pt-4 pb-8 border-t border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center gap-3 text-xs md:text-sm font-bold tracking-wide">
                  <span className="text-emerald-600 dark:text-emerald-400 font-black text-base w-4 text-center">+</span>
                  <span className="text-neutral-800 dark:text-neutral-200">RECORDED LECTURES</span>
                </div>
                <div className="flex items-center gap-3 text-xs md:text-sm font-bold tracking-wide">
                  <span className="text-emerald-600 dark:text-emerald-400 font-black text-base w-4 text-center">+</span>
                  <span className="text-neutral-800 dark:text-neutral-200">REAL TIME PROJECTS</span>
                </div>
                <div className="flex items-center gap-3 text-xs md:text-sm font-bold tracking-wide">
                  <span className="text-emerald-600 dark:text-emerald-400 font-black text-base w-4 text-center">+</span>
                  <span className="text-neutral-800 dark:text-neutral-200">4+ HRS OF LIVE SESSIONS</span>
                </div>
                <div className="flex items-center gap-3 text-xs md:text-sm font-bold tracking-wide">
                  <span className="text-emerald-600 dark:text-emerald-400 font-black text-base w-4 text-center">+</span>
                  <span className="text-neutral-800 dark:text-neutral-200">ONE ON ONE DOUBT SESSIONS</span>
                </div>
                <div className="flex items-center gap-3 text-xs md:text-sm font-bold tracking-wide">
                  <span className="text-emerald-600 dark:text-emerald-400 font-black text-base w-4 text-center">+</span>
                  <span className="text-neutral-800 dark:text-neutral-200">CERTIFICATIONS</span>
                </div>
                <div className="flex items-center gap-3 text-xs md:text-sm font-bold tracking-wide">
                  <span className="text-red-500 font-black text-base w-4 text-center">✕</span>
                  <span className="text-neutral-500 dark:text-neutral-400 font-medium">MENTOR SUPPORT</span>
                </div>
                <div className="flex items-center gap-3 text-xs md:text-sm font-bold tracking-wide">
                  <span className="text-red-500 font-black text-base w-4 text-center">✕</span>
                  <span className="text-neutral-500 dark:text-neutral-400 font-medium">PLACEMENT GUIDANCE</span>
                </div>
                <div className="flex items-center gap-3 text-xs md:text-sm font-bold tracking-wide">
                  <span className="text-red-500 font-black text-base w-4 text-center">✕</span>
                  <span className="text-neutral-500 dark:text-neutral-400 font-medium">INTERVIEW ASSISTANCE</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleStartLearning}
              className="w-full py-4 px-6 rounded-full bg-[#f26b1d] hover:bg-[#e05d12] text-white font-extrabold text-base shadow-md hover:shadow-lg transition-all text-center cursor-pointer transform active:scale-[0.98]"
            >
              Start Learning
            </button>
          </div>

          {/* CARD 2: Mentor Led (₹9,000 - POPULAR) */}
          <div className="relative rounded-3xl bg-white dark:bg-neutral-900 border-2 border-orange-500/80 dark:border-orange-500 p-8 md:p-10 shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
            
            {/* Tilted POPULAR Ribbon Badge */}
            <div className="absolute -top-3.5 left-6 bg-[#f26b1d] text-white text-[11px] font-black uppercase px-3.5 py-1 rounded-md shadow-md transform -rotate-3 tracking-wider select-none">
              POPULAR
            </div>

            <div>
              {/* Header */}
              <div className="text-center mb-6 pt-1">
                <h3 className="text-3xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
                  Mentor Led
                </h3>
                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mt-1">
                  Live Mentorship
                </p>
                
                <div className="mt-6">
                  <span className="text-4xl md:text-5xl font-black text-neutral-950 dark:text-white tracking-tight">
                    ₹9,000
                  </span>
                  <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mt-1">
                    One Time Payment
                  </p>
                </div>
              </div>

              {/* Checklist matching image */}
              <div className="space-y-3.5 pt-4 pb-8 border-t border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center gap-3 text-xs md:text-sm font-bold tracking-wide">
                  <span className="text-emerald-600 dark:text-emerald-400 font-black text-base w-4 text-center">+</span>
                  <span className="text-neutral-800 dark:text-neutral-200">4+ HRS OF LIVE SESSIONS</span>
                </div>
                <div className="flex items-center gap-3 text-xs md:text-sm font-bold tracking-wide">
                  <span className="text-emerald-600 dark:text-emerald-400 font-black text-base w-4 text-center">+</span>
                  <span className="text-neutral-800 dark:text-neutral-200">RECORDED LECTURES</span>
                </div>
                <div className="flex items-center gap-3 text-xs md:text-sm font-bold tracking-wide">
                  <span className="text-emerald-600 dark:text-emerald-400 font-black text-base w-4 text-center">+</span>
                  <span className="text-neutral-800 dark:text-neutral-200">REAL TIME PROJECTS</span>
                </div>
                <div className="flex items-center gap-3 text-xs md:text-sm font-bold tracking-wide">
                  <span className="text-emerald-600 dark:text-emerald-400 font-black text-base w-4 text-center">+</span>
                  <span className="text-neutral-800 dark:text-neutral-200">ONE ON ONE DOUBT SESSIONS</span>
                </div>
                <div className="flex items-center gap-3 text-xs md:text-sm font-bold tracking-wide">
                  <span className="text-emerald-600 dark:text-emerald-400 font-black text-base w-4 text-center">+</span>
                  <span className="text-neutral-800 dark:text-neutral-200">CERTIFICATIONS</span>
                </div>
                <div className="flex items-center gap-3 text-xs md:text-sm font-bold tracking-wide">
                  <span className="text-emerald-600 dark:text-emerald-400 font-black text-base w-4 text-center">+</span>
                  <span className="text-neutral-800 dark:text-neutral-200">MENTOR SUPPORT</span>
                </div>
                <div className="flex items-center gap-3 text-xs md:text-sm font-bold tracking-wide">
                  <span className="text-emerald-600 dark:text-emerald-400 font-black text-base w-4 text-center">+</span>
                  <span className="text-neutral-800 dark:text-neutral-200">PLACEMENT GUIDANCE</span>
                </div>
                <div className="flex items-center gap-3 text-xs md:text-sm font-bold tracking-wide">
                  <span className="text-emerald-600 dark:text-emerald-400 font-black text-base w-4 text-center">+</span>
                  <span className="text-neutral-800 dark:text-neutral-200">INTERVIEW ASSISTANCE</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleStartLearning}
              className="w-full py-4 px-6 rounded-full bg-[#f26b1d] hover:bg-[#e05d12] text-white font-extrabold text-base shadow-md hover:shadow-lg transition-all text-center cursor-pointer transform active:scale-[0.98]"
            >
              Start Learning
            </button>
          </div>

        </div>

        {/* Feature Badges */}
        <div className="mt-12 text-center text-xs text-neutral-500 dark:text-neutral-400 font-medium flex flex-wrap items-center justify-center gap-6">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" /> ISO 9001:2015 Verified Certificate
          </span>
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-blue-500" /> Real-Time Industry Capstone Projects
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-orange-500" /> Flexible Timings for College Students
          </span>
        </div>

      </div>
    </section>
  );
};
