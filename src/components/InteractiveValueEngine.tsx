import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useUser } from '../context/UserContext';
import { 
  Calculator, 
  ShieldCheck, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  GitBranch, 
  Zap, 
} from 'lucide-react';
import { brandAssets } from '../assets/brandAssets';

interface DomainROI {
  id: string;
  name: string;
  avgStartingLPA: number;
  seniorLPA: number;
  hiringGrowth: string;
  capstoneProject: string;
  keySkills: string[];
}

const ROI_DOMAINS: DomainROI[] = [
  {
    id: 'ai-ml',
    name: 'Artificial Intelligence & Machine Learning',
    avgStartingLPA: 12.5,
    seniorLPA: 28.0,
    hiringGrowth: '+184% Inbound Roles',
    capstoneProject: 'Distributed Multi-Agent LLM Orchestration with RAG & Vector Embeddings',
    keySkills: ['PyTorch', 'LangChain', 'LlamaIndex', 'TensorRT', 'FastAPI']
  },
  {
    id: 'fullstack',
    name: 'Full-Stack Software Architecture',
    avgStartingLPA: 9.8,
    seniorLPA: 22.5,
    hiringGrowth: '+142% Inbound Roles',
    capstoneProject: 'High-Concurrency FinTech Payment Engine with Microservices & Redis',
    keySkills: ['Next.js 15', 'TypeScript', 'PostgreSQL', 'Docker', 'GraphQL']
  },
  {
    id: 'data-science',
    name: 'Data Science & Predictive Analytics',
    avgStartingLPA: 10.2,
    seniorLPA: 24.0,
    hiringGrowth: '+135% Inbound Roles',
    capstoneProject: 'End-to-End Customer Lifetime Value & Churn Prediction Pipeline',
    keySkills: ['Python', 'Snowflake', 'Scikit-Learn', 'Tableau', 'Airflow']
  },
  {
    id: 'cloud-devops',
    name: 'Cloud Computing & DevSecOps',
    avgStartingLPA: 11.0,
    seniorLPA: 26.0,
    hiringGrowth: '+160% Inbound Roles',
    capstoneProject: 'Multi-Region Kubernetes Cluster with Automated CI/CD & Terraform',
    keySkills: ['AWS', 'Kubernetes', 'Terraform', 'ArgoCD', 'Prometheus']
  },
  {
    id: 'cybersecurity',
    name: 'Cyber Security & Ethical Hacking',
    avgStartingLPA: 9.5,
    seniorLPA: 21.0,
    hiringGrowth: '+125% Inbound Roles',
    capstoneProject: 'Automated Threat Surface Detection & Zero-Trust Access Gateway',
    keySkills: ['SIEM', 'Wireshark', 'Burp Suite', 'Metasploit', 'OWASP']
  }
];

export const InteractiveValueEngine: React.FC = () => {
  const { setActiveModal, navigateToView } = useUser();
  const [activeTab, setActiveTab] = useState<'roi' | 'protocol' | 'credential'>('roi');
  const [selectedDomainId, setSelectedDomainId] = useState<string>('ai-ml');
  const [currentCompensation, setCurrentCompensation] = useState<number>(3.5);

  const selectedDomain = ROI_DOMAINS.find(d => d.id === selectedDomainId) || ROI_DOMAINS[0];
  
  // Calculate payback period in working days
  const programCost = 11500; // Mentor-led comprehensive package
  const annualSalaryDiff = Math.max(0.5, (selectedDomain.avgStartingLPA - currentCompensation) * 100000);
  const monthlyDiff = annualSalaryDiff / 12;
  const dailyDiff = monthlyDiff / 22;
  const daysToPayback = Math.max(2, Math.round(programCost / dailyDiff));

  return (
    <section className="relative py-28 overflow-hidden bg-[#fafbfc] dark:bg-[#070b12] border-t border-neutral-200/80 dark:border-neutral-800/80 transition-colors duration-300">
      
      {/* Background Cyber Ambient Glows */}
      <div 
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[650px] h-[450px] rounded-full blur-[140px] pointer-events-none transition-all duration-700" 
        style={{ background: 'rgba(var(--primary-rgb), 0.12)' }}
      />
      <div 
        className="absolute bottom-10 right-1/4 w-[500px] h-[350px] rounded-full blur-[130px] pointer-events-none transition-all duration-700" 
        style={{ background: 'rgba(var(--secondary-rgb), 0.12)' }}
      />
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-50" />

      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        
        {/* Section Heading & Value Proposition */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4 border"
            style={{
              backgroundColor: 'rgba(var(--primary-rgb), 0.1)',
              borderColor: 'rgba(var(--primary-rgb), 0.3)',
              color: 'var(--primary)'
            }}
          >
            <Zap className="w-4 h-4" />
            <span>Interactive Value & Verification Engine</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-4">
            Designed to Deliver <span className="text-brand-gradient">Exponential ROI</span>
          </h2>
          
          <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed">
            Test the numbers yourself. See how our dual-phase training and ISO 9001:2015 accredited credentials transform student talent into high-performing industry hires.
          </p>

          {/* Interactive Mode Switcher Tabs */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-2xl bg-neutral-200/80 dark:bg-neutral-900 border border-neutral-300/80 dark:border-neutral-800 shadow-inner">
            <button
              onClick={() => setActiveTab('roi')}
              className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'roi'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-md ring-1 ring-neutral-200 dark:ring-neutral-700 font-bold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
              }`}
            >
              <Calculator className="w-4 h-4" style={{ color: 'var(--primary)' }} />
              <span>Career ROI Simulator</span>
            </button>

            <button
              onClick={() => setActiveTab('protocol')}
              className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'protocol'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-md ring-1 ring-neutral-200 dark:ring-neutral-700 font-bold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" style={{ color: 'var(--secondary)' }} />
              <span>Dual-Phase Execution Protocol</span>
            </button>

            <button
              onClick={() => setActiveTab('credential')}
              className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'credential'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-md ring-1 ring-neutral-200 dark:ring-neutral-700 font-bold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
              }`}
            >
              <Award className="w-4 h-4" style={{ color: 'var(--accent)' }} />
              <span>Verifiable Credential Vault</span>
            </button>
          </div>
        </div>

        {/* TAB 1: CAREER ROI SIMULATOR */}
        {activeTab === 'roi' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            {/* Input Controls Panel */}
            <div className="lg:col-span-5 p-8 rounded-3xl bg-white dark:bg-neutral-900/90 border border-neutral-200/90 dark:border-neutral-800/90 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-white bg-brand-gradient"
                  >
                    1
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                    Select Target Technical Domain
                  </h3>
                </div>

                <div className="space-y-2.5 mb-8">
                  {ROI_DOMAINS.map((domain) => (
                    <button
                      key={domain.id}
                      onClick={() => setSelectedDomainId(domain.id)}
                      className={`w-full p-3.5 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                        selectedDomainId === domain.id
                          ? 'border-[var(--primary)] bg-neutral-100 dark:bg-neutral-800 shadow-sm ring-1 ring-[var(--primary)] text-neutral-900 dark:text-white'
                          : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 text-neutral-700 dark:text-neutral-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: selectedDomainId === domain.id ? 'var(--primary)' : undefined }}
                        />
                        <span>{domain.name}</span>
                      </div>
                      <span className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400">
                        ₹{domain.avgStartingLPA} LPA
                      </span>
                    </button>
                  ))}
                </div>

                {/* Compensation Baseline Slider */}
                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-800 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">
                      Your Current or Expected Baseline Package:
                    </span>
                    <span className="text-sm font-bold font-mono text-neutral-900 dark:text-white">
                      ₹{currentCompensation.toFixed(1)} LPA
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1.5"
                    max="6.0"
                    step="0.5"
                    value={currentCompensation}
                    onChange={(e) => setCurrentCompensation(parseFloat(e.target.value))}
                    className="w-full cursor-pointer accent-emerald-500"
                    style={{ accentColor: 'var(--primary)' }}
                  />
                  <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
                    <span>Fresher / Non-tech (₹1.5 LPA)</span>
                    <span>Early Associate (₹6.0 LPA)</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-neutral-400 font-medium">Verified Program Investment:</p>
                  <p className="text-lg font-extrabold text-neutral-900 dark:text-white">
                    ₹6,500 <span className="text-xs font-normal text-neutral-500">(Self-Paced)</span> · ₹11,500 <span className="text-xs font-normal text-neutral-500">(Mentor-Led)</span>
                  </p>
                </div>
                <button
                  onClick={() => setActiveModal('mentors')}
                  className="px-4 py-2 rounded-xl bg-brand-gradient text-white text-xs font-bold transition-all shadow-glow cursor-pointer"
                >
                  Join Cohort
                </button>
              </div>
            </div>

            {/* Calculated Output & Live Trajectory Panel */}
            <div className="lg:col-span-7 p-8 rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-slate-950 text-white border border-neutral-800 shadow-2xl flex flex-col justify-between relative overflow-hidden">
              
              {/* Background Glow */}
              <div 
                className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none" 
                style={{ background: 'rgba(var(--primary-rgb), 0.15)' }}
              />

              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-neutral-800">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest" style={{ color: 'var(--primary)' }}>
                      Projected Career Leap
                    </span>
                    <h3 className="text-2xl font-black text-white mt-0.5">
                      {selectedDomain.name}
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                    {selectedDomain.hiringGrowth}
                  </span>
                </div>

                {/* 3 Large KPI Tiles */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  <div className="p-4 rounded-2xl bg-neutral-800/60 border border-neutral-700/60">
                    <p className="text-xs text-neutral-400 font-medium">Avg. Starting Package</p>
                    <p className="text-3xl font-black mt-1 font-mono" style={{ color: 'var(--primary)' }}>
                      ₹{selectedDomain.avgStartingLPA} <span className="text-sm font-sans font-normal text-neutral-400">LPA</span>
                    </p>
                    <p className="text-[11px] text-neutral-400 mt-1">Verified graduate median</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-neutral-800/60 border border-neutral-700/60">
                    <p className="text-xs text-neutral-400 font-medium">Senior Ceiling (3-5 Yrs)</p>
                    <p className="text-3xl font-black mt-1 font-mono" style={{ color: 'var(--secondary)' }}>
                      ₹{selectedDomain.seniorLPA} <span className="text-sm font-sans font-normal text-neutral-400">LPA</span>
                    </p>
                    <p className="text-[11px] text-neutral-400 mt-1">Specialist Architect tier</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30">
                    <p className="text-xs text-emerald-300 font-medium">Investment Payback</p>
                    <p className="text-3xl font-black text-emerald-400 mt-1 font-mono">
                      ~{daysToPayback} <span className="text-sm font-sans font-normal text-emerald-300">Days</span>
                    </p>
                    <p className="text-[11px] text-emerald-300/80 mt-1">In your first role month</p>
                  </div>
                </div>

                {/* Deliverables Breakdown */}
                <div className="space-y-4 mb-8">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-neutral-400 flex items-center gap-1.5">
                    <GitBranch className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                    <span>Guaranteed Production Capstone You Will Build:</span>
                  </h4>
                  
                  <div className="p-4 rounded-2xl bg-neutral-800/40 border border-neutral-700/50">
                    <p className="text-sm font-bold text-white mb-2">
                      {selectedDomain.capstoneProject}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedDomain.keySkills.map((skill, idx) => (
                        <span key={idx} className="text-[11px] font-mono px-2.5 py-0.5 rounded-lg bg-neutral-900 border border-neutral-700" style={{ color: 'var(--primary)' }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Guarantee Banner */}
              <div 
                className="p-4 rounded-2xl border flex items-center justify-between gap-4"
                style={{
                  background: 'linear-gradient(135deg, rgba(var(--primary-rgb), 0.15) 0%, rgba(var(--secondary-rgb), 0.15) 100%)',
                  borderColor: 'rgba(var(--primary-rgb), 0.3)'
                }}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: 'rgba(var(--primary-rgb), 0.2)',
                      color: 'var(--primary)'
                    }}
                  >
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Full Value Guarantee</p>
                    <p className="text-[11px] text-neutral-300">
                      Live Code Reviews + Capstone GitHub Repo + ISO 9001:2015 Verified Credentials + Official LOR
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigateToView('programs')}
                  className="px-4 py-2.5 rounded-xl bg-white text-neutral-950 hover:bg-neutral-100 font-bold text-xs transition-all shrink-0 cursor-pointer"
                >
                  Explore All Programs
                </button>
              </div>

            </div>
          </motion.div>
        )}

        {/* TAB 2: DUAL-PHASE EXECUTION PROTOCOL */}
        {activeTab === 'protocol' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Step 1 */}
              <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-lg relative flex flex-col justify-between">
                <div>
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg mb-4"
                    style={{
                      backgroundColor: 'rgba(var(--primary-rgb), 0.15)',
                      color: 'var(--primary)'
                    }}
                  >
                    01
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--primary)' }}>
                    Weeks 1 to 4
                  </span>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mt-1 mb-2">
                    Live Instructor Mastery & Architecture
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                    Deep dive into industrial-grade stacks. No passive recordings—participate in real-time engineering sessions, live Q&As, and daily coding sprints.
                  </p>
                  <ul className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Live 1-on-1 and cohort masterclasses</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Algorithm design & modern design patterns</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Weekly milestone code submissions</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 text-[11px] font-mono text-neutral-400">
                  Deliverable: Core Competency Clearance
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border-2 shadow-xl relative flex flex-col justify-between glow-border">
                <div>
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg mb-4"
                    style={{
                      backgroundColor: 'rgba(var(--secondary-rgb), 0.15)',
                      color: 'var(--secondary)'
                    }}
                  >
                    02
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--secondary)' }}>
                    Months 2 to 3
                  </span>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mt-1 mb-2">
                    Live Industry Capstone Internship
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                    Transition from learner to practitioner. Work on production-grade pull requests with senior tech leads, automated CI/CD pipelines, and real user workloads.
                  </p>
                  <ul className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Real GitHub production repo commits</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Rigorous peer review & architecture defense</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Cloud deployment & production metrics</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 text-[11px] font-mono text-neutral-400">
                  Deliverable: Live Production URL & GitHub Portfolio
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-lg relative flex flex-col justify-between">
                <div>
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg mb-4"
                    style={{
                      backgroundColor: 'rgba(var(--accent-rgb), 0.15)',
                      color: 'var(--accent)'
                    }}
                  >
                    03
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
                    Graduation & Placement
                  </span>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mt-1 mb-2">
                    ISO 9001:2015 Credential & LOR
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                    Receive your digitally verifiable credentials backed by ISO 9001:2015 quality accreditation, plus an official Letter of Recommendation detailing your achievements.
                  </p>
                  <ul className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Global verification URL & dynamic QR code</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Official signed Letter of Recommendation (LOR)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Direct hiring network referral & resume audit</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 text-[11px] font-mono text-neutral-400">
                  Deliverable: Permanent Certificate ID & Recruiter Link
                </div>
              </div>

            </div>

            <div className="text-center pt-4">
              <button
                onClick={() => setActiveModal('mentors')}
                className="px-8 py-3.5 rounded-full bg-brand-gradient text-white font-bold text-xs uppercase tracking-wider shadow-glow transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Enroll In The Next Cohort</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* TAB 3: VERIFIABLE CREDENTIAL VAULT */}
        {activeTab === 'credential' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-slate-950 p-8 md:p-12 border border-neutral-800 shadow-2xl text-white overflow-hidden glow-border">
              
              {/* Certificate Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white p-1 border border-neutral-700 flex items-center justify-center shrink-0">
                    <img
                      src={brandAssets.emblem}
                      alt="InternsLoom Emblem"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">INTERNSLOOM OFFICIAL ACCREDITED CERTIFICATE</h3>
                    <p className="text-xs text-neutral-400 font-mono">ISO 9001:2015 Certified Quality Management System</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Cryptographically Tamper-Proof</span>
                  </span>
                </div>
              </div>

              {/* Sample Certificate Body */}
              <div className="py-8 space-y-4">
                <p className="text-xs uppercase tracking-widest text-neutral-400">Awarded To</p>
                <h4 className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ color: 'var(--primary)' }}>
                  Aditya Narayan Sharma
                </h4>
                <p className="text-sm text-neutral-300 leading-relaxed max-w-2xl">
                  For exemplary completion of the rigorous 12-Week Dual-Phase Professional Program in <span className="text-white font-semibold">Full Stack Web Development & Microservices Architecture</span> with guaranteed live capstone project deployment.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                  <div className="p-3 rounded-xl bg-neutral-800/60 border border-neutral-700/60">
                    <p className="text-[10px] text-neutral-400 uppercase">Certificate ID</p>
                    <p className="text-xs font-mono font-bold text-white mt-0.5">IL-2026-FS0942</p>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-800/60 border border-neutral-700/60">
                    <p className="text-[10px] text-neutral-400 uppercase">Performance Grade</p>
                    <p className="text-xs font-mono font-bold text-emerald-400 mt-0.5">Grade A+ (Distinction)</p>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-800/60 border border-neutral-700/60">
                    <p className="text-[10px] text-neutral-400 uppercase">Accreditation</p>
                    <p className="text-xs font-mono font-bold text-white mt-0.5" style={{ color: 'var(--accent)' }}>ISO 9001:2015</p>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-800/60 border border-neutral-700/60">
                    <p className="text-[10px] text-neutral-400 uppercase">Verification Status</p>
                    <p className="text-xs font-mono font-bold mt-0.5" style={{ color: 'var(--primary)' }}>Active & Public</p>
                  </div>
                </div>
              </div>

              {/* Action Strip */}
              <div className="pt-6 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-xs text-neutral-400">
                  Accepted by leading recruiters and academic university credit committees.
                </p>
                <button
                  onClick={() => setActiveModal('verify')}
                  className="px-6 py-2.5 rounded-xl bg-brand-gradient text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-glow"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Test Certificate Verification Modal</span>
                </button>
              </div>

            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
};
