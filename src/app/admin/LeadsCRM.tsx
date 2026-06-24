'use client';

import { useState, Fragment } from 'react';
import { updateLeadStatus } from '@/server/actions/leads';
import { ChevronDown, ChevronUp, User, Phone, CheckCircle2, Clock, XCircle, FileQuestion } from 'lucide-react';

const STATUS_LABELS: Record<string, { label: string, color: string, icon: any }> = {
  'new': { label: 'Новая заявка', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: Clock },
  'contacted': { label: 'Взят в работу', color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: Phone },
  'converted': { label: 'Сделка успешна', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: CheckCircle2 },
  'rejected': { label: 'Отказ / Спам', color: 'bg-red-100 text-red-700 border-red-200', icon: XCircle },
};

export default function LeadsCRM({ initialLeads, answersMap }: { initialLeads: any[], answersMap: Record<number, any> }) {
  const [leads, setLeads] = useState(initialLeads);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const handleStatusChange = async (id: number, newStatus: string) => {
    setLoadingId(id);
    const res = await updateLeadStatus(id, newStatus as any);
    if (res.success) {
      setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
    } else {
      alert('Ошибка при обновлении статуса');
    }
    setLoadingId(null);
  };

  return (
    <div className="bg-white rounded-3xl border border-ink/5 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left font-sans">
          <thead>
            <tr className="bg-surface/50 border-b border-ink/5 text-ink/60 text-xs uppercase tracking-widest font-bold">
              <th className="px-6 py-4">Дата и Время</th>
              <th className="px-6 py-4">Клиент</th>
              <th className="px-6 py-4">Бюджет</th>
              <th className="px-6 py-4">Статус</th>
              <th className="px-6 py-4 text-right">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/5">
            {leads.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-ink/40 font-bold">
                  Заявок пока нет. Всё впереди!
                </td>
              </tr>
            ) : leads.map((lead) => {
              const hasAnswers = answersMap[lead.id];
              const isExpanded = expandedId === lead.id;

              return (
                <Fragment key={lead.id}>
                  <tr className={`transition-colors hover:bg-surface/30 ${loadingId === lead.id ? 'opacity-50' : ''}`}>
                    <td className="px-6 py-4">
                      <div className="font-bold text-ink">
                        {new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }).format(new Date(lead.createdAt))}
                      </div>
                      <div className="text-xs text-ink/40 mt-1 font-mono">#{lead.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="w-4 h-4 text-ink/40" />
                        <span className="font-bold text-ink">{lead.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-ink/40" />
                        <span className="text-sm text-ink/70">{lead.contactInfo}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-ink/70">
                      {lead.estimatedBudget || 'Не указан'}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        disabled={loadingId === lead.id}
                        className={`text-xs font-bold uppercase tracking-wider px-3 py-2 rounded-xl border appearance-none cursor-pointer outline-none transition-colors ${STATUS_LABELS[lead.status]?.color || 'bg-gray-100 text-gray-700 border-gray-200'}`}
                      >
                        <option value="new">Новая заявка</option>
                        <option value="contacted">Взят в работу</option>
                        <option value="converted">Сделка успешна</option>
                        <option value="rejected">Отказ / Спам</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {hasAnswers ? (
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : lead.id)}
                          className="inline-flex items-center gap-2 text-xs font-bold text-coral hover:text-coral/80 bg-coral/10 hover:bg-coral/20 px-4 py-2 rounded-xl transition-colors"
                        >
                          <FileQuestion className="w-4 h-4" />
                          {isExpanded ? 'Скрыть ответы' : 'Ответы Квиза'}
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      ) : (
                        <span className="text-xs text-ink/30 font-bold uppercase">Без квиза</span>
                      )}
                    </td>
                  </tr>

                  {/* Развернутые ответы квиза */}
                  {isExpanded && hasAnswers && (
                    <tr className="bg-surface/50 border-b border-ink/5">
                      <td colSpan={5} className="px-6 py-6">
                        <div className="bg-white rounded-2xl p-6 border border-ink/5 shadow-sm max-w-4xl">
                          <h4 className="font-display font-bold text-ink flex items-center gap-2 mb-4">
                            <FileQuestion className="w-5 h-5 text-coral" />
                            Детали заявки
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                            {Object.entries(hasAnswers).map(([question, answer]) => {
                              if (question === 'source') return null;
                              return (
                                <div key={question} className="border-l-2 border-coral/20 pl-4">
                                  <div className="text-xs font-bold text-ink/40 mb-1 uppercase tracking-wider">{question}</div>
                                  <div className="font-sans text-sm text-ink">{String(answer)}</div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
