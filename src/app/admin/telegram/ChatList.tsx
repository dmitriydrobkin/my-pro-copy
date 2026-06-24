'use client';

import { useState } from 'react';
import { toggleTelegramChat, deleteTelegramChat } from '@/server/actions/telegram';
import { Trash2, MessageCircle, Users, Settings2, Bell, BellOff } from 'lucide-react';

export default function ChatList({ initialChats }: { initialChats: any[] }) {
  const [chats, setChats] = useState(initialChats);
  const [loading, setLoading] = useState<string | null>(null);

  const handleToggle = async (id: string, currentStatus: boolean) => {
    setLoading(id);
    const result = await toggleTelegramChat(id, !currentStatus);
    if (result.success) {
      setChats(chats.map(c => c.id === id ? { ...c, isActive: !currentStatus } : c));
    }
    setLoading(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Точно удалить этот чат?')) return;
    setLoading(id);
    const result = await deleteTelegramChat(id);
    if (result.success) {
      setChats(chats.filter(c => c.id !== id));
    }
    setLoading(null);
  };

  if (chats.length === 0) {
    return (
      <div className="bg-surface border border-ink/5 rounded-2xl p-12 text-center flex flex-col items-center">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
          <Settings2 className="w-8 h-8 text-ink/40" />
        </div>
        <h3 className="font-display text-xl font-bold text-ink mb-2">Нет подключенных чатов</h3>
        <p className="font-sans text-ink/60 text-sm max-w-md mx-auto">
          Чтобы подключить чат, добавьте бота в нужную группу (или напишите ему в личные сообщения) и отправьте команду <b>/start_leads ВАШ_ПАРОЛЬ_ОТ_АДМИНКИ</b>.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {chats.map(chat => (
        <div key={chat.id} className="bg-white border border-ink/5 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${chat.type === 'private' ? 'bg-cyan/10 text-cyan-600' : 'bg-coral/10 text-coral'}`}>
              {chat.type === 'private' ? <MessageCircle className="w-6 h-6" /> : <Users className="w-6 h-6" />}
            </div>
            <div>
              <h3 className="font-bold text-ink font-sans">{chat.title || 'Без имени'}</h3>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs font-mono text-ink/40 bg-surface px-2 py-0.5 rounded-md">ID: {chat.id}</span>
                <span className="text-xs font-sans text-ink/40 capitalize">{chat.type}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => handleToggle(chat.id, chat.isActive)}
              disabled={loading === chat.id}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-bold font-sans transition-all ${
                chat.isActive 
                  ? 'bg-ink/5 text-ink hover:bg-ink/10' 
                  : 'bg-red-50 text-red-600 hover:bg-red-100'
              } disabled:opacity-50`}
            >
              {chat.isActive ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
              {chat.isActive ? 'Включен' : 'Отключен'}
            </button>
            <button
              onClick={() => handleDelete(chat.id)}
              disabled={loading === chat.id}
              className="p-2 text-ink/40 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors disabled:opacity-50"
              title="Удалить"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
