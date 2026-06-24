'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Disable scrolling while preloading
    document.body.style.overflow = 'hidden';
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = '';
    }, 2000);
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-surface"
        >
          <motion.div
            exit={{ 
              scale: 0.9, 
              opacity: 0, 
              y: -50 
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex items-center gap-3 font-display font-bold text-3xl sm:text-4xl md:text-6xl text-ink tracking-tight"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-4 h-4 rounded-full bg-cyan-500 shadow-neon-cyan" 
            />
            <motion.span
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            >
              malyshev.dev.
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
