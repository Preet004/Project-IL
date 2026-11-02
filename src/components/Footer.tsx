import React from 'react';
import { useUser } from '../context/UserContext';
import { Globe, Phone, Mail, ShieldCheck, MapPin, Briefcase } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { DepartmentCategory } from '../types';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  const { setActiveModal, setSelectedCategoryId, navigateToView, showToast } = useUser();

  const handleOpenDomain = (dom: DepartmentCategory) => {
    setSelectedCategoryId(dom);
    navigateToView('programs');
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/917019680860?text=Hi%20InternsLoom,%20I%20have%20an%20inquiry%20regarding%20your%20training%20and%20internship%20programs.', '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-neutral-100 dark:bg-neutral-950 border-t border-neutral-200/80 dark:border-neutral-800/80 py-16 text-neutral-600 dark:text-neutral-400 text-xs transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <BrandLogo variant="footer" />
            
            <p className="leading-relaxed text-neutral-500 dark:text-neutral-400 max-w-sm">
              The premier bridge between academic classroom learning and live industry engineering excellence. Offering mentor-led technical training, production capstone internships, and ISO 9001:2015 accredited certifications.
            </p>

            <div className="space-y-1.5 text-[11px] text-neutral-500 dark:text-neutral-400 pt-2">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-500" />
                <span>Student Support: +91 7019680860 / +91 6361187682</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-indigo-500" />
                <span>Helpdesk: support@internsloom.com</span>
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Recognized by MSME, MCA & Startup India</span>
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={handleWhatsApp}
                className="px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-[11px] flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
                <span>Chat on WhatsApp: +91 7019680860</span>
              </button>
            </div>
          </div>

          {/* Popular Domains */}
          <div className="space-y-3">
            <p className="font-bold text-neutral-900 dark:text-white uppercase tracking-wider text-[11px]">Popular Domains</p>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleOpenDomain('Web Development')} className="hover:underline hover:text-neutral-900 dark:hover:text-white transition-colors text-left cursor-pointer">
                  Web Development
                </button>
              </li>
              <li>
                <button onClick={() => handleOpenDomain('Artificial Intelligence & ML')} className="hover:underline hover:text-neutral-900 dark:hover:text-white transition-colors text-left cursor-pointer">
                  Artificial Intelligence & ML
                </button>
              </li>
              <li>
                <button onClick={() => handleOpenDomain('Data Science & Analytics')} className="hover:underline hover:text-neutral-900 dark:hover:text-white transition-colors text-left cursor-pointer">
                  Data Science & Analytics
                </button>
              </li>
              <li>
                <button onClick={() => handleOpenDomain('Cyber Security & Ethical Hacking')} className="hover:underline hover:text-neutral-900 dark:hover:text-white transition-colors text-left cursor-pointer">
                  Cyber Security & Forensics
                </button>
              </li>
              <li>
                <button onClick={() => handleOpenDomain('Cloud Computing & DevOps')} className="hover:underline hover:text-neutral-900 dark:hover:text-white transition-colors text-left cursor-pointer">
                  Cloud Computing & DevOps
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <p className="font-bold text-neutral-900 dark:text-white uppercase tracking-wider text-[11px]">Platform</p>
            <ul className="space-y-2">
              <li>
                <button onClick={() => navigateToView('programs')} className="hover:underline hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer">
                  All 79 Programs & Bootcamps
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('mentors')} className="hover:underline hover:text-neutral-900 dark:hover:text-white transition-colors">
                  Domain Mentorship
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('verify')} className="hover:underline hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Verify Certificate</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigateToView('careers')} className="hover:underline hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-blue-500" />
                  <span>Careers & Job Openings</span>
                </button>
              </li>
              <li>
                <a href="#faqs" className="hover:underline hover:text-neutral-900 dark:hover:text-white transition-colors block">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <button onClick={() => {
                  const el = document.getElementById('contact-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else navigateToView('contact');
                }} className="hover:underline hover:text-neutral-900 dark:hover:text-white transition-colors">
                  Contact Support (+91 7019680860)
                </button>
              </li>
            </ul>
          </div>

          {/* Accreditation & Quality */}
          <div className="space-y-3">
            <p className="font-bold text-neutral-900 dark:text-white uppercase tracking-wider text-[11px]">Accreditation</p>
            <div className="space-y-2 text-neutral-500 dark:text-neutral-400">
              <p className="font-medium text-neutral-800 dark:text-neutral-200">ISO 9001:2015 Certified</p>
              <p className="text-[11px] leading-relaxed">
                Quality Management System audited and accredited for technical education and vocational internship training.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setActiveModal('verify')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 font-semibold text-[11px] border border-emerald-500/20 hover:bg-emerald-600/20 transition-colors"
                >
                  Verify Student Credential
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-200/60 dark:border-neutral-800/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-neutral-500 dark:text-neutral-400">
          <p>© 2026 InternsLoom Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-6 text-[11px]">
            <button onClick={() => showToast('All student records are end-to-end encrypted.')} className="hover:underline">
              Privacy Policy
            </button>
            <button onClick={() => showToast('Terms: Academic code of conduct applies to all batches.')} className="hover:underline">
              Terms of Service
            </button>
            <button onClick={() => showToast('Operating under Ministry of Corporate Affairs (MCA) registration.')} className="hover:underline">
              Compliance
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
