import { unstable_cache } from 'next/cache';
import { db } from '@/server/db';
import { pageContent } from '@/server/db/schema';
import { eq } from 'drizzle-orm';

export const runtime = 'edge';

export const getPageContent = unstable_cache(
  async (route: string) => {
    try {
      const result = await db.select()
        .from(pageContent)
        .where(eq(pageContent.route, route))
        .get();
        
      return result || {};
    } catch (error) {
      console.error('Ошибка чтения pageContent:', error);
      return {};
    }
  },
  ['page-content-cache'],
  { tags: ['page-content'], revalidate: 60 }
);