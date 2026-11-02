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
  ShieldAlert,
  Check,
  Lock,
  Unlock,
  KeyRound,
  Eye,
  EyeOff,
  LogOut,
  Settings
} from 'lucide-react';
import { brandAssets } from '../assets/brandAssets';

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

  // Protected Recruiter Authentication State
  const [isRecruiterAuthenticated, setIsRecruiterAuthenticated] = useState<boolean>(() => {
    return (
      sessionStorage.getItem('internsloom_recruiter_auth') === 'true' ||
      localStorage.getItem('internsloom_recruiter_auth') === 'true'
    );
  });

  // Recruiter Auth & Passcode Security Modals
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authEmailOrId, setAuthEmailOrId] = useState('pms638657@gmail.com');
  const [authPasscode, setAuthPasscode] = useState('');
  const [showPasscodeText, setShowPasscodeText] = useState(false);
  const [rememberSession, setRememberSession] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  // Change Passcode Modal
  const [showChangePasscodeModal, setShowChangePasscodeModal] = useState(false);
  const [currentPasscodeAttempt, setCurrentPasscodeAttempt] = useState('');
  const [newPasscode, setNewPasscode] = useState('');
  const [confirmNewPasscode, setConfirmNewPasscode] = useState('');
  const [changePasscodeError, setChangePasscodeError] = useState<string | null>(null);

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

  // Master default security passcodes and custom stored passcode
  const MASTER_DEFAULT_PASSCODES = ['InternsLoom@2025', 'admin2025', 'loom2025'];

  const getValidPasscodes = (): string[] => {
    const custom = localStorage.getItem('internsloom_recruiter_passcode');
    return custom ? [custom, ...MASTER_DEFAULT_PASSCODES] : MASTER_DEFAULT_PASSCODES;
  };

  // Recruiter Login handler
  const handleLoginRecruiter = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    const valid = getValidPasscodes();
    const cleanAttempt = authPasscode.trim();

    if (valid.includes(cleanAttempt)) {
      setIsRecruiterAuthenticated(true);
      if (rememberSession) {
        localStorage.setItem('internsloom_recruiter_auth', 'true');
      } else {
        sessionStorage.setItem('internsloom_recruiter_auth', 'true');
      }
      setShowAuthModal(false);
      setAuthPasscode('');
      showToast('Authenticated as Recruiter. Vacancy management controls unlocked.');
    } else {
      setAuthError('Invalid passcode. Access denied. Please enter the authorized recruiter passcode.');
    }
  };

  // Recruiter Lock / Sign Out handler
  const handleLockPortal = () => {
    setIsRecruiterAuthenticated(false);
    localStorage.removeItem('internsloom_recruiter_auth');
    sessionStorage.removeItem('internsloom_recruiter_auth');
    showToast('Recruiter portal locked. Switched to candidate public mode.');
  };

  // Update Recruiter Passcode
  const handleChangePasscode = (e: React.FormEvent) => {
    e.preventDefault();
    setChangePasscodeError(null);
    const valid = getValidPasscodes();

    if (!valid.includes(currentPasscodeAttempt.trim())) {
      setChangePasscodeError('Current passcode is incorrect.');
      return;
    }

    if (newPasscode.length < 6) {
      setChangePasscodeError('New passcode must be at least 6 characters long.');
      return;
    }

    if (newPasscode !== confirmNewPasscode) {
      setChangePasscodeError('New passcodes do not match.');
      return;
    }

    localStorage.setItem('internsloom_recruiter_passcode', newPasscode);
    setShowChangePasscodeModal(false);
    setCurrentPasscodeAttempt('');
    setNewPasscode('');
    setConfirmNewPasscode('');
    showToast('Recruiter passcode successfully updated!');
  };

  // Open modal for editing (Protected)
  const handleOpenEdit = (job: JobVacancy) => {
    if (!isRecruiterAuthenticated) {
      setAuthError('Please authenticate with the recruiter passcode to edit vacancies.');
      setShowAuthModal(true);
      return;
    }
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

  // Open modal for creating new (Protected)
  const handleOpenCreate = () => {
    if (!isRecruiterAuthenticated) {
      setAuthError('Please authenticate with the recruiter passcode to create vacancies.');
      setShowAuthModal(true);
      return;
    }
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

  // Save vacancy (both create and update - Protected)
  const handleSaveVacancy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isRecruiterAuthenticated) {
      showToast('Unauthorized: Recruiter passcode required.');
      setShowAuthModal(true);
      return;
    }

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

  // Toggle status (Open/Closed - Protected)
  const handleToggleStatus = (id: string) => {
    if (!isRecruiterAuthenticated) {
      setShowAuthModal(true);
      return;
    }
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

  // Delete vacancy (Protected)
  const handleDeleteVacancy = (id: string, title: string) => {
    if (!isRecruiterAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    if (window.confirm(`Are you sure you want to delete the vacancy "${title}"?`)) {
      setVacancies(vacancies.filter((v) => v.id !== id));
      showToast(`Vacancy "${title}" removed.`);
    }
  };

  // Reset to default vacancies (Protected)
  const handleResetDefaults = () => {
    if (!isRecruiterAuthenticated) {
      setShowAuthModal(true);
      return;
    }
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

          {/* Recruiter & Staff Access Control */}
          <div className="flex items-center gap-3">
            {isRecruiterAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20 shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Recruiter Mode Active</span>
                </span>
                <button
                  onClick={handleLockPortal}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50/70 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs font-semibold hover:bg-red-100 dark:hover:bg-red-900/60 transition-colors cursor-pointer shadow-xs"
                  title="Lock Recruiter Portal & Exit to Candidate View"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Lock Portal</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setAuthError(null);
                  setShowAuthModal(true);
                }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-800/70 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all cursor-pointer shadow-xs"
                title="Recruiter & Admin Portal Access"
              >
                <Lock className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500" />
                <span>Recruiter Portal</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Recruiter Admin Mode Alert Banner - Protected */}
      {isRecruiterAuthenticated && (
        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white px-6 py-3 text-xs md:text-sm shadow-md">
          <div className="max-w-[1240px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>
                <strong>Authorized Recruiter Session:</strong> You can add new vacancies, edit job descriptions, toggle hiring status, or remove listings.
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleOpenCreate}
                className="px-3.5 py-1.5 rounded-lg bg-white text-blue-700 font-bold text-xs hover:bg-neutral-100 flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Post New Vacancy</span>
              </button>
              <button
                onClick={() => {
                  setChangePasscodeError(null);
                  setShowChangePasscodeModal(true);
                }}
                className="px-3 py-1.5 rounded-lg bg-blue-800/90 hover:bg-blue-900 text-white text-xs font-medium flex items-center gap-1 cursor-pointer border border-blue-400/30"
                title="Change Recruiter Passcode"
              >
                <KeyRound className="w-3 h-3" />
                <span className="hidden md:inline">Change Passcode</span>
              </button>
              <button
                onClick={handleResetDefaults}
                className="px-3 py-1.5 rounded-lg bg-blue-800/90 hover:bg-blue-900 text-white text-xs font-medium flex items-center gap-1 cursor-pointer border border-blue-400/30"
                title="Reset to initial vacancies"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
              <button
                onClick={handleLockPortal}
                className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer shadow-xs"
                title="Lock and Exit"
              >
                <LogOut className="w-3 h-3" />
                <span>Lock</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Header */}
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 py-16">
        <div className="max-w-[1240px] mx-auto px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-bold shadow-xs">
            <img src={brandAssets.emblem} alt="InternsLoom Emblem" className="h-4 w-auto object-contain" />
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
              {isRecruiterAuthenticated ? 'Click "Edit" on any vacancy to edit title, requirements, or status.' : 'Review requirements and submit your application.'}
            </p>
          </div>

          {isRecruiterAuthenticated && (
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
                    {isRecruiterAuthenticated ? (
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

      {/* ============================================================== */}
      {/* MODAL: Recruiter & Staff Passcode Authentication */}
      {/* ============================================================== */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowAuthModal(false);
                setAuthError(null);
              }}
              className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden z-10 p-6 md:p-8 space-y-6"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 block">
                      Protected Access
                    </span>
                    <h3 className="text-lg font-bold text-neutral-950 dark:text-white">
                      Recruiter & Staff Portal
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowAuthModal(false);
                    setAuthError(null);
                  }}
                  className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                This portal is restricted to authorized hiring managers and administrators. Please verify your recruiter credentials to manage vacancies.
              </p>

              {/* Error Message */}
              {authError && (
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 flex items-start gap-2.5 text-xs text-red-600 dark:text-red-400">
                  <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{authError}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleLoginRecruiter} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Authorized Recruiter Email / ID
                  </label>
                  <input
                    type="text"
                    value={authEmailOrId}
                    onChange={(e) => setAuthEmailOrId(e.target.value)}
                    placeholder="e.g. pms638657@gmail.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Security Passcode *
                  </label>
                  <div className="relative">
                    <input
                      type={showPasscodeText ? 'text' : 'password'}
                      required
                      autoFocus
                      value={authPasscode}
                      onChange={(e) => {
                        setAuthPasscode(e.target.value);
                        if (authError) setAuthError(null);
                      }}
                      placeholder="Enter recruiter passcode"
                      className="w-full pl-3.5 pr-11 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasscodeText(!showPasscodeText)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer"
                    >
                      {showPasscodeText ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember device toggle */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-neutral-600 dark:text-neutral-400">
                    <input
                      type="checkbox"
                      checked={rememberSession}
                      onChange={(e) => setRememberSession(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <span>Remember on this browser</span>
                  </label>
                </div>

                {/* Recruiter default passcode hint */}
                <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-900/40 text-[11px] text-blue-800 dark:text-blue-300 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <KeyRound className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>Default Administrator Passcode:</span>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Default: <code className="bg-white dark:bg-neutral-800 px-1.5 py-0.5 rounded border text-blue-600 font-mono font-bold">InternsLoom@2025</code> (You can update this inside settings once logged in).
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAuthModal(false);
                      setAuthError(null);
                    }}
                    className="flex-1 py-2.5 rounded-full border border-neutral-200 dark:border-neutral-700 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Unlock className="w-3.5 h-3.5" />
                    <span>Unlock Portal</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================== */}
      {/* MODAL: Change Recruiter Passcode */}
      {/* ============================================================== */}
      <AnimatePresence>
        {showChangePasscodeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowChangePasscodeModal(false);
                setChangePasscodeError(null);
              }}
              className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden z-10 p-6 md:p-8 space-y-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400">
                    <KeyRound className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 block">
                      Security Settings
                    </span>
                    <h3 className="text-lg font-bold text-neutral-950 dark:text-white">
                      Change Recruiter Passcode
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowChangePasscodeModal(false);
                    setChangePasscodeError(null);
                  }}
                  className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {changePasscodeError && (
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 flex items-start gap-2.5 text-xs text-red-600 dark:text-red-400">
                  <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{changePasscodeError}</span>
                </div>
              )}

              <form onSubmit={handleChangePasscode} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Current Passcode *
                  </label>
                  <input
                    type="password"
                    required
                    value={currentPasscodeAttempt}
                    onChange={(e) => setCurrentPasscodeAttempt(e.target.value)}
                    placeholder="Enter existing passcode"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                    New Passcode *
                  </label>
                  <input
                    type="password"
                    required
                    value={newPasscode}
                    onChange={(e) => setNewPasscode(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Confirm New Passcode *
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmNewPasscode}
                    onChange={(e) => setConfirmNewPasscode(e.target.value)}
                    placeholder="Re-type new passcode"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowChangePasscodeModal(false);
                      setChangePasscodeError(null);
                    }}
                    className="flex-1 py-2.5 rounded-full border border-neutral-200 dark:border-neutral-700 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Save New Passcode</span>
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
