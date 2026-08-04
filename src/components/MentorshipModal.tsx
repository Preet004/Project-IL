import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useUser } from '../context/UserContext';
import { MOCK_MENTORS } from '../data/mockData';
import { Mentor } from '../types';
import { X, Star, Calendar, MessageSquare, CheckCircle, Award, Users } from 'lucide-react';

export const MentorshipModal: React.FC = () => {
  const { activeModal, setActiveModal, showToast } = useUser();
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(MOCK_MENTORS[0]);
  const [selectedTopic, setSelectedTopic] = useState('Portfolio Critique');
  const [bookingDate, setBookingDate] = useState('2026-08-08');
  const [bookedState, setBookedState] = useState(false);

  if (activeModal !== 'mentors') return null;

  const handleBookSession = (e: React.FormEvent) => {
    e.preventDefault();
    setBookedState(true);
    showToast(`1-on-1 Mentorship booked with ${selectedMentor?.name}!`);
    setTimeout(() => {
      setBookedState(false);
      setActiveModal(null);
    }, 2500);
  };

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
          className="relative w-full max-w-4xl bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col"
        >
          {/* Top Bar */}
          <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-900/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-neutral-900 dark:text-white">Mentorship Portal</h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">1-on-1 guidance from staff engineers & design leads</p>
              </div>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="p-2 rounded-full text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Mentor Cards List (5 cols) */}
            <div className="md:col-span-5 space-y-3 border-r-0 md:border-r border-neutral-200 dark:border-neutral-800 md:pr-6">
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">Featured Mentors</p>
              
              {MOCK_MENTORS.map((mentor) => {
                const isSelected = selectedMentor?.id === mentor.id;
                return (
                  <div
                    key={mentor.id}
                    onClick={() => {
                      setSelectedMentor(mentor);
                      setBookedState(false);
                    }}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-500/5 dark:bg-indigo-500/10 shadow-sm'
                        : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-neutral-900'
                    }`}
                  >
                    <img
                      src={mentor.avatar}
                      alt={mentor.name}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-neutral-900 dark:text-white truncate">{mentor.name}</h4>
                        <div className="flex items-center gap-1 text-xs font-bold text-amber-500 shrink-0">
                          <Star className="w-3 h-3 fill-amber-500" />
                          <span>{mentor.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">{mentor.role} @ {mentor.company}</p>
                      <span className="inline-block text-[10px] text-indigo-600 dark:text-indigo-400 font-medium mt-1">
                        Available {mentor.availability}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mentor Booking Detail (7 cols) */}
            <div className="md:col-span-7 space-y-5">
              {selectedMentor && (
                <>
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800">
                    <img
                      src={selectedMentor.avatar}
                      alt={selectedMentor.name}
                      className="w-16 h-16 rounded-2xl object-cover shadow-md"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{selectedMentor.name}</h3>
                      <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">{selectedMentor.role} at {selectedMentor.company}</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">{selectedMentor.bio}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase text-neutral-400 mb-2">Expertise & Topics</h4>
                    <div className="flex flex-wrap gap-1.5 text-xs">
                      {selectedMentor.expertise.map((exp) => (
                        <span
                          key={exp}
                          className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Booking Form */}
                  <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-4">
                    <h4 className="font-bold text-sm text-neutral-900 dark:text-white flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-indigo-500" /> Book 1-on-1 Mentorship Session
                    </h4>

                    {bookedState ? (
                      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-semibold text-xs text-center flex items-center justify-center gap-2">
                        <CheckCircle className="w-5 h-5" /> Session confirmed! Calendar invite sent to your email.
                      </div>
                    ) : (
                      <form onSubmit={handleBookSession} autoComplete="off" className="space-y-3 text-xs">
                        <div>
                          <label className="block text-neutral-500 font-medium mb-1">Session Topic</label>
                          <select
                            value={selectedTopic}
                            onChange={(e) => setSelectedTopic(e.target.value)}
                            className="w-full p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white font-medium"
                          >
                            {selectedMentor.expertise.map((exp) => (
                              <option key={exp} value={exp}>{exp}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-neutral-500 font-medium mb-1">Preferred Date</label>
                          <input
                            type="date"
                            value={bookingDate}
                            onChange={(e) => setBookingDate(e.target.value)}
                            autoComplete="off"
                            className="w-full p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white font-medium"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
                        >
                          <MessageSquare className="w-4 h-4" /> Request 30-Min Session
                        </button>
                      </form>
                    )}
                  </div>

                </>
              )}
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
