import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useUser } from '../context/UserContext';
import { X, Sparkles, Mail, HelpCircle, Copy, Check, Send, Bot, FileCheck } from 'lucide-react';

export const AiAssistantModal: React.FC = () => {
  const { activeModal, setActiveModal, user, showToast } = useUser();
  const [activeTab, setActiveTab] = useState<'cold-email' | 'interview-prep'>('cold-email');

  // Cold Email state
  const [companyName, setCompanyName] = useState('TechNova Solutions');
  const [roleTitle, setRoleTitle] = useState('Full-Stack Software Engineering Intern');
  const [recruiterName, setRecruiterName] = useState('Sarah Jenkins');
  const [generatedEmail, setGeneratedEmail] = useState<{ subject: string; body: string } | null>(null);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Interview Prep state
  const [prepRole, setPrepRole] = useState('Product Design Intern');
  const [prepCompany, setPrepCompany] = useState('Orbital Systems');
  const [prepQuestions, setPrepQuestions] = useState<Array<{ question: string; tip: string }> | null>(null);
  const [loadingPrep, setLoadingPrep] = useState(false);

  if (activeModal !== 'ai-assistant') return null;

  const handleGenerateColdEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingEmail(true);
    setGeneratedEmail(null);

    try {
      const res = await fetch('/api/ai/cold-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roleTitle,
          companyName,
          recruiterName,
          userMajor: user.major,
          userKeyProjects: user.skills.slice(0, 4).join(', ')
        })
      });

      const data = await res.json();
      setGeneratedEmail(data);
    } catch (err) {
      console.error(err);
      showToast('Error generating AI cold email');
    } finally {
      setLoadingEmail(false);
    }
  };

  const handleGenerateInterviewPrep = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingPrep(true);
    setPrepQuestions(null);

    try {
      const res = await fetch('/api/ai/interview-prep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roleTitle: prepRole,
          companyName: prepCompany
        })
      });

      const data = await res.json();
      if (data.questions) {
        setPrepQuestions(data.questions);
      }
    } catch (err) {
      console.error(err);
      showToast('Error generating interview prep');
    } finally {
      setLoadingPrep(false);
    }
  };

  const copyEmailToClipboard = () => {
    if (!generatedEmail) return;
    const fullText = `Subject: ${generatedEmail.subject}\n\n${generatedEmail.body}`;
    navigator.clipboard.writeText(fullText);
    setCopiedEmail(true);
    showToast('Cold email copied to clipboard!');
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setActiveModal(null)}
          className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col"
        >
          {/* Top Bar */}
          <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-900/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-neutral-900 dark:text-white">Gemini Career Assistant</h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">AI Cold Outreach & Interview Prep Generator</p>
              </div>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="p-2 rounded-full text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sub-Nav Tabs */}
          <div className="flex border-b border-neutral-200 dark:border-neutral-800 px-6 bg-neutral-100/50 dark:bg-neutral-950/50 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('cold-email')}
              className={`py-3 px-4 flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === 'cold-email'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Mail className="w-4 h-4" /> Cold Outreach Email Generator
            </button>

            <button
              onClick={() => setActiveTab('interview-prep')}
              className={`py-3 px-4 flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === 'interview-prep'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <HelpCircle className="w-4 h-4" /> AI Mock Interview Prep
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto space-y-6">
            
            {activeTab === 'cold-email' ? (
              <div className="space-y-6">
                <form onSubmit={handleGenerateColdEmail} autoComplete="off" className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-neutral-500 font-medium mb-1">Target Company</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      className="w-full p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-500 font-medium mb-1">Target Role</label>
                    <input
                      type="text"
                      value={roleTitle}
                      onChange={(e) => setRoleTitle(e.target.value)}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      className="w-full p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-500 font-medium mb-1">Recruiter/Lead Name</label>
                    <input
                      type="text"
                      value={recruiterName}
                      onChange={(e) => setRecruiterName(e.target.value)}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      className="w-full p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white font-medium"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <button
                      type="submit"
                      disabled={loadingEmail}
                      className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                    >
                      <Sparkles className="w-4 h-4" />
                      {loadingEmail ? 'Generating Cold Email with Gemini AI...' : 'Generate Cold Email'}
                    </button>
                  </div>
                </form>

                {generatedEmail && (
                  <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-900 dark:text-white">AI Cold Outreach Draft</span>
                      <button
                        onClick={copyEmailToClipboard}
                        className="px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 text-xs font-semibold flex items-center gap-1.5 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
                      >
                        {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedEmail ? 'Copied!' : 'Copy Email'}
                      </button>
                    </div>

                    <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2 text-xs">
                      <p className="font-bold text-blue-600 dark:text-blue-400">Subject: {generatedEmail.subject}</p>
                      <hr className="border-neutral-200 dark:border-neutral-800" />
                      <p className="whitespace-pre-line text-neutral-800 dark:text-neutral-200 leading-relaxed font-sans">{generatedEmail.body}</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                <form onSubmit={handleGenerateInterviewPrep} autoComplete="off" className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-neutral-500 font-medium mb-1">Target Company</label>
                    <input
                      type="text"
                      value={prepCompany}
                      onChange={(e) => setPrepCompany(e.target.value)}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      className="w-full p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-500 font-medium mb-1">Target Role Title</label>
                    <input
                      type="text"
                      value={prepRole}
                      onChange={(e) => setPrepRole(e.target.value)}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      className="w-full p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white font-medium"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      disabled={loadingPrep}
                      className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                    >
                      <Bot className="w-4 h-4" />
                      {loadingPrep ? 'Generating Tailored Questions...' : 'Generate Interview Questions & Advice'}
                    </button>
                  </div>
                </form>

                {prepQuestions && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase text-neutral-400">Tailored Interview Questions for {prepCompany}</h4>
                    {prepQuestions.map((q, idx) => (
                      <div key={idx} className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40 space-y-1.5 text-xs">
                        <p className="font-bold text-neutral-900 dark:text-white">{idx + 1}. {q.question}</p>
                        <p className="text-neutral-600 dark:text-neutral-300 italic"><span className="font-semibold text-blue-500">Pro Tip:</span> {q.tip}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
