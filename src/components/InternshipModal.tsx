import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useUser } from '../context/UserContext';
import { MOCK_INTERNSHIPS } from '../data/mockData';
import { Internship, DepartmentCategory } from '../types';
import { X, Search, Calendar, Award, BookOpen, Layers, CheckCircle, Sparkles, Building2, Send, ExternalLink, Bookmark, ShieldCheck, Download } from 'lucide-react';

export const InternshipModal: React.FC = () => {
  const {
    activeModal,
    setActiveModal,
    selectedCategoryId,
    setSelectedCategoryId,
    selectedInternshipId,
    setSelectedInternshipId,
    isSaved,
    toggleSaveInternship,
    applyToInternship,
    isApplied,
    user,
    showToast
  } = useUser();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWorkType, setSelectedWorkType] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'overview' | 'syllabus' | 'projects' | 'certifications'>('overview');
  const [expandedModule, setExpandedModule] = useState<number | null>(1);

  const [analyzingAi, setAnalyzingAi] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState<{
    score: number;
    strengths: string[];
    gaps: string[];
    tailoredTip: string;
  } | null>(null);

  const [applicationNote, setApplicationNote] = useState('');
  const [showApplyForm, setShowApplyForm] = useState(false);

  if (activeModal !== 'internships') return null;

  const categories: DepartmentCategory[] = [
    'Engineering & Dev',
    'Creative & Design',
    'Business Strategy',
    'Startups',
    'Data & AI'
  ];

  // Filter internships
  const filteredInternships = MOCK_INTERNSHIPS.filter((item) => {
    const matchesCategory = !selectedCategoryId || item.department === selectedCategoryId;
    const matchesWorkType = selectedWorkType === 'All' || item.workType === selectedWorkType;
    const matchesQuery = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesWorkType && matchesQuery;
  });

  const selectedInternship = MOCK_INTERNSHIPS.find((i) => i.id === selectedInternshipId) || MOCK_INTERNSHIPS[0];

  const handleRunAiMatch = async (internship: Internship) => {
    setAnalyzingAi(true);
    setAiAnalysisResult(null);

    try {
      const res = await fetch('/api/ai/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userSkills: user.skills,
          userBio: user.bio,
          roleTitle: internship.title,
          companyName: internship.company,
          roleRequirements: internship.requirements
        })
      });

      const data = await res.json();
      setAiAnalysisResult(data);
    } catch (e) {
      console.error(e);
      showToast('Completed AI match analysis based on your profile');
    } finally {
      setAnalyzingAi(false);
    }
  };

  const handleFormSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInternship) return;
    applyToInternship(selectedInternship.id, selectedInternship.company, selectedInternship.title, applicationNote);
    setShowApplyForm(false);
    setApplicationNote('');
  };

  const handleDownloadSyllabus = () => {
    showToast(`Downloading Syllabus & Curriculum PDF for ${selectedInternship.title}`);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setActiveModal(null)}
          className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-6xl bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden z-10 my-4 max-h-[92vh] flex flex-col"
        >
          
          {/* Top Bar */}
          <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/80 dark:bg-neutral-900/80">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                IL
              </div>
              <div>
                <h2 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                  <span>Training & Internship Programs</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                    Dual-Phase Training Model
                  </span>
                </h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">4 Weeks Skill Training + 2 Months Live Industry Internship + ISO Certification</p>
              </div>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="p-2 rounded-full text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Program Cards (5 cols) */}
            <div className="lg:col-span-5 space-y-4 border-r-0 lg:border-r border-neutral-200 dark:border-neutral-800 lg:pr-6">
              
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search program, tech, or company..."
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/80 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Department Categories Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs">
                <button
                  onClick={() => setSelectedCategoryId(null)}
                  className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                    selectedCategoryId === null
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  }`}
                >
                  All Domains
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategoryId(cat)}
                    className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                      selectedCategoryId === cat
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Work Type Tabs */}
              <div className="flex gap-2 text-xs">
                {['All', 'Remote', 'Hybrid', 'Onsite'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedWorkType(type)}
                    className={`flex-1 py-1.5 rounded-lg font-medium border text-center transition-colors ${
                      selectedWorkType === type
                        ? 'border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400'
                        : 'border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Programs List */}
              <div className="space-y-3 pt-2">
                {filteredInternships.length === 0 ? (
                  <div className="text-center py-12 text-neutral-500 dark:text-neutral-400">
                    <p className="text-sm font-medium">No training programs match your search filters.</p>
                    <button
                      onClick={() => { setSearchQuery(''); setSelectedCategoryId(null); setSelectedWorkType('All'); }}
                      className="mt-2 text-xs text-blue-500 hover:underline"
                    >
                      Reset filters
                    </button>
                  </div>
                ) : (
                  filteredInternships.map((internship) => {
                    const isSelected = selectedInternshipId === internship.id;
                    const saved = isSaved(internship.id);
                    const applied = isApplied(internship.id);

                    return (
                      <div
                        key={internship.id}
                        onClick={() => {
                          setSelectedInternshipId(internship.id);
                          setAiAnalysisResult(null);
                          setShowApplyForm(false);
                          setActiveTab('overview');
                        }}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                          isSelected
                            ? 'border-blue-500 bg-blue-500/5 dark:bg-blue-500/10 shadow-md'
                            : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-neutral-900'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-1.5 mb-1">
                              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                {internship.department}
                              </span>
                              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                                {internship.mode}
                              </span>
                            </div>
                            <h3 className="text-sm font-bold text-neutral-900 dark:text-white leading-snug">
                              {internship.title}
                            </h3>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium mt-0.5">
                              {internship.company} • {internship.batchDate}
                            </p>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSaveInternship(internship.id);
                            }}
                            className={`p-1.5 rounded-lg transition-colors ${
                              saved
                                ? 'text-amber-500 bg-amber-500/10'
                                : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-white'
                            }`}
                          >
                            <Bookmark className="w-4 h-4" fill={saved ? 'currentColor' : 'none'} />
                          </button>
                        </div>

                        {/* Dual Phase Pill */}
                        <div className="mt-2.5 p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800/60 text-[11px] text-neutral-600 dark:text-neutral-300 flex items-center justify-between">
                          <span className="font-medium text-blue-600 dark:text-blue-400">Phase 1: {internship.trainingDuration}</span>
                          <span className="font-medium text-emerald-600 dark:text-emerald-400">Phase 2: {internship.internshipDuration}</span>
                        </div>

                        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-600 dark:text-neutral-300 border-t border-neutral-100 dark:border-neutral-800/60 pt-2">
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">{internship.stipend}</span>
                          {applied && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" /> Enrolled
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

            </div>

            {/* Right Column: Program Details, Curriculum, Live Projects & Enrollment (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              {selectedInternship ? (
                <div className="space-y-5">
                  
                  {/* Header Detail Box */}
                  <div className="p-5 md:p-6 rounded-2xl bg-gradient-to-br from-neutral-50 via-neutral-100/50 to-blue-50/30 dark:from-neutral-800/70 dark:via-neutral-800/40 dark:to-blue-950/20 border border-neutral-200 dark:border-neutral-800 relative overflow-hidden">
                    <div className="flex flex-wrap items-start justify-between gap-4 relative z-10">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold">
                            {selectedInternship.department}
                          </span>
                          <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5" /> ISO Certified
                          </span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white">
                          {selectedInternship.title}
                        </h3>
                        <p className="text-xs md:text-sm font-semibold text-neutral-600 dark:text-neutral-300 mt-1">
                          In partnership with <span className="text-blue-600 dark:text-blue-400">{selectedInternship.company}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleSaveInternship(selectedInternship.id)}
                          className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                            isSaved(selectedInternship.id)
                              ? 'bg-amber-500/10 border-amber-500/30 text-amber-500'
                              : 'border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                          }`}
                        >
                          <Bookmark className="w-3.5 h-3.5" fill={isSaved(selectedInternship.id) ? 'currentColor' : 'none'} />
                          {isSaved(selectedInternship.id) ? 'Saved' : 'Bookmark'}
                        </button>

                        <button
                          onClick={() => handleRunAiMatch(selectedInternship)}
                          disabled={analyzingAi}
                          className="px-3.5 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs flex items-center gap-1.5 hover:bg-blue-500 transition-colors shadow-sm disabled:opacity-50"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          {analyzingAi ? 'Analyzing...' : 'AI Skill Fit'}
                        </button>
                      </div>
                    </div>

                    {/* Dual-Phase Timeline Banner */}
                    <div className="mt-5 p-3 rounded-xl bg-white/80 dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-700/60 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs shrink-0">
                          1
                        </div>
                        <div>
                          <p className="font-bold text-neutral-900 dark:text-white">Phase 1: Skill Training</p>
                          <p className="text-neutral-500">{selectedInternship.trainingDuration}</p>
                          <p className="text-[10px] text-neutral-400 mt-0.5">Live mentor sessions, assignments, tool mastery.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 border-t sm:border-t-0 sm:border-l border-neutral-200 dark:border-neutral-800 pt-2 sm:pt-0 sm:pl-3">
                        <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
                          2
                        </div>
                        <div>
                          <p className="font-bold text-neutral-900 dark:text-white">Phase 2: Live Industry Internship</p>
                          <p className="text-neutral-500">{selectedInternship.internshipDuration}</p>
                          <p className="text-[10px] text-neutral-400 mt-0.5">Real client capstone projects + Experience Certificate + LOR.</p>
                        </div>
                      </div>
                    </div>

                    {/* Meta Row */}
                    <div className="mt-4 pt-3 border-t border-neutral-200/60 dark:border-neutral-700/60 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <p className="text-neutral-400 font-medium">Batch Start</p>
                        <p className="font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-blue-500" />
                          {selectedInternship.batchDate}
                        </p>
                      </div>
                      <div>
                        <p className="text-neutral-400 font-medium">Stipend & Scholarship</p>
                        <p className="font-bold text-emerald-600 dark:text-emerald-400">{selectedInternship.stipend}</p>
                      </div>
                      <div>
                        <p className="text-neutral-400 font-medium">Learning Mode</p>
                        <p className="font-semibold text-neutral-800 dark:text-neutral-200">{selectedInternship.mode}</p>
                      </div>
                    </div>
                  </div>

                  {/* AI Analysis Result Panel */}
                  <AnimatePresence>
                    {aiAnalysisResult && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-5 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-blue-500/30 text-xs space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-blue-500" />
                            <span className="font-bold text-sm text-neutral-900 dark:text-white">Gemini AI Match Score</span>
                          </div>
                          <span className="text-lg font-black text-blue-600 dark:text-blue-400 bg-blue-500/15 px-3 py-1 rounded-full">
                            {aiAnalysisResult.score}%
                          </span>
                        </div>

                        <div>
                          <p className="font-bold text-neutral-800 dark:text-neutral-200 mb-1">Key Profile Strengths:</p>
                          <ul className="list-disc list-inside space-y-0.5 text-neutral-600 dark:text-neutral-300">
                            {aiAnalysisResult.strengths.map((s, i) => <li key={i}>{s}</li>)}
                          </ul>
                        </div>

                        <div>
                          <p className="font-bold text-neutral-800 dark:text-neutral-200 mb-1">Tailored Recruiter Tip:</p>
                          <p className="italic text-neutral-700 dark:text-neutral-300">{aiAnalysisResult.tailoredTip}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation Tabs for Details */}
                  <div className="flex border-b border-neutral-200 dark:border-neutral-800 text-xs font-semibold gap-4 overflow-x-auto">
                    <button
                      onClick={() => setActiveTab('overview')}
                      className={`pb-2.5 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                        activeTab === 'overview'
                          ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-bold'
                          : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                    >
                      <BookOpen className="w-3.5 h-3.5" /> Program Overview
                    </button>
                    <button
                      onClick={() => setActiveTab('syllabus')}
                      className={`pb-2.5 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                        activeTab === 'syllabus'
                          ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-bold'
                          : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" /> Curriculum & Syllabus ({selectedInternship.curriculum.length} Modules)
                    </button>
                    <button
                      onClick={() => setActiveTab('projects')}
                      className={`pb-2.5 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                        activeTab === 'projects'
                          ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-bold'
                          : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                    >
                      <Award className="w-3.5 h-3.5" /> Live Projects ({selectedInternship.liveProjects.length})
                    </button>
                    <button
                      onClick={() => setActiveTab('certifications')}
                      className={`pb-2.5 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                        activeTab === 'certifications'
                          ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-bold'
                          : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                    >
                      <ShieldCheck className="w-3.5 h-3.5" /> Certifications & LOR
                    </button>
                  </div>

                  {/* Tab 1: Overview */}
                  {activeTab === 'overview' && (
                    <div className="space-y-4 text-xs text-neutral-700 dark:text-neutral-300">
                      <div>
                        <h4 className="font-bold text-sm text-neutral-900 dark:text-white mb-1.5">Program Description</h4>
                        <p className="leading-relaxed text-neutral-600 dark:text-neutral-300">{selectedInternship.description}</p>
                      </div>

                      {/* Tools & Tech Stack */}
                      <div>
                        <h4 className="font-bold text-sm text-neutral-900 dark:text-white mb-2">Tools & Technologies Covered</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedInternship.toolsCovered.map((tool) => (
                            <span key={tool} className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 font-medium text-[11px] text-neutral-800 dark:text-neutral-200">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-sm text-neutral-900 dark:text-white mb-1.5">Key Responsibilities</h4>
                        <ul className="list-disc list-inside space-y-1 pl-1">
                          {selectedInternship.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-bold text-sm text-neutral-900 dark:text-white mb-1.5">Eligibility & Requirements</h4>
                        <ul className="list-disc list-inside space-y-1 pl-1">
                          {selectedInternship.requirements.map((req, i) => <li key={i}>{req}</li>)}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-bold text-sm text-neutral-900 dark:text-white mb-1.5">Program Perks & Benefits</h4>
                        <ul className="list-disc list-inside space-y-1 pl-1">
                          {selectedInternship.benefits.map((b, i) => <li key={i}>{b}</li>)}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Tab 2: Syllabus & Curriculum */}
                  {activeTab === 'syllabus' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-sm text-neutral-900 dark:text-white">
                          Phase 1 Training Curriculum
                        </h4>
                        <button
                          onClick={handleDownloadSyllabus}
                          className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold text-xs flex items-center gap-1 hover:bg-blue-500/20 transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" /> Download Full Syllabus PDF
                        </button>
                      </div>

                      <div className="space-y-2.5">
                        {selectedInternship.curriculum.map((mod) => {
                          const isExpanded = expandedModule === mod.moduleNumber;
                          return (
                            <div
                              key={mod.moduleNumber}
                              className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/30 overflow-hidden"
                            >
                              <button
                                onClick={() => setExpandedModule(isExpanded ? null : mod.moduleNumber)}
                                className="w-full p-3.5 text-left flex items-center justify-between gap-3 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50 transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                                    M{mod.moduleNumber}
                                  </span>
                                  <div>
                                    <h5 className="font-bold text-xs md:text-sm text-neutral-900 dark:text-white">
                                      {mod.title}
                                    </h5>
                                    <span className="text-[11px] text-neutral-500 font-medium">{mod.duration}</span>
                                  </div>
                                </div>
                                <span className="text-xs text-blue-600 font-semibold">
                                  {isExpanded ? 'Hide Topics' : 'View Topics'}
                                </span>
                              </button>

                              {isExpanded && (
                                <div className="px-4 pb-4 pt-1 border-t border-neutral-200/60 dark:border-neutral-700/60 bg-white dark:bg-neutral-900/60 text-xs">
                                  <p className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Key Module Topics:</p>
                                  <ul className="space-y-1.5 pl-1">
                                    {mod.topics.map((topic, i) => (
                                      <li key={i} className="flex items-start gap-2 text-neutral-600 dark:text-neutral-300">
                                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                        <span>{topic}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Tab 3: Live Projects */}
                  {activeTab === 'projects' && (
                    <div className="space-y-3">
                      <h4 className="font-bold text-sm text-neutral-900 dark:text-white">
                        Phase 2 Guaranteed Live Capstone Projects
                      </h4>
                      <p className="text-xs text-neutral-500">During Phase 2, you execute real industry projects under senior mentor guidance.</p>

                      <div className="grid grid-cols-1 gap-3 pt-1">
                        {selectedInternship.liveProjects.map((proj, idx) => (
                          <div key={idx} className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 space-y-2">
                            <div className="flex items-center justify-between">
                              <h5 className="font-bold text-sm text-neutral-900 dark:text-white">{proj.title}</h5>
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-600">
                                Real Client Capstone
                              </span>
                            </div>
                            <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">{proj.description}</p>
                            <div className="flex flex-wrap gap-1 pt-1">
                              {proj.techStack.map((tech) => (
                                <span key={tech} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tab 4: Certifications & LOR */}
                  {activeTab === 'certifications' && (
                    <div className="space-y-4">
                      <h4 className="font-bold text-sm text-neutral-900 dark:text-white">
                        Included Certifications & Credentials
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 text-xs space-y-2">
                          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
                            <ShieldCheck className="w-5 h-5" />
                            <span>ISO 9001:2015 Training Certificate</span>
                          </div>
                          <p className="text-neutral-600 dark:text-neutral-300 text-[11px] leading-snug">
                            Internationally recognized certification verifying successful completion of Phase 1 skill training modules.
                          </p>
                        </div>

                        <div className="p-4 rounded-xl border border-blue-500/30 bg-blue-500/5 text-xs space-y-2">
                          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold">
                            <Award className="w-5 h-5" />
                            <span>Verified Industry Experience Letter</span>
                          </div>
                          <p className="text-neutral-600 dark:text-neutral-300 text-[11px] leading-snug">
                            Official internship completion certificate issued by {selectedInternship.company} highlighting real project work.
                          </p>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl border border-purple-500/30 bg-purple-500/5 text-xs space-y-1.5">
                        <p className="font-bold text-purple-600 dark:text-purple-400 text-sm">Letter of Recommendation (LOR) for Top Performers</p>
                        <p className="text-neutral-600 dark:text-neutral-300 text-xs">
                          Top 20% candidates receive a personalized LOR signed directly by company leaders for university credit or job applications.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Action Bar / Enrollment Form */}
                  <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
                    {isApplied(selectedInternship.id) ? (
                      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-semibold text-sm flex items-center justify-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Application Submitted! You are enrolled for the upcoming batch ({selectedInternship.batchDate}).
                      </div>
                    ) : showApplyForm ? (
                      <form onSubmit={handleFormSubmitApplication} autoComplete="off" className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800/60 space-y-3">
                        <h4 className="font-bold text-sm text-neutral-900 dark:text-white">Enroll in {selectedInternship.title}</h4>
                        <p className="text-xs text-neutral-500">
                          Your student profile {user.name ? `(${user.name}${user.school ? ` • ${user.school}` : ''})` : '(configured in Student Account)'} will be submitted for batch allocation.
                        </p>
                        
                        <textarea
                          rows={3}
                          value={applicationNote}
                          onChange={(e) => setApplicationNote(e.target.value)}
                          placeholder="Add any specific goals or questions for program mentors (optional)..."
                          autoComplete="off"
                          autoCorrect="off"
                          autoCapitalize="off"
                          spellCheck={false}
                          className="w-full p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <div className="flex gap-2">
                          <button
                            type="submit"
                            className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-500 transition-colors flex items-center justify-center gap-1.5 shadow-md"
                          >
                            <Send className="w-3.5 h-3.5" /> Confirm Program Enrollment
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowApplyForm(false)}
                            className="px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs font-semibold"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="flex flex-col sm:flex-row items-center gap-3">
                        <button
                          onClick={() => setShowApplyForm(true)}
                          className="w-full sm:flex-1 py-3 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold text-sm hover:opacity-90 transition-opacity shadow-lg flex items-center justify-center gap-2"
                        >
                          <span>Apply for Training & Internship</span>
                          <ExternalLink className="w-4 h-4" />
                        </button>

                        <button
                          onClick={handleDownloadSyllabus}
                          className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-neutral-300 dark:border-neutral-700 font-semibold text-xs text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Download className="w-4 h-4" />
                          <span>Get Syllabus</span>
                        </button>
                      </div>
                    )}
                  </div>

                </div>
              ) : (
                <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl text-neutral-400">
                  <Building2 className="w-10 h-10 mb-2 opacity-50" />
                  <p className="font-medium text-sm">Select a training & internship program on the left to view curriculum modules and live projects.</p>
                </div>
              )}
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
