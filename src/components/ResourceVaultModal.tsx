import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useUser } from '../context/UserContext';
import { MOCK_RESOURCES } from '../data/mockData';
import { ResourceItem } from '../types';
import { X, BookOpen, Download, Copy, Check, Sparkles, FileText, Cpu, Mail, Award } from 'lucide-react';

export const ResourceVaultModal: React.FC = () => {
  const { activeModal, setActiveModal, showToast } = useUser();
  const [selectedResource, setSelectedResource] = useState<ResourceItem>(MOCK_RESOURCES[0]);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  if (activeModal !== 'resources') return null;

  const handleCopySnippet = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(true);
    showToast('Template copied to clipboard!');
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'file-text': return <FileText className="w-5 h-5 text-blue-500" />;
      case 'cpu': return <Cpu className="w-5 h-5 text-purple-500" />;
      case 'mail': return <Mail className="w-5 h-5 text-emerald-500" />;
      case 'award': return <Award className="w-5 h-5 text-amber-500" />;
      default: return <BookOpen className="w-5 h-5 text-blue-500" />;
    }
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
          className="relative w-full max-w-4xl bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col"
        >
          {/* Top Bar */}
          <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-900/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-neutral-900 dark:text-white">Resource Vault & Playbooks</h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Curated guides for university students</p>
              </div>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="p-2 rounded-full text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Resource List (5 cols) */}
            <div className="md:col-span-5 space-y-3 border-r-0 md:border-r border-neutral-200 dark:border-neutral-800 md:pr-6">
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">Guides & Templates</p>

              {MOCK_RESOURCES.map((res) => {
                const isSelected = selectedResource.id === res.id;
                return (
                  <div
                    key={res.id}
                    onClick={() => setSelectedResource(res)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-500/5 dark:bg-emerald-500/10 shadow-sm'
                        : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-neutral-900'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 shrink-0">
                        {getIcon(res.icon)}
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">{res.category}</span>
                        <h4 className="text-sm font-bold text-neutral-900 dark:text-white leading-snug">{res.title}</h4>
                        <p className="text-xs text-neutral-500 mt-1">{res.readTime}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Guide Detail & Preview (7 cols) */}
            <div className="md:col-span-7 space-y-5">
              <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800">
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                  {selectedResource.category}
                </span>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mt-2">
                  {selectedResource.title}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-2 leading-relaxed">
                  {selectedResource.description}
                </p>

                <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
                  <span className="text-xs text-neutral-400 font-medium">{selectedResource.readTime} • PDF Cheatsheet</span>
                  <button
                    onClick={() => showToast(`Downloaded ${selectedResource.title}`)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" /> Download PDF
                  </button>
                </div>
              </div>

              {/* Sample Content Box */}
              <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Playbook Sample Snippet
                  </h4>
                  <button
                    onClick={() => handleCopySnippet(
                      `Hi [Hiring Manager],\n\nI loved TechNova's recent blog post on distributed state. As a CS Junior at Stanford building WebGL & microservices, I would love to contribute to your core infrastructure team this summer.\n\nBest,\n[Your Name]`
                    )}
                    className="px-2.5 py-1 rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-1"
                  >
                    {copiedSnippet ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    {copiedSnippet ? 'Copied' : 'Copy Template'}
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-neutral-900 text-neutral-200 font-mono text-xs leading-relaxed space-y-2 overflow-x-auto border border-neutral-800">
                  <p className="text-emerald-400">// Subject: High-Impact Summer 2026 Engineering Student</p>
                  <p>Hi [Recruiter Name],</p>
                  <p>I saw TechNova is expanding its core infrastructure team. My background includes building full-stack TypeScript services with &lt;50ms response latencies and open-source contributions.</p>
                  <p>Would you have 10 minutes next Tuesday for a brief chat regarding the Software Engineering intern role?</p>
                </div>
              </div>

            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
