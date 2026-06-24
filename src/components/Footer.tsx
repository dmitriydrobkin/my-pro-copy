'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { QuizTrigger } from './QuizTrigger';
import { TelegramIcon } from './TelegramIcon';
import { getDictionary } from '@/i18n/dictionaries';

// Встроенные SVG иконки для соцсетей, чтобы избежать конфликтов с lucide-react
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2.5 7.1C2.6 5.9 3.5 4.9 4.7 4.8 8.1 4.5 12 4.5 15.3 4.8c1.2.1 2.1 1.1 2.2 2.3.2 1.6.2 3.3.2 4.9s0 3.3-.2 4.9c-.1 1.2-1 2.2-2.3 2.3-3.3.3-7.2.3-10.6 0-1.2-.1-2.1-1.1-2.2-2.3-.2-1.6-.2-3.3-.2-4.9s0-3.3.2-4.9z"/>
    <path d="m10 15 5-3-5-3v6z"/>
  </svg>
);

export function Footer({ settings, lang }: { settings?: any, lang: string }) {
  const dict = getDictionary(lang);
  const linkPrefix = lang === 'ru' ? '/ru' : '';

  const phone = settings?.global_phone || '+38 098 856 77 77';
  const email = settings?.global_email || 'contact@nashe.agency';
  const tg = settings?.global_tg || 'https://t.me/malyshev_dev';
  const inst = settings?.global_inst;
  const fb = settings?.global_fb;
  
  const quickLinks = [
    { label: dict.footer.links.landing, href: `${linkPrefix}/services/landings` },
    { label: dict.footer.links.businessCard, href: `${linkPrefix}/services/business-cards` },
    { label: dict.footer.links.corporate, href: `${linkPrefix}/services/corporate` },
    { label: dict.footer.links.ecommerce, href: `${linkPrefix}/services/ecommerce` },
    { label: dict.footer.links.tgBots, href: `${linkPrefix}/services/telegram-bots` },
    { label: dict.footer.links.portfolio, href: `${linkPrefix}/portfolio` },
    { label: dict.footer.links.about, href: `${linkPrefix}/about` },
    { label: dict.footer.links.solutions, href: `${linkPrefix}/solutions` },
    { label: dict.footer.links.locations, href: `${linkPrefix}/locations` },
  ];

  return (
    <footer className="bg-ink text-white pt-12 pb-6 mt-auto rounded-t-[3rem] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 border-b border-white/10 pb-10">
          
          {/* Column 1: Consultation Card (Col Span 4) */}
          <div className="order-2 lg:order-1 lg:col-span-4 flex">
            <QuizTrigger className="w-full relative overflow-hidden bg-gradient-to-br from-coral to-[#ff5a36] text-white rounded-[2rem] p-6 md:p-8 flex flex-col justify-between group hover:scale-[1.02] transition-transform duration-300 shadow-lg text-left h-full min-h-[220px]">
              {/* Abstract Shape Background */}
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white rounded-full mix-blend-overlay opacity-20 blur-2xl group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-white rounded-full mix-blend-overlay opacity-10 blur-xl pointer-events-none" />
              
              <h3 
                className="relative z-10 font-display text-3xl lg:text-4xl font-bold leading-[1.1] break-words drop-shadow-sm"
                dangerouslySetInnerHTML={{ __html: dict.footer.consultation }}
              />
              
              <div className="relative z-10 flex justify-end mt-6">
                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-coral group-hover:border-transparent transition-colors duration-300">
                  <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                </div>
              </div>
            </QuizTrigger>
          </div>

          {/* Column 2: Quick Links (Col Span 5) */}
          <div className="order-1 lg:order-2 lg:col-span-5 flex flex-col justify-center lg:pl-8">
            <h4 className="font-display text-xl font-bold mb-6 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-white opacity-50" />
              {dict.footer.quickLinksTitle}
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

          {/* Column 3: Contacts (Col Span 3) */}
          <div className="order-3 lg:col-span-3 flex flex-col justify-center">
            <h4 className="font-display text-xl font-bold mb-6 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-white opacity-50" />
              {dict.footer.contactsTitle}
            </h4>
            <div className="flex flex-col gap-4">
              <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="font-mono text-xl font-medium hover:text-coral transition-colors">
                {phone}
              </a>
              <a href={`mailto:${email}`} className="font-sans text-white/70 hover:text-white transition-colors">
                {email}
              </a>
              <div className="flex gap-3 mt-2">
                {inst && (
                  <a href={inst} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-coral transition-colors">
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                )}
                {fb && (
                  <a href={fb} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-coral transition-colors">
                    <FacebookIcon className="w-4 h-4" />
                  </a>
                )}
                <a href={tg} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-coral transition-colors">
                  <TelegramIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest text-white/40">
          <p>© {new Date().getFullYear()} — {dict.footer.brandName.toUpperCase()}</p>
          <p>{dict.footer.description}</p>
        </div>
      </div>
    </footer>
  );
}
