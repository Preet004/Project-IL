import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useUser } from '../context/UserContext';
import { MOCK_INTERNSHIPS, CATEGORIES_LIST, BRANCH_DOMAINS } from '../data/mockData';
import { Internship, MainCategory } from '../types';
import { X, Search, Calendar, Award, BookOpen, Layers, CheckCircle, Bookmark, ShieldCheck, Download, Clock, Check, ChevronRight } from 'lucide-react';

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
    navigateToProgram,
    showToast
  } = useUser();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'syllabus' | 'projects' | 'certifications'>('overview');
  const [expandedModule, setExpandedModule] = useState<number | null>(1);
  const [applicationNote, setApplicationNote] = useState('');
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantCollege, setApplicantCollege] = useState('');
  const [showApplyForm, setShowApplyForm] = useState(false);

  if (activeModal !== 'internships') return null;

  // Filter internships by category/domain and search query only - NO remote/hybrid/onsite options!
  const filteredInternships = MOCK_INTERNSHIPS.filter((item) => {
    const matchesCategory = !selectedCategoryId || 
      item.category === selectedCategoryId || 
      item.department.toLowerCase() === selectedCategoryId.toLowerCase() ||
      item.branch === selectedCategoryId;
    
    const matchesQuery = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.branch && item.branch.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.toolsCovered.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesQuery;
  });

  const selectedInternship = MOCK_INTERNSHIPS.find((i) => i.id === selectedInternshipId) || filteredInternships[0] || MOCK_INTERNSHIPS[0];

  const handleFormSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInternship) return;
    applyToInternship(selectedInternship.id, selectedInternship.company, selectedInternship.title, applicationNote);
    setShowApplyForm(false);
    setApplicationNote('');
    setApplicantName('');
    setApplicantEmail('');
    setApplicantPhone('');
    setApplicantCollege('');
    showToast(`Application successfully submitted for ${selectedInternship.title}!`);
  };

  const handleDownloadSyllabus = () => {
    showToast(`Curriculum and syllabus for ${selectedInternship.title} downloaded successfully.`);
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
          className="relative w-full max-w-7xl bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden z-10 my-4 max-h-[92vh] flex flex-col"
        >
          {/* Top Bar */}
          <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/80 dark:bg-neutral-900/80">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white dark:bg-neutral-800 p-1 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center shadow-xs shrink-0">
                <img
                  src="/assets/internsloom_emblem.png"
                  alt="InternsLoom Emblem"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <h2 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                  <span>Training Programs & Bootcamps</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                    ISO 9001:2015 Certified
                  </span>
                </h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Comprehensive Skill Training + Guaranteed Live Capstone Project Internship + Verified LOR
                </p>
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
            
            {/* Left Column: Domain Filter & Programs List (5 cols) */}
            <div className="lg:col-span-5 space-y-4 border-r-0 lg:border-r border-neutral-200 dark:border-neutral-800 lg:pr-6 flex flex-col max-h-[78vh]">
              
              {/* Search Bar */}
              <div className="relative shrink-0">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search 60+ programs, tools, or domains..."
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/80 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Department Domains Filter (Only Domains - strictly NO remote/hybrid/onsite!) */}
              <div className="shrink-0 space-y-1.5">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Domain Category</p>
                  <span className="text-[11px] font-medium text-blue-600 dark:text-blue-400">{filteredInternships.length} Available</span>
                </div>
                
                {/* Horizontal Category Scroll */}
                <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
                  <button
                    onClick={() => setSelectedCategoryId(null)}
                    className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all font-semibold ${
                      selectedCategoryId === null
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                    }`}
                  >
                    All ({MOCK_INTERNSHIPS.length})
                  </button>
                  {CATEGORIES_LIST.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategoryId(cat.id)}
                      className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all font-semibold ${
                        selectedCategoryId === cat.id
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Programs List */}
              <div className="space-y-2.5 overflow-y-auto flex-1 pr-1">
                {filteredInternships.length === 0 ? (
                  <div className="text-center py-12 text-neutral-500 dark:text-neutral-400">
                    <p className="text-sm font-medium">No training programs match your selection.</p>
                    <button
                      onClick={() => { setSearchQuery(''); setSelectedCategoryId(null); }}
                      className="mt-2 text-xs text-blue-500 hover:underline"
                    >
                      Reset domain filters
                    </button>
                  </div>
                ) : (
                  filteredInternships.map((internship) => {
                    const isSelected = selectedInternship?.id === internship.id;
                    const saved = isSaved(internship.id);
                    const applied = isApplied(internship.id);

                    return (
                      <div
                        key={internship.id}
                        onClick={() => setSelectedInternshipId(internship.id)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 shadow-md ring-1 ring-blue-500/50'
                            : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-neutral-900/90'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                            {internship.department}
                          </span>
                          
                          <div className="flex items-center gap-1.5">
                            {applied && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                                Applied
                              </span>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSaveInternship(internship.id);
                              }}
                              className="text-neutral-400 hover:text-blue-500 transition-colors p-1"
                              title={saved ? 'Remove Bookmark' : 'Save Program'}
                            >
                              <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-blue-500 text-blue-500' : ''}`} />
                            </button>
                          </div>
                        </div>

                        <h4 className="text-xs font-bold text-neutral-900 dark:text-white mb-1 leading-snug">
                          {internship.title}
                        </h4>

                        <div className="flex items-center gap-3 text-[11px] text-neutral-500 dark:text-neutral-400 my-1.5">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-neutral-400" />
                            {internship.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Award className="w-3 h-3 text-amber-500" />
                            ISO Certified
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {internship.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

            </div>

            {/* Right Column: Detailed Program Overview (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between overflow-y-auto max-h-[78vh] pr-1">
              {selectedInternship && (
                <div className="space-y-6">
                  
                  {/* Header Title & Actions */}
                  <div className="border-b border-neutral-200 dark:border-neutral-800 pb-5">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                          {selectedInternship.department}
                        </span>
                        {selectedInternship.branch && (
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                            {selectedInternship.branch}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {selectedInternship.batchDate}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                      <h3 className="text-xl md:text-2xl font-extrabold text-neutral-900 dark:text-white leading-tight">
                        {selectedInternship.title}
                      </h3>
                      <button
                        type="button"
                        onClick={() => navigateToProgram(selectedInternship.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shrink-0 shadow-sm flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                      >
                        <span>Open Program Details Page</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      <span>4-Week Skill Training + 2-Month Live Industry Capstone + ISO 9001:2015 Certification</span>
                    </p>

                    {/* Navigation Tabs */}
                    <div className="flex border-b border-neutral-200 dark:border-neutral-800 mt-5 text-xs font-semibold overflow-x-auto scrollbar-none">
                      {[
                        { id: 'overview', label: 'Overview & Highlights', icon: BookOpen },
                        { id: 'syllabus', label: 'Curriculum Syllabus', icon: Layers },
                        { id: 'projects', label: 'Live Industry Capstone', icon: Award },
                        { id: 'certifications', label: 'Certifications & LOR', icon: CheckCircle },
                      ].map((tab) => {
                        const Icon = tab.icon;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center gap-1.5 pb-2.5 px-3 border-b-2 transition-all whitespace-nowrap ${
                              activeTab === tab.id
                                ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-bold'
                                : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                            <span>{tab.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tab 1: Overview */}
                  {activeTab === 'overview' && (
                    <div className="space-y-5 text-sm">
                      <div>
                        <h4 className="font-bold text-neutral-900 dark:text-white mb-1.5 text-xs uppercase tracking-wider text-neutral-400">
                          Program Summary
                        </h4>
                        <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-sm">
                          {selectedInternship.description}
                        </p>
                      </div>

                      {/* Mentorship Option */}
                      <div className="p-3.5 rounded-2xl bg-orange-500/10 dark:bg-orange-500/15 border border-orange-500/20 flex items-center justify-between gap-3">
                        <p className="text-xs md:text-sm font-medium text-neutral-800 dark:text-neutral-200">
                          Accelerate your professional growth with our structured curriculum — to complement your program with personalized, one-on-one industry mentorship,{' '}
                          <button
                            type="button"
                            onClick={() => setActiveModal('mentors')}
                            className="font-bold text-orange-600 dark:text-orange-400 underline decoration-orange-500 underline-offset-4 hover:text-orange-700 dark:hover:text-orange-300 transition-colors cursor-pointer"
                          >
                            click here ↗
                          </button>
                          .
                        </p>
                        <button
                          type="button"
                          onClick={() => setActiveModal('mentors')}
                          className="px-3 py-1.5 rounded-xl bg-[#f26b1d] hover:bg-[#e05d12] text-white text-xs font-bold shrink-0 shadow-xs cursor-pointer"
                        >
                          View Plans
                        </button>
                      </div>

                      {/* Dual Phase Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800">
                        <div className="space-y-1">
                          <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase">Phase 1: Foundation Training</span>
                          <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">{selectedInternship.trainingDuration}</p>
                          <p className="text-[11px] text-neutral-500">Live interactive lectures, architecture deep-dives & doubt clearing.</p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">Phase 2: Live Industry Internship</span>
                          <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">{selectedInternship.internshipDuration}</p>
                          <p className="text-[11px] text-neutral-500">Real client capstone project, agile sprint reviews & mentor feedback.</p>
                        </div>
                      </div>

                      {/* Key Tools */}
                      <div>
                        <h4 className="font-bold text-neutral-900 dark:text-white mb-2 text-xs uppercase tracking-wider text-neutral-400">
                          Tools & Technologies Covered
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedInternship.toolsCovered.map((tool) => (
                            <span key={tool} className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-xs font-medium text-neutral-700 dark:text-neutral-300 border border-neutral-200/50 dark:border-neutral-700/50">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Requirements & Benefits */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-bold text-neutral-900 dark:text-white mb-2 text-xs uppercase tracking-wider text-neutral-400">
                            Eligibility & Requirements
                          </h4>
                          <ul className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-300">
                            {selectedInternship.requirements.map((req, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <Check className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-bold text-neutral-900 dark:text-white mb-2 text-xs uppercase tracking-wider text-neutral-400">
                            Key Career Benefits
                          </h4>
                          <ul className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-300">
                            {selectedInternship.benefits.map((ben, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                <span>{ben}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tab 2: Syllabus */}
                  {activeTab === 'syllabus' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          Structured week-by-week curriculum led by experienced industry mentors.
                        </p>
                        <button
                          onClick={handleDownloadSyllabus}
                          className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline"
                        >
                          <Download className="w-3.5 h-3.5" /> Download PDF
                        </button>
                      </div>

                      <div className="space-y-3">
                        {selectedInternship.curriculum.map((module) => {
                          const isExpanded = expandedModule === module.moduleNumber;
                          return (
                            <div
                              key={module.moduleNumber}
                              className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden"
                            >
                              <button
                                onClick={() => setExpandedModule(isExpanded ? null : module.moduleNumber)}
                                className="w-full px-4 py-3 text-left flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-800/40 hover:bg-neutral-100/60 dark:hover:bg-neutral-800/70 transition-colors"
                              >
                                <div>
                                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                                    Module {module.moduleNumber} • {module.duration}
                                  </span>
                                  <h5 className="text-xs font-bold text-neutral-900 dark:text-white mt-0.5">
                                    {module.title}
                                  </h5>
                                </div>
                                <ChevronRight className={`w-4 h-4 text-neutral-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                              </button>

                              {isExpanded && (
                                <div className="p-4 border-t border-neutral-100 dark:border-neutral-800/60 space-y-2 bg-white dark:bg-neutral-900">
                                  <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Topics Explored:</p>
                                  <ul className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-300">
                                    {module.topics.map((top, idx) => (
                                      <li key={idx} className="flex items-start gap-2">
                                        <Check className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" />
                                        <span>{top}</span>
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

                  {/* Tab 3: Projects */}
                  {activeTab === 'projects' && (
                    <div className="space-y-4">
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        In Phase 2, interns complete a production-grade live project evaluated by senior tech leads.
                      </p>

                      <div className="space-y-3">
                        {selectedInternship.liveProjects.map((proj, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 space-y-2"
                          >
                            <div className="flex items-center gap-2">
                              <Award className="w-4 h-4 text-amber-500" />
                              <h5 className="text-xs font-bold text-neutral-900 dark:text-white">
                                {proj.title}
                              </h5>
                            </div>
                            <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                              {proj.description}
                            </p>
                            <div className="flex flex-wrap gap-1 pt-1">
                              {proj.techStack.map((tech) => (
                                <span key={tech} className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tab 4: Certifications */}
                  {activeTab === 'certifications' && (
                    <div className="space-y-4">
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        All credentials include unique QR codes verifiable on our official portal.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedInternship.certifications.map((cert, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 flex items-start gap-3"
                          >
                            <Award className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                            <div>
                              <h5 className="text-xs font-bold text-neutral-900 dark:text-white">
                                {cert}
                              </h5>
                              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                                Verifiable online credential with unique ID
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Bar */}
                  <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-neutral-400 block">Stipend & Scholarship:</span>
                      <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        {selectedInternship.stipend}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleSaveInternship(selectedInternship.id)}
                        className="px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center gap-1.5"
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isSaved(selectedInternship.id) ? 'fill-blue-500 text-blue-500' : ''}`} />
                        <span>{isSaved(selectedInternship.id) ? 'Saved' : 'Save'}</span>
                      </button>

                      <button
                        onClick={() => setShowApplyForm(true)}
                        className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                      >
                        <span>Apply For Program</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Embedded Application Form Modal/Sheet */}
                  {showApplyForm && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-5 rounded-2xl bg-neutral-100/90 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 mt-4 shadow-lg"
                    >
                      <div className="flex items-center justify-between mb-3 border-b border-neutral-200 dark:border-neutral-700 pb-2">
                        <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                          Apply for {selectedInternship.title}
                        </h4>
                        <button
                          onClick={() => setShowApplyForm(false)}
                          className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <form onSubmit={handleFormSubmitApplication} className="space-y-3 text-xs">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">Full Name</label>
                            <input
                              type="text"
                              required
                              value={applicantName}
                              onChange={(e) => setApplicantName(e.target.value)}
                              placeholder="e.g. Babalu Bharti"
                              className="w-full px-3 py-2 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">Email Address</label>
                            <input
                              type="email"
                              required
                              value={applicantEmail}
                              onChange={(e) => setApplicantEmail(e.target.value)}
                              placeholder="name@university.edu"
                              className="w-full px-3 py-2 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">Phone / WhatsApp Number</label>
                            <input
                              type="tel"
                              required
                              value={applicantPhone}
                              onChange={(e) => setApplicantPhone(e.target.value)}
                              placeholder="+91 7019680860"
                              className="w-full px-3 py-2 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">College / University</label>
                            <input
                              type="text"
                              value={applicantCollege}
                              onChange={(e) => setApplicantCollege(e.target.value)}
                              placeholder="e.g. Delhi Technological University"
                              className="w-full px-3 py-2 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                            Why do you want to join this program? (Optional)
                          </label>
                          <textarea
                            rows={2}
                            value={applicationNote}
                            onChange={(e) => setApplicationNote(e.target.value)}
                            placeholder="Briefly state your learning objectives or background..."
                            className="w-full px-3 py-2 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => setShowApplyForm(false)}
                            className="px-4 py-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors font-medium"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors"
                          >
                            Submit Application
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}

                </div>
              )}
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
