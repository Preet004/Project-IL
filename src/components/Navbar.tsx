import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme, PALETTES, ColorPalette } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { Sun, Moon, Briefcase, Users, ShieldCheck, Phone, HelpCircle, Menu, X, ArrowUpRight, Palette } from 'lucide-react';
import { DepartmentCategory } from '../types';
import { BrandLogo } from './BrandLogo';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme, colorPalette, setColorPalette, activePaletteInfo } = useTheme();
  const { setActiveModal, setSelectedCategoryId, navigateToView, currentView } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [palettePickerOpen, setPalettePickerOpen] = useState(false);

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
            style={{ color: currentView === 'programs' ? 'var(--primary)' : undefined }}
            className={`transition-all cursor-pointer ${
              currentView === 'programs'
                ? 'font-bold'
                : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            Programs & Tracks
          </button>
          
          <button
            onClick={() => setActiveModal('mentors')}
            className="text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-all cursor-pointer"
          >
            Mentorship
          </button>

          <button
            onClick={() => navigateToView('careers')}
            style={{ color: currentView === 'careers' ? 'var(--primary)' : undefined }}
            className={`transition-all cursor-pointer ${
              currentView === 'careers'
                ? 'font-bold'
                : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            Careers
          </button>

          <button
            onClick={() => setActiveModal('verify')}
            className="text-neutral-600 dark:text-neutral-300 hover:text-emerald-500 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Verify Credential</span>
          </button>

          <a
            href="#faqs"
            onClick={() => { if (currentView !== 'home') navigateToView('home'); }}
            className="text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-all"
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
            style={{ color: currentView === 'contact' ? 'var(--primary)' : undefined }}
            className={`transition-all cursor-pointer ${
              currentView === 'contact'
                ? 'font-bold'
                : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center gap-3">
          
          {/* Color Palette Switcher */}
          <div className="relative">
            <button
              onClick={() => setPalettePickerOpen(!palettePickerOpen)}
              title="Change Color Theme"
              className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer flex items-center gap-1.5 border border-neutral-200 dark:border-neutral-800"
            >
              <span 
                className="w-3.5 h-3.5 rounded-full inline-block shadow-xs"
                style={{ backgroundColor: activePaletteInfo.primaryColor }}
              />
              <span className="text-xs font-semibold hidden lg:inline">Theme Colors</span>
            </button>

            {palettePickerOpen && (
              <div 
                className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl p-2 z-50 space-y-1"
                onMouseLeave={() => setPalettePickerOpen(false)}
              >
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  Select Accent Palette
                </div>
                {PALETTES.map((pal) => (
                  <button
                    key={pal.id}
                    onClick={() => {
                      setColorPalette(pal.id);
                      setPalettePickerOpen(false);
                    }}
                    className={`w-full px-3 py-2 rounded-xl text-left text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                      colorPalette === pal.id
                        ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-950 dark:text-white'
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span 
                        className="w-3.5 h-3.5 rounded-full"
                        style={{ backgroundColor: pal.primaryColor }}
                      />
                      <span>{pal.name}</span>
                    </div>
                    {colorPalette === pal.id && (
                      <span className="text-[10px] font-mono text-emerald-500">Active</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Light/Dark Theme Toggle */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer border border-neutral-200 dark:border-neutral-800"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-700" />}
          </button>

          {/* Quick Apply CTA with Dynamic Palette Gradient */}
          <button
            onClick={() => navigateToView('programs')}
            className="px-5 py-2.5 rounded-xl bg-brand-gradient text-white font-bold text-xs shadow-glow transition-all flex items-center gap-1.5 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Apply Now</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Color Switcher */}
          <button
            onClick={() => {
              const ids: ColorPalette[] = ['emerald', 'violet', 'sunset', 'ocean'];
              const next = ids[(ids.indexOf(colorPalette) + 1) % ids.length];
              setColorPalette(next);
            }}
            className="p-2 rounded-lg text-neutral-600 dark:text-neutral-300"
            title="Cycle Palette"
          >
            <span 
              className="w-4 h-4 rounded-full inline-block"
              style={{ backgroundColor: activePaletteInfo.primaryColor }}
            />
          </button>

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
            className="md:hidden border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-6 py-5 space-y-4"
          >
            <div className="flex flex-col space-y-3 font-semibold text-sm">
              <button
                onClick={() => { navigateToView('programs'); setMobileMenuOpen(false); }}
                className="text-left text-neutral-800 dark:text-neutral-200 py-1"
              >
                Programs & Bootcamps
              </button>
              <button
                onClick={() => { setActiveModal('mentors'); setMobileMenuOpen(false); }}
                className="text-left text-neutral-800 dark:text-neutral-200 py-1"
              >
                Domain Mentorship
              </button>
              <button
                onClick={() => { navigateToView('careers'); setMobileMenuOpen(false); }}
                className="text-left text-neutral-800 dark:text-neutral-200 py-1"
              >
                Careers
              </button>
              <button
                onClick={() => { setActiveModal('verify'); setMobileMenuOpen(false); }}
                className="text-left text-neutral-800 dark:text-neutral-200 py-1 flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Verify Certificate</span>
              </button>
              <button
                onClick={() => { navigateToView('contact'); setMobileMenuOpen(false); }}
                className="text-left text-neutral-800 dark:text-neutral-200 py-1"
              >
                Contact
              </button>
            </div>

            <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800">
              <button
                onClick={() => { navigateToView('programs'); setMobileMenuOpen(false); }}
                className="w-full py-3 rounded-xl bg-brand-gradient text-white font-bold text-xs text-center shadow-md flex items-center justify-center gap-1.5"
              >
                <span>Apply to Program</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
