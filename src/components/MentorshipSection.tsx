import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useUser } from '../context/UserContext';
import { 
  ShieldCheck, 
  BookOpen, 
  Clock, 
  Users, 
  Check, 
  X, 
  Sparkles, 
  Zap, 
  Award
} from 'lucide-react';

export const MentorshipSection: React.FC = () => {
  const { setActiveModal } = useUser();
  const [selectedDomain, setSelectedDomain] = useState<string>('Full Stack Web Development');

  const domainOptions = Array.from(
    new Set([
      'Full Stack Web Development',
      'Artificial Intelligence',
      'Machine Learning',
      'Data Science',
      'Data Analytics',
      'Cloud Computing (AWS / Azure)',
      'Cyber Security',
      'VLSI & Embedded Systems',
      'Python Full Stack Development',
      'Java Full Stack Development',
      'Bioinformatics',
      'Robotics & Automation',
      'Digital Marketing & Business Analytics'
    ])
  );

  const handleStartLearning = () => {
    setActiveModal('mentors');
  };

  return (
    <section id="mentorship" className="relative py-28 bg-[#fafbfc] dark:bg-[#070b12] border-t border-neutral-200/80 dark:border-neutral-800/80 transition-colors duration-300">
      
      {/* Background Cyber Ambient with Dynamic Palette */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[420px] rounded-full blur-[140px] pointer-events-none transition-all duration-700" 
        style={{
          background: 'radial-gradient(circle, rgba(var(--primary-rgb), 0.15) 0%, rgba(var(--secondary-rgb), 0.12) 50%, rgba(var(--accent-rgb), 0.1) 100%)'
        }}
      />
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-40" />

      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-3 border"
            style={{
              backgroundColor: 'rgba(var(--primary-rgb), 0.1)',
              borderColor: 'rgba(var(--primary-rgb), 0.3)',
              color: 'var(--primary)'
            }}
          >
            <Zap className="w-4 h-4" />
            <span>High-Value Mentorship & Transparent Plans</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-extrabold text-neutral-950 dark:text-white tracking-tight mb-4">
            Invest in High-Yield Career Mentorship
          </h2>
          
          <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed">
            No overpriced ₹1,50,000 bootcamps. Transparent one-time pricing with dedicated senior engineer guidance, live production capstones, and verified ISO 9001:2015 certification.
          </p>

          <div 
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-semibold"
            style={{
              backgroundColor: 'rgba(var(--primary-rgb), 0.08)',
              borderColor: 'rgba(var(--primary-rgb), 0.25)',
              color: 'var(--primary)'
            }}
          >
            <span>Average salary ROI realized within the first 14 working days of your new role.</span>
          </div>
        </div>

        {/* Domain Selector Bar */}
        <div className="max-w-xl mx-auto mb-12 flex flex-col sm:flex-row items-center justify-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Select Track:
          </span>
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="w-full sm:w-80 px-4 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-xs font-bold text-neutral-900 dark:text-white shadow-xs focus:outline-none focus:ring-2 cursor-pointer"
            style={{
              outlineColor: 'var(--primary)'
            }}
          >
            {domainOptions.map((domain) => (
              <option key={domain} value={domain}>
                {domain}
              </option>
            ))}
          </select>
        </div>

        {/* 2 VALUE-MAXIMIZING PRICING CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch mb-16">
          
          {/* CARD 1: Self Paced (₹6,500) */}
          <div className="relative rounded-3xl bg-white dark:bg-neutral-900/90 border border-neutral-200/90 dark:border-neutral-800 p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all flex flex-col justify-between group">
            <div>
              {/* Header */}
              <div className="text-center mb-6">
                <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-semibold">
                  Independent Track
                </span>
                <h3 className="text-3xl font-extrabold text-neutral-950 dark:text-white tracking-tight mt-1">
                  Self Paced
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-medium">
                  Complete on your own schedule with verified deliverables
                </p>
                
                <div className="mt-6">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl md:text-5xl font-black text-neutral-950 dark:text-white font-mono tracking-tight">
                      ₹6,500
                    </span>
                    <span className="text-xs text-neutral-400 font-sans">/ one-time</span>
                  </div>
                  <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                    Zero hidden fees · Full lifetime access
                  </p>
                </div>
              </div>

              {/* Checklist */}
              <div className="space-y-3.5 pt-6 pb-8 border-t border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center gap-3 text-xs md:text-sm font-semibold">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-neutral-800 dark:text-neutral-200">Full Access to Recorded Video Architecture Modules</span>
                </div>
                <div className="flex items-center gap-3 text-xs md:text-sm font-semibold">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-neutral-800 dark:text-neutral-200">Real-Time Industry Capstone Project</span>
                </div>
                <div className="flex items-center gap-3 text-xs md:text-sm font-semibold">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-neutral-800 dark:text-neutral-200">4+ Hours of Live Group Masterclasses</span>
                </div>
                <div className="flex items-center gap-3 text-xs md:text-sm font-semibold">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-neutral-800 dark:text-neutral-200">One-on-One Doubt Clearing Sessions</span>
                </div>
                <div className="flex items-center gap-3 text-xs md:text-sm font-semibold">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-neutral-800 dark:text-neutral-200">ISO 9001:2015 Verified Digital Certificate</span>
                </div>
                <div className="flex items-center gap-3 text-xs md:text-sm text-neutral-400">
                  <div className="w-5 h-5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-400 flex items-center justify-center shrink-0">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <span className="line-through">Dedicated 1-on-1 Senior Tech Mentor Support</span>
                </div>
                <div className="flex items-center gap-3 text-xs md:text-sm text-neutral-400">
                  <div className="w-5 h-5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-400 flex items-center justify-center shrink-0">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <span className="line-through">Direct Placement Guidance & Corporate Referrals</span>
                </div>
                <div className="flex items-center gap-3 text-xs md:text-sm text-neutral-400">
                  <div className="w-5 h-5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-400 flex items-center justify-center shrink-0">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <span className="line-through">Mock Technical Interviews & Resume Polishing</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleStartLearning}
              className="w-full py-4 px-6 rounded-2xl bg-neutral-900 dark:bg-neutral-800 hover:bg-neutral-800 dark:hover:bg-neutral-700 text-white font-extrabold text-sm transition-all text-center cursor-pointer shadow-md"
            >
              Start Self-Paced Learning
            </button>
          </div>

          {/* CARD 2: Mentor Led (₹11,500 - HIGHEST VALUE & MOST POPULAR) */}
          <div className="relative rounded-3xl bg-white dark:bg-neutral-900/90 shadow-2xl p-8 md:p-10 flex flex-col justify-between glow-border group">
            
            {/* High-Converting Glow Ribbon */}
            <div className="absolute -top-3.5 left-8 bg-brand-gradient text-white text-[11px] font-black uppercase px-4 py-1 rounded-full shadow-lg tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>MOST POPULAR · 10X CAREER VALUE</span>
            </div>

            <div>
              {/* Header */}
              <div className="text-center mb-6 pt-2">
                <span className="text-[11px] font-mono uppercase tracking-widest font-semibold" style={{ color: 'var(--primary)' }}>
                  Elite Practitioner Track
                </span>
                <h3 className="text-3xl font-extrabold text-neutral-950 dark:text-white tracking-tight mt-1">
                  Mentor Led
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-medium">
                  Direct personal mentorship with Senior Industry Engineers
                </p>
                
                <div className="mt-6">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl md:text-5xl font-black font-mono tracking-tight" style={{ color: 'var(--primary)' }}>
                      ₹11,500
                    </span>
                    <span className="text-xs text-neutral-400 font-sans">/ one-time</span>
                  </div>
                  <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                    Everything in Self-Paced + Complete Placement Accelerator
                  </p>
                </div>
              </div>

              {/* Checklist */}
              <div className="space-y-3.5 pt-6 pb-8 border-t border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center gap-3 text-xs md:text-sm font-semibold">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-neutral-800 dark:text-neutral-200">Live Weekly Architecture Sessions with Senior Tech Leads</span>
                </div>
                <div className="flex items-center gap-3 text-xs md:text-sm font-semibold">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-neutral-800 dark:text-neutral-200">Guaranteed Production GitHub Capstone Deployment</span>
                </div>
                <div className="flex items-center gap-3 text-xs md:text-sm font-semibold">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-neutral-800 dark:text-neutral-200">Unlimited 1-on-1 Code Reviews & Architecture Defense</span>
                </div>
                <div className="flex items-center gap-3 text-xs md:text-sm font-semibold">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-neutral-800 dark:text-neutral-200">ISO 9001:2015 Verified Certificate with Dynamic QR Code</span>
                </div>
                <div className="flex items-center gap-3 text-xs md:text-sm font-semibold">
                  <div 
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: 'rgba(var(--primary-rgb), 0.15)',
                      color: 'var(--primary)'
                    }}
                  >
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-neutral-900 dark:text-white font-bold">Official Signed Letter of Recommendation (LOR)</span>
                </div>
                <div className="flex items-center gap-3 text-xs md:text-sm font-semibold">
                  <div 
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: 'rgba(var(--primary-rgb), 0.15)',
                      color: 'var(--primary)'
                    }}
                  >
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-neutral-900 dark:text-white font-bold">Direct Referral to 100+ Hiring Partner Companies</span>
                </div>
                <div className="flex items-center gap-3 text-xs md:text-sm font-semibold">
                  <div 
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: 'rgba(var(--primary-rgb), 0.15)',
                      color: 'var(--primary)'
                    }}
                  >
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-neutral-900 dark:text-white font-bold">1-on-1 Technical Mock Interviews & Resume Polishing</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleStartLearning}
              className="w-full py-4 px-6 rounded-2xl bg-brand-gradient text-white font-extrabold text-sm shadow-glow transition-all text-center cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Enroll in Mentor-Led Program
            </button>
          </div>

        </div>

        {/* Value Trust Markers */}
        <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center max-w-4xl mx-auto flex flex-wrap items-center justify-around gap-6 text-xs text-neutral-600 dark:text-neutral-300 font-semibold">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>ISO 9001:2015 Accredited</span>
          </span>
          <span className="flex items-center gap-2">
            <Award className="w-4 h-4" style={{ color: 'var(--primary)' }} />
            <span>Verifiable LinkedIn Badge</span>
          </span>
          <span className="flex items-center gap-2">
            <Users className="w-4 h-4" style={{ color: 'var(--secondary)' }} />
            <span>50,000+ Alumni Network</span>
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4" style={{ color: 'var(--accent)' }} />
            <span>Flexible Weekend Batches</span>
          </span>
        </div>

      </div>
    </section>
  );
};
