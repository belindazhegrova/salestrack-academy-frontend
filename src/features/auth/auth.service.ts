import { apiFetch } from '@/services/api';

export type User = {
  id: string;
  email: string;
  role: 'ADMIN' | 'AGENT';
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

export const register = (data: { email: string; password: string }) =>
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