'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { logout } from '@/features/auth/auth.service';

type HeaderProps = {
  title?: string;
};

export default function Header({ title = 'Dashboard' }: HeaderProps) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
        localStorage.removeItem('token');
       window.location.href = '/login';
    }
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
      </div>

      <button
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-60"
      >
        {isLoggingOut ? 'Logging out...' : 'Logout'}
      </button>
    </header>
  );
}