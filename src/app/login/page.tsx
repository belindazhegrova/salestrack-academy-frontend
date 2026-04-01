'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { login } from '@/features/auth/auth.service';
import { useAuth } from '@/features/auth/useAuth.hook';
import AuthCard from '@/components/auth/AuthCard';

export default function LoginPage() {
  const router = useRouter();

  const { user, loading: authLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ protect login page
  useEffect(() => {
    if (authLoading) return;

    if (user) {
      window.location.href =
        user.role === 'ADMIN'
          ? '/admin/dashboard'
          : '/agent/courses';
    }
  }, [user, authLoading]);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError('');

      const res = await login({ email, password });

      localStorage.setItem('token', res.access_token);
      localStorage.setItem('user', JSON.stringify(res.user));

      window.location.href =
        res.user.role === 'ADMIN'
          ? '/admin/dashboard'
          : '/agent/courses';
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-6 px-4">
      <h1 className="text-4xl font-bold text-[var(--primary)]">
        SalesTrack Academy
      </h1>

      <AuthCard>
        <h2 className="text-xl font-semibold text-center text-[var(--primary)]">
          Login
        </h2>

        <input
          placeholder="Email"
          className="border p-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          className="border p-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="bg-[var(--primary)] text-white p-3 rounded"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </AuthCard>
    </div>
  );
}