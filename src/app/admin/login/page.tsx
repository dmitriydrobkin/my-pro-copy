'use client';

import { useState } from 'react';
import { loginAdmin } from '@/server/actions/auth';

export const runtime = 'edge';

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const result = await loginAdmin(formData);

      // Если экшн вернул ошибку, выводим её на экран
      if (result?.error) {
        setError(result.error);
        setLoading(false);
      }
    } catch (err: any) {
      // Игнорируем ошибку редиректа NEXT_REDIRECT
      if (err?.message === 'NEXT_REDIRECT') {
        return;
      }
      console.error(err);
      setError('Неизвестная ошибка: ' + (err?.message || 'сбой на сервере'));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-[2rem] p-10 border border-ink/5 shadow-xl relative overflow-hidden text-center">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-coral/10 to-transparent rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-cyan/10 to-transparent rounded-full blur-2xl pointer-events-none" />
        
        <p className="relative z-10 font-sans text-xs font-bold uppercase tracking-widest text-ink/40 mb-3">
          Управление сайтом
        </p>
        <h1 className="relative z-10 font-display text-4xl font-bold mb-8 text-ink leading-tight">
          Вход в панель
        </h1>

        <form onSubmit={handleSubmit} className="relative z-10 space-y-6 text-left">
          <div>
            <label className="block text-xs font-sans font-bold uppercase tracking-widest text-ink/60 mb-3">
              Ключ доступа
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="w-full border border-ink/10 rounded-2xl px-4 py-4 bg-surface font-sans text-sm outline-none transition-all focus:border-coral focus:ring-1 focus:ring-coral text-center tracking-[0.5em] font-bold"
            />
          </div>

          {error && (
            <p className="font-sans text-xs font-bold text-red-500 text-center bg-red-50 py-3 rounded-xl border border-red-100">
              {error}
            </p>
          )}

          <button type="submit" disabled={loading} className="w-full bg-ink hover:bg-ink/90 text-white rounded-full py-5 font-bold font-sans tracking-widest text-sm uppercase transition-all shadow-xl hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none flex items-center justify-center">
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Проверка...
              </span>
            ) : 'Войти в систему'}
          </button>
        </form>
      </div>
    </div>
  );
}
