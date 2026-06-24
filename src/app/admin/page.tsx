import { getRequestContext } from '@cloudflare/next-on-pages';
import { drizzle } from 'drizzle-orm/d1';
import { leads, quizAnswers } from '@/server/db/schema';
import { desc } from 'drizzle-orm';
import { verifyAdmin } from '@/server/functions/auth-guard';
import LeadsCRM from './LeadsCRM';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

async function getLeadsWithAnswers() {
  const { env } = getRequestContext();
  const db = drizzle((env as any).DB);
  
  const allLeads = await db.select().from(leads).orderBy(desc(leads.createdAt)).all();
  const allAnswers = await db.select().from(quizAnswers).all();

  // Создаем удобный маппинг ответов: leadId -> answers
  const answersMap: Record<number, any> = {};
  for (const ans of allAnswers) {
    if (ans.leadId) {
      answersMap[ans.leadId] = typeof ans.answersJson === 'string' 
        ? JSON.parse(ans.answersJson) 
        : ans.answersJson;
    }
  }

  return { leads: allLeads, answersMap };
}

export default async function AdminDashboard() {
  await verifyAdmin();

  const data = await getLeadsWithAnswers();

  return (
    <div>
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-bold text-ink mb-2">Заявки (CRM)</h1>
          <p className="font-sans text-ink/60">
            Управление лидами с сайта. Всего заявок: <span className="font-bold text-ink">{data.leads.length}</span>
          </p>
        </div>
      </div>

      <LeadsCRM initialLeads={data.leads} answersMap={data.answersMap} />
    </div>
  );
}