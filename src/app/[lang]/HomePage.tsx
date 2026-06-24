export default function HomePage({ lang }: { lang: string }) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-surface">
      <h1 className="font-display text-4xl sm:text-6xl text-ink font-bold text-center">
        Привет, я твой шаблон, я работаю 🚀
      </h1>
      <p className="text-ink/60 mt-4 text-lg">Текущий язык: {lang.toUpperCase()}</p>
    </main>
  );
}