'use server';

import { db } from '@/server/db';
import { pageContent } from '@/server/db/schema';

export async function savePageContent(data: {
  route: string;
  h1: string;
  seoTitle: string;
  description: string;
}) {
  try {
    await db
      .insert(pageContent)
      .values({
        route: data.route,
        h1: data.h1,
        seoTitle: data.seoTitle,
        description: data.description,
      })
      .onConflictDoUpdate({
        target: [pageContent.route],
        set: {
          h1: data.h1,
          seoTitle: data.seoTitle,
          description: data.description,
          updatedAt: new Date(),
        },
      });

    return { success: true };
  } catch (error) {
    console.error('Ошибка при сохранении контента страницы:', error);
    return { success: false, error: 'Не удалось сохранить данные' };
  }
}