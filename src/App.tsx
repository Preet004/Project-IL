import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider, useUser } from './context/UserContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BentoGrid } from './components/BentoGrid';
import { InteractiveValueEngine } from './components/InteractiveValueEngine';
import { MentorshipSection } from './components/MentorshipSection';
import { ResourceSection } from './components/ResourceSection';
import { ContactSection } from './components/ContactSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { ProgramDetailPage } from './components/ProgramDetailPage';
import { ProgramsCatalogPage } from './components/ProgramsCatalogPage';
import { CareersPage } from './components/CareersPage';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ApplicationsTrackerModal } from './components/ApplicationsTrackerModal';
import { MentorshipModal } from './components/MentorshipModal';
import { VerifyCertificateModal } from './components/VerifyCertificateModal';
import { ContactModal } from './components/ContactModal';
import { Toast } from './components/Toast';

export function AppContent() {
  const { currentView } = useUser();

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans selection:bg-blue-500/20 selection:text-blue-500 transition-colors duration-300 flex flex-col justify-between">
      <div>
        <Navbar />
        
        <main>
          {currentView === 'home' && (
            <>
              <Hero />
              <BentoGrid />
              <InteractiveValueEngine />
              <MentorshipSection />
              <ResourceSection />
              <ContactSection />
              <CtaSection />
            </>
          )}

          {currentView === 'programs' && <ProgramsCatalogPage />}

          {currentView === 'program-detail' && <ProgramDetailPage />}

          {currentView === 'careers' && <CareersPage />}

          {currentView === 'contact' && (
            <div className="pt-6">
              <ContactSection />
            </div>
          )}
        </main>
      </div>

      <Footer />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp phoneNumber="917019680860" />

      {/* Interactive Modals */}
      <ApplicationsTrackerModal />
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
