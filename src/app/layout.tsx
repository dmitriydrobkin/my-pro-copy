import type { Metadata } from 'next';
import { Manrope, Unbounded } from 'next/font/google';
import { CustomCursor } from '@/components/CustomCursor';
import { MobileHoverSync } from '@/components/MobileHoverSync';
import { getSiteSettings } from '@/server/functions/settings';
import './globals.css';

// ⚡ КРИТИЧНО: Переводим весь Layout в Edge, чтобы не было конфликтов с page.tsx
export const runtime = 'edge';

const unbounded = Unbounded({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-display',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = settings.site_title ?? 'Dmitriy | Высококонверсионные сайты и боты';
  const description = settings.site_description ?? 'Автоматизированные воронки, сайты и Telegram-боты, которые работают 24/7 и приносят прибыль.';
  const isIndexingEnabled = settings.seo_indexing_enabled === 'true';

  return {
    title,
    description,
    robots: {
      index: isIndexingEnabled,
      follow: isIndexingEnabled,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  const brandName = settings.brand_name ?? 'malyshev';
  const footerText = settings.footer_text ?? 'Automated Client Acquisition';

  return (
    <html lang="ru" className={`${unbounded.variable} ${manrope.variable}`}>
      <body className="font-sans text-ink bg-surface min-h-screen flex flex-col">
        <MobileHoverSync />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}