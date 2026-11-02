import React from 'react';
import { useUser } from '../context/UserContext';
import { ArrowRight, ShieldCheck, Users, Zap, CheckCircle2 } from 'lucide-react';

export const CtaSection: React.FC = () => {
  const { setActiveModal, setSelectedCategoryId } = useUser();

  return (
    <section className="relative py-28 bg-[#fafbfc] dark:bg-[#070b12] transition-colors duration-300 overflow-hidden">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-r from-cyan-500/15 via-blue-600/15 to-indigo-600/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-30" />

      <div className="max-w-[1100px] mx-auto px-6 relative z-10 text-center">
        
        <div className="relative rounded-[2.5rem] bg-gradient-to-b from-neutral-900 via-neutral-900 to-slate-950 text-white p-10 md:p-20 overflow-hidden border border-neutral-800 shadow-2xl glow-border">
          
          {/* Subtle Ambient Gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-indigo-600/10 to-transparent pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-semibold backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Next Cohort Registration Active · Limited Mentorship Slots</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1] text-glow">
              Transform Ambition Into Industry Excellence.
            </h2>

            <p className="text-base md:text-lg text-neutral-300 font-normal leading-relaxed text-balance">
              Join over 50,000+ ambitious developers and engineers. Learn directly with live technical leads, build production-grade capstone architectures, and walk away with globally recognized ISO 9001:2015 credentials.
            </p>

            {/* Micro value badges */}
            <div className="flex flex-wrap justify-center items-center gap-4 text-xs font-mono text-neutral-300 pt-2">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 4-Week Live Deep-Dive
              </span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 2-Month Live Capstone Project
              </span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> ISO 9001:2015 Verified LOR
              </span>
            </div>

            <div className="pt-6 flex flex-wrap justify-center items-center gap-4">
              <button
                onClick={() => {
                  setSelectedCategoryId(null);
                  setActiveModal('internships');
                }}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm transition-all shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Enroll in a Career Program</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveModal('mentors')}
                className="px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-md border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Explore Mentorship Plans</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
