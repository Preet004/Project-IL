import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useUser } from '../context/UserContext';
import { INITIAL_JOB_VACANCIES } from '../data/careersData';
import { JobVacancy } from '../types';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  X, 
  Search, 
  Filter, 
  SlidersHorizontal, 
  ArrowLeft, 
  Building2, 
  Send,
  RotateCcw,
  ShieldCheck,
  Check
} from 'lucide-react';

export const CareersPage: React.FC = () => {
  const { navigateToView, showToast } = useUser();

  // Load vacancies from localStorage with INITIAL_JOB_VACANCIES as default
  const [vacancies, setVacancies] = useState<JobVacancy[]>(() => {
    const saved = localStorage.getItem('internsloom_vacancies');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved vacancies', e);
      }
    }
    return INITIAL_JOB_VACANCIES;
  });

  // Recruiter / Admin Edit Mode toggle
  const [isRecruiterMode, setIsRecruiterMode] = useState(false);

  // Filter & Search states
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Application Modal state
  const [selectedJobForApply, setSelectedJobForApply] = useState<JobVacancy | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantResume, setApplicantResume] = useState('');
  const [applicantExperience, setApplicantExperience] = useState('');
  const [applicantNotes, setApplicantNotes] = useState('');
  const [applySubmitted, setApplySubmitted] = useState(false);

  // Vacancy Edit/Create Modal state
  const [editingVacancy, setEditingVacancy] = useState<JobVacancy | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // Form fields for create/edit
  const [formTitle, setFormTitle] = useState('');
  const [formDepartment, setFormDepartment] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formType, setFormType] = useState<'Full-time' | 'Part-time' | 'Contract' | 'Internship'>('Full-time');
  const [formWorkplace, setFormWorkplace] = useState<'Remote' | 'Hybrid' | 'On-site'>('Remote');
  const [formExperience, setFormExperience] = useState('');
  const [formSalary, setFormSalary] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formResponsibilities, setFormResponsibilities] = useState('');
  const [formRequirements, setFormRequirements] = useState('');
  const [formPerks, setFormPerks] = useState('');
  const [formStatus, setFormStatus] = useState<'Open' | 'Closed'>('Open');

  // Sync vacancies with localStorage
  useEffect(() => {
    localStorage.setItem('internsloom_vacancies', JSON.stringify(vacancies));
  }, [vacancies]);

  // Departments list for filter
  const departments = ['All', ...Array.from(new Set(vacancies.map((v) => v.department)))];

  // Filtered vacancies
  const filteredVacancies = vacancies.filter((job) => {
    const matchesDept = selectedDepartment === 'All' || job.department === selectedDepartment;
    const matchesQuery = 
      searchQuery === '' ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesQuery;
  });

  // Open modal for editing
  const handleOpenEdit = (job: JobVacancy) => {
    setEditingVacancy(job);
    setIsCreatingNew(false);
    setFormTitle(job.title);
    setFormDepartment(job.department);
    setFormLocation(job.location);
    setFormType(job.type);
    setFormWorkplace(job.workplaceType);
    setFormExperience(job.experience);
    setFormSalary(job.salaryRange);
    setFormDescription(job.description);
    setFormResponsibilities(job.responsibilities.join('\n'));
    setFormRequirements(job.requirements.join('\n'));
    setFormPerks(job.perks.join('\n'));
    setFormStatus(job.status);
  };

  // Open modal for creating new
  const handleOpenCreate = () => {
    setEditingVacancy(null);
    setIsCreatingNew(true);
    setFormTitle('');
    setFormDepartment('Engineering & Training');
    setFormLocation('Remote / Bengaluru');
    setFormType('Full-time');
    setFormWorkplace('Remote');
    setFormExperience('1 - 3 Years');
    setFormSalary('₹5,00,000 - ₹8,00,000 / year');
    setFormDescription('');
    setFormResponsibilities('Conduct live cohort sessions\nReview code submissions\nGuide capstone projects');
    setFormRequirements('Strong hands-on coding expertise\nEmpathetic communication');
    setFormPerks('Remote work\nLearning allowance\nFlexible schedule');
    setFormStatus('Open');
  };

  // Save vacancy (both create and update)
  const handleSaveVacancy = (e: React.FormEvent) => {
    e.preventDefault();

    const responsibilitiesArr = formResponsibilities
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const requirementsArr = formRequirements
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const perksArr = formPerks
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    if (isCreatingNew) {
      const newJob: JobVacancy = {
        id: `vac-${Date.now()}`,
        title: formTitle,
        department: formDepartment,
        location: formLocation,
        type: formType,
        workplaceType: formWorkplace,
        experience: formExperience,
        salaryRange: formSalary,
        description: formDescription,
        responsibilities: responsibilitiesArr,
        requirements: requirementsArr,
        perks: perksArr,
        postedDate: 'Just now',
        status: formStatus
      };
      setVacancies([newJob, ...vacancies]);
      showToast(`Vacancy "${formTitle}" created successfully!`);
    } else if (editingVacancy) {
      setVacancies(
        vacancies.map((v) =>
          v.id === editingVacancy.id
            ? {
                ...v,
                title: formTitle,
                department: formDepartment,
                location: formLocation,
                type: formType,
                workplaceType: formWorkplace,
                experience: formExperience,
                salaryRange: formSalary,
                description: formDescription,
                responsibilities: responsibilitiesArr,
                requirements: requirementsArr,
                perks: perksArr,
                status: formStatus
              }
            : v
        )
      );
      showToast(`Vacancy "${formTitle}" updated successfully!`);
    }

    setEditingVacancy(null);
    setIsCreatingNew(false);
  };

  // Toggle status (Open/Closed)
  const handleToggleStatus = (id: string) => {
    setVacancies(
      vacancies.map((v) => {
        if (v.id === id) {
          const newStatus = v.status === 'Open' ? 'Closed' : 'Open';
          showToast(`Vacancy marked as ${newStatus}`);
          return { ...v, status: newStatus };
        }
        return v;
      })
    );
  };

  // Delete vacancy
  const handleDeleteVacancy = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete the vacancy "${title}"?`)) {
      setVacancies(vacancies.filter((v) => v.id !== id));
      showToast(`Vacancy "${title}" removed.`);
    }
  };

  // Reset to default vacancies
  const handleResetDefaults = () => {
    if (window.confirm('Reset all vacancies to initial default listings?')) {
      setVacancies(INITIAL_JOB_VACANCIES);
      showToast('Vacancies reset to default list.');
    }
  };

  // Submit job application
  const handleApplicantSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplySubmitted(true);
    showToast(`Application submitted for ${selectedJobForApply?.title}!`);
    setTimeout(() => {
      setApplySubmitted(false);
      setSelectedJobForApply(null);
      setApplicantName('');
      setApplicantEmail('');
      setApplicantPhone('');
      setApplicantResume('');
      setApplicantNotes('');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300 pb-24">
      {/* Top Breadcrumb & Nav */}
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 sticky top-16 z-30 shadow-xs">
        <div className="max-w-[1240px] mx-auto px-6 py-3.5 flex items-center justify-between">
          <button
            onClick={() => navigateToView('home')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          {/* Recruiter Admin Mode Switch */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 hidden sm:inline">
              Recruiter Mode
            </span>
            <button
              onClick={() => {
                setIsRecruiterMode(!isRecruiterMode);
                showToast(
                  !isRecruiterMode
                    ? 'Recruiter edit mode enabled! You can now add, edit, or delete vacancies.'
                    : 'Recruiter edit mode disabled.'
                );
              }}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                isRecruiterMode ? 'bg-blue-600' : 'bg-neutral-300 dark:bg-neutral-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isRecruiterMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
              isRecruiterMode ? 'bg-blue-500/10 text-blue-600' : 'text-neutral-400'
            }`}>
              {isRecruiterMode ? 'Admin Active' : 'Viewer'}
            </span>
          </div>
        </div>
      </div>

      {/* Recruiter Admin Mode Alert Banner */}
      {isRecruiterMode && (
        <div className="bg-blue-600 text-white px-6 py-3 text-xs md:text-sm">
          <div className="max-w-[1240px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-medium">
              <Edit3 className="w-4 h-4" />
              <span>
                <strong>Recruiter / Platform Owner Mode Enabled:</strong> You can add new vacancies, edit job details, change status (Open/Closed), or delete listings. Changes persist in real-time.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleOpenCreate}
                className="px-3.5 py-1.5 rounded-lg bg-white text-blue-700 font-bold text-xs hover:bg-neutral-100 flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Post New Vacancy</span>
              </button>
              <button
                onClick={handleResetDefaults}
                className="px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-medium flex items-center gap-1 cursor-pointer"
                title="Reset to initial vacancies"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Header */}
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 py-16">
        <div className="max-w-[1240px] mx-auto px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-bold shadow-xs">
            <img src="/assets/internsloom_emblem.png" alt="InternsLoom Emblem" className="h-4 w-auto object-contain" />
            <span>Careers at InternsLoom</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
            Careers & Open Vacancies
          </h1>
          <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Shape the future of technical education and real-world student internships across India. Help undergraduates bridge the gap to top tech careers.
          </p>

          {/* Search & Department Filters */}
          <div className="pt-6 max-w-3xl mx-auto space-y-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search vacancies by title, tech stack, or location..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
            </div>

            {/* Department Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedDepartment === dept
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Vacancies Listing */}
      <div className="max-w-[1240px] mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <h2 className="text-xl font-bold text-neutral-950 dark:text-white">
              Current Openings ({filteredVacancies.length})
            </h2>
            <p className="text-xs text-neutral-500">
              {isRecruiterMode ? 'Click "Edit" on any vacancy to edit title, requirements, or status.' : 'Review requirements and submit your application.'}
            </p>
          </div>

          {isRecruiterMode && (
            <button
              onClick={handleOpenCreate}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Job Vacancy</span>
            </button>
          )}
        </div>

        {filteredVacancies.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 p-8 space-y-3">
            <Briefcase className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mx-auto" />
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">No Vacancies Found</h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              No open roles matched your search criteria. Try a different keyword or check back soon.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredVacancies.map((job) => (
              <div
                key={job.id}
                className={`p-6 md:p-8 rounded-3xl bg-white dark:bg-neutral-900 border transition-all duration-200 shadow-sm ${
                  job.status === 'Closed'
                    ? 'opacity-65 border-neutral-300 dark:border-neutral-800 bg-neutral-100/50 dark:bg-neutral-900/50'
                    : 'border-neutral-200 dark:border-neutral-800 hover:border-blue-500/40 hover:shadow-md'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  {/* Job Details */}
                  <div className="space-y-4 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                        {job.department}
                      </span>
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                        {job.type}
                      </span>
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                        {job.workplaceType}
                      </span>
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                          job.status === 'Open'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                            : 'bg-red-500/10 text-red-600 border border-red-500/20'
                        }`}
                      >
                        {job.status === 'Open' ? '• Currently Hiring' : '• Position Closed'}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-extrabold text-neutral-950 dark:text-white">
                      {job.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-blue-500" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Experience: {job.experience}</span>
                      </div>
                      <div className="flex items-center gap-1 font-semibold text-neutral-800 dark:text-neutral-200">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{job.salaryRange}</span>
                      </div>
                    </div>

                    <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      {job.description}
                    </p>

                    {/* Key Responsibilities */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                        Key Responsibilities:
                      </h4>
                      <ul className="space-y-1.5 text-xs text-neutral-700 dark:text-neutral-300">
                        {job.responsibilities.slice(0, 3).map((resp, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Perks */}
                    {job.perks && job.perks.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {job.perks.map((perk, pIdx) => (
                          <span
                            key={pIdx}
                            className="text-[11px] px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                          >
                            ✓ {perk}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions / Recruiter Controls */}
                  <div className="flex flex-row lg:flex-col gap-2.5 items-stretch lg:w-48 shrink-0 border-t lg:border-t-0 lg:border-l border-neutral-100 dark:border-neutral-800 pt-4 lg:pt-0 lg:pl-6">
                    {isRecruiterMode ? (
                      <div className="space-y-2 w-full">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">
                          Recruiter Controls
                        </span>
                        
                        <button
                          onClick={() => handleOpenEdit(job)}
                          className="w-full py-2 px-3 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit Vacancy</span>
                        </button>

                        <button
                          onClick={() => handleToggleStatus(job.id)}
                          className={`w-full py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                            job.status === 'Open'
                              ? 'border-amber-500/40 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/20'
                              : 'border-emerald-500/40 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/20'
                          }`}
                        >
                          <span>{job.status === 'Open' ? 'Close Opening' : 'Re-open Opening'}</span>
                        </button>

                        <button
                          onClick={() => handleDeleteVacancy(job.id, job.title)}
                          className="w-full py-2 px-3 rounded-xl border border-red-200 dark:border-red-900/50 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    ) : (
                      <div className="w-full space-y-2">
                        {job.status === 'Open' ? (
                          <button
                            onClick={() => setSelectedJobForApply(job)}
                            className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer text-center"
                          >
                            Apply for this Role
                          </button>
                        ) : (
                          <div className="w-full py-2.5 px-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-400 font-semibold text-xs text-center">
                            Applications Closed
                          </div>
                        )}
                        <p className="text-[11px] text-neutral-400 text-center">
                          Posted {job.postedDate}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* MODAL: Candidate Application */}
      {/* ============================================================== */}
      <AnimatePresence>
        {selectedJobForApply && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedJobForApply(null)}
              className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden z-10 p-6 space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    Job Application
                  </span>
                  <h3 className="text-lg font-bold text-neutral-950 dark:text-white">
                    {selectedJobForApply.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedJobForApply(null)}
                  className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {applySubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-neutral-900 dark:text-white">
                    Application Successfully Submitted!
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-sm mx-auto">
                    Thank you, {applicantName}. Our talent acquisition team will review your credentials and contact you at {applicantEmail}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleApplicantSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="e.g. Aditi Rao"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={applicantPhone}
                        onChange={(e) => setApplicantPhone(e.target.value)}
                        placeholder="+91 9876543210"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      LinkedIn Profile / Portfolio / Resume Link *
                    </label>
                    <input
                      type="url"
                      required
                      value={applicantResume}
                      onChange={(e) => setApplicantResume(e.target.value)}
                      placeholder="https://linkedin.com/in/... or Google Drive URL"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Years of Relevant Experience
                    </label>
                    <input
                      type="text"
                      value={applicantExperience}
                      onChange={(e) => setApplicantExperience(e.target.value)}
                      placeholder="e.g. 2 years in React/Node.js or Fresh Graduate"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Cover Note / Why InternsLoom?
                    </label>
                    <textarea
                      rows={2}
                      value={applicantNotes}
                      onChange={(e) => setApplicantNotes(e.target.value)}
                      placeholder="Share a short note about your mentorship philosophy or career accomplishments..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Application</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================== */}
      {/* MODAL: Recruiter Add/Edit Vacancy Form */}
      {/* ============================================================== */}
      <AnimatePresence>
        {(isCreatingNew || editingVacancy) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsCreatingNew(false);
                setEditingVacancy(null);
              }}
              className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden z-10 p-6 space-y-4 max-h-[90vh] flex flex-col"
            >
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800 shrink-0">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    Recruiter Console
                  </span>
                  <h3 className="text-xl font-bold text-neutral-950 dark:text-white">
                    {isCreatingNew ? 'Post New Job Vacancy' : `Edit: ${editingVacancy?.title}`}
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setIsCreatingNew(false);
                    setEditingVacancy(null);
                  }}
                  className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveVacancy} className="overflow-y-auto pr-1 space-y-4 flex-1">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Senior Data Science Mentor"
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Department *
                    </label>
                    <input
                      type="text"
                      required
                      value={formDepartment}
                      onChange={(e) => setFormDepartment(e.target.value)}
                      placeholder="e.g. Engineering & Training"
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Location *
                    </label>
                    <input
                      type="text"
                      required
                      value={formLocation}
                      onChange={(e) => setFormLocation(e.target.value)}
                      placeholder="e.g. Remote / Bengaluru"
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Job Type
                    </label>
                    <select
                      value={formType}
                      onChange={(e) => setFormType(e.target.value as any)}
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Workplace Type
                    </label>
                    <select
                      value={formWorkplace}
                      onChange={(e) => setFormWorkplace(e.target.value as any)}
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Remote">Remote</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="On-site">On-site</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Listing Status
                    </label>
                    <select
                      value={formStatus}
                      onChange={(e) => setFormStatus(e.target.value as any)}
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Open">Open</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Experience Required
                    </label>
                    <input
                      type="text"
                      value={formExperience}
                      onChange={(e) => setFormExperience(e.target.value)}
                      placeholder="e.g. 2 - 4 Years"
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Salary / Compensation Range
                    </label>
                    <input
                      type="text"
                      value={formSalary}
                      onChange={(e) => setFormSalary(e.target.value)}
                      placeholder="e.g. ₹6,00,000 - ₹9,00,000 / year"
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    Job Description *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Overview of the vacancy and responsibilities..."
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    Key Responsibilities (One per line)
                  </label>
                  <textarea
                    rows={3}
                    value={formResponsibilities}
                    onChange={(e) => setFormResponsibilities(e.target.value)}
                    placeholder="Conduct weekly live mentoring sessions&#10;Evaluate student capstone submissions"
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    Candidate Requirements (One per line)
                  </label>
                  <textarea
                    rows={2}
                    value={formRequirements}
                    onChange={(e) => setFormRequirements(e.target.value)}
                    placeholder="Proficiency in React and TypeScript&#10;Prior teaching or mentoring experience"
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>{isCreatingNew ? 'Publish New Vacancy' : 'Save Changes'}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
