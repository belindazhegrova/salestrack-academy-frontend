import { apiFetch } from '@/services/api';

export type Agent = {
  id: string;
  email: string;
  role: 'AGENT';
  createdAt: string;
};

type Enrollment = {
  id: string;
  progress: number;
  quizScore?: number;
  course: {
    title: string;
  };
};

export const getAgents = () => apiFetch<Agent[]>('/users/agents');

export const createAgent = (data: {
  email: string;
  password: string;
  name:string;
}) =>
  apiFetch('/users/agents', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const getAgentCourses = (userId: string) =>
  apiFetch<Enrollment[]>(`/enrollments/agent/${userId}`);