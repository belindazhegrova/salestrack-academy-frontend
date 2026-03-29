'use client';

import { useState } from 'react';
import {
  getLessons,
  createLesson,
  deleteLesson,
  type Lesson,
} from '@/features/lesson/lesson.service';

export function useLessons(courseId: string) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLessons = async () => {
    const data = await getLessons(courseId);
    setLessons(data);
  };

  const create = async (formData: FormData) => {
    setLoading(true);
    await createLesson(formData);
    await fetchLessons();
    setLoading(false);
  };

  const remove = async (id: string) => {
    await deleteLesson(id);
    await fetchLessons();
  };

  return { lessons, loading, fetchLessons, create, remove };
}