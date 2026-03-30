import { apiFetch } from '@/services/api';

export type Lesson = {
  id: string;
  title: string;
  content?: string;
  type: 'TEXT' | 'VIDEO' | 'PDF' | 'AUDIO';
  videoUrl?: string;
  pdfUrl?: string;
  audioUrl?: string;
  order: number;
};

export type CourseItem = {
  id: string;
  title: string;
  description?: string;
  thumbnail?: string;
  lessons: Lesson[];
};

export type EnrollmentCourse = {
  id: string;
  progress: number;
  completed: boolean;
  quizScore?: number | null;
  createdAt?: string;
  course: CourseItem;
};

export const getStats = () =>
  apiFetch('/enrollments/stats');

export const getCourseAgents = (courseId: string) =>
  apiFetch(`/courses/${courseId}/agents`);

export const getMyCourses = () =>
  apiFetch<EnrollmentCourse[]>('/enrollments/my-courses');

export const getMyCourseDetails = (courseId: string) =>
  apiFetch<EnrollmentCourse>(`/enrollments/my-courses/${courseId}`);

export const updateProgress = (
  userId: string,
  courseId: string,
  progress: number
) =>
  apiFetch(`/enrollments/${userId}/${courseId}/progress`, {
    method: 'PATCH',
    body: JSON.stringify({ progress }),
  });

export const updateQuizScore = (
  userId: string,
  courseId: string,
  quizScore: number
) =>
  apiFetch(`/enrollments/${userId}/${courseId}/quiz-score`, {
    method: 'PATCH',
    body: JSON.stringify({ quizScore }),
  });