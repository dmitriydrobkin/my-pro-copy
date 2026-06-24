'use client';

import { usePathname } from 'next/navigation';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const pathname = usePathname();
  const isUk = !pathname.startsWith('/ru');

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-surface text-center px-6">
      <h2 className="font-display text-3xl md:text-5xl font-bold text-ink mb-4">
        {isUk ? 'Щось пішло не так' : 'Что-то пошло не так'}
      </h2>
      <p className="font-sans text-ink/60 text-base md:text-lg mb-8 max-w-md">
        {isUk 
          ? 'Сталася помилка при завантаженні даних. Будь ласка, спробуйте ще раз.' 
          : 'Произошла ошибка при загрузке данных. Пожалуйста, попробуйте еще раз.'}
      </p>
      <button
        onClick={() => reset()}
        className="bg-ink text-white rounded-full px-8 py-4 font-bold font-sans tracking-wide transition-all shadow-lg hover:-translate-y-1 hover:shadow-xl active:scale-95"
      >
        {isUk ? 'Спробувати знову' : 'Попробовать снова'}
      </button>
    </div>
  );
}
