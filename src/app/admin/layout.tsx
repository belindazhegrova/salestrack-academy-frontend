'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import SideBar from '@/components/layouts/SideBar';
import Header from '@/components/layouts/Header';
import { useAuth } from '@/features/auth/useAuth.hook';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace('/login');
      return;
    }

    if (user.role !== 'ADMIN') {
      router.replace('/agent/dashboard');
    }
  }, [user, loading, router]);

  if (loading || !user || user.role !== 'ADMIN') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <SideBar role={user.role} />

      <div className="flex-1 flex flex-col">
          <Header 
        role={user.role} 
        userEmail={user.email} 
      />

        <main className="flex-1 p-6 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}