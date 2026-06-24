import { unstable_noStore as noStore } from 'next/cache';
import { db } from '@/server/db';
import { pageContent } from '@/server/db/schema';
import { eq } from 'drizzle-orm';

export const runtime = 'edge';

export async function getPageContent(route: string) {
  noStore();
  
  try {
    // Обращаемся к db напрямую!
    const result = await db.select()
      .from(pageContent)
      .where(eq(pageContent.route, route))
      .get();
      
    return result || {};
  } catch (error) {
    console.error('Ошибка чтения pageContent:', error);
    return {};
  }
}