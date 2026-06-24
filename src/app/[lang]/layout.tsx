import { headers } from 'next/headers';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
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
  const defaultTitle = 'Шаблон | Template';
  const defaultDesc = 'Описание шаблона';
  
  const title = settings.site_title || defaultTitle;
  const description = settings.site_description || defaultDesc;
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://your-domain.com${isUk ? '' : '/ru'}${basePath}`,
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
        uk: `https://your-domain.com${basePath}`,
        ru: `https://your-domain.com/ru${basePath}`,
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
      <Header lang={params.lang} />
      <main className="flex-grow">{children}</main>
      <ConditionalFooter settings={settings} lang={params.lang} />
      <StructuredData lang={params.lang || 'uk'} />
    </>
  );
}
