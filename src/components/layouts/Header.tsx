'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { logout ,clearAuthSession} from '@/features/auth/auth.service';


type Role = 'ADMIN' | 'AGENT';

type HeaderProps = {
  role: Role;
  userEmail?: string;
};

export default function Header({ role, userEmail }: HeaderProps) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

const handleLogout = async () => {
  try {
    setIsLoggingOut(true);
    await logout(); 
  } catch (error) {
    console.error('Logout failed:', error);
  } finally {
    clearAuthSession(); 
    window.location.href = '/login';
  }
};

  const isAdmin = role === 'ADMIN';

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold text-gray-800">
        {isAdmin ? 'Admin Dashboard' : 'Agent Dashboard'}
      </h1>
      <div className="flex items-center gap-4">

        <span className="text-sm text-gray-600 font-medium">
          {userEmail}
        </span>

        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className={`btn ${
            isAdmin ? 'btn-primary' : 'btn-agent'
          }`}
        >
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </button>
      </div>
    </header>
  );
}