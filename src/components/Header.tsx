'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { getDictionary } from '@/i18n/dictionaries';

export function Header({ lang }: { lang: string }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  if (pathname.startsWith('/admin')) return null;

  const dict = getDictionary(lang);
  const isUk = lang === 'uk';
  const linkPrefix = isUk ? '' : '/ru';

  // Жесткие фоллбэки перевода, чтобы меню 100% было на нужном языке, даже если словарь пуст
  const menuItems = [
    { label: dict?.header?.home || (isUk ? 'Головна' : 'Главная'), href: `${linkPrefix}/` },
    { 
      label: dict?.header?.services || (isUk ? 'Послуги' : 'Услуги'), 
      subItems: [
        { label: dict?.footer?.links?.landing || 'Landing Page', href: `${linkPrefix}/services/landings` },
        { label: dict?.footer?.links?.businessCard || (isUk ? 'Сайт-візитка' : 'Сайт-визитка'), href: `${linkPrefix}/services/business-cards` },
        { label: dict?.footer?.links?.corporate || (isUk ? 'Корпоративний сайт' : 'Корпоративный сайт'), href: `${linkPrefix}/services/corporate` },
        { label: dict?.footer?.links?.ecommerce || 'E-commerce', href: `${linkPrefix}/services/ecommerce` },
        { label: isUk ? 'Магазин + TG Бот' : 'Магазин + TG Бот', href: `${linkPrefix}/services/sites-and-bots` },
        { label: dict?.footer?.links?.tgBots || 'Telegram Bots', href: `${linkPrefix}/services/telegram-bots` },
      ]
    },
    { label: dict?.header?.about || (isUk ? 'Про мене' : 'Обо мне'), href: `${linkPrefix}/about` },
    { label: dict?.header?.portfolio || (isUk ? 'Портфоліо' : 'Портфолио'), href: `${linkPrefix}/portfolio` },
    { label: dict?.header?.contact || (isUk ? 'Контакти' : 'Контакты'), href: `${linkPrefix}/contact` },
  ];

  const switchLangHref = lang === 'ru' ? pathname.replace(/^\/ru/, '') || '/' : `/ru${pathname === '/' ? '' : pathname}`;

  return (
    <>
      <header className="fixed top-4 md:top-6 left-0 right-0 z-50 pointer-events-none">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link 
            href={`${linkPrefix}/`}
            className="pointer-events-auto bg-white/80 backdrop-blur-md shadow-glass rounded-full px-6 py-3 md:px-8 md:py-4 font-display font-bold text-ink tracking-tight flex items-center gap-2 transition-transform hover:scale-105"
          >
            <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-neon-cyan"></div>
            malyshev.dev.
          </Link>

          <div className="pointer-events-auto flex items-center gap-2">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="bg-white/80 backdrop-blur-md shadow-glass rounded-full w-12 h-12 sm:w-auto sm:h-auto sm:px-8 sm:py-4 flex items-center justify-center sm:gap-4 text-ink font-bold transition-transform hover:scale-105 group"
            >
              <span className="hidden sm:block">{isUk ? 'Меню' : 'Меню'}</span>
              <div className="hidden sm:flex w-8 h-8 rounded-full bg-ink items-center justify-center text-white group-hover:bg-coral transition-colors">
                <Menu className="w-4 h-4" />
              </div>
              <Menu className="w-6 h-6 sm:hidden group-hover:text-coral transition-colors" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink/95 backdrop-blur-xl overflow-y-auto"
          >
            {/* Уменьшили отступы (py-12 вместо py-24), чтобы всё влезло */}
            <div className="min-h-screen py-10 px-4 flex flex-col justify-center items-center relative">
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-6 right-6 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-coral transition-colors"
              >
                <X className="w-6 h-6 md:w-8 md:h-8" />
              </button>

              <nav className="flex flex-col gap-4 md:gap-6 text-center w-full max-w-lg mt-8">
                {menuItems.map((item, i) => (
                  <motion.div key={item.label} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.05 }}>
                    {item.href ? (
                      <Link 
                        href={item.href} onClick={() => setIsMenuOpen(false)}
                        className="font-display text-2xl md:text-4xl font-bold text-white hover:text-cyan-400 transition-colors relative group inline-block"
                      >
                        {item.label}
                        <span className="absolute -bottom-1 left-0 right-0 h-1 bg-cyan-400 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                      </Link>
                    ) : (
                      <div className="flex flex-col items-center bg-white/5 rounded-[2rem] p-4 md:p-6 border border-white/10">
                        <div className="font-sans text-[10px] md:text-sm font-bold text-white/40 mb-3 cursor-default tracking-widest uppercase">
                          {item.label}
                        </div>
                        <div className="flex flex-col gap-2 md:gap-4 items-center">
                          {item.subItems?.map((sub) => (
                            <Link 
                              key={sub.label} href={sub.href} onClick={() => setIsMenuOpen(false)}
                              className="font-sans text-lg md:text-2xl font-medium text-white/90 hover:text-cyan-400 transition-colors relative group inline-block"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
                
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: menuItems.length * 0.05 }} className="mt-4 flex justify-center">
                  <Link 
                    href={switchLangHref} onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full px-6 py-3 font-display font-bold text-white text-sm transition-all uppercase tracking-widest"
                  >
                    <span className={lang === 'uk' ? 'text-white' : 'text-white/40'}>UA</span>
                    <span className="opacity-30 mx-1">|</span>
                    <span className={lang === 'ru' ? 'text-white' : 'text-white/40'}>RU</span>
                  </Link>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}