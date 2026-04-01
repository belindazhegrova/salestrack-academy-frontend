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
      const token = localStorage.getItem('token');

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      const data = await getMe();
      setUser(data);
    } catch {
      setUser(null);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  initAuth();
}, []);

  return { user, loading };
}