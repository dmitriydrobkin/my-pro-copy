export default function HomePage({ lang }: { lang: string }) {
  return (
    <main className="min-h-screen bg-surface flex flex-col items-center justify-center">
      <h1 className="font-display text-4xl sm:text-6xl text-ink font-bold tracking-tight">New Next.js Starter</h1>
      <p className="text-ink/60 mt-4 text-lg">Language: {lang.toUpperCase()}</p>
    </main>
  );
}