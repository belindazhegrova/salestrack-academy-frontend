'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { login } from '@/features/auth/auth.service';
import AuthCard from '@/components/auth/AuthCard';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


const handleLogin = async () => {
  try {
    setLoading(true);
    setError('');

    const res = await login({ email, password });

    localStorage.setItem('token', res.access_token);

  
    localStorage.setItem('user', JSON.stringify(res.user));

    if (res.user.role === 'ADMIN') {
      router.replace('/admin/dashboard');
    } else {
      router.replace('/agent/courses');
    }
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
          className="border p-3 rounded focus:ring-2 focus:ring-[var(--primary)]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          className="border p-3 rounded focus:ring-2 focus:ring-[var(--primary)]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="bg-[var(--primary)] text-white p-3 rounded font-medium disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <p className="text-sm text-center text-gray-500">
          Don&apos;t have an account?{' '}
          <span
            onClick={() => router.replace('/register')}
            className="text-[var(--primary)] font-medium cursor-pointer"
          >
            Register
          </span>
        </p>
      </AuthCard>
    </div>
  );
}