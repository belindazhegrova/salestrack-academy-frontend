import { apiFetch } from '@/services/api';

export type User = {
  id: string;
  email: string;
  role: 'ADMIN' | 'AGENT';
};

export const loginApi = (data: { email: string; password: string }) =>
  apiFetch<{ user: User }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const registerApi = (data: { email: string; password: string }) =>
  apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const getMe = () =>
  apiFetch<User>('/auth/me');

export const logoutApi = () =>
  apiFetch('/auth/logout', {
    method: 'POST',
  });