'use client';

import { usePathname } from 'next/navigation';
import { Footer } from './Footer';

export function ConditionalFooter({ settings, lang }: { settings?: any, lang: string }) {
  const pathname = usePathname();
  
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      <Footer settings={settings} lang={lang} />
    </>
  );
}
