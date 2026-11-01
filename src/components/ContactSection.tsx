import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useUser } from '../context/UserContext';
import { 
  Phone, 
  Mail, 
  Clock, 
  MapPin, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  HelpCircle,
  Headphones
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { showToast } = useUser();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [domainInterest, setDomainInterest] = useState('Full Stack Web Development');
  const [learningPlan, setLearningPlan] = useState<'Self Paced (₹6,500)' | 'Mentor Led (₹9,000)' | 'General Inquiry'>('Mentor Led (₹9,000)');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast('Thank you! Your inquiry has been sent to our academic desk.');
    }, 800);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hi InternsLoom! I am interested in ${domainInterest} (${learningPlan}). My name is ${fullName || 'a student'}. Please provide enrollment details.`
    );
    window.open(`https://wa.me/917019680860?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact-section" className="py-20 bg-white dark:bg-neutral-900 border-t border-neutral-200/80 dark:border-neutral-800 transition-colors duration-300">
      <div className="max-w-[1240px] mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold">
            <Headphones className="w-3.5 h-3.5" />
            <span>Official Student Support & Admissions Desk</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
            Get in Touch with InternsLoom
          </h2>
          <p className="text-base text-neutral-600 dark:text-neutral-400">
            Have questions about upcoming batch dates, LMS access, syllabus modules, or scholarship grants? Our team is here to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Phone & WhatsApp Card */}
            <div className="p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                    Direct Phone & WhatsApp
                  </h3>
                  <p className="text-xs text-neutral-500">Official student admission line</p>
                </div>
              </div>

              <div className="space-y-2 pt-1 text-sm">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-700/70">
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-blue-500" />
                    <span className="font-bold text-neutral-900 dark:text-white">+91 7019680860</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600">
                    Primary / WhatsApp
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-700/70">
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-indigo-500" />
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200">+91 6361187682</span>
                  </div>
                  <span className="text-[10px] text-neutral-400">
                    Admissions Desk
                  </span>
                </div>
              </div>

              {/* Instant WhatsApp Button */}
              <button
                onClick={handleWhatsAppDirect}
                className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Instantly on WhatsApp (+91 7019680860)</span>
              </button>
            </div>

            {/* Email & Support Hours */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
                  Official Email
                </h4>
                <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 break-all">
                  support@internsloom.com
                </p>
                <p className="text-[11px] text-neutral-400">
                  Response within 24 hours
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
                  Working Hours
                </h4>
                <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                  Mon – Sat: 9:30 AM – 7:30 PM IST
                </p>
                <p className="text-[11px] text-neutral-400">
                  Sundays closed for batches
                </p>
              </div>
            </div>

            {/* Accreditations Trust Banner */}
            <div className="p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/70 dark:border-blue-900/40 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <h4 className="font-bold text-neutral-900 dark:text-white">
                  Government & Industry Recognized
                </h4>
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-[11px]">
                  InternsLoom is accredited under ISO 9001:2015 standards, recognized by MSME, MCA, and Startup India initiatives.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-neutral-50 dark:bg-neutral-800/40 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 p-6 md:p-8 shadow-sm">
            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
                  Inquiry Successfully Received!
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md mx-auto leading-relaxed">
                  Thank you for writing to us, <strong>{fullName}</strong>. An admissions coordinator has received your inquiry for <strong>{domainInterest}</strong> and will connect via WhatsApp/phone at <strong>{phone}</strong> shortly.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFullName('');
                      setEmail('');
                      setPhone('');
                      setMessage('');
                    }}
                    className="px-5 py-2.5 rounded-full border border-neutral-300 dark:border-neutral-700 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                  <button
                    onClick={handleWhatsAppDirect}
                    className="px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Chat on WhatsApp</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-neutral-950 dark:text-white">
                    Send Us an Inquiry
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Fill out the form and our academic team will get back to you with batch schedules and fee structures.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Babalu Bharti"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      WhatsApp Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 9876543210"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Domain of Interest *
                    </label>
                    <select
                      value={domainInterest}
                      onChange={(e) => setDomainInterest(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Full Stack Web Development">Full Stack Web Development</option>
                      <option value="Artificial Intelligence (AI / ML)">Artificial Intelligence (AI / ML)</option>
                      <option value="Data Science & Predictive Analytics">Data Science & Predictive Analytics</option>
                      <option value="Cloud Computing (AWS / DevOps)">Cloud Computing (AWS / DevOps)</option>
                      <option value="Cyber Security & Ethical Hacking">Cyber Security & Ethical Hacking</option>
                      <option value="Python Programming">Python Programming</option>
                      <option value="Java Full Stack Development">Java Full Stack Development</option>
                      <option value="UI/UX Design">UI/UX Design</option>
                      <option value="Embedded Systems & IoT">Embedded Systems & IoT</option>
                      <option value="Other Technology Domain">Other Technology Domain</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    Preferred Learning Structure
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'Self Paced (₹6,500)', label: 'Self Paced (₹6,500)' },
                      { id: 'Mentor Led (₹9,000)', label: 'Mentor Led (₹9,000)' },
                      { id: 'General Inquiry', label: 'General Inquiry' },
                    ].map((opt) => (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => setLearningPlan(opt.id as any)}
                        className={`p-2.5 rounded-xl text-xs font-semibold border text-center transition-all cursor-pointer ${
                          learningPlan === opt.id
                            ? 'border-orange-500 bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold'
                            : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    Your Message / Specific Questions
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask about batch timings, live project details, certification validity, or installment options..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3 px-6 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Sending Inquiry...' : 'Submit Inquiry'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppDirect}
                    className="py-3 px-5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
