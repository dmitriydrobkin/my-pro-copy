import { headers } from 'next/headers';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Preloader } from '@/components/Preloader';
import { ConditionalFooter } from '@/components/ConditionalFooter';
import { getSiteSettings } from '@/server/functions/settings';
import { StructuredData } from '@/components/StructuredData';

export const runtime = 'edge';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const h = headers();
  let pathname = h.get('x-pathname') || '/';
  
  if (pathname.startsWith('/ru')) {
    pathname = pathname.replace('/ru', '') || '/';
  }
  
  const basePath = pathname === '/' ? '' : pathname;
  
  const settings = await getSiteSettings();
  const isUk = params.lang === 'uk';
  const defaultTitle = isUk ? 'Dmitriy | Висококонверсійні сайти та боти' : 'Dmitriy | Высококонверсионные сайты и боты';
  const defaultDesc = isUk ? 'Автоматизовані воронки, сайти та Telegram-боти, які працюють 24/7.' : 'Автоматизированные воронки, сайты и Telegram-боты, которые работают 24/7.';
  
  const title = settings.site_title || defaultTitle;
  const description = settings.site_description || defaultDesc;
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://malyshev.dev${isUk ? '' : '/ru'}${basePath}`,
      images: ['/hero-bg.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/hero-bg.png'],
    },
    alternates: {
      languages: {
        uk: `https://malyshev.dev${basePath}`,
        ru: `https://malyshev.dev/ru${basePath}`,
      }
    }
  };
}


export default async function LangLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  const settings = await getSiteSettings();

  return (
    <>
      <Preloader />
      <Header lang={params.lang} />
      <main className="flex-grow">{children}</main>
      <ConditionalFooter settings={settings} lang={params.lang} />
      <StructuredData lang={params.lang || 'uk'} />
    </>
  );
}
