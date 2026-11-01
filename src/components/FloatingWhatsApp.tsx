import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface FloatingWhatsAppProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  phoneNumber = '917019680860',
  defaultMessage = 'Hi InternsLoom, I would like to know more about your training and internship programs.'
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [bubbleDismissed, setBubbleDismissed] = useState(false);

  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(defaultMessage)}`;

  const handleClick = () => {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Welcome Bubble */}
      <AnimatePresence>
        {!bubbleDismissed && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ delay: 1, duration: 0.3 }}
            className="mb-3 max-w-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-3.5 shadow-xl text-neutral-800 dark:text-neutral-200 text-xs relative"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setBubbleDismissed(true);
              }}
              className="absolute top-2 right-2 p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 rounded-full cursor-pointer"
              aria-label="Close message"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-[11px] text-neutral-900 dark:text-white">InternsLoom Support</span>
              <span className="text-[10px] text-neutral-400">Online</span>
            </div>
            <p className="text-[12px] text-neutral-600 dark:text-neutral-300 leading-snug mb-2.5">
              Need help choosing the right program or batch timings? Chat with an academic mentor on WhatsApp!
            </p>
            <button
              onClick={handleClick}
              className="w-full py-2 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-[11px] flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>Chat on WhatsApp (+91 7019680860)</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Action Button */}
      <div className="relative group">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          aria-label="Direct WhatsApp Support"
          className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-xl shadow-emerald-500/30 flex items-center justify-center transition-all cursor-pointer relative"
        >
          {/* Subtle pulse ring */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping -z-10" />
          
          <WhatsAppIcon className="w-7 h-7 text-white" />
        </motion.button>

        {/* Hover Tooltip */}
        {showTooltip && (
          <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-neutral-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg pointer-events-none">
            Chat with us on WhatsApp
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 border-4 border-transparent border-l-neutral-900" />
          </div>
        )}
      </div>
    </div>
  );
};

