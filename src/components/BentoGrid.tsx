import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useUser } from '../context/UserContext';
import { 
  BarChart3, 
  Cloud, 
  Cpu, 
  Shield, 
  TrendingUp, 
  Wrench, 
  Dna, 
  Layers, 
  Palette, 
  Compass, 
  ArrowRight, 
  CheckCircle2, 
  GraduationCap, 
  Search 
} from 'lucide-react';
import { CATEGORIES_LIST, BRANCH_DOMAINS, MOCK_INTERNSHIPS } from '../data/mockData';
import { MainCategory } from '../types';

export const BentoGrid: React.FC = () => {
  const { setActiveModal, setSelectedCategoryId, navigateToProgram } = useUser();
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'BarChart3': return <BarChart3 className="w-5 h-5 text-blue-500" />;
      case 'Cloud': return <Cloud className="w-5 h-5 text-cyan-500" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-purple-500" />;
      case 'Shield': return <Shield className="w-5 h-5 text-red-500" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-emerald-500" />;
      case 'Wrench': return <Wrench className="w-5 h-5 text-amber-500" />;
      case 'Dna': return <Dna className="w-5 h-5 text-pink-500" />;
      case 'Layers': return <Layers className="w-5 h-5 text-indigo-500" />;
      case 'Palette': return <Palette className="w-5 h-5 text-violet-500" />;
      case 'Compass': return <Compass className="w-5 h-5 text-teal-500" />;
      default: return <GraduationCap className="w-5 h-5 text-blue-500" />;
    }
  };

  const handleDomainCardClick = (categoryName: string) => {
    setSelectedCategoryId(categoryName);
    setActiveModal('internships');
  };

  const handleBranchClick = (branchName: string) => {
    setSelectedCategoryId(branchName);
    setActiveModal('internships');
  };

  // Featured courses to show in prominent preview
  const displayCourses = MOCK_INTERNSHIPS.filter(c => {
    if (activeCategoryFilter === 'All') return c.featured || c.applicantsCount > 900;
    return c.category === activeCategoryFilter;
  }).slice(0, 8);

  return (
    <section id="programs" className="py-24 bg-neutral-100/70 dark:bg-neutral-900/40 border-y border-neutral-200/80 dark:border-neutral-800/80 transition-colors duration-300">
      <div className="max-w-[1240px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-3">
            <span>Industry-Standard Course Catalog</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-950 dark:text-white tracking-tight mb-3">
            Training & Internship Programs by Domain
          </h2>
          <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 font-normal max-w-2xl mx-auto">
            Comprehensive skill accelerators covering 60+ technology and engineering domains with guaranteed live capstone internships and verified certifications.
          </p>
        </div>

        {/* 10 Major Domain Categories Grid */}
        <div className="mb-12">
          <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3 text-center md:text-left">
            Explore All 10 Major Technology & Engineering Tracks
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {CATEGORIES_LIST.map((cat) => {
              const isActive = activeCategoryFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategoryFilter(cat.id);
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between group ${
                    isActive
                      ? 'border-blue-500 bg-white dark:bg-neutral-800/90 shadow-md ring-2 ring-blue-500/30'
                      : 'border-neutral-200/80 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/60 hover:border-blue-400 dark:hover:border-blue-500/50 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 group-hover:scale-105 transition-transform">
                      {getCategoryIcon(cat.icon)}
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                      {cat.count} courses
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                      {cat.name}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Branch / Discipline Coverage Showcase ("Domains We Cover") */}
        <div className="mb-12 p-6 rounded-3xl bg-white dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-800 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4 pb-3 border-b border-neutral-100 dark:border-neutral-800">
            <div>
              <h3 className="text-base font-extrabold text-neutral-900 dark:text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-600" />
                <span>Academic Disciplines & Branches We Cover</span>
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Curriculums aligned to college semester requirements with verified internship credits
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedCategoryId(null);
                setActiveModal('internships');
              }}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline self-start md:self-auto"
            >
              <span>View All 60+ Programs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {BRANCH_DOMAINS.map((branch) => (
              <div
                key={branch.name}
                onClick={() => handleBranchClick(branch.name)}
                className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800/80 hover:border-blue-500 dark:hover:border-blue-500 bg-neutral-50/50 dark:bg-neutral-800/30 cursor-pointer transition-all hover:shadow-sm group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {branch.name}
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    {branch.count} Tracks
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2">
                  {branch.description}
                </p>
                <div className="mt-2 text-[10px] font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                  <span>Explore Branch Programs</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Program Cards */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
              {activeCategoryFilter === 'All' ? 'Popular Featured Programs' : `${activeCategoryFilter} Programs`}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              4 Weeks Guided Training + 2 Months Live Capstone Project
            </p>
          </div>
          {activeCategoryFilter !== 'All' && (
            <button
              onClick={() => setActiveCategoryFilter('All')}
              className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Reset to All
            </button>
          )}
        </div>

        {/* Domain Grid - NO remote/hybrid/onsite options, ONLY different domains! */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayCourses.map((course) => (
            <motion.div
              key={course.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              onClick={() => navigateToProgram(course.id)}
              className="group cursor-pointer rounded-2xl bg-white dark:bg-neutral-900/90 border border-neutral-200/80 dark:border-neutral-800 p-5 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-blue-500/50 transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                    {course.category}
                  </span>
                  <span className="text-[10px] font-medium text-neutral-400">
                    {course.duration.split(' ')[0]} {course.duration.split(' ')[1]}
                  </span>
                </div>

                <h3 className="text-base font-bold text-neutral-950 dark:text-white mb-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                  {course.title}
                </h3>

                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4 line-clamp-2">
                  {course.description}
                </p>

                <div className="mb-4 p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-100 dark:border-neutral-800">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">Live Capstone:</span>
                  <div className="flex items-start gap-1.5 text-xs text-neutral-700 dark:text-neutral-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="line-clamp-2 text-[11px] leading-tight font-medium">
                      {course.liveProjects[0]?.title || 'Industry Capstone Project'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {course.toolsCovered.slice(0, 4).map((tech) => (
                    <span key={tech} className="text-[10px] px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                      {tech}
                    </span>
                  ))}
                  {course.toolsCovered.length > 4 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-400">
                      +{course.toolsCovered.length - 4}
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-neutral-400">
                  {course.stipend.includes('Stipend') ? 'Verified Internship' : 'ISO Accredited'}
                </span>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  View Syllabus <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Bar */}
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              setSelectedCategoryId(null);
              setActiveModal('internships');
            }}
            className="px-8 py-3.5 rounded-full bg-blue-600 text-white hover:bg-blue-500 font-bold text-sm transition-all shadow-md inline-flex items-center gap-2"
          >
            <span>Browse Complete 60+ Programs Directory</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
