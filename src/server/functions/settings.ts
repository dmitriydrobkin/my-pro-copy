import { db } from '@/server/db';
import { siteSettings } from '@/server/db/schema';

export const runtime = 'edge';
export type SiteSetting = typeof siteSettings.$inferSelect;

export async function getSiteSettings(): Promise<Record<string, string>> {
  try {
    // Обращаемся к db напрямую!
    const results = await db.select().from(siteSettings).all();
    
    const settingsMap: Record<string, string> = {};
    for (const row of results) {
      if (row.key) {
        settingsMap[row.key] = row.value || '';
      }
    }
    
    return settingsMap;
  } catch (error) {
    console.error('Ошибка при получении настроек:', error);
    return {};
  }
}