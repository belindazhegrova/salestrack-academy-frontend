'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getMe } from '@/features/auth/auth.service';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getMe();

        if (user.role === 'ADMIN') {
          router.replace('/admin/dashboard');
        } else {
          router.replace('/agent/dashboard');
        }
      } catch {
        router.replace('/login');
      }
    };

    checkAuth();
  }, [router]);

  return null;
}