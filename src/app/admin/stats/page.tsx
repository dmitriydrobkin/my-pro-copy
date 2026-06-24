import { getRequestContext } from '@cloudflare/next-on-pages';
import { drizzle } from 'drizzle-orm/d1';
import { leads, telegramChats } from '@/server/db/schema';
import { verifyAdmin } from '@/server/functions/auth-guard';
import { BarChart3, Users, MessageCircle } from 'lucide-react';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export default async function StatsPage() {
  await verifyAdmin();

  let totalLeads = 0;
  let totalChats = 0;

  try {
    const { env } = getRequestContext();
    const db = drizzle((env as any).DB);
    const allLeads = await db.select().from(leads).all();
    const allChats = await db.select().from(telegramChats).all();
    totalLeads = allLeads.length;
    totalChats = allChats.length;
  } catch (e) {
    //
  }

  return (
    <div className="space-y-12">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold text-ink mb-2">Статистика</h1>
        <p className="font-sans text-ink/60">Краткая сводка по сайту</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-3xl border border-ink/5 flex flex-col justify-center items-center text-center">
          <Users className="w-10 h-10 text-coral mb-4" />
          <h2 className="text-4xl font-bold text-ink mb-2">{totalLeads}</h2>
          <p className="text-ink/60 font-bold uppercase tracking-widest text-sm">Всего заявок</p>
        </div>
        
        <div className="bg-white p-8 rounded-3xl border border-ink/5 flex flex-col justify-center items-center text-center">
          <MessageCircle className="w-10 h-10 text-cyan-600 mb-4" />
          <h2 className="text-4xl font-bold text-ink mb-2">{totalChats}</h2>
          <p className="text-ink/60 font-bold uppercase tracking-widest text-sm">Подключенных чатов TG</p>
        </div>
      </div>
      
      <div className="bg-surface/50 p-8 rounded-3xl border border-ink/5 mt-8">
        <div className="flex items-center gap-4 text-ink/40">
          <BarChart3 className="w-6 h-6" />
          <p className="text-sm font-bold">В будущем здесь появится подробная воронка продаж и аналитика конверсий.</p>
        </div>
      </div>
    </div>
  );
}
