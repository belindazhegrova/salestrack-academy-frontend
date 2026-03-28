import { apiFetch } from '@/services/api';

export type Course = {
  id: string;
  title: string;
  description?: string | null;
  thumbnail?: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateCoursePayload = {
  title: string;
  description?: string;
  thumbnail?: string;
};


export const getCourses = () =>
  apiFetch<Course[]>('/courses');

export const getCourseById = (id: string) =>
  apiFetch<Course>(`/courses/${id}`);


export const createCourse = (data: FormData) =>
  apiFetch<Course>('/courses', {
    method: 'POST',
    body: data,
  });


export const updateCourse = (
  id: string,
  data: Partial<CreateCoursePayload>
) =>
  apiFetch<Course>(`/courses/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });


export const deleteCourse = (id: string) =>
  apiFetch<{ message?: string }>(`/courses/${id}`, {
    method: 'DELETE',
  });