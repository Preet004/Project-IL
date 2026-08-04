import React from 'react';
import { useUser } from '../context/UserContext';

const COMPANIES = [
  { name: 'TECHNOVA', tag: 'Full Stack & AI' },
  { name: 'ORBITAL', tag: 'Design & Interfaces' },
  { name: 'VERITAS', tag: 'Venture & Strategy' },
  { name: 'NEXUS', tag: 'YC Frontier Tech' },
  { name: 'CORE', tag: 'Data Infrastructure' }
];

export const LogoCloud: React.FC = () => {
  const { setActiveModal } = useUser();

  return (
    <section className="py-20 bg-white dark:bg-neutral-950 border-b border-neutral-200/80 dark:border-neutral-800/80 transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        
        <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-10">
          Trusted by Industry Leaders
        </p>

        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
          {COMPANIES.map((comp) => (
            <button
              key={comp.name}
              onClick={() => setActiveModal('internships')}
              className="group flex flex-col items-center transition-all opacity-60 hover:opacity-100 hover:scale-105"
            >
              <span className="text-2xl md:text-3xl font-extrabold tracking-wider text-neutral-800 dark:text-neutral-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 font-sans">
                {comp.name}
              </span>
              <span className="text-[10px] font-medium tracking-tight text-neutral-400 dark:text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity mt-1">
                {comp.tag}
              </span>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
