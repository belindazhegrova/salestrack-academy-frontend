import { apiFetch } from '@/services/api';

export const getStats = () =>
  apiFetch('/enrollments/stats');

export const getCourseAgents = (courseId: string) =>
  apiFetch(`/courses/${courseId}/agents`);