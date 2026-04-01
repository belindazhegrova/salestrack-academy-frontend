'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import SideBar from '@/components/layouts/SideBar';
import Header from '@/components/layouts/Header';
import { useAuth } from '@/features/auth/useAuth.hook';

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

 if (!user) {
  window.location.href = '/login';
  return;
}

if (user.role !== 'AGENT') {
  window.location.href = '/admin/dashboard';
}
}, [user, loading, router]);

if (loading || !user || user.role !== 'AGENT') {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div
        className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300"
        style={{ borderTopColor: 'var(--agent)' }}
      />
    </div>
  );
}

  return (
    <div className="flex min-h-screen">
      <SideBar role={user.role} />

      <div className="flex-1 flex flex-col">
          <Header 
        role={user.role} 
        userEmail={user.name} 
      />

        <main className="flex-1 p-6 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}