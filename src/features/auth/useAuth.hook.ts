'use client';

import { useEffect, useState } from 'react';
import { getMe } from '@/features/auth/auth.service';

type Role = 'ADMIN' | 'AGENT';

type User = {
  userId: string;
  email: string;
  role: Role;
  name: string;
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const data = await getMe();
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
      } catch (e) {
        console.log('Auth failed');
        setUser(null);
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  return { user, loading };
}