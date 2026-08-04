import React from 'react';
import { useUser } from '../context/UserContext';
import { Globe, Share2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveModal, showToast } = useUser();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'InternsLoom',
        text: 'The bridge between student ambition and professional excellence.',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard!');
    }
  };

  return (
    <footer className="bg-neutral-100 dark:bg-neutral-950 border-t border-neutral-200/80 dark:border-neutral-800/80 py-16 text-neutral-600 dark:text-neutral-400 text-xs transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center font-bold text-xs">
                IL
              </div>
              <p className="text-sm font-bold text-neutral-900 dark:text-white">InternsLoom</p>
            </div>
            <p className="leading-relaxed text-neutral-500 dark:text-neutral-400">
              Elevating the internship experience through precision matching and elite resources.
            </p>
          </div>

          {/* Discover */}
          <div className="space-y-3">
            <p className="font-bold text-neutral-900 dark:text-white uppercase tracking-wider text-[11px]">Discover</p>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveModal('internships')} className="hover:underline hover:text-neutral-900 dark:hover:text-white transition-colors">
                  Internships
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('internships')} className="hover:underline hover:text-neutral-900 dark:hover:text-white transition-colors">
                  Fellowships
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('resources')} className="hover:underline hover:text-neutral-900 dark:hover:text-white transition-colors">
                  Programs
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <p className="font-bold text-neutral-900 dark:text-white uppercase tracking-wider text-[11px]">Company</p>
            <ul className="space-y-2">
              <li>
                <button onClick={() => showToast('InternsLoom connects students with elite tech teams.')} className="hover:underline hover:text-neutral-900 dark:hover:text-white transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => showToast('Partner with InternsLoom for university skill & training programs.')} className="hover:underline hover:text-neutral-900 dark:hover:text-white transition-colors">
                  Partner With Us
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('internships')} className="hover:underline hover:text-neutral-900 dark:hover:text-white transition-colors">
                  Careers
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <p className="font-bold text-neutral-900 dark:text-white uppercase tracking-wider text-[11px]">Legal</p>
            <ul className="space-y-2">
              <li>
                <button onClick={() => showToast('Privacy Policy: All student data is end-to-end encrypted.')} className="hover:underline hover:text-neutral-900 dark:hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => showToast('Terms of Use: Free for verified university students.')} className="hover:underline hover:text-neutral-900 dark:hover:text-white transition-colors">
                  Terms of Use
                </button>
              </li>
              <li>
                <button onClick={() => showToast('Legal Compliance Standard WCAG 2.1 AA.')} className="hover:underline hover:text-neutral-900 dark:hover:text-white transition-colors">
                  Legal
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-3">
            <p className="font-bold text-neutral-900 dark:text-white uppercase tracking-wider text-[11px]">Support</p>
            <ul className="space-y-2">
              <li>
                <button onClick={() => showToast('Contact: support@internsloom.com')} className="hover:underline hover:text-neutral-900 dark:hover:text-white transition-colors">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('resources')} className="hover:underline hover:text-neutral-900 dark:hover:text-white transition-colors">
                  Site Map
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('resources')} className="hover:underline hover:text-neutral-900 dark:hover:text-white transition-colors">
                  FAQ
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-200/60 dark:border-neutral-800/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-neutral-500 dark:text-neutral-400">
          <p>© 2026 InternsLoom Private Limited All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => showToast('Global Access Enabled')}
              className="p-1.5 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
              title="Global"
            >
              <Globe className="w-4 h-4" />
            </button>
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
              title="Share InternsLoom"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
