import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { Sun, Moon, Briefcase, Users, ShieldCheck, Phone, HelpCircle, Menu, X, ArrowUpRight } from 'lucide-react';
import { DepartmentCategory } from '../types';

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
    <header className="sticky top-0 z-40 w-full backdrop-blur-2xl bg-white/80 dark:bg-neutral-950/80 border-b border-neutral-200/80 dark:border-neutral-800/80 transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button 
          onClick={() => { navigateToView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
          className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-105 transition-transform duration-200">
            IL
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight text-neutral-900 dark:text-white">
              InternsLoom
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              ISO 9001:2015
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => handleOpenCategory(null)}
            className={`transition-colors cursor-pointer ${
              currentView === 'home'
                ? 'text-neutral-900 dark:text-white font-bold'
                : 'text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
          >
            Programs & Bootcamps
          </button>
          
          <button
            onClick={() => setActiveModal('mentors')}
            className="text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
          >
            Mentorship
          </button>

          <button
            onClick={() => navigateToView('careers')}
            className={`transition-colors cursor-pointer ${
              currentView === 'careers'
                ? 'text-blue-600 dark:text-blue-400 font-bold'
                : 'text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
          >
            Careers
          </button>

          <button
            onClick={() => setActiveModal('verify')}
            className="text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Verify Certificate</span>
          </button>

          <a
            href="#faqs"
            onClick={() => { if (currentView !== 'home') navigateToView('home'); }}
            className="text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
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
            className={`transition-colors cursor-pointer ${
              currentView === 'contact'
                ? 'text-blue-600 dark:text-blue-400 font-bold'
                : 'text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400'
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
            className="p-2 rounded-full text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Quick Apply CTA */}
          <button
            onClick={() => handleOpenCategory(null)}
            className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5"
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
              onClick={() => handleOpenCategory(null)}
              className="w-full text-left py-2 text-neutral-800 dark:text-neutral-200 font-medium flex items-center gap-2.5"
            >
              <Briefcase className="w-4 h-4 text-blue-500" />
              Programs & Bootcamps
            </button>
            <button
              onClick={() => { setActiveModal('mentors'); setMobileMenuOpen(false); }}
              className="w-full text-left py-2 text-neutral-800 dark:text-neutral-200 font-medium flex items-center gap-2.5"
            >
              <Users className="w-4 h-4 text-indigo-500" />
              Mentorship
            </button>
            <button
              onClick={() => { navigateToView('careers'); setMobileMenuOpen(false); }}
              className="w-full text-left py-2 text-neutral-800 dark:text-neutral-200 font-medium flex items-center gap-2.5"
            >
              <Briefcase className="w-4 h-4 text-emerald-500" />
              Careers & Vacancies
            </button>
            <button
              onClick={() => { setActiveModal('verify'); setMobileMenuOpen(false); }}
              className="w-full text-left py-2 text-neutral-800 dark:text-neutral-200 font-medium flex items-center gap-2.5"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Verify Certificate
            </button>
            <a
              href="#faqs"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-left py-2 text-neutral-800 dark:text-neutral-200 font-medium flex items-center gap-2.5 block"
            >
              <HelpCircle className="w-4 h-4 text-amber-500" />
              FAQs
            </a>
            <button
              onClick={() => { setActiveModal('contact'); setMobileMenuOpen(false); }}
              className="w-full text-left py-2 text-neutral-800 dark:text-neutral-200 font-medium flex items-center gap-2.5"
            >
              <Phone className="w-4 h-4 text-purple-500" />
              Contact Us
            </button>
            <div className="pt-2">
              <button
                onClick={() => handleOpenCategory(null)}
                className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs text-center"
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
