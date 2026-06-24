'use client';

import Link from 'next/link';
import { getDictionary } from '@/i18n/dictionaries';

export function Footer({ settings, lang }: { settings?: any, lang: string }) {
  const dict = getDictionary(lang);
  const linkPrefix = lang === 'ru' ? '/ru' : '';
  
  const quickLinks = [
    { label: dict.nav.item1, href: `${linkPrefix}/page-1` },
    { label: dict.nav.item2, href: `${linkPrefix}/page-2` },
    { label: dict.nav.item3, href: `${linkPrefix}/page-3` },
  ];

  return (
    <footer className="bg-ink text-white pt-12 pb-6 mt-auto rounded-t-[3rem] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-white/10 pb-10">
          {/* Quick Links */}
          <div className="flex flex-col justify-center">
            <h4 className="font-display text-xl font-bold mb-6 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-white opacity-50" />
              Links
            </h4>
            <div className="flex flex-wrap gap-3">
              {quickLinks.map((link) => (
                <Link 
                  key={link.label} 
                  href={link.href}
                  className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-sm font-bold tracking-widest uppercase hover:bg-white/10 hover:border-white/20 transition-all text-white/80 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest text-white/40">
          <p>© {new Date().getFullYear()} — Template</p>
        </div>
      </div>
    </footer>
  );
}
