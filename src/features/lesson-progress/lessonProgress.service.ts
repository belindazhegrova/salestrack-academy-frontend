import { apiFetch } from '@/services/api';

export type LessonProgress = {
  lessonId: string;
  completed: boolean;
};

export const completeLesson = (lessonId: string) =>
  apiFetch(`/lesson-progress/${lessonId}/complete`, {
    method: 'POST',
  });

export const getCourseLessonProgress = (courseId: string) =>
  apiFetch<LessonProgress[]>(`/lesson-progress/course/${courseId}`);