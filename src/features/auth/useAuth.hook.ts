'use client';

import { useEffect, useState } from 'react';
import { getMe } from '@/features/auth/auth.service';

type Role = 'ADMIN' | 'AGENT';

type User = {
  id: string;
  email: string;
  role: Role;
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = localStorage.getItem('user');

    if (cached) {
      setUser(JSON.parse(cached));
      setLoading(false);
    }

    const fetchUser = async () => {
      try {
        const data = await getMe();
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading };
}