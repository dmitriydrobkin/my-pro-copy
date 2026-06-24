import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getRequestContext } from '@cloudflare/next-on-pages';

export async function verifyAdmin() {
  const sessionCookie = cookies().get('admin_session')?.value;
  
  // Достаем пароль из надежного контекста Cloudflare
  let correctPassword = process.env.ADMIN_PASSWORD;
  try {
    const { env } = getRequestContext();
    if ((env as any).ADMIN_PASSWORD) correctPassword = (env as any).ADMIN_PASSWORD;
  } catch(e) {}
  
  const targetPwd = String(correctPassword || '').trim();
  
  // Если куки нет или пароль на сервере не задан — на выход
  if (!sessionCookie || !targetPwd) redirect('/admin/login');
  
  // Генерируем хэш и сверяем
  const msgBuffer = new TextEncoder().encode(`${targetPwd}-secret-salt-2026`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const expectedToken = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
  
  if (sessionCookie !== expectedToken) redirect('/admin/login');
}