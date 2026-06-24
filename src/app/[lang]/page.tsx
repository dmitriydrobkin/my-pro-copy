import { getLocalizedProjects } from '@/server/functions/getProjects';
import B2BHomePage from './HomePage';

export const runtime = 'edge';
export const revalidate = 3600;

export default async function Page({ params }: { params: { lang: string } }) {
  const localizedProjects = await getLocalizedProjects(params.lang);
  return <B2BHomePage projectsData={localizedProjects} lang={params.lang} />;
}
