import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { Sun, Moon, Sparkles, Briefcase, Users, BookOpen, Menu, X, User, Bookmark } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, setActiveModal, setSelectedCategoryId } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleOpenCategory = (cat?: string) => {
    setSelectedCategoryId(cat || null);
    setActiveModal('internships');
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-2xl bg-white/75 dark:bg-neutral-950/75 border-b border-neutral-200/80 dark:border-neutral-800/80 transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button 
          onClick={() => { setActiveModal(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-105 transition-transform duration-200">
            IL
          </div>
          <span className="font-bold text-lg tracking-tight text-neutral-900 dark:text-white">
            InternsLoom
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <button
            onClick={() => handleOpenCategory()}
            className="text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Programs & Bootcamps
          </button>
          <button
            onClick={() => setActiveModal('mentors')}
            className="text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Mentorship
          </button>
          <button
            onClick={() => setActiveModal('resources')}
            className="text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Resources
          </button>
          <button
            onClick={() => setActiveModal('ai-assistant')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold border border-blue-500/20 hover:bg-blue-500/20 transition-all text-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Skill Match
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

          {/* Applications & Saved Tracker */}
          <button
            onClick={() => setActiveModal('applications')}
            className="relative p-2 rounded-full text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            title="My Applications & Saved"
          >
            <Bookmark className="w-4 h-4" />
            {(user.applications.length > 0 || user.savedInternships.length > 0) && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            )}
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
              onClick={() => handleOpenCategory()}
              className="w-full text-left py-2 text-neutral-800 dark:text-neutral-200 font-medium flex items-center gap-2"
            >
              <Briefcase className="w-4 h-4 text-blue-500" />
              Programs & Curriculum
            </button>
            <button
              onClick={() => { setActiveModal('mentors'); setMobileMenuOpen(false); }}
              className="w-full text-left py-2 text-neutral-800 dark:text-neutral-200 font-medium flex items-center gap-2"
            >
              <Users className="w-4 h-4 text-indigo-500" />
              Mentorship
            </button>
            <button
              onClick={() => { setActiveModal('resources'); setMobileMenuOpen(false); }}
              className="w-full text-left py-2 text-neutral-800 dark:text-neutral-200 font-medium flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-emerald-500" />
              Resources
            </button>
            <button
              onClick={() => { setActiveModal('ai-assistant'); setMobileMenuOpen(false); }}
              className="w-full text-left py-2 text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              AI Resume Match & Cold Email
            </button>
            <button
              onClick={() => { setActiveModal('applications'); setMobileMenuOpen(false); }}
              className="w-full text-left py-2 text-neutral-800 dark:text-neutral-200 font-medium flex items-center gap-2"
            >
              <Bookmark className="w-4 h-4 text-amber-500" />
              My Applications & Saved ({user.applications.length + user.savedInternships.length})
            </button>

          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
