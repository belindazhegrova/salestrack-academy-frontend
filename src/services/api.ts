import { API_URL } from '@/config';

export const apiFetch = async <T>(
  endpoint: string,
  options: RequestInit & { responseType?: 'json' | 'blob' } = {}
): Promise<T> => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const isFormData = options.body instanceof FormData;

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: 'include', 
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
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
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }

    throw new Error(message);
  }


  if ((options as any).responseType === 'blob') {
    return (await res.blob()) as T;
  }

  return res.json();
};