import React from 'react';
import { useUser } from '../context/UserContext';
import { ArrowRight, Building2 } from 'lucide-react';

export const CtaSection: React.FC = () => {
  const { setActiveModal } = useUser();

  return (
    <section className="py-24 bg-white dark:bg-neutral-950 transition-colors duration-300">
      <div className="max-w-[1000px] mx-auto px-6 text-center">
        
        <div className="relative rounded-[2rem] bg-neutral-900 dark:bg-neutral-900 text-white p-10 md:p-16 overflow-hidden border border-neutral-800 shadow-2xl">
          
          {/* Subtle Ambient Gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-indigo-600/10 to-transparent pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Your next chapter begins here.
            </h2>

            <p className="text-lg md:text-xl text-neutral-300 font-normal leading-relaxed">
              Join 50,000+ students already weaving their future with InternsLoom.
            </p>

            <div className="pt-4 flex justify-center">
              <button
                onClick={() => setActiveModal('internships')}
                className="px-9 py-4 rounded-full bg-white text-neutral-900 font-bold text-base hover:bg-neutral-100 transition-all shadow-lg flex items-center justify-center gap-2 group"
              >
                <span>Explore Bootcamps</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
