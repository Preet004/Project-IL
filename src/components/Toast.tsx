import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useUser } from '../context/UserContext';
import { CheckCircle2 } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useUser();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-neutral-900/90 dark:bg-neutral-800/90 text-white backdrop-blur-xl border border-white/10 shadow-2xl"
        >
          <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
          <span className="text-sm font-medium tracking-tight">{toastMessage}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
