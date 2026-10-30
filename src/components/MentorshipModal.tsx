import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useUser } from '../context/UserContext';
import { MENTORSHIP_DOMAINS, CATEGORIES_LIST } from '../data/mockData';
import { MentorshipDomain, MainCategory } from '../types';
import { X, Users, CheckCircle, Code, Cpu, BarChart3, Shield, Cloud, Server, Radio, TrendingUp, Send, Search, Wrench, Dna, Layers, Palette, Compass } from 'lucide-react';

export const MentorshipModal: React.FC = () => {
  const { activeModal, setActiveModal, showToast } = useUser();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<MentorshipDomain | null>(MENTORSHIP_DOMAINS[0]);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [studentQuery, setStudentQuery] = useState('');
  const [submittedState, setSubmittedState] = useState(false);

  if (activeModal !== 'mentors') return null;

  const getDomainIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code': return <Code className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'BarChart3': return <BarChart3 className="w-5 h-5" />;
      case 'Shield': return <Shield className="w-5 h-5" />;
      case 'Cloud': return <Cloud className="w-5 h-5" />;
      case 'Server': return <Server className="w-5 h-5" />;
      case 'Radio': return <Radio className="w-5 h-5" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5" />;
      case 'Wrench': return <Wrench className="w-5 h-5" />;
      case 'Dna': return <Dna className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'Palette': return <Palette className="w-5 h-5" />;
      case 'Compass': return <Compass className="w-5 h-5" />;
      default: return <Users className="w-5 h-5" />;
    }
  };

  const handleOpenMentorshipForm = (domain: MentorshipDomain) => {
    setSelectedDomain(domain);
    setShowRequestForm(true);
    setSubmittedState(false);
  };

  const handleSubmitMentorshipRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedState(true);
    showToast(`Mentorship request submitted for ${selectedDomain?.domain}! Our academic coordinator will contact you on WhatsApp.`);
    setTimeout(() => {
      setSubmittedState(false);
      setShowRequestForm(false);
      setActiveModal(null);
    }, 2500);
  };

  const filteredDomains = MENTORSHIP_DOMAINS.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesQuery = searchQuery === '' ||
      item.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

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
          className="relative w-full max-w-5xl bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden z-10 my-4 max-h-[92vh] flex flex-col"
        >
          {/* Top Bar */}
          <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/80 dark:bg-neutral-900/80">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-neutral-900 dark:text-white">Program Mentorship</h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">1-on-1 personalized guidance across all technology and engineering domains</p>
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
          <div className="flex-1 overflow-y-auto p-6">
            {!showRequestForm ? (
              <div className="space-y-6">
                {/* Search & Filter Bar */}
                <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search domains (e.g. Python, VLSI, Bioinformatics, Azure)..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/80 rounded-xl text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                    Showing <span className="font-bold text-blue-600 dark:text-blue-400">{filteredDomains.length}</span> programs
                  </div>
                </div>

                {/* Category Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                      selectedCategory === 'All'
                        ? 'bg-blue-600 text-white'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                    }`}
                  >
                    All Domains ({MENTORSHIP_DOMAINS.length})
                  </button>
                  {CATEGORIES_LIST.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                        selectedCategory === cat.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>

                {/* Domain Grid - Strictly NO mentor names, only domain + required text */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredDomains.map((item) => (
                    <div
                      key={item.id}
                      className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 hover:border-blue-500 dark:hover:border-blue-500 transition-all flex flex-col justify-between group shadow-sm hover:shadow-md"
                    >
                      <div>
                        {/* Domain Title & Icon */}
                        <div className="flex items-center gap-3 mb-2.5">
                          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                            {getDomainIcon(item.icon)}
                          </div>
                          <div>
                            <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                              {item.category}
                            </span>
                            <h3 className="text-base font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {item.domain}
                            </h3>
                          </div>
                        </div>

                        <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium mb-3">
                          {item.tagline}
                        </p>

                        {/* Domain Mentorship Text as specifically requested */}
                        <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
                          <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
                            This is the program, and if you want mentorship with this program, then{' '}
                            <button
                              onClick={() => handleOpenMentorshipForm(item)}
                              className="inline-flex items-center font-bold text-blue-600 dark:text-blue-400 underline decoration-blue-500 underline-offset-4 hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-pointer"
                            >
                              click here
                            </button>
                            .
                          </p>
                        </div>
                      </div>

                      {/* Mentorship Focus Topics */}
                      <div className="mt-4 pt-3 border-t border-neutral-200/60 dark:border-neutral-800/60 flex flex-wrap gap-1.5">
                        {item.topics.map((t) => (
                          <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-neutral-200/60 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {filteredDomains.length === 0 && (
                  <div className="text-center py-12 text-neutral-500 dark:text-neutral-400 text-sm">
                    No domains found matching "{searchQuery}". Try a different keyword or reset filters.
                  </div>
                )}
              </div>
            ) : (
              /* Mentorship Request Form */
              <div className="max-w-xl mx-auto py-4">
                {submittedState ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Mentorship Request Received!</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-md mx-auto">
                      You have successfully requested mentorship for <span className="font-bold text-blue-600">{selectedDomain?.domain}</span>. Our faculty coordinator will connect with you shortly on WhatsApp to schedule your session.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
                      <div>
                        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                          Domain Mentorship Request
                        </span>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white mt-1">
                          {selectedDomain?.domain}
                        </h3>
                      </div>
                      <button
                        onClick={() => setShowRequestForm(false)}
                        className="text-xs font-medium text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
                      >
                        ← Back to all domains
                      </button>
                    </div>

                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      This is the program, and if you want mentorship with this program, please provide your details below to schedule your personalized 1-on-1 doubt clearing, code review, and career guidance session.
                    </p>

                    <form onSubmit={handleSubmitMentorshipRequest} className="space-y-4 text-xs">
                      <div>
                        <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">Your Full Name</label>
                        <input
                          type="text"
                          required
                          value={studentName}
                          onChange={(e) => setStudentName(e.target.value)}
                          placeholder="e.g. Babalu Bharti"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">Email Address</label>
                          <input
                            type="email"
                            required
                            value={studentEmail}
                            onChange={(e) => setStudentEmail(e.target.value)}
                            placeholder="student@example.com"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">WhatsApp / Phone Number</label>
                          <input
                            type="tel"
                            required
                            value={studentPhone}
                            onChange={(e) => setStudentPhone(e.target.value)}
                            placeholder="+91 7019680860"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">What would you like mentorship guidance with?</label>
                        <textarea
                          rows={3}
                          value={studentQuery}
                          onChange={(e) => setStudentQuery(e.target.value)}
                          placeholder="e.g. Project architecture, doubt clearing, capstone implementation, interview preparation..."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setShowRequestForm(false)}
                          className="px-4 py-2.5 rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors font-medium"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-md flex items-center gap-2"
                        >
                          <Send className="w-4 h-4" /> Request Mentorship Session
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
