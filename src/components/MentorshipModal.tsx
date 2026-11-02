import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useUser } from '../context/UserContext';
import { MENTORSHIP_DOMAINS, MOCK_INTERNSHIPS } from '../data/mockData';
import { MentorshipDomain } from '../types';
import { X, Check, CheckCircle2, ChevronRight, Search, ShieldCheck, Sparkles, BookOpen, Clock, ArrowRight } from 'lucide-react';
import { brandAssets } from '../assets/brandAssets';

interface PricingPlan {
  id: 'self-paced' | 'mentor-led';
  name: string;
  subtitle: string;
  price: string;
  paymentType: string;
  isPopular?: boolean;
  features: {
    included: boolean;
    text: string;
  }[];
}

const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'self-paced',
    name: 'Self Paced',
    subtitle: 'Learn with your speed',
    price: '₹6,500',
    paymentType: 'One Time Payment',
    isPopular: false,
    features: [
      { included: true, text: 'RECORDED LECTURES' },
      { included: true, text: 'REAL TIME PROJECTS' },
      { included: true, text: '4+ HRS OF LIVE SESSIONS' },
      { included: true, text: 'ONE ON ONE DOUBT SESSIONS' },
      { included: true, text: 'CERTIFICATIONS' },
      { included: false, text: 'MENTOR SUPPORT' },
      { included: false, text: 'PLACEMENT GUIDANCE' },
      { included: false, text: 'INTERVIEW ASSISTANCE' },
    ]
  },
  {
    id: 'mentor-led',
    name: 'Mentor Led',
    subtitle: 'Live Mentorship',
    price: '₹9,000',
    paymentType: 'One Time Payment',
    isPopular: true,
    features: [
      { included: true, text: '4+ HRS OF LIVE SESSIONS' },
      { included: true, text: 'RECORDED LECTURES' },
      { included: true, text: 'REAL TIME PROJECTS' },
      { included: true, text: 'ONE ON ONE DOUBT SESSIONS' },
      { included: true, text: 'CERTIFICATIONS' },
      { included: true, text: 'MENTOR SUPPORT' },
      { included: true, text: 'PLACEMENT GUIDANCE' },
      { included: true, text: 'INTERVIEW ASSISTANCE' },
    ]
  }
];

export const MentorshipModal: React.FC = () => {
  const { activeModal, setActiveModal, showToast } = useUser();
  const [selectedDomainTitle, setSelectedDomainTitle] = useState<string>(
    MENTORSHIP_DOMAINS[0]?.domain || 'Full Stack Web Development'
  );
  const [searchDomainQuery, setSearchDomainQuery] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [college, setCollege] = useState('');

  if (activeModal !== 'mentors') return null;

  // Domain search filtering
  const allDomainsList = Array.from(
    new Set([
      ...MENTORSHIP_DOMAINS.map(d => d.domain),
      ...MOCK_INTERNSHIPS.map(i => i.title)
    ])
  );

  const filteredDomainOptions = allDomainsList.filter(d =>
    d.toLowerCase().includes(searchDomainQuery.toLowerCase())
  );

  const handleStartLearning = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setShowCheckoutForm(true);
    setIsSuccess(false);
  };

  const handleEnrollmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    showToast(`Enrolled in ${selectedDomainTitle} (${selectedPlan?.name} - ${selectedPlan?.price})! Our coordinator will reach out.`);
    setTimeout(() => {
      setIsSuccess(false);
      setShowCheckoutForm(false);
      setActiveModal(null);
    }, 2800);
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

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl bg-[#fbf9f5] dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden z-10 my-4 max-h-[92vh] flex flex-col"
        >
          {/* Header Bar */}
          <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-neutral-800 p-1 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center shadow-xs shrink-0">
                <img
                  src={brandAssets.emblem}
                  alt="InternsLoom Emblem"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                  InternsLoom Learning Plans
                </span>
                <h2 className="text-xl font-extrabold text-neutral-950 dark:text-white">
                  Domain Mentorship & Learning Tracks
                </h2>
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
          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            {!showCheckoutForm ? (
              <div className="space-y-6">
                
                {/* Domain Selector & Required Prompt Text */}
                <div className="p-5 rounded-2xl bg-white dark:bg-neutral-800/80 border border-neutral-200/80 dark:border-neutral-700 shadow-xs">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                        Selected Domain
                      </span>
                      {/* Sophisticated prompt text */}
                      <p className="text-sm md:text-base font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
                        Accelerate your professional growth with our structured curriculum — to complement your program with personalized, one-on-one industry mentorship, select your plan below.
                      </p>
                    </div>

                    {/* Domain Picker Dropdown */}
                    <div className="shrink-0">
                      <label className="block text-[11px] font-bold text-neutral-500 dark:text-neutral-400 mb-1">
                        Choose Domain Program:
                      </label>
                      <select
                        value={selectedDomainTitle}
                        onChange={(e) => setSelectedDomainTitle(e.target.value)}
                        className="w-full md:w-72 px-3.5 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-xs font-bold text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
                      >
                        {allDomainsList.map((domain) => (
                          <option key={domain} value={domain}>
                            {domain}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Active Domain Highlight Banner */}
                  <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-700/60 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-400 font-bold">
                        Active Track
                      </span>
                      <span className="font-extrabold text-neutral-900 dark:text-white text-sm">
                        {selectedDomainTitle}
                      </span>
                    </div>
                    <span className="text-[11px] text-neutral-500 dark:text-neutral-400 hidden sm:inline">
                      Includes 1-on-1 Guidance & Live Capstone Internship
                    </span>
                  </div>
                </div>

                {/* EXACT 2 PRICING CARDS FROM THE SCREENSHOT */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto pt-2">
                  
                  {/* CARD 1: Self Paced (₹6,500) */}
                  <div className="relative rounded-3xl bg-white dark:bg-neutral-800/95 border border-neutral-200 dark:border-neutral-700/80 p-8 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
                    <div>
                      {/* Header */}
                      <div className="text-center mb-6">
                        <h3 className="text-3xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
                          Self Paced
                        </h3>
                        <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mt-1">
                          Learn with your speed
                        </p>
                        
                        <div className="mt-5">
                          <span className="text-4xl md:text-5xl font-black text-neutral-950 dark:text-white tracking-tight">
                            ₹6,500
                          </span>
                          <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mt-1">
                            One Time Payment
                          </p>
                        </div>
                      </div>

                      {/* Checklist */}
                      <div className="space-y-3 pt-2 pb-8 border-t border-neutral-100 dark:border-neutral-700/60">
                        {PRICING_PLANS[0].features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3 text-xs md:text-sm font-bold tracking-wide">
                            {feature.included ? (
                              <span className="text-emerald-600 dark:text-emerald-400 font-black text-base w-4 text-center">
                                +
                              </span>
                            ) : (
                              <span className="text-red-500 font-black text-base w-4 text-center">
                                ✕
                              </span>
                            )}
                            <span className={feature.included ? 'text-neutral-800 dark:text-neutral-200' : 'text-neutral-500 dark:text-neutral-400 font-medium'}>
                              {feature.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => handleStartLearning(PRICING_PLANS[0])}
                      className="w-full py-4 px-6 rounded-full bg-[#f26b1d] hover:bg-[#e05d12] text-white font-extrabold text-base shadow-md hover:shadow-lg transition-all text-center cursor-pointer transform active:scale-[0.98]"
                    >
                      Start Learning
                    </button>
                  </div>

                  {/* CARD 2: Mentor Led (₹9,000 - POPULAR) */}
                  <div className="relative rounded-3xl bg-white dark:bg-neutral-800/95 border-2 border-orange-500/80 dark:border-orange-500 p-8 shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
                    
                    {/* Tilted POPULAR Ribbon Badge */}
                    <div className="absolute -top-3.5 left-6 bg-[#f26b1d] text-white text-[11px] font-black uppercase px-3.5 py-1 rounded-md shadow-md transform -rotate-3 tracking-wider select-none">
                      POPULAR
                    </div>

                    <div>
                      {/* Header */}
                      <div className="text-center mb-6 pt-1">
                        <h3 className="text-3xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
                          Mentor Led
                        </h3>
                        <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mt-1">
                          Live Mentorship
                        </p>
                        
                        <div className="mt-5">
                          <span className="text-4xl md:text-5xl font-black text-neutral-950 dark:text-white tracking-tight">
                            ₹9,000
                          </span>
                          <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mt-1">
                            One Time Payment
                          </p>
                        </div>
                      </div>

                      {/* Checklist */}
                      <div className="space-y-3 pt-2 pb-8 border-t border-neutral-100 dark:border-neutral-700/60">
                        {PRICING_PLANS[1].features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3 text-xs md:text-sm font-bold tracking-wide">
                            <span className="text-emerald-600 dark:text-emerald-400 font-black text-base w-4 text-center">
                              +
                            </span>
                            <span className="text-neutral-800 dark:text-neutral-200">
                              {feature.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => handleStartLearning(PRICING_PLANS[1])}
                      className="w-full py-4 px-6 rounded-full bg-[#f26b1d] hover:bg-[#e05d12] text-white font-extrabold text-base shadow-md hover:shadow-lg transition-all text-center cursor-pointer transform active:scale-[0.98]"
                    >
                      Start Learning
                    </button>
                  </div>

                </div>

                {/* Additional Trust Indicators */}
                <div className="text-center pt-2 text-xs text-neutral-500 dark:text-neutral-400 font-medium flex flex-wrap items-center justify-center gap-6">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" /> ISO 9001:2015 Verified Certificate
                  </span>
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-blue-500" /> Real-Time Industry Capstone Projects
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-orange-500" /> Flexible Timings for College Students
                  </span>
                </div>

              </div>
            ) : (
              /* Enrollment / Checkout Step */
              <div className="max-w-xl mx-auto py-4">
                {isSuccess ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-neutral-900 dark:text-white">
                      Enrollment Request Confirmed!
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-md mx-auto leading-relaxed">
                      You have selected <span className="font-bold text-orange-600">{selectedPlan?.name} ({selectedPlan?.price})</span> for <span className="font-bold text-neutral-900 dark:text-white">{selectedDomainTitle}</span>.
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      Our academic counselor will reach out on your WhatsApp number within 15 minutes to share batch schedules and LMS onboarding credentials.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
                      <div>
                        <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">
                          Program Enrollment & Mentorship
                        </span>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white mt-0.5">
                          {selectedDomainTitle}
                        </h3>
                      </div>
                      <button
                        onClick={() => setShowCheckoutForm(false)}
                        className="text-xs font-semibold text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
                      >
                        ← Back to plans
                      </button>
                    </div>

                    {/* Selected Plan Summary Banner */}
                    <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase">
                          Selected Track
                        </span>
                        <h4 className="text-base font-extrabold text-neutral-900 dark:text-white">
                          {selectedPlan?.name} Plan
                        </h4>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400">
                          {selectedPlan?.subtitle}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-black text-neutral-950 dark:text-white">
                          {selectedPlan?.price}
                        </span>
                        <p className="text-[10px] text-neutral-500 font-semibold">
                          {selectedPlan?.paymentType}
                        </p>
                      </div>
                    </div>

                    {/* Enrollment Form */}
                    <form onSubmit={handleEnrollmentSubmit} className="space-y-4 text-xs">
                      <div>
                        <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Babalu Bharti"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="student@university.edu"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                            WhatsApp / Phone Number *
                          </label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+91 7019680860"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                          College / University & Graduation Year
                        </label>
                        <input
                          type="text"
                          value={college}
                          onChange={(e) => setCollege(e.target.value)}
                          placeholder="e.g. VTU / 2026 Batch"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>

                      <div className="flex items-center justify-end gap-3 pt-3">
                        <button
                          type="button"
                          onClick={() => setShowCheckoutForm(false)}
                          className="px-4 py-2.5 rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors font-semibold"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-3 rounded-full bg-[#f26b1d] hover:bg-[#e05d12] text-white font-extrabold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <span>Confirm Enrollment ({selectedPlan?.price})</span>
                          <ArrowRight className="w-4 h-4" />
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
