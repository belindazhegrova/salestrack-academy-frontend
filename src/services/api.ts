import { API_URL } from '@/config';

export const apiFetch = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    let message = 'Something went wrong';

    try {
      const error = await res.json();
      message = error?.message || message;
    } catch {}

    if (res.status === 401) {
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }

    throw new Error(message);
  }

  return res.json();
};