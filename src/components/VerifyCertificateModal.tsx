import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useUser } from '../context/UserContext';
import { VERIFIED_CERTIFICATES } from '../data/mockData';
import { CertificateRecord } from '../types';
import { X, ShieldCheck, Search, Award, CheckCircle, AlertCircle, FileCheck, ArrowRight } from 'lucide-react';

export const VerifyCertificateModal: React.FC = () => {
  const { activeModal, setActiveModal, showToast } = useUser();
  const [certId, setCertId] = useState('');
  const [searchResult, setSearchResult] = useState<CertificateRecord | null>(null);
  const [searched, setSearched] = useState(false);

  if (activeModal !== 'verify') return null;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = certId.trim().toUpperCase();
    if (!cleanId) return;

    setSearched(true);
    if (VERIFIED_CERTIFICATES[cleanId]) {
      setSearchResult(VERIFIED_CERTIFICATES[cleanId]);
      showToast('Certificate verified successfully!');
    } else {
      setSearchResult(null);
    }
  };

  const sampleCertificates = ['IL-2024-1011', 'IL-2024-2045', 'IL-2024-3089', 'IL-2024-4112'];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 overflow-y-auto">
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
          className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden z-10 my-8 flex flex-col"
        >
          {/* Top Bar */}
          <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/80 dark:bg-neutral-900/80">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-neutral-900 dark:text-white">Certificate Verification Portal</h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Authenticate ISO accredited credentials & internship letters</p>
              </div>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="p-2 rounded-full text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Enter the unique Certificate Identification Code printed on the certificate or letter of recommendation to verify authenticity.
            </p>

            <form onSubmit={handleVerify} className="space-y-3">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    value={certId}
                    onChange={(e) => setCertId(e.target.value)}
                    placeholder="Enter Certificate ID (e.g. IL-2024-1011)"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white uppercase font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" /> Verify
                </button>
              </div>

              {/* Sample IDs */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500">
                <span>Try sample IDs:</span>
                {sampleCertificates.map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setCertId(id);
                      setSearchResult(VERIFIED_CERTIFICATES[id]);
                      setSearched(true);
                    }}
                    className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-blue-600 dark:text-blue-400 font-mono hover:underline"
                  >
                    {id}
                  </button>
                ))}
              </div>
            </form>

            {/* Results Display */}
            {searched && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                {searchResult ? (
                  <div className="p-5 rounded-2xl border-2 border-emerald-500/30 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                          Official Authentic Credential
                        </span>
                        <h4 className="text-base font-bold text-neutral-900 dark:text-white">
                          Certificate Verified
                        </h4>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-emerald-200 dark:border-emerald-800/40">
                      <div>
                        <p className="text-neutral-500 dark:text-neutral-400">Student Name</p>
                        <p className="font-bold text-neutral-900 dark:text-white text-sm">{searchResult.studentName}</p>
                      </div>
                      <div>
                        <p className="text-neutral-500 dark:text-neutral-400">Program Track</p>
                        <p className="font-bold text-neutral-900 dark:text-white text-sm">{searchResult.program}</p>
                      </div>
                      <div>
                        <p className="text-neutral-500 dark:text-neutral-400">Issue Date</p>
                        <p className="font-semibold text-neutral-800 dark:text-neutral-200">{searchResult.issueDate}</p>
                      </div>
                      <div>
                        <p className="text-neutral-500 dark:text-neutral-400">Performance Assessment</p>
                        <p className="font-semibold text-emerald-600 dark:text-emerald-400">{searchResult.grade}</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-emerald-500/20 text-xs text-neutral-600 dark:text-neutral-300 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-amber-500" />
                        <span>ISO 9001:2015 Accredited & MCA Registered</span>
                      </div>
                      <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{searchResult.id}</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-5 rounded-2xl border border-red-200 dark:border-red-900/40 bg-red-50/50 dark:bg-red-950/20 text-center space-y-2">
                    <AlertCircle className="w-8 h-8 text-red-500 mx-auto" />
                    <h4 className="text-sm font-bold text-red-700 dark:text-red-400">Certificate Record Not Found</h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-sm mx-auto">
                      No verified record matched ID "{certId}". Please re-check the characters or reach out to our verification office at support@internsloom.com.
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
