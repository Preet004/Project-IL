import React from 'react';
import { useUser } from '../context/UserContext';
import { ArrowRight, ShieldCheck, Users } from 'lucide-react';

export const CtaSection: React.FC = () => {
  const { setActiveModal, setSelectedCategoryId } = useUser();

  return (
    <section className="py-20 bg-white dark:bg-neutral-950 transition-colors duration-300">
      <div className="max-w-[1000px] mx-auto px-6 text-center">
        
        <div className="relative rounded-[2rem] bg-neutral-900 dark:bg-neutral-900 text-white p-10 md:p-16 overflow-hidden border border-neutral-800 shadow-2xl">
          
          {/* Subtle Ambient Gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-indigo-600/10 to-transparent pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Next Training & Internship Cohort Starting Soon</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Ready to Accelerate Your Career?
            </h2>

            <p className="text-base md:text-lg text-neutral-300 font-normal leading-relaxed">
              Join over 50,000+ ambitious students learning in-demand technical domains with verified ISO certifications and live industry projects.
            </p>

            <div className="pt-4 flex flex-wrap justify-center items-center gap-4">
              <button
                onClick={() => {
                  setSelectedCategoryId(null);
                  setActiveModal('internships');
                }}
                className="px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
              >
                <span>Enroll in a Program</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveModal('mentors')}
                className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-md border border-white/20 transition-all flex items-center justify-center gap-2"
              >
                <Users className="w-4 h-4" />
                <span>Domain Mentorship</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
