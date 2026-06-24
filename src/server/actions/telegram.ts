'use server';

import { verifyAdminSession } from './auth';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { drizzle } from 'drizzle-orm/d1';
import { telegramChats } from '../db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getTelegramChats() {
  try {
    const { env } = getRequestContext();
    const db = drizzle(env.DB);
    return await db.select().from(telegramChats).orderBy(telegramChats.createdAt).all();
  } catch (error) {
    console.error('Failed to fetch telegram chats:', error);
    return [];
  }
}

export async function toggleTelegramChat(id: string, isActive: boolean) {
  try {
    const { env } = getRequestContext();
    const db = drizzle(env.DB);
    await db.update(telegramChats).set({ isActive }).where(eq(telegramChats.id, id)).run();
    revalidatePath('/admin/telegram');
    return { success: true };
  } catch (error) {
    console.error('Failed to toggle telegram chat:', error);
    return { success: false };
  }
}

export async function deleteTelegramChat(id: string) {
  try {
    const { env } = getRequestContext();
    const db = drizzle(env.DB);
    await db.delete(telegramChats).where(eq(telegramChats.id, id)).run();
    revalidatePath('/admin/telegram');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete telegram chat:', error);
    return { success: false };
  }
}
