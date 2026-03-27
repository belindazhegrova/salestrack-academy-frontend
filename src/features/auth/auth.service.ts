import { apiFetch } from '@/services/api';

export type User = {
  id: string;
  email: string;
  role: 'ADMIN' | 'AGENT';
};

export type LoginResponse = {
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
  apiFetch<{ user: User }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const register = (data: { email: string; password: string }) =>
  apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const getMe = () =>
  apiFetch<User>('/auth/me');

export const logout = () =>
  apiFetch('/auth/logout', {
    method: 'POST',
  });