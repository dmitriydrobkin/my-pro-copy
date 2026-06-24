'use client';

import { logoutAdmin } from '@/server/actions/auth';
import { LogOut } from 'lucide-react';

export function LogoutButton() {
  return (
    <button 
      onClick={() => logoutAdmin()} 
      className="flex items-center gap-2 text-sm font-bold tracking-wide text-ink/70 hover:text-red-500 transition-colors ml-auto"
      title="Выйти из админки"
    >
      <LogOut className="w-4 h-4" />
      <span className="hidden md:inline">Выйти</span>
    </button>
  );
}
