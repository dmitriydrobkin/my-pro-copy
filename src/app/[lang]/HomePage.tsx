export default function B2BHomePage({ lang }: { lang: string }) {
  return (
    <main className="min-h-screen bg-surface flex flex-col items-center justify-center">
      <h1 className="font-display text-4xl text-ink">New Blank Project</h1>
      <p className="text-ink/60 mt-4">Language: {lang}</p>
    </main>
  );
}