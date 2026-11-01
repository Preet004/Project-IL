import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { useUser } from '../context/UserContext';
import { MOCK_INTERNSHIPS, CATEGORIES_LIST, BRANCH_DOMAINS } from '../data/mockData';
import { MainCategory, BranchDomain } from '../types';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Clock, 
  Calendar, 
  ArrowRight, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  GraduationCap, 
  X,
  Layers
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface ProgramsCatalogPageProps {
  initialCategory?: MainCategory | null;
}

export const ProgramsCatalogPage: React.FC<ProgramsCatalogPageProps> = ({ initialCategory }) => {
  const { navigateToProgram, navigateToView } = useUser();
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
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300 pb-28">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-blue-50/60 via-white to-neutral-50 dark:from-neutral-900 dark:via-neutral-900/70 dark:to-neutral-950 border-b border-neutral-200 dark:border-neutral-800 py-12 md:py-16">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Industry Training & Capstone Internship Catalog</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
                Programs & Bootcamps
              </h1>
              <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Explore all <strong>{MOCK_INTERNSHIPS.length} specialized domain tracks</strong>. Each program features 4 weeks of hands-on technical training, a 2-month live industry capstone project, ISO 9001:2015 certification, and self-paced or mentor-led options.
              </p>
            </div>

            {/* Quick WhatsApp Guidance Button */}
            <div className="shrink-0">
              <button
                onClick={handleWhatsAppHelp}
                className="px-4 py-2.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs shadow-md shadow-emerald-500/20 flex items-center gap-2 transition-all cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Need Guidance? Ask on WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-8 relative max-w-2xl">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by domain, technology, or keywords (e.g. Full Stack, AI, Revit, Python, VLSI)..."
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Catalog Section */}
      <div className="max-w-[1240px] mx-auto px-6 pt-10">

        {/* Filter Controls Bar */}
        <div className="space-y-5 mb-8">
          
          {/* Category Filter Tabs */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Filter by Domain Category</span>
              </span>
              <span className="text-xs font-medium text-neutral-500">
                Showing {filteredPrograms.length} of {MOCK_INTERNSHIPS.length} programs
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === 'All'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300'
                }`}
              >
                All Categories ({MOCK_INTERNSHIPS.length})
              </button>

              {CATEGORIES_LIST.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600 text-white shadow-xs font-bold'
                      : 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-blue-400/50'
                  }`}
                >
                  {cat.name} ({cat.count})
                </button>
              ))}
            </div>
          </div>

          {/* Academic Branch / Discipline Filter */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Filter by Academic Discipline / Branch</span>
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedBranch('All')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
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
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
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
              className="px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-colors cursor-pointer"
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
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => navigateToProgram(program.id)}
                  className="rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-blue-500/60 transition-all cursor-pointer group"
                >
                  <div className="space-y-3.5">
                    {/* Header Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60">
                        {program.department}
                      </span>
                      <span className="text-[11px] font-medium text-neutral-400">
                        {program.duration.split(' ')[0]} {program.duration.split(' ')[1]}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-neutral-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                      {program.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2">
                      {program.description}
                    </p>

                    {/* Capstone Preview */}
                    <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800 space-y-1">
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
                            className="text-[10px] px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 font-medium"
                          >
                            {tool}
                          </span>
                        ))}
                        {program.toolsCovered.length > 4 && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-md text-neutral-400">
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
                      <span className="text-sm font-extrabold text-neutral-900 dark:text-white">
                        ₹6,500 <span className="text-[10px] font-normal text-neutral-400">(Self-Paced / Mentor-Led)</span>
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                      <span>View Details</span>
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
