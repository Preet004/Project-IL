import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProfile, Application, PageView } from '../types';

interface UserContextType {
  user: UserProfile;
  updateUser: (updates: Partial<UserProfile>) => void;
  toggleSaveInternship: (internshipId: string) => void;
  isSaved: (internshipId: string) => boolean;
  applyToInternship: (internshipId: string, companyName: string, roleTitle: string, note?: string) => void;
  isApplied: (internshipId: string) => boolean;
  activeModal: 'internships' | 'mentors' | 'verify' | 'contact' | 'applications' | null;
  setActiveModal: (modal: 'internships' | 'mentors' | 'verify' | 'contact' | 'applications' | null) => void;
  selectedCategoryId: string | null;
  setSelectedCategoryId: (cat: string | null) => void;
  selectedInternshipId: string | null;
  setSelectedInternshipId: (id: string | null) => void;
  currentView: PageView;
  setCurrentView: (view: PageView) => void;
  navigateToProgram: (programId: string) => void;
  navigateToView: (view: PageView) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const DEFAULT_USER: UserProfile = {
  name: '',
  email: '',
  school: '',
  major: '',
  gradYear: '',
  bio: '',
  skills: [],
  savedInternships: [],
  applications: [],
  theme: 'dark'
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('internsloom_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved user', e);
      }
    }
    return DEFAULT_USER;
  });

  const [activeModal, setActiveModal] = useState<'internships' | 'mentors' | 'verify' | 'contact' | 'applications' | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedInternshipId, setSelectedInternshipId] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const navigateToProgram = (programId: string) => {
    setSelectedInternshipId(programId);
    setCurrentView('program-detail');
    setActiveModal(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToView = (view: PageView) => {
    setCurrentView(view);
    setActiveModal(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    localStorage.setItem('internsloom_user', JSON.stringify(user));
  }, [user]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  };

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updates }));
    showToast('Profile updated successfully');
  };

  const toggleSaveInternship = (internshipId: string) => {
    setUser((prev) => {
      const exists = prev.savedInternships.includes(internshipId);
      const updated = exists
        ? prev.savedInternships.filter((id) => id !== internshipId)
        : [...prev.savedInternships, internshipId];
      
      showToast(exists ? 'Removed from saved internships' : 'Saved to your profile bookmarks');
      return { ...prev, savedInternships: updated };
    });
  };

  const isSaved = (internshipId: string) => {
    return user.savedInternships.includes(internshipId);
  };

  const applyToInternship = (internshipId: string, companyName: string, roleTitle: string, notes?: string) => {
    if (user.applications.some((app) => app.internshipId === internshipId)) {
      showToast('You have already applied for this role!');
      return;
    }

    const newApp: Application = {
      id: `app-${Date.now()}`,
      internshipId,
      companyName,
      roleTitle,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Submitted',
      notes
    };

    setUser((prev) => ({
      ...prev,
      applications: [newApp, ...prev.applications]
    }));

    showToast(`Successfully applied to ${companyName}!`);
  };

  const isApplied = (internshipId: string) => {
    return user.applications.some((app) => app.internshipId === internshipId);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        toggleSaveInternship,
        isSaved,
        applyToInternship,
        isApplied,
        activeModal,
        setActiveModal,
        selectedCategoryId,
        setSelectedCategoryId,
        selectedInternshipId,
        setSelectedInternshipId,
        currentView,
        setCurrentView,
        navigateToProgram,
        navigateToView,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
