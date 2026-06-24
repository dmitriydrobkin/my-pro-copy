'use server';

import { drizzle } from 'drizzle-orm/d1';
import { siteSettings } from '@/server/db/schema';
import { verifyAdminSession } from './auth';
import { getRequestContext } from '@cloudflare/next-on-pages';

/**
 * Серверное действие для обновления настроек сайта.
 * Работает напрямую с контекстом Cloudflare, минуя Proxy.
 */
export async function updateSiteSettings(formData: FormData) {
  // 1. Получаем базу данных напрямую
  const { env } = getRequestContext();
  
  if (!env || !env.DB) {
    throw new Error('КРИТИЧЕСКАЯ ОШИБКА: База D1 не подключена в панели Cloudflare (переменная DB)');
  }

  const db = drizzle(env.DB);

  // 2. Достаем все данные из формы динамически
  const settingsToSave: { key: string, value: string }[] = [];
  
  formData.forEach((value, key) => {
    // Игнорируем внутренние поля Next.js (обычно начинаются с $)
    if (typeof value === 'string' && !key.startsWith('$')) {
      settingsToSave.push({ key, value });
    }
  });

  // 3. Сохраняем в D1
  for (const setting of settingsToSave) {
    await db
      .insert(siteSettings)
      .values(setting)
      .onConflictDoUpdate({
        target: siteSettings.key,
        set: { value: setting.value },
      });
  }
}
