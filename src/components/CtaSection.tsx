import React from 'react';
import { useUser } from '../context/UserContext';
import { ArrowRight, ShieldCheck, Zap, CheckCircle2 } from 'lucide-react';

export const CtaSection: React.FC = () => {
  const { setActiveModal, setSelectedCategoryId, navigateToView } = useUser();

  return (
    <section className="relative py-28 bg-[#fafbfc] dark:bg-[#070b12] transition-colors duration-300 overflow-hidden">
      
      {/* Background Radial Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[820px] h-[480px] rounded-full blur-[160px] pointer-events-none transition-all duration-700" 
        style={{
          background: 'radial-gradient(circle, rgba(var(--primary-rgb), 0.18) 0%, rgba(var(--secondary-rgb), 0.15) 100%)'
        }}
      />
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-30" />

      <div className="max-w-[1100px] mx-auto px-6 relative z-10 text-center">
        
        <div className="relative rounded-[2.5rem] bg-gradient-to-b from-neutral-900 via-neutral-900 to-slate-950 text-white p-10 md:p-20 overflow-hidden border border-neutral-800 shadow-2xl glow-border">
          
          {/* Subtle Ambient Gradient */}
          <div 
            className="absolute inset-0 pointer-events-none transition-all duration-700" 
            style={{
              background: 'linear-gradient(135deg, rgba(var(--primary-rgb), 0.1) 0%, rgba(var(--secondary-rgb), 0.08) 100%)'
            }}
          />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div 
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border"
              style={{
                backgroundColor: 'rgba(var(--primary-rgb), 0.1)',
                borderColor: 'rgba(var(--primary-rgb), 0.3)',
                color: 'var(--primary)'
              }}
            >
              <span 
                className="w-2 h-2 rounded-full animate-pulse" 
                style={{ backgroundColor: 'var(--primary)' }}
              />
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
                  navigateToView('programs');
                }}
                className="px-8 py-4 rounded-2xl bg-brand-gradient text-white font-bold text-sm transition-all shadow-glow flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Enroll in a Career Program</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveModal('mentors')}
                className="px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-md border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                <span>Explore Mentorship Plans</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
