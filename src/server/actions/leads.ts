'use server';

import { verifyAdminSession } from './auth';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { drizzle } from 'drizzle-orm/d1';
import { z } from 'zod';
import { leads, quizAnswers, telegramChats } from '../db/schema';
import { eq } from 'drizzle-orm';

const captureLeadSchema = z.object({
  name: z.string().min(2, "Имя слишком короткое"),
  contactMethod: z.enum(['phone', 'telegram', 'email']).optional().default('telegram'),
  contactInfo: z.string().min(3, "Укажите контактные данные"),
  estimatedBudget: z.string().optional(),
  answers: z.record(z.any()).optional(), // JSON-объект с ответами квиза
  website: z.string().optional(), // Honeypot
}).superRefine((data, ctx) => {
  if (data.contactMethod === 'email') {
    if (!z.string().email().safeParse(data.contactInfo).success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Некорректный email адрес",
        path: ['contactInfo']
      });
    }
  } else if (data.contactMethod === 'phone') {
    if (data.contactInfo.length < 9) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Слишком короткий номер телефона",
        path: ['contactInfo']
      });
    }
  } else if (data.contactMethod === 'telegram') {
    if (data.contactInfo.length < 3) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Укажите корректный @username или номер",
        path: ['contactInfo']
      });
    }
  }
});

export async function captureLeadAction(formData: FormData | Record<string, any>) {
  try {
    let data;
    if (formData instanceof FormData) {
      data = Object.fromEntries(formData.entries());
      if (typeof data.answers === 'string') {
        try {
          data.answers = JSON.parse(data.answers);
        } catch (e) {
          data.answers = JSON.stringify({});
        }
      }
    } else {
      data = formData;
    }

    // Basic Honeypot Check
    if (data.website) {
      return { success: false, error: 'Bot detected' };
    }

    const parsed = captureLeadSchema.safeParse(data);
    
    if (!parsed.success) {
      console.error('Validation error:', parsed.error);
      return { success: false, error: 'Ошибка валидации данных' };
    }

    const { env } = getRequestContext();
    const db = drizzle(env.DB);

    const { name, contactMethod, contactInfo, estimatedBudget, answers } = parsed.data;

    // Вставляем лида
    const newLead = await db.insert(leads).values({
      name,
      contactInfo,
      estimatedBudget: estimatedBudget || null,
      status: 'new',
    }).returning({ id: leads.id }).get();

    // Если есть ответы квиза, сохраняем их
    if (answers && Object.keys(answers).length > 0) {
      await db.insert(quizAnswers).values({
        leadId: newLead.id,
        answersJson: answers,
      }).run();
    }

    // --- ОТПРАВКА В TELEGRAM ---
    try {
      const activeChats = await db.select().from(telegramChats).where(eq(telegramChats.isActive, true)).all();
      
      if (activeChats.length > 0) {
        const token = (env as any).TELEGRAM_BOT_TOKEN;
        if (token) {
          // Формируем красивое сообщение
          let message = `🔔 <b>Новая заявка с сайта!</b>\n\n`;
          message += `👤 <b>Имя:</b> ${name}\n`;
          const methodEmoji = contactMethod === 'phone' ? '📱' : contactMethod === 'email' ? '✉️' : '✈️';
          message += `📞 <b>Контакты (${methodEmoji}):</b> ${contactInfo}\n`;
          if (estimatedBudget) {
            message += `💰 <b>Бюджет:</b> ${estimatedBudget}\n`;
          }
          
          if (answers && Object.keys(answers).length > 0) {
            message += `\n📝 <b>Ответы из формы/квиза:</b>\n`;
            for (const [key, value] of Object.entries(answers)) {
              if (key === 'source') continue; // пропускаем техническое поле
              message += `• <i>${key}</i>: ${value}\n`;
            }
          }

          // Асинхронно отправляем во все чаты
          const sendPromises = activeChats.map(chat => 
            fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: chat.id,
                text: message,
                parse_mode: 'HTML',
                reply_markup: {
                  inline_keyboard: [
                    [
                      { text: '📞 В работу', callback_data: `s:${newLead.id}:contacted` },
                      { text: '✅ Наш клиент', callback_data: `s:${newLead.id}:converted` }
                    ],
                    [
                      { text: '❌ Отказ/Спам', callback_data: `s:${newLead.id}:rejected` }
                    ]
                  ]
                }
              })
            })
          );
          
          await Promise.allSettled(sendPromises);
        }
      }
    } catch (tgError) {
      console.error('Telegram broadcast error:', tgError);
    }
    // ---------------------------

    return { success: true };
  } catch (error) {
    console.error('Failed to capture lead:', error);
    // Graceful degradation: показываем пользователю, что всё ок или извиняемся без 500 ошибки
    return { success: false, error: 'Не удалось сохранить заявку. Попробуйте позже.' };
  }
}

export async function updateLeadStatus(id: number, newStatus: 'new' | 'contacted' | 'converted' | 'rejected') {
  await verifyAdminSession();
  try {
    const { env } = getRequestContext();
    const db = drizzle((env as any).DB);

    await db.update(leads)
      .set({ status: newStatus })
      .where(eq(leads.id, id))
      .run();

    return { success: true };
  } catch (error) {
    console.error('Failed to update lead status:', error);
    return { success: false };
  }
}
