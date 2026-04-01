import { API_URL } from '@/config';

export const getFileUrl = (path?: string) => {
  if (!path) return '';

  if (path.startsWith('http')) return path;

  return `${API_URL}${path}`;
};