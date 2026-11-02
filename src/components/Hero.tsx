import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useUser } from '../context/UserContext';
import { 
  ChevronRight, 
  ArrowUpRight, 
  ShieldCheck, 
  Award, 
  Users, 
  Sparkles, 
  Code2, 
  Terminal, 
  GitPullRequest, 
  CheckCircle2, 
  Zap,
  ArrowRight
} from 'lucide-react';
import { brandAssets } from '../assets/brandAssets';

export const Hero: React.FC = () => {
  const { setActiveModal, navigateToProgram, navigateToView } = useUser();
  const [activeInteractiveTab, setActiveInteractiveTab] = useState<'terminal' | 'deliverables'>('terminal');

  const quickPrograms = [
    { id: 'prog-web-dev', title: 'Full Stack Web Dev' },
    { id: 'prog-artificial-intelligence', title: 'Artificial Intelligence (AI)' },
    { id: 'prog-machine-learning', title: 'Machine Learning (ML)' },
    { id: 'prog-data-science', title: 'Data Science' },
    { id: 'prog-genai-agentic', title: 'Generative AI & LLMs' },
    { id: 'prog-cloud-computing', title: 'Cloud DevOps & AWS' }
  ];

  return (
    <section className="relative pt-20 md:pt-28 pb-20 md:pb-32 overflow-hidden bg-[#fafbfc] dark:bg-[#070b12] transition-colors duration-300">
      
      {/* Futuristic Background Aurora & Cyber Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-gradient-to-tr from-cyan-500/15 via-blue-600/15 to-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-cyan-400/10 dark:bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-10 w-[350px] h-[350px] bg-indigo-500/10 dark:bg-indigo-500/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-50 dark:opacity-40" />

      <div className="max-w-[1240px] mx-auto px-6 relative z-10 text-center">
        
        {/* Futuristic Accreditation Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 dark:bg-cyan-500/15 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs font-semibold mb-6 shadow-sm shadow-cyan-500/5 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Dual-Phase Career Forge: 4-Week Live Training + 2-Month Live Industry Capstone</span>
        </motion.div>

        {/* Brand Emblem & Futuristic Wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col items-center justify-center mb-6"
        >
          <div className="mb-4 p-3 rounded-2xl bg-white/90 dark:bg-neutral-900/90 border border-neutral-200/80 dark:border-neutral-800 shadow-xl shadow-cyan-500/5 backdrop-blur-md inline-flex items-center justify-center glow-border group transition-all">
            <img
              src={brandAssets.emblem}
              alt="InternsLoom Emblem"
              className="h-16 md:h-20 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] max-w-4xl mx-auto">
            <span className="text-neutral-900 dark:text-white">The Engineering & </span>
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent text-glow">
              Career Forge
            </span>
          </h1>
        </motion.div>

        {/* Subtitle with High-Ticket Client Clarity */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl font-normal text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto mb-8 leading-relaxed text-balance"
        >
          Bridge the gap between theoretical knowledge and real software architecture. Build production-grade capstones, earn ISO 9001:2015 verified credentials, and secure high-impact roles.
        </motion.p>

        {/* Futuristic CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center items-center gap-4 mb-6"
        >
          <button
            onClick={() => navigateToView('programs')}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:via-blue-500 hover:to-indigo-500 text-white font-bold text-sm md:text-base shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5 cursor-pointer glow-border"
          >
            <span>Explore 79+ Technical Tracks</span>
            <ArrowUpRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => setActiveModal('mentors')}
            className="inline-flex items-center gap-2 text-neutral-800 dark:text-neutral-200 hover:text-cyan-600 dark:hover:text-cyan-400 font-bold text-sm md:text-base px-7 py-4 rounded-2xl bg-white/80 dark:bg-neutral-900/80 border border-neutral-300/80 dark:border-neutral-800 hover:border-cyan-500/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all group cursor-pointer shadow-sm"
          >
            <Zap className="w-4 h-4 text-cyan-500" />
            <span>Mentorship & Value Plans</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>

        {/* Quick Direct Program Links with Glow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-wrap justify-center items-center gap-2 mb-14"
        >
          <span className="text-xs text-neutral-500 dark:text-neutral-400 font-semibold mr-1">Trending Tracks:</span>
          {quickPrograms.map((qp) => (
            <button
              key={qp.id}
              onClick={() => navigateToProgram(qp.id)}
              className="text-xs font-semibold px-3.5 py-1.5 rounded-xl bg-white dark:bg-neutral-900/90 border border-neutral-200/90 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 hover:shadow-sm transition-all cursor-pointer"
            >
              {qp.title} →
            </button>
          ))}
        </motion.div>

        {/* High-Converting Social Proof Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16"
        >
          <div className="p-5 rounded-2xl bg-white/90 dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-800 shadow-sm text-center backdrop-blur-xs">
            <p className="text-3xl font-black text-cyan-600 dark:text-cyan-400 font-mono tabular-nums">79+</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-semibold mt-1">Specialized Tracks</p>
          </div>
          <div className="p-5 rounded-2xl bg-white/90 dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-800 shadow-sm text-center backdrop-blur-xs">
            <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">50,000+</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-semibold mt-1">Enrolled Practitioners</p>
          </div>
          <div className="p-5 rounded-2xl bg-white/90 dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-800 shadow-sm text-center backdrop-blur-xs">
            <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400 font-mono tabular-nums">100+</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-semibold mt-1">Recruiting Tech Firms</p>
          </div>
          <div className="p-5 rounded-2xl bg-white/90 dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-800 shadow-sm text-center backdrop-blur-xs">
            <p className="text-3xl font-black text-amber-600 dark:text-amber-400 font-mono tabular-nums">ISO 9001</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-semibold mt-1">2015 Accredited Seal</p>
          </div>
        </motion.div>

        {/* Interactive Futuristic Live Terminal / Architecture Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative max-w-[1040px] mx-auto rounded-3xl overflow-hidden border border-neutral-200/90 dark:border-neutral-800 shadow-2xl bg-neutral-950 text-white text-left glow-border"
        >
          {/* Terminal Top Window Bar */}
          <div className="px-5 py-3.5 bg-neutral-900/90 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 font-mono text-xs text-neutral-400">
                internsloom-live-workspace // dual-phase-capstone
              </span>
            </div>

            <div className="flex items-center gap-1 bg-neutral-800/80 p-1 rounded-lg">
              <button
                onClick={() => setActiveInteractiveTab('terminal')}
                className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all cursor-pointer ${
                  activeInteractiveTab === 'terminal' ? 'bg-cyan-600 text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Code & CI/CD Pipeline
              </button>
              <button
                onClick={() => setActiveInteractiveTab('deliverables')}
                className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all cursor-pointer ${
                  activeInteractiveTab === 'deliverables' ? 'bg-cyan-600 text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Deliverables & LOR
              </button>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 md:p-8 font-mono text-xs leading-relaxed space-y-3 bg-[#0a0f18]">
            {activeInteractiveTab === 'terminal' ? (
              <>
                <div className="flex items-center gap-2 text-neutral-400">
                  <span className="text-cyan-400 font-bold">$</span>
                  <span>loom-deploy --cohort 2026-Q1 --verify-standards</span>
                </div>
                <div className="text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>[PASSED] ISO 9001:2015 Quality Management Protocol Verified</span>
                </div>
                <div className="text-neutral-300">
                  <span>→ Loading 79+ Industrial Capstone Repositories (Web, AI, Cloud, VLSI)...</span>
                </div>
                <div className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 text-cyan-300 space-y-1">
                  <p className="text-neutral-400">// Sample Real-World Student Capstone Output</p>
                  <p className="text-white font-bold">PROJECT: Multi-Tenant Enterprise Microservices Gateway</p>
                  <p className="text-neutral-400">STACK: TypeScript · Next.js · Kafka · Docker · PostgreSQL · Redis</p>
                  <p className="text-emerald-400">STATUS: Live CI/CD Build Successful · Production Verified (100% Test Coverage)</p>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-neutral-800">
                  <div className="flex items-center gap-2 text-neutral-400 text-[11px]">
                    <GitPullRequest className="w-4 h-4 text-indigo-400" />
                    <span>Every learner graduates with a verifiable live GitHub portfolio.</span>
                  </div>
                  <button
                    onClick={() => navigateToView('programs')}
                    className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>View All Capstone Projects</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 text-neutral-400">
                  <span className="text-cyan-400 font-bold">$</span>
                  <span>loom-credentials --inspect-audit-trail</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800">
                    <p className="text-cyan-400 font-bold mb-1">1. ISO 9001:2015 Certificate</p>
                    <p className="text-neutral-400 text-[11px]">Cryptographically verifiable certificate accepted by corporate hiring boards.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800">
                    <p className="text-indigo-400 font-bold mb-1">2. Letter of Recommendation</p>
                    <p className="text-neutral-400 text-[11px]">Signed recommendation highlighting capstone engineering performance.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800">
                    <p className="text-emerald-400 font-bold mb-1">3. Direct Placement Pipeline</p>
                    <p className="text-neutral-400 text-[11px]">Direct referral to 100+ partner companies and corporate hiring managers.</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-neutral-800 flex justify-end">
                  <button
                    onClick={() => setActiveModal('verify')}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verify a Certificate ID Now</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
};
