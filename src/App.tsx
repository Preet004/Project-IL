import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BentoGrid } from './components/BentoGrid';
import { MentorshipSection } from './components/MentorshipSection';
import { ResourceSection } from './components/ResourceSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { InternshipModal } from './components/InternshipModal';
import { MentorshipModal } from './components/MentorshipModal';
import { VerifyCertificateModal } from './components/VerifyCertificateModal';
import { ContactModal } from './components/ContactModal';
import { Toast } from './components/Toast';

export function AppContent() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans selection:bg-blue-500/20 selection:text-blue-500 transition-colors duration-300">
      <Navbar />
      <main>
        <Hero />
        <BentoGrid />
        <MentorshipSection />
        <ResourceSection />
        <CtaSection />
      </main>
      <Footer />

      {/* Interactive Modals */}
      <InternshipModal />
      <MentorshipModal />
      <VerifyCertificateModal />
      <ContactModal />

      {/* Toast Notification */}
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </ThemeProvider>
  );
}
