'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showLoader, setShowLoader] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Reset loader state when pathname changes
    setShowLoader(true);
    setIsFading(false);
    
    // Smooth scroll to top on route change
    window.scrollTo(0, 0);

    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 400);

    const removeTimer = setTimeout(() => {
      setShowLoader(false);
    }, 700);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [pathname]);

  return (
    <>
      {showLoader && (
        <div 
          className={`fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center pointer-events-none transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}
        >
          <div className="font-display text-3xl md:text-5xl font-bold text-ink flex items-center gap-4">
            <span className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-coral animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-cyan animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <div className="mt-8 font-display text-xl font-bold text-ink/40 tracking-widest uppercase">
            Malyshev.dev
          </div>
        </div>
      )}
      <div className={`transition-opacity duration-500 ease-in-out ${isFading ? 'opacity-100' : 'opacity-0'}`}>
        {children}
      </div>
    </>
  );
}
