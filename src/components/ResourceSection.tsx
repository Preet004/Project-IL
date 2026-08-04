import React from 'react';
import { motion } from 'motion/react';
import { useUser } from '../context/UserContext';
import { BookOpen, Sparkles, ArrowRight } from 'lucide-react';

export const ResourceSection: React.FC = () => {
  const { setActiveModal } = useUser();

  return (
    <section className="py-24 bg-neutral-100/60 dark:bg-neutral-900/30 border-b border-neutral-200/80 dark:border-neutral-800/80 transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          
          {/* Left Column Text */}
          <div className="lg:col-span-2 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
              <Sparkles className="w-3 h-3" />
              <span>Resource Vault & Playbooks</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-neutral-950 dark:text-white tracking-tight leading-tight">
              College, sorted.
            </h2>

            <p className="text-lg text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed">
              Get more than just an internship. Access our exclusive resource vault designed for the next generation of leaders.
            </p>

            <div className="pt-2">
              <button
                onClick={() => setActiveModal('resources')}
                className="px-8 py-3.5 rounded-full bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 font-semibold text-base hover:opacity-90 transition-opacity shadow-md flex items-center gap-2"
              >
                <span>Start Learning</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column Image */}
          <div className="lg:col-span-3 flex justify-center lg:justify-end">
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
              onClick={() => setActiveModal('resources')}
              className="relative w-full max-w-lg cursor-pointer group"
            >
              {/* Soft blur accent glow */}
              <div className="absolute -top-8 -left-8 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800 shadow-2xl bg-neutral-900">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXx0EjKQMvxY9WHq51IMKmZdmlb7r4UsjCzGwCvbf4o7AToRfYvhV2FNv2eKqdUC2Bv9jNwgrM2zECHaH_uQfqk_Vem6_GAWl1az9e00Xy6UZPC1vrEu8XjgwmXbXPBJA7mSj5a7SGeE5r5PbllwExe6qgpjgUQ4lQVXcT-8qGUaHTlo9Tu4eQffX8pwaTVYOlf_-P9sJ5fFrKo1KvVPa6X3quuZa1-yq43nqL4lUPTGfhwe7nPou81g"
                  alt="Resource Vault Study Books and Tablet"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl backdrop-blur-xl bg-neutral-900/80 border border-white/10 text-white flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-400" />
                    <span className="font-semibold">2026 Tech & Design Cheatsheets</span>
                  </div>
                  <span className="text-neutral-400">Free PDF Downloads</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
