'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '@/features/auth/auth.service';
import AuthCard from '@/components/auth/AuthCard';

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);
      setError('');

      await register({ email, password });

      router.replace('/login');
    } catch (err: any) {
      setError(err.message || 'Register failed');
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
          Register
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
          onClick={handleRegister}
          disabled={loading}
          className="bg-[var(--primary)] text-white p-3 rounded font-medium disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Register'}
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <p className="text-sm text-center text-gray-500">
          Already have an account?{' '}
          <span
            onClick={() => router.replace('/login')}
            className="text-[var(--primary)] font-medium cursor-pointer"
          >
            Login
          </span>
        </p>
      </AuthCard>
    </div>
  );
}