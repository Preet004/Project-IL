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
  Code2
} from 'lucide-react';
import { CATEGORIES_LIST, BRANCH_DOMAINS, MOCK_INTERNSHIPS } from '../data/mockData';

export const BentoGrid: React.FC = () => {
  const { setActiveModal, setSelectedCategoryId, navigateToProgram, navigateToView } = useUser();
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'BarChart3': return <BarChart3 className="w-5 h-5 text-emerald-500" />;
      case 'Cloud': return <Cloud className="w-5 h-5 text-sky-500" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-violet-500" />;
      case 'Shield': return <Shield className="w-5 h-5 text-rose-500" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-emerald-500" />;
      case 'Wrench': return <Wrench className="w-5 h-5 text-amber-500" />;
      case 'Dna': return <Dna className="w-5 h-5 text-pink-500" />;
      case 'Layers': return <Layers className="w-5 h-5 text-indigo-500" />;
      case 'Palette': return <Palette className="w-5 h-5 text-purple-500" />;
      case 'Compass': return <Compass className="w-5 h-5 text-teal-500" />;
      default: return <GraduationCap className="w-5 h-5 text-emerald-500" />;
    }
  };

  const handleBranchClick = (branchName: string) => {
    setSelectedCategoryId(branchName);
    navigateToView('programs');
  };

  const displayCourses = MOCK_INTERNSHIPS.filter(c => {
    if (activeCategoryFilter === 'All') return c.featured || c.applicantsCount > 900;
    return c.category === activeCategoryFilter;
  }).slice(0, 8);

  return (
    <section id="programs" className="relative py-28 bg-[#f8fafc] dark:bg-[#070b12] border-y border-neutral-200/80 dark:border-neutral-800/80 transition-colors duration-300">
      
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-40" />

      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div 
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-3 border"
            style={{
              backgroundColor: 'rgba(var(--primary-rgb), 0.1)',
              borderColor: 'rgba(var(--primary-rgb), 0.3)',
              color: 'var(--primary)'
            }}
          >
            <Code2 className="w-4 h-4" />
            <span>Industrial Curriculum & Live Production Sprints</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-neutral-950 dark:text-white tracking-tight mb-4">
            Curated High-Impact Career Tracks
          </h2>
          <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 font-normal max-w-2xl mx-auto leading-relaxed">
            Every track combines deep architectural training with a live industry capstone project and verifiable ISO 9001:2015 certification.
          </p>
        </div>

        {/* 10 Major Domain Categories Grid */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              Select Technology Track
            </p>
            {activeCategoryFilter !== 'All' && (
              <button
                onClick={() => setActiveCategoryFilter('All')}
                className="text-xs font-bold hover:underline cursor-pointer"
                style={{ color: 'var(--primary)' }}
              >
                Show All Tracks
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
            {CATEGORIES_LIST.map((cat) => {
              const isActive = activeCategoryFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryFilter(cat.id)}
                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between group cursor-pointer relative overflow-hidden ${
                    isActive
                      ? 'bg-white dark:bg-neutral-800/95 shadow-lg ring-2'
                      : 'border-neutral-200/90 dark:border-neutral-800/90 bg-white/90 dark:bg-neutral-900/70 hover:shadow-md'
                  }`}
                  style={{
                    borderColor: isActive ? 'var(--primary)' : undefined,
                    boxShadow: isActive ? '0 10px 25px -5px rgba(var(--primary-rgb), 0.2)' : undefined
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 group-hover:scale-110 transition-transform">
                      {getCategoryIcon(cat.icon)}
                    </div>
                    <span className="font-mono text-[11px] font-semibold text-neutral-400 dark:text-neutral-500">
                      {cat.count} tracks
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-neutral-900 dark:text-white transition-colors leading-tight">
                      {cat.name}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Program Cards */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
              {activeCategoryFilter === 'All' ? 'Featured Production Programs' : `${activeCategoryFilter} Programs`}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Dual-Phase: 4-Week Live Deep-Dive · 2-Month Capstone Deployment · ISO Certified
            </p>
          </div>
          <button
            onClick={() => navigateToView('programs')}
            className="text-xs font-bold flex items-center gap-1 cursor-pointer hover:underline"
            style={{ color: 'var(--primary)' }}
          >
            <span>Explore All 79 Programs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Program Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {displayCourses.map((course) => (
            <motion.div
              key={course.id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              onClick={() => navigateToProgram(course.id)}
              className="group cursor-pointer rounded-3xl bg-white dark:bg-neutral-900/90 border border-neutral-200/90 dark:border-neutral-800 p-6 flex flex-col justify-between shadow-sm hover:shadow-2xl transition-all relative overflow-hidden"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '';
              }}
            >
              {/* Subtle Card Header */}
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-3">
                  <span className="font-semibold" style={{ color: 'var(--primary)' }}>{course.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono">{course.duration}</span>
                </div>

                <h3 className="text-base font-bold text-neutral-950 dark:text-white mb-2 transition-colors leading-snug">
                  {course.title}
                </h3>

                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2 leading-relaxed">
                  {course.description}
                </p>

                {/* Capstone Deliverable Callout */}
                <div className="mb-4 p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/70 dark:border-neutral-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                    Live Industry Capstone:
                  </span>
                  <div className="flex items-start gap-1.5 text-xs text-neutral-800 dark:text-neutral-200 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="line-clamp-2 text-[11px] leading-tight">
                      {course.liveProjects[0]?.title || 'Production System Deployment'}
                    </span>
                  </div>
                </div>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {course.toolsCovered.slice(0, 4).map((tech) => (
                    <span key={tech} className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                      {tech}
                    </span>
                  ))}
                  {course.toolsCovered.length > 4 && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-400">
                      +{course.toolsCovered.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs">
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-mono">
                  ISO 9001:2015
                </span>
                <span className="font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform" style={{ color: 'var(--primary)' }}>
                  View Syllabus & ROI <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Academic Disciplines & Branches We Cover */}
        <div className="p-8 rounded-3xl bg-white dark:bg-neutral-900/90 border border-neutral-200/90 dark:border-neutral-800 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6 pb-4 border-b border-neutral-100 dark:border-neutral-800">
            <div>
              <h3 className="text-lg font-extrabold text-neutral-900 dark:text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                <span>Academic Branches & Engineering Disciplines</span>
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Curriculums mapped to university semester credits and industry hiring bars
              </p>
            </div>
            <button
              onClick={() => navigateToView('programs')}
              className="text-xs font-bold flex items-center gap-1 hover:underline self-start md:self-auto cursor-pointer"
              style={{ color: 'var(--primary)' }}
            >
              <span>View All Branches</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {BRANCH_DOMAINS.map((branch) => (
              <div
                key={branch.name}
                onClick={() => handleBranchClick(branch.name)}
                className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 cursor-pointer transition-all hover:shadow-sm group"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '';
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-white transition-colors">
                    {branch.name}
                  </h4>
                  <span 
                    className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: 'rgba(var(--primary-rgb), 0.1)',
                      color: 'var(--primary)'
                    }}
                  >
                    {branch.count} Tracks
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2">
                  {branch.description}
                </p>
                <div className="mt-3 text-[11px] font-semibold flex items-center gap-1" style={{ color: 'var(--primary)' }}>
                  <span>Explore Branch Tracks</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
