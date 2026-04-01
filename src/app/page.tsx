'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/useAuth.hook';

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace('/login');
    } else if (user.role === 'ADMIN') {
     window.location.href = '/admin/dashboard';
    } else {
     window.location.href = '/agent/courses';
    }
  }, [user, loading]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Loading app...</p>
    </div>
  );
}