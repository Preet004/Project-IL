import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useUser } from '../context/UserContext';
import { X, Phone, Mail, MessageSquare, Clock, MapPin, Send, CheckCircle } from 'lucide-react';

export const ContactModal: React.FC = () => {
  const { activeModal, setActiveModal, showToast } = useUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (activeModal !== 'contact') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your inquiry has been sent to our academic desk. We will reach out shortly.');
    setTimeout(() => {
      setSubmitted(false);
      setActiveModal(null);
    }, 2500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setActiveModal(null)}
          className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden z-10 my-6 flex flex-col"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/80 dark:bg-neutral-900/80">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-neutral-900 dark:text-white">Contact & Student Support</h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Get assistance regarding batch schedules, LMS access, or enrollment</p>
              </div>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="p-2 rounded-full text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Message Received!</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
                  Thank you for reaching out. A student counselor from our support desk will respond within 24 business hours.
                </p>
              </div>
            ) : (
              <>
                {/* Contact Information Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 space-y-1">
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold">
                      <Phone className="w-4 h-4" />
                      <span>Phone & WhatsApp Support</span>
                    </div>
                    <p className="text-neutral-800 dark:text-neutral-200 font-medium">+91 7019680860</p>
                    <p className="text-neutral-500 dark:text-neutral-400 text-[11px]">Alt: +91 6361187682</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 space-y-1">
                    <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold">
                      <Mail className="w-4 h-4" />
                      <span>Direct Email</span>
                    </div>
                    <p className="text-neutral-800 dark:text-neutral-200 font-medium">support@internsloom.com</p>
                    <p className="text-neutral-500 dark:text-neutral-400 text-[11px]">helpdesk@internsloom.com</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 space-y-1">
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
                      <Clock className="w-4 h-4" />
                      <span>Operational Hours</span>
                    </div>
                    <p className="text-neutral-800 dark:text-neutral-200 font-medium">Monday – Saturday</p>
                    <p className="text-neutral-500 dark:text-neutral-400 text-[11px]">9:00 AM – 7:00 PM IST</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 space-y-1">
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold">
                      <MapPin className="w-4 h-4" />
                      <span>Headquarters & Registration</span>
                    </div>
                    <p className="text-neutral-800 dark:text-neutral-200 font-medium">Recognized by MCA & MSME</p>
                    <p className="text-neutral-500 dark:text-neutral-400 text-[11px]">Startup India Accredited</p>
                  </div>
                </div>

                {/* Direct Message Form */}
                <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Babalu Bharti"
                        className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="student@example.com"
                        className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 7019680860"
                      className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">Your Message or Query</label>
                    <textarea
                      rows={3}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your question about training batches, syllabus, or live classes..."
                      className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        window.open('https://wa.me/917019680860?text=Hi%20InternsLoom,%20I%20have%20an%20inquiry%20regarding%20the%20training%20and%20internship%20programs.', '_blank', 'noopener,noreferrer');
                      }}
                      className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Chat on WhatsApp</span>
                    </button>

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveModal(null)}
                        className="px-4 py-2 rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" /> Send Inquiry
                      </button>
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
