import Link from 'next/link';
import { LogoutButton } from './LogoutButton';

export const runtime = 'edge';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface text-ink font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-ink/10 bg-white/80 backdrop-blur-md shadow-glass">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex h-16 items-center">
            <nav className="flex items-center space-x-8">
              <Link
                href="/admin"
                className="text-sm font-bold tracking-wide text-ink/70 transition-colors hover:text-coral"
              >
                Заявки
              </Link>
              <Link
                href="/admin/portfolio"
                className="text-sm font-bold tracking-wide text-ink/70 transition-colors hover:text-coral"
              >
                Портфолио
              </Link>
              <Link
                href="/admin/catalog"
                className="text-sm font-bold tracking-wide text-ink/70 transition-colors hover:text-coral hidden"
              >
                Каталог
              </Link>
              <Link
                href="/admin/settings"
                className="text-sm font-bold tracking-wide text-ink/70 transition-colors hover:text-coral"
              >
                Настройки
              </Link>
              <Link
                href="/admin/stats"
                className="text-sm font-bold tracking-wide text-ink/70 transition-colors hover:text-coral"
              >
                Статистика
              </Link>
              <Link
                href="/admin/telegram"
                className="text-sm font-bold tracking-wide text-ink/70 transition-colors hover:text-cyan-600 flex items-center gap-2"
              >
                Telegram 
                <span className="px-1.5 py-0.5 bg-coral text-white text-[10px] rounded-md leading-none">NEW</span>
              </Link>
            </nav>
            <div className="ml-auto">
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
