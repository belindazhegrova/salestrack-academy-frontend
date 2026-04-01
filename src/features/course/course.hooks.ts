'use client';

import { useState } from 'react';
import {
  getCourses,
  createCourse,
  deleteCourse,
  type Course,
} from '@/features/course/course.service';

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);

const fetchCourses = async () => {
  try {
    const data = await getCourses();
    setCourses(data);
  } catch (err) {
    console.error(err);
  }
};

const create = async (formData: FormData) => {
  try {
    setLoading(true);

    await createCourse(formData);
    await fetchCourses();

  } catch (error) {
    throw error; 
  } finally {
    setLoading(false);
  }
};

  const remove = async (id: string) => {
    await deleteCourse(id);
    await fetchCourses();
  };

  return { courses, loading, fetchCourses, create, remove };
}