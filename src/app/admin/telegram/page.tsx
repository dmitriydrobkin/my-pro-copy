import { getTelegramChats } from '@/server/actions/telegram';
import ChatList from './ChatList';

export const runtime = 'edge';

export default async function TelegramAdminPage() {
  const chats = await getTelegramChats();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold text-ink mb-2">Telegram</h1>
        <p className="font-sans text-ink/60">Управление чатами для получения заявок</p>
      </div>

      <div className="mb-8 p-6 bg-cyan-50/50 rounded-2xl border border-cyan-100 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <div>
          <h2 className="font-bold font-sans text-ink mb-1">Как добавить новый чат?</h2>
          <ol className="list-decimal list-inside text-sm text-ink/70 font-sans space-y-1">
            <li>Добавьте бота в нужную группу (или откройте с ним личный диалог).</li>
            <li>Отправьте команду <code className="bg-white px-2 py-0.5 rounded shadow-sm text-coral font-bold">/start_leads ВАШ_ПАРОЛЬ</code>.</li>
            <li>Бот ответит об успешном подключении, и чат появится здесь.</li>
          </ol>
        </div>
      </div>

      <ChatList initialChats={chats} />
    </div>
  );
}
