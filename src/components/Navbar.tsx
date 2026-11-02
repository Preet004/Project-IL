import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { Sun, Moon, Briefcase, Users, ShieldCheck, Phone, HelpCircle, Menu, X, ArrowUpRight } from 'lucide-react';
import { DepartmentCategory } from '../types';
import { BrandLogo } from './BrandLogo';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { setActiveModal, setSelectedCategoryId, navigateToView, currentView } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleOpenCategory = (cat?: DepartmentCategory | null) => {
    navigateToView('home');
    setSelectedCategoryId(cat || null);
    setActiveModal('internships');
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-2xl bg-white/85 dark:bg-[#070b12]/85 border-b border-neutral-200/80 dark:border-neutral-800/80 transition-colors duration-300">
      <div className="max-w-[1240px] mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button 
          onClick={() => { navigateToView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
          className="focus:outline-none cursor-pointer flex items-center gap-2 group"
          aria-label="InternsLoom Home"
        >
          <BrandLogo variant="navbar" />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
          <button
            onClick={() => navigateToView('programs')}
            className={`transition-all cursor-pointer ${
              currentView === 'programs'
                ? 'text-cyan-600 dark:text-cyan-400 font-bold'
                : 'text-neutral-600 dark:text-neutral-300 hover:text-cyan-600 dark:hover:text-cyan-400'
            }`}
          >
            Programs & Tracks
          </button>
          
          <button
            onClick={() => setActiveModal('mentors')}
            className="text-neutral-600 dark:text-neutral-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all cursor-pointer"
          >
            Mentorship
          </button>

          <button
            onClick={() => navigateToView('careers')}
            className={`transition-all cursor-pointer ${
              currentView === 'careers'
                ? 'text-cyan-600 dark:text-cyan-400 font-bold'
                : 'text-neutral-600 dark:text-neutral-300 hover:text-cyan-600 dark:hover:text-cyan-400'
            }`}
          >
            Careers
          </button>

          <button
            onClick={() => setActiveModal('verify')}
            className="text-neutral-600 dark:text-neutral-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Verify Credential</span>
          </button>

          <a
            href="#faqs"
            onClick={() => { if (currentView !== 'home') navigateToView('home'); }}
            className="text-neutral-600 dark:text-neutral-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all"
          >
            FAQs
          </a>

          <button
            onClick={() => {
              if (currentView === 'home') {
                const el = document.getElementById('contact-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else setActiveModal('contact');
              } else {
                navigateToView('contact');
              }
            }}
            className={`transition-all cursor-pointer ${
              currentView === 'contact'
                ? 'text-cyan-600 dark:text-cyan-400 font-bold'
                : 'text-neutral-600 dark:text-neutral-300 hover:text-cyan-600 dark:hover:text-cyan-400'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-700" />}
          </button>

          {/* Quick Apply CTA */}
          <button
            onClick={() => navigateToView('programs')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-cyan-500/25 transition-all flex items-center gap-1.5 cursor-pointer hover:shadow-cyan-500/40"
          >
            <span>Apply Now</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-neutral-600 dark:text-neutral-300"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-6 py-5 space-y-3"
          >
            <button
              onClick={() => { navigateToView('programs'); setMobileMenuOpen(false); }}
              className="w-full text-left py-2 text-neutral-800 dark:text-neutral-200 font-medium flex items-center gap-2.5 cursor-pointer"
            >
              <Briefcase className="w-4 h-4 text-blue-500" />
              Programs & Bootcamps
            </button>
            <button
              onClick={() => { setActiveModal('mentors'); setMobileMenuOpen(false); }}
              className="w-full text-left py-2 text-neutral-800 dark:text-neutral-200 font-medium flex items-center gap-2.5 cursor-pointer"
            >
              <Users className="w-4 h-4 text-indigo-500" />
              Mentorship
            </button>
            <button
              onClick={() => { navigateToView('careers'); setMobileMenuOpen(false); }}
              className="w-full text-left py-2 text-neutral-800 dark:text-neutral-200 font-medium flex items-center gap-2.5 cursor-pointer"
            >
              <Briefcase className="w-4 h-4 text-emerald-500" />
              Careers & Vacancies
            </button>
            <button
              onClick={() => { setActiveModal('verify'); setMobileMenuOpen(false); }}
              className="w-full text-left py-2 text-neutral-800 dark:text-neutral-200 font-medium flex items-center gap-2.5 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Verify Certificate
            </button>
            <a
              href="#faqs"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-left py-2 text-neutral-800 dark:text-neutral-200 font-medium flex items-center gap-2.5 block cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-amber-500" />
              FAQs
            </a>
            <button
              onClick={() => { setActiveModal('contact'); setMobileMenuOpen(false); }}
              className="w-full text-left py-2 text-neutral-800 dark:text-neutral-200 font-medium flex items-center gap-2.5 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-purple-500" />
              Contact Us
            </button>
            <div className="pt-2">
              <button
                onClick={() => { navigateToView('programs'); setMobileMenuOpen(false); }}
                className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs text-center cursor-pointer"
              >
                Apply for Batch
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
