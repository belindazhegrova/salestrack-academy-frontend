'use client';

import { useEffect } from 'react';
import { useCourses } from '@/features/course/course.hooks';
import { CourseForm } from '@/components/forms/CourseForm';
import { CourseTable } from '@/components/modules/course/CourseTable';

export default function Page() {
  const { courses, loading, fetchCourses, create, remove } = useCourses();

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="space-y-6">
      <CourseForm onSubmit={create} loading={loading} />
      <CourseTable courses={courses} onDelete={remove} />
    </div>
  );
}