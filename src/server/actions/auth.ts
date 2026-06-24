'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getRequestContext } from '@cloudflare/next-on-pages';

async function generateHash(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}


/**
 * Логика проверки пароля и создания защищенной сессии.
 */
export async function loginAdmin(formData: FormData) {
  const passwordInput = formData.get('password') as string;
  
  // ⚡ ПРАВИЛЬНО: берем переменную из контекста Cloudflare
  let correctPassword;
  try {
    const { env } = getRequestContext();
    correctPassword = (env as any).ADMIN_PASSWORD;
  } catch (e) {
    // игнорируем ошибку если контекста нет
  }
  
  // Запасной вариант для локальной разработки
  const finalCorrectPassword = correctPassword || process.env.ADMIN_PASSWORD || '';

  // Очищаем от случайных пробелов
  const targetPwd = String(finalCorrectPassword).trim();
  const inputPwd = String(passwordInput).trim();

  // Если пароль на хостинге вообще не задан, блокируем вход в целях безопасности
  if (!targetPwd || targetPwd === 'undefined') {
    return { error: 'Критическая ошибка: ADMIN_PASSWORD не настроен на сервере.' };
  }

  // Прямое сравнение строк (без хэшей, так как пароль хранится в переменных окружения)
  if (inputPwd !== targetPwd) {
    return { error: `Неверный пароль (введено: ${inputPwd.length} симв, ждем: ${targetPwd.length} симв, env: ${!!correctPassword}, process: ${!!process.env.ADMIN_PASSWORD})` };
  }

  // Создаем детерминированный токен для проверки в middleware
  const sessionToken = await generateHash(`${targetPwd}-secret-salt-2026`);

  // Устанавливаем супер-защищенную куку на 7 дней
  cookies().set('admin_session', sessionToken, {
    httpOnly: true, // Защита от кражи через XSS/JS-скрипты
    secure: true,   // Передача только по зашифрованному HTTPS
    sameSite: 'strict', // Защита от CSRF-атак
    maxAge: 60 * 60 * 24 * 7, // 7 дней
    path: '/',
  });

  // Перенаправляем в админку
  redirect('/admin');
}

/**
 * Выход из панели управления (очистка кук).
 */
export async function logoutAdmin() {
  cookies().delete('admin_session');
  redirect('/');
}

export async function verifyAdminSession() {
  const sessionToken = cookies().get('admin_session')?.value;
  if (!sessionToken) {
    throw new Error('Unauthorized');
  }
  
  let correctPassword;
  try {
    const { env } = getRequestContext();
    correctPassword = (env as any).ADMIN_PASSWORD;
  } catch (e) {}
  
  const targetPwd = String(correctPassword || process.env.ADMIN_PASSWORD || '').trim();
  const expectedToken = await generateHash(`${targetPwd}-secret-salt-2026`);
  
  if (sessionToken !== expectedToken) {
    throw new Error('Unauthorized');
  }
}
