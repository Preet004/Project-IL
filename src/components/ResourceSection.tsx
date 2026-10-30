import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useUser } from '../context/UserContext';
import { TESTIMONIALS, FAQS } from '../data/mockData';
import { ShieldCheck, Award, Star, ChevronDown, ChevronUp, CheckCircle, BookOpen, Layers, Users, ArrowUpRight } from 'lucide-react';

export const ResourceSection: React.FC = () => {
  const { setActiveModal } = useUser();
  const [openFaq, setOpenFaq] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="space-y-24 py-16">
      
      {/* 1. Dual-Phase Model Section (Why Choose Us) */}
      <section className="max-w-[1200px] mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-3">
            <ShieldCheck className="w-4 h-4" />
            <span>Proven Learning Framework</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-950 dark:text-white tracking-tight mb-3">
            Why Choose Our Training & Internship Model?
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-base">
            Engineered specifically to solve the gap between traditional college curriculums and high-demand corporate technical standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div className="p-8 rounded-3xl bg-neutral-50/80 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-lg">
              01
            </div>
            <h3 className="text-xl font-bold text-neutral-950 dark:text-white">
              Phase 1: Foundation Skill Training
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              4 weeks of intensive, mentor-led live interactive classes covering modern industry frameworks, coding best practices, and architecture principles.
            </p>
            <ul className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300 pt-2 border-t border-neutral-200 dark:border-neutral-800">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Live Interactive Classes & Recorded LMS Archives</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Weekly Coding Drills & Architecture Reviews</span>
              </li>
            </ul>
          </div>

          {/* Pillar 2 */}
          <div className="p-8 rounded-3xl bg-neutral-50/80 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-lg">
              02
            </div>
            <h3 className="text-xl font-bold text-neutral-950 dark:text-white">
              Phase 2: Live Capstone Internship
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              2 months working in agile sprints on real-world client-level software solutions. Develop full stack features, resolve bug tickets, and deploy to production.
            </p>
            <ul className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300 pt-2 border-t border-neutral-200 dark:border-neutral-800">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-500 shrink-0" />
                <span>Real production environments & Git pull requests</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-500 shrink-0" />
                <span>Direct mentor code evaluation & feedback</span>
              </li>
            </ul>
          </div>

          {/* Pillar 3 */}
          <div className="p-8 rounded-3xl bg-neutral-50/80 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-lg">
              03
            </div>
            <h3 className="text-xl font-bold text-neutral-950 dark:text-white">
              Phase 3: Certification & LOR
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Receive accredited, online-verifiable ISO 9001:2015 certifications, verified internship experience letters, and merit Letters of Recommendation.
            </p>
            <ul className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300 pt-2 border-t border-neutral-200 dark:border-neutral-800">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>ISO 9001:2015 Accredited Quality Certificate</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Verified Online QR & ID Authentication</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 2. Testimonials & Student Reviews from internsforge.com */}
      <section className="bg-neutral-100/60 dark:bg-neutral-900/30 py-20 border-y border-neutral-200/80 dark:border-neutral-800/80">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold mb-3">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>Real Student Stories</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-950 dark:text-white tracking-tight mb-3">
              Trusted by 50,000+ Enrolled Learners
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-base">
              Hear directly from students who transformed their technical skills into career offers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((review) => (
              <div
                key={review.id}
                className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed italic">
                    "{review.review}"
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover border border-neutral-200 dark:border-neutral-700"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900 dark:text-white">{review.name}</h4>
                    <p className="text-[10px] text-neutral-500 dark:text-neutral-400">{review.role}</p>
                    <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">{review.program}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Frequently Asked Questions (FAQ Section from internsforge.com) */}
      <section id="faqs" className="max-w-[900px] mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-3">
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-950 dark:text-white tracking-tight mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-base">
            Everything you need to know about batch schedules, live classes, project submissions, and certifications.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-white dark:bg-neutral-900 transition-colors"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between font-bold text-sm text-neutral-900 dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-5 pt-0 border-t border-neutral-100 dark:border-neutral-800/60 text-xs md:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed"
                  >
                    <p className="mt-2">{faq.answer}</p>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* Verification Helper Callout */}
        <div className="mt-12 p-6 rounded-3xl bg-neutral-900 dark:bg-neutral-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold flex items-center justify-center sm:justify-start gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Need to verify a student's certificate?</span>
            </h4>
            <p className="text-xs text-neutral-300 max-w-md">
              Employers, recruiters, and university placement coordinators can verify credential validity instantly online.
            </p>
          </div>
          <button
            onClick={() => setActiveModal('verify')}
            className="px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs shrink-0 transition-colors shadow-md flex items-center gap-1.5"
          >
            <span>Verify Certificate Now</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
};
