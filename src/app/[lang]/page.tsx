import HomePage from './HomePage';

export const runtime = 'edge';
export const revalidate = 3600;

export default async function Page({ params }: { params: { lang: string } }) {
  return <HomePage lang={params.lang} />;
}
