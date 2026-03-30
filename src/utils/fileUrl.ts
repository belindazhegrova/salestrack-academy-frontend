export const getFileUrl = (path?: string) => {
  if (!path) return '';


  if (path.startsWith('http')) return path;

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL

  return `${BASE_URL}${path}`;
};