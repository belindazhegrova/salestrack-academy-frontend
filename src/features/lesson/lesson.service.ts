import { apiFetch } from '@/services/api';

export type Lesson = {
  id: string;
  title: string;
  type: 'TEXT' | 'VIDEO' | 'PDF' | 'AUDIO';
  order: number;
  content?: string;
  videoUrl?: string;
  pdfUrl?: string;
  audioUrl?: string;
  courseId: string;
};

export const getLessons = (courseId: string) =>
  apiFetch<Lesson[]>(`/lessons?courseId=${courseId}`);

export const createLesson = (formData: FormData) =>
  apiFetch<Lesson>('/lessons', {
    method: 'POST',
    body: formData,
  });

export const deleteLesson = (id: string) =>
  apiFetch(`/lessons/${id}`, {
    method: 'DELETE',
  });