import React from 'react';
import { motion } from 'motion/react';
import { useUser } from '../context/UserContext';
import { Terminal, Palette, Briefcase, Rocket, ArrowRight } from 'lucide-react';
import { DepartmentCategory } from '../types';

export const BentoGrid: React.FC = () => {
  const { setActiveModal, setSelectedCategoryId } = useUser();

  const handleCategoryClick = (category: DepartmentCategory | null) => {
    setSelectedCategoryId(category);
    setActiveModal('internships');
  };

  return (
    <section className="py-24 bg-neutral-100/80 dark:bg-neutral-900/40 border-y border-neutral-200/80 dark:border-neutral-800/80 transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-950 dark:text-white tracking-tight mb-3">
            Industry Bootcamps & Live Capstone Projects
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 font-normal">
            Tailored 12-week skill pathways for every modern career path.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Bento Card 1: Engineering & Dev */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
            onClick={() => handleCategoryClick('Engineering & Dev')}
            className="group cursor-pointer rounded-2xl bg-white dark:bg-neutral-900/90 border border-neutral-200/80 dark:border-neutral-800 p-8 flex flex-col justify-between h-[480px] shadow-sm hover:shadow-xl transition-all"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
                <Terminal className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-950 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Engineering & Dev
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-base">
                Build the future with world-class tech teams.
              </p>
            </div>

            <div className="mt-auto overflow-hidden rounded-xl border border-neutral-200/60 dark:border-neutral-800/80 h-56 relative bg-neutral-950">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDX3IezI0Tf69ufLanYLh7twKOmVnVudfJXvby9E8MUPgcoyVhM_4hlzOHiUIXa1Pb8sh6HBZ1i1D_jOLJezZTIQVEBL1KjzeqAWxpT-M1y8FEXOlW5Klq1ANoT9NznfD6wgQpJRI7ngVwmhBLeeKThEAXTXQOXd_cH38ZXTxnOFdrAqMxHlhYWuoIpAnSfA6a1EB0ydqEUAYeWXKFSlLxBXuUb5hVxMhincuLlkplC9PLBVA6GQA2jvA"
                alt="Engineering & Dev Code Screen"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>

          {/* Bento Card 2: Creative & Design */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
            onClick={() => handleCategoryClick('Creative & Design')}
            className="group cursor-pointer rounded-2xl bg-white dark:bg-neutral-900/90 border border-neutral-200/80 dark:border-neutral-800 p-8 flex flex-col justify-between h-[480px] shadow-sm hover:shadow-xl transition-all"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-6">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-950 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                Creative & Design
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-base">
                Shape the visual narratives of global brands.
              </p>
            </div>

            <div className="mt-auto overflow-hidden rounded-xl border border-neutral-200/60 dark:border-neutral-800/80 h-56 relative bg-neutral-100 dark:bg-neutral-950">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDp_yeTlDWawcRY5irEWIBHZ-2tg8JjlKt946XqPocySTx0R8WndpwdXDxqfwnw9oGhrWX21dyFRym_Sgg4Y2O5k_rfXhviCFcqQBO3MIPPe9caj98AGF8NL_VoOyBHa7VK_6XuHUc26hqtW5D_1mAVL5_VKNNebOQIEH9gLzZUIQp7dgneYgHk5aEFfZKu4s53wxntCna3zDm2zt7K_ZsHHo9NYqs1kAIN0lNd1aEjHQnTHUZ-vHlQqw"
                alt="Creative & Design Studio Workspace"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>

          {/* Bento Card 3: Business Strategy */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
            onClick={() => handleCategoryClick('Business Strategy')}
            className="group cursor-pointer rounded-2xl bg-white dark:bg-neutral-900/90 border border-neutral-200/80 dark:border-neutral-800 p-8 flex flex-col justify-between h-[400px] shadow-sm hover:shadow-xl transition-all"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-6">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-950 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                Business Strategy
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-base mb-6">
                Drive growth and operational excellence.
              </p>
            </div>

            <div className="overflow-hidden rounded-xl border border-neutral-200/60 dark:border-neutral-800/80 h-40 relative">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCx3TAH6FducYZ23cl3idWJqkRiir3E7yBWaGhA2YC4MW89i8IMKTOR2I-lLqv54dJUUrL92CR56eRjuifQKwGloPZ6jzQX9A39O7WOnNRkUUd8-qJVM_4rgNzABkkDvXVIUEYLSTPdA9m4GKkjZ9UZn-Sc2K1JPPD8uDc28G5JoyVnz1xUEok9chwpi3Gg1tn9ArmEaweMkTycbhCEw5DAQgX6wQ2BnRHG2mgEC-rIeFq1sZWgsFiEdw"
                alt="Business Strategy Boardroom"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>

          {/* Bento Card 4: Startups */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
            onClick={() => handleCategoryClick(null)}
            className="group cursor-pointer rounded-2xl bg-white dark:bg-neutral-900/90 border border-neutral-200/80 dark:border-neutral-800 p-8 flex flex-col justify-center items-center text-center h-[400px] shadow-sm hover:shadow-xl transition-all relative overflow-hidden"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Rocket className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-neutral-950 dark:text-white mb-2">
              Startups
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-base max-w-sm mb-8">
              Fast-track your career in high-growth ventures.
            </p>

            <button className="text-blue-600 dark:text-blue-400 font-semibold text-base flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
              <span>View All Categories</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
