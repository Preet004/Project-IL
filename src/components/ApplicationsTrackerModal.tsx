import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useUser } from '../context/UserContext';
import { MOCK_INTERNSHIPS } from '../data/mockData';
import { X, Bookmark, CheckCircle, Clock, Send, Trash2, Building2 } from 'lucide-react';

export const ApplicationsTrackerModal: React.FC = () => {
  const { activeModal, setActiveModal, user, toggleSaveInternship, setSelectedInternshipId, showToast } = useUser();
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
          className="relative w-full max-w-3xl bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col"
        >
          {/* Top Bar */}
          <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-900/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-xs">
                <Bookmark className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-neutral-900 dark:text-white">Career Dashboard</h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Track your applications & bookmarked roles</p>
              </div>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="p-2 rounded-full text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sub Tabs */}
          <div className="flex border-b border-neutral-200 dark:border-neutral-800 px-6 bg-neutral-100/50 dark:bg-neutral-950/50 text-xs font-semibold">
            <button
              onClick={() => setTab('applications')}
              className={`py-3 px-4 flex items-center gap-2 border-b-2 transition-colors ${
                tab === 'applications'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Send className="w-4 h-4" /> Submitted Applications ({user.applications.length})
            </button>

            <button
              onClick={() => setTab('saved')}
              className={`py-3 px-4 flex items-center gap-2 border-b-2 transition-colors ${
                tab === 'saved'
                  ? 'border-amber-500 text-amber-500'
                  : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Bookmark className="w-4 h-4" /> Saved Internships ({savedInternshipsList.length})
            </button>
          </div>

          {/* Content Body */}
          <div className="p-6 overflow-y-auto space-y-4">
            
            {tab === 'applications' ? (
              user.applications.length === 0 ? (
                <div className="text-center py-12 text-neutral-400 text-xs">
                  <Building2 className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p>You haven't submitted any applications yet.</p>
                  <button
                    onClick={() => setActiveModal('internships')}
                    className="mt-2 text-blue-500 font-semibold hover:underline"
                  >
                    Browse Internship Listings
                  </button>
                </div>
              ) : (
                user.applications.map((app) => (
                  <div
                    key={app.id}
                    className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40 flex items-start justify-between gap-4 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm text-neutral-900 dark:text-white">{app.roleTitle}</span>
                        <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold text-[10px]">
                          {app.status}
                        </span>
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-300 font-semibold">{app.companyName}</p>
                      <p className="text-neutral-400 mt-1">Applied on {app.appliedDate}</p>
                      {app.notes && <p className="text-neutral-500 italic mt-1">{app.notes}</p>}
                    </div>

                    <button
                      onClick={() => {
                        setSelectedInternshipId(app.internshipId);
                        setActiveModal('internships');
                      }}
                      className="px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-700 shrink-0"
                    >
                      View Role
                    </button>
                  </div>
                ))
              )
            ) : (
              savedInternshipsList.length === 0 ? (
                <div className="text-center py-12 text-neutral-400 text-xs">
                  <Bookmark className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p>No saved internships bookmarked yet.</p>
                </div>
              ) : (
                savedInternshipsList.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40 flex items-center justify-between gap-4 text-xs"
                  >
                    <div>
                      <h4 className="font-bold text-sm text-neutral-900 dark:text-white">{item.title}</h4>
                      <p className="text-neutral-600 dark:text-neutral-300 font-semibold">{item.company} • {item.location}</p>
                      <p className="text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">{item.stipend}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedInternshipId(item.id);
                          setActiveModal('internships');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-500"
                      >
                        Apply Now
                      </button>

                      <button
                        onClick={() => toggleSaveInternship(item.id)}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-red-500"
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
