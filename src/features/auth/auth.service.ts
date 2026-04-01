import { apiFetch } from '@/services/api';

const TOKEN_STORAGE_KEY = 'token';
const ACCESS_COOKIE = 'access_token';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export function persistAuthSession(accessToken: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_STORAGE_KEY, accessToken);
  document.cookie = `${ACCESS_COOKIE}=${encodeURIComponent(accessToken)}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

export function clearAuthSession() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  document.cookie = `${ACCESS_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
}

export type User = {
  userId: string;
  email: string;
  role: 'ADMIN' | 'AGENT';
  name:string;
};

export type LoginResponse = {
  access_token: string;
  user: User;
};

export type RegisterResponse = {
  message: string;
  user: User;
};

export type LogoutResponse = {
  message: string;
};


export const login = (data: { email: string; password: string }) =>
  apiFetch<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const register = (data: { email: string; password: string ,name:string}) =>
  apiFetch<RegisterResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const getMe = () =>
  apiFetch<User>('/auth/me');

export const logout = () =>
  apiFetch<LogoutResponse>('/auth/logout', {
    method: 'POST',
  });