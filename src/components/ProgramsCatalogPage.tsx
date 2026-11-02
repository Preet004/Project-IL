import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { useUser } from '../context/UserContext';
import { MOCK_INTERNSHIPS, CATEGORIES_LIST, BRANCH_DOMAINS } from '../data/mockData';
import { MainCategory } from '../types';
import { 
  Search, 
  Layers, 
  GraduationCap, 
  X, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  ShieldCheck 
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { brandAssets } from '../assets/brandAssets';

interface ProgramsCatalogPageProps {
  initialCategory?: MainCategory | null;
}

export const ProgramsCatalogPage: React.FC<ProgramsCatalogPageProps> = ({ initialCategory }) => {
  const { navigateToProgram } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');
  const [selectedBranch, setSelectedBranch] = useState<string>('All');

  // Filtered program list based on search, category, and discipline branch
  const filteredPrograms = useMemo(() => {
    return MOCK_INTERNSHIPS.filter((program) => {
      // Category filter
      if (selectedCategory !== 'All' && program.category !== selectedCategory) {
        return false;
      }

      // Branch filter
      if (selectedBranch !== 'All' && program.branch !== selectedBranch) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchTitle = program.title.toLowerCase().includes(query);
        const matchDept = program.department.toLowerCase().includes(query);
        const matchDesc = program.description.toLowerCase().includes(query);
        const matchTags = program.tags.some(tag => tag.toLowerCase().includes(query));
        const matchTools = program.toolsCovered.some(tool => tool.toLowerCase().includes(query));
        return matchTitle || matchDept || matchDesc || matchTags || matchTools;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedBranch]);

  const handleWhatsAppHelp = () => {
    const text = encodeURIComponent(
      'Hi InternsLoom, I am looking at your 79 training & internship programs and need help selecting the right domain.'
    );
    window.open(`https://wa.me/917019680860?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] dark:bg-[#070b12] text-neutral-900 dark:text-neutral-100 transition-colors duration-300 pb-28">
      
      {/* Header Banner with Cyber Aurora */}
      <div className="relative overflow-hidden bg-gradient-to-b from-cyan-50/50 via-white to-[#fafbfc] dark:from-[#0a0f1d] dark:via-[#070b12] dark:to-[#070b12] border-b border-neutral-200/80 dark:border-neutral-800/80 py-16">
        <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 cyber-grid pointer-events-none opacity-40" />

        <div className="max-w-[1240px] mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-neutral-800/90 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-bold shadow-xs">
                <img src={brandAssets.emblem} alt="InternsLoom Emblem" className="h-4 w-auto object-contain" />
                <span>InternsLoom Official Training & Capstone Catalog</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
                Programs & Bootcamps
              </h1>
              <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed text-balance">
                Explore all <strong>{MOCK_INTERNSHIPS.length} technical and engineering tracks</strong>. Each program features 4 weeks of hands-on live training, a 2-month live production capstone internship, ISO 9001:2015 certification, and verified recruiter placement assistance.
              </p>
            </div>

            {/* Quick WhatsApp Guidance Button */}
            <div className="shrink-0">
              <button
                onClick={handleWhatsAppHelp}
                className="px-5 py-3 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs shadow-md shadow-emerald-500/20 flex items-center gap-2 transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Ask Program Advisor on WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Search Bar with Cyber Glow */}
          <div className="mt-8 relative max-w-2xl">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by domain, technology, or keywords (e.g. Full Stack, AI, Revit, Python, VLSI)..."
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Catalog Section */}
      <div className="max-w-[1240px] mx-auto px-6 pt-12">

        {/* Filter Controls Bar */}
        <div className="space-y-6 mb-10">
          
          {/* Category Filter Tabs */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-500" />
                <span>Filter by Domain Track</span>
              </span>
              <span className="text-xs font-mono text-neutral-500">
                Showing {filteredPrograms.length} of {MOCK_INTERNSHIPS.length} programs
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === 'All'
                    ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20'
                    : 'bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-cyan-400/50'
                }`}
              >
                All Categories ({MOCK_INTERNSHIPS.length})
              </button>

              {CATEGORIES_LIST.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20 font-bold'
                      : 'bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-cyan-400/50'
                  }`}
                >
                  {cat.name} ({cat.count})
                </button>
              ))}
            </div>
          </div>

          {/* Academic Branch / Discipline Filter */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-2 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-500" />
              <span>Filter by Academic Discipline / Branch</span>
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedBranch('All')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  selectedBranch === 'All'
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold'
                    : 'bg-neutral-100 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200'
                }`}
              >
                All Branches
              </button>
              {BRANCH_DOMAINS.map((branch) => (
                <button
                  key={branch.name}
                  onClick={() => setSelectedBranch(branch.name)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    selectedBranch === branch.name
                      ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold'
                      : 'bg-neutral-100 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200'
                  }`}
                >
                  {branch.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Grid */}
        {filteredPrograms.length === 0 ? (
          <div className="py-20 text-center bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 p-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto text-neutral-400">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
              No programs found matching "{searchQuery}"
            </h3>
            <p className="text-xs text-neutral-500 max-w-md mx-auto">
              Try adjusting your search terms or reset the filters to browse our full list of 79 domain programs.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedBranch('All');
              }}
              className="px-5 py-2.5 rounded-xl bg-cyan-600 text-white text-xs font-bold hover:bg-cyan-500 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((program) => {
              return (
                <motion.div
                  key={program.id}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => navigateToProgram(program.id)}
                  className="rounded-3xl bg-white dark:bg-neutral-900/90 border border-neutral-200/90 dark:border-neutral-800 p-6 flex flex-col justify-between shadow-sm hover:shadow-2xl hover:border-cyan-500/60 transition-all cursor-pointer group relative overflow-hidden"
                >
                  <div className="space-y-3.5">
                    {/* Header Badges */}
                    <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                      <span className="font-semibold text-cyan-600 dark:text-cyan-400">{program.department}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono">{program.duration}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-neutral-950 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-snug">
                      {program.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2">
                      {program.description}
                    </p>

                    {/* Capstone Preview */}
                    <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-100 dark:border-neutral-800 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                        Live Industry Project:
                      </span>
                      <div className="flex items-start gap-1.5 text-xs text-neutral-800 dark:text-neutral-200 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                        <span className="line-clamp-1">
                          {program.liveProjects[0]?.title || 'End-to-End Enterprise Project'}
                        </span>
                      </div>
                    </div>

                    {/* Tools Tags */}
                    {program.toolsCovered && program.toolsCovered.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {program.toolsCovered.slice(0, 4).map((tool) => (
                          <span
                            key={tool}
                            className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 font-medium"
                          >
                            {tool}
                          </span>
                        ))}
                        {program.toolsCovered.length > 4 && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-lg text-neutral-400">
                            +{program.toolsCovered.length - 4} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-5 mt-5 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-neutral-400 block">Tuition Starts At</span>
                      <span className="text-sm font-extrabold text-neutral-900 dark:text-white font-mono">
                        ₹6,500 <span className="text-[10px] font-normal text-neutral-400 font-sans">(Self-Paced / Mentor-Led)</span>
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 group-hover:translate-x-1 transition-transform">
                      <span>View Syllabus & ROI</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
