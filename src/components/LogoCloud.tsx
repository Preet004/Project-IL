import React from 'react';
import { useUser } from '../context/UserContext';
import { Award, Briefcase, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';

const TOP_RECRUITERS = [
  { name: 'Amazon', role: 'SDE & Cloud Interns' },
  { name: 'Microsoft', role: 'Frontend & Full Stack' },
  { name: 'Google Cloud', role: 'AI & Data Engineering' },
  { name: 'Infosys', role: 'Systems Engineer' },
  { name: 'TCS Digital', role: 'Cadre Developers' },
  { name: 'Wipro Turbo', role: 'Enterprise Solutions' },
  { name: 'Razorpay', role: 'FinTech & Backend' },
  { name: 'Swiggy', role: 'Product Analytics' },
  { name: 'Zoho', role: 'Full Stack Developers' },
  { name: 'Flipkart', role: 'Supply Chain Tech' }
];

export const LogoCloud: React.FC = () => {
  const { navigateToView } = useUser();

  return (
    <section className="py-14 bg-neutral-50/80 dark:bg-neutral-900/40 border-y border-neutral-200/80 dark:border-neutral-800/80 transition-colors duration-300">
      <div className="max-w-[1240px] mx-auto px-6">
        
        {/* Top Header with Proof Badges */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 pb-6 border-b border-neutral-200/80 dark:border-neutral-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold mb-1.5">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Proven Campus Placement Outcomes</span>
            </div>
            <h3 className="text-xl md:text-2xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
              Where InternsLoom Alumni Work & Intern
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Our learners stand out in technical rounds with production capstones and ISO credentials
            </p>
          </div>

          <div className="flex items-center gap-6 text-center md:text-right shrink-0">
            <div>
              <p className="text-lg md:text-xl font-extrabold text-blue-600 dark:text-blue-400">₹4.8 - ₹18 LPA</p>
              <p className="text-[11px] text-neutral-500 font-medium">Fresher CTC Range</p>
            </div>
            <div className="h-8 w-px bg-neutral-200 dark:border-neutral-800" />
            <div>
              <p className="text-lg md:text-xl font-extrabold text-emerald-600 dark:text-emerald-400">94.2%</p>
              <p className="text-[11px] text-neutral-500 font-medium">College Project Pass Rate</p>
            </div>
          </div>
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
          {TOP_RECRUITERS.map((comp) => (
            <div
              key={comp.name}
              className="p-3.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs hover:border-blue-500/50 hover:shadow-sm transition-all text-center flex flex-col items-center justify-center group"
            >
              <span className="text-sm md:text-base font-extrabold tracking-wide text-neutral-800 dark:text-neutral-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {comp.name}
              </span>
              <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-medium mt-0.5">
                {comp.role}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/20 text-xs text-neutral-700 dark:text-neutral-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <span className="font-medium">
              Over <strong>50,000+ enrolled students</strong> from 300+ colleges across India have accelerated their careers with us.
            </span>
          </div>

          <button
            onClick={() => navigateToView('programs')}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer shrink-0 ml-auto md:ml-0"
          >
            <span>Explore Programs Aligned with Top Companies</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
