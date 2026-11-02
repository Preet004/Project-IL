import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useUser } from '../context/UserContext';
import { MOCK_INTERNSHIPS } from '../data/mockData';
import { X, Bookmark, CheckCircle, Clock, Send, Trash2, Building2 } from 'lucide-react';

export const ApplicationsTrackerModal: React.FC = () => {
  const {
    activeModal,
    setActiveModal,
    user,
    toggleSaveInternship,
    setSelectedInternshipId,
    navigateToProgram,
    navigateToView,
    showToast
  } = useUser();
  const [tab, setTab] = useState<'applications' | 'saved'>('applications');

  if (activeModal !== 'applications') return null;

  const savedInternshipsList = MOCK_INTERNSHIPS.filter((i) => user.savedInternships.includes(i.id));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
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
          className="relative w-full max-w-3xl bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col glow-border"
        >
          {/* Top Bar */}
          <div className="px-6 py-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/70 dark:bg-neutral-900/70">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-gradient text-white flex items-center justify-center font-bold shadow-lg">
                <Bookmark className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-black text-neutral-900 dark:text-white tracking-tight">Executive Career Vault</h2>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    Live Portal
                  </span>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Track active enterprise submissions & bookmarked tracks</p>
              </div>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="p-2 rounded-xl text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sub Tabs */}
          <div className="flex border-b border-neutral-200 dark:border-neutral-800 px-6 bg-neutral-100/50 dark:bg-neutral-950/50 text-xs font-semibold">
            <button
              onClick={() => setTab('applications')}
              className={`py-3.5 px-4 flex items-center gap-2 border-b-2 font-bold transition-all ${
                tab === 'applications'
                  ? 'border-[var(--primary)] text-neutral-900 dark:text-white'
                  : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Send className="w-4 h-4 text-[var(--primary)]" /> Active Submissions ({user.applications.length})
            </button>

            <button
              onClick={() => setTab('saved')}
              className={`py-3.5 px-4 flex items-center gap-2 border-b-2 font-bold transition-all ${
                tab === 'saved'
                  ? 'border-[var(--primary)] text-neutral-900 dark:text-white'
                  : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Bookmark className="w-4 h-4 text-[var(--accent)]" /> Shortlisted Tracks ({savedInternshipsList.length})
            </button>
          </div>

          {/* Content Body */}
          <div className="p-6 overflow-y-auto space-y-4">
            {tab === 'applications' ? (
              user.applications.length === 0 ? (
                <div className="text-center py-14 text-neutral-400 text-xs">
                  <div className="w-14 h-14 rounded-2xl bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center mx-auto mb-3">
                    <Building2 className="w-7 h-7 text-neutral-400" />
                  </div>
                  <p className="font-semibold text-neutral-700 dark:text-neutral-300">No active applications currently filed.</p>
                  <p className="text-neutral-500 mt-1 max-w-sm mx-auto">Explore enterprise tracks with guaranteed company interviews and industry mentor oversight.</p>
                  <button
                    onClick={() => {
                      navigateToView('programs');
                      setActiveModal(null);
                    }}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-brand-gradient text-white font-bold text-xs shadow-md hover:opacity-95 transition-all inline-flex items-center gap-2"
                  >
                    Browse Program Catalog
                  </button>
                </div>
              ) : (
                user.applications.map((app) => (
                  <div
                    key={app.id}
                    className="p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-800/40 flex items-start justify-between gap-4 text-xs transition-all hover:border-[var(--primary)]"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm text-neutral-900 dark:text-white">{app.roleTitle}</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-mono font-bold text-[10px]">
                          {app.status}
                        </span>
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-300 font-semibold">{app.companyName}</p>
                      <p className="text-neutral-400 mt-1 font-mono text-[11px]">Applied on {app.appliedDate}</p>
                      {app.notes && <p className="text-neutral-500 italic mt-1 bg-white/50 dark:bg-neutral-900/50 p-2 rounded-lg border border-neutral-200/50 dark:border-neutral-800">{app.notes}</p>}
                    </div>

                    <button
                      onClick={() => {
                        navigateToProgram(app.internshipId);
                        setActiveModal(null);
                      }}
                      className="px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 font-bold hover:bg-white dark:hover:bg-neutral-700 shadow-sm shrink-0 transition-colors"
                    >
                      View Syllabus
                    </button>
                  </div>
                ))
              )
            ) : (
              savedInternshipsList.length === 0 ? (
                <div className="text-center py-14 text-neutral-400 text-xs">
                  <div className="w-14 h-14 rounded-2xl bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center mx-auto mb-3">
                    <Bookmark className="w-7 h-7 text-neutral-400" />
                  </div>
                  <p className="font-semibold text-neutral-700 dark:text-neutral-300">No tracks saved in your vault yet.</p>
                  <p className="text-neutral-500 mt-1">Bookmark any industry specialization to review and compare later.</p>
                </div>
              ) : (
                savedInternshipsList.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-800/40 flex items-center justify-between gap-4 text-xs hover:border-[var(--primary)] transition-all"
                  >
                    <div>
                      <h4 className="font-bold text-sm text-neutral-900 dark:text-white">{item.title}</h4>
                      <p className="text-neutral-600 dark:text-neutral-300 font-semibold">{item.company} • {item.location}</p>
                      <p className="text-emerald-600 dark:text-emerald-400 font-bold font-mono mt-1">{item.stipend}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          navigateToProgram(item.id);
                          setActiveModal(null);
                        }}
                        className="px-4 py-2 rounded-xl bg-brand-gradient text-white font-bold text-xs shadow-md hover:opacity-95 transition-all"
                      >
                        Enroll Track
                      </button>

                      <button
                        onClick={() => toggleSaveInternship(item.id)}
                        className="p-2 rounded-xl text-neutral-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                        title="Remove bookmark"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
