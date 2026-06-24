/**
 * Страница настроек (SEO, глобальные параметры).
 */

import { getSiteSettings } from '@/server/functions/settings';
import { updateSiteSettings } from '@/server/actions/settings';

import { SubmitButton } from '@/components/SubmitButton';
import { verifyAdmin } from '@/server/functions/auth-guard';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: { route?: string };
}) {
  await verifyAdmin();

  const settings = await getSiteSettings();


  return (
    <div className="space-y-12">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold text-ink mb-2">Настройки сайта</h1>
        <p className="font-sans text-ink/60">SEO-параметры и глобальные настройки</p>
      </div>

      {/* ================= БЛОК 1: ГЛОБАЛЬНЫЕ НАСТРОЙКИ ================= */}
      <div className="mx-auto max-w-4xl bg-surface/50 p-10 rounded-3xl border border-ink/5">
        <h2 className="font-display text-2xl font-bold mb-8 text-ink">Глобальные переменные</h2>
        
        <form 
         action={async (formData: FormData) => {
            'use server';
            
            // Создаем единый пакет данных
            const settingsData = new FormData();
            
            // Аккуратно складываем туда все настройки под правильными ключами
            settingsData.append('global_phone', formData.get('phone') as string || '');
            settingsData.append('global_email', formData.get('email') as string || '');
            settingsData.append('global_tg', formData.get('tg') as string || '');
            settingsData.append('global_inst', formData.get('inst') as string || '');
            settingsData.append('global_fb', formData.get('fb') as string || '');
            settingsData.append('seo_indexing_enabled', formData.get('seo_indexing') === 'on' ? 'true' : 'false');
            
            // Отправляем ровно ОДИН аргумент, как и требует TypeScript
            await updateSiteSettings(settingsData);
          }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-ink/80 mb-2">Телефон (шапка/подвал)</label>
              <input name="phone" defaultValue={settings.global_phone || ''} placeholder="+7 (999) 000-00-00" className="w-full p-4 bg-white border border-ink/10 rounded-2xl text-ink focus:outline-none focus:border-coral transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-bold text-ink/80 mb-2">Email</label>
              <input name="email" defaultValue={settings.global_email || ''} placeholder="hello@company.com" className="w-full p-4 bg-white border border-ink/10 rounded-2xl text-ink focus:outline-none focus:border-coral transition-colors" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-ink/80 mb-2">Telegram (ссылка на аккаунт/канал)</label>
              <input name="tg" defaultValue={settings.global_tg || ''} placeholder="https://t.me/nashe_agency" className="w-full p-4 bg-white border border-ink/10 rounded-2xl text-ink focus:outline-none focus:border-coral transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-bold text-ink/80 mb-2">Instagram (ссылка)</label>
              <input name="inst" defaultValue={settings.global_inst || ''} placeholder="https://instagram.com/..." className="w-full p-4 bg-white border border-ink/10 rounded-2xl text-ink focus:outline-none focus:border-coral transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-bold text-ink/80 mb-2">Facebook (ссылка)</label>
              <input name="fb" defaultValue={settings.global_fb || ''} placeholder="https://facebook.com/..." className="w-full p-4 bg-white border border-ink/10 rounded-2xl text-ink focus:outline-none focus:border-coral transition-colors" />
            </div>
          </div>

          <div className="pt-8 border-t border-ink/5 mt-8">
             <h3 className="font-display text-xl font-bold mb-4 text-ink">SEO: Индексация</h3>
             <div className="flex items-center gap-3 mb-2">
                <input type="checkbox" id="seo_indexing" name="seo_indexing" defaultChecked={settings.seo_indexing_enabled === 'true'} className="w-5 h-5 accent-coral" />
                <label htmlFor="seo_indexing" className="text-sm font-bold text-ink/80 cursor-pointer">Разрешить поисковым роботам (Google, Bing) индексировать сайт</label>
             </div>
             <p className="text-sm text-ink/60">Если выключено, на все страницы сайта будет добавлен метатег "noindex, nofollow", который скроет сайт из результатов поиска.</p>
          </div>

          <div className="pt-8">
            <SubmitButton defaultText="Сохранить настройки" />
          </div>
        </form>
      </div>

    </div>
  );
}
